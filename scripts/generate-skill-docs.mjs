import { mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import ts from 'typescript';

const SRC = 'src/components';
const OUT = 'skills/koast-ui/references';

/** 소비자에게 노출되지 않는 내부 디렉터리입니다. */
const INTERNAL = new Set(['field']);

const read = (p) => readFileSync(p, 'utf8');
const source = (p) =>
  ts.createSourceFile(p, read(p), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

/** 선언 바로 앞의 JSDoc 본문만 뽑습니다. 태그(@default 등)는 따로 모읍니다. */
const docOf = (node, text) => {
  const ranges = ts.getLeadingCommentRanges(text, node.pos) ?? [];
  const raw = ranges
    .filter((r) => text.slice(r.pos, r.pos + 3) === '/**')
    .map((r) => text.slice(r.pos, r.end))
    .pop();
  if (!raw) return { body: '', tags: {} };

  const lines = raw
    .replace(/^\/\*\*/, '')
    .replace(/\*\/$/, '')
    .split('\n')
    .map((l) => l.replace(/^\s*\*ᅟ?/, '').trim());

  const body = [];
  const tags = {};
  let current = null;
  for (const line of lines) {
    const m = /^@(\w+)\s*(.*)$/.exec(line);
    if (m) {
      current = m[1];
      tags[current] = (tags[current] ? `${tags[current]} ` : '') + m[2];
      continue;
    }
    if (current) {
      tags[current] += ` ${line}`;
      continue;
    }
    body.push(line);
  }
  // 한 줄 JSDoc 은 `설명 @default 'x'` 처럼 태그가 문장 끝에 붙습니다.
  let text2 = body.join(' ');
  for (const m of [...text2.matchAll(/@(\w+)\s+([^@]*)/g)]) {
    tags[m[1]] = (tags[m[1]] ? `${tags[m[1]]} ` : '') + m[2].trim();
  }
  text2 = text2.replace(/@\w+\s+[^@]*/g, '');
  for (const k of Object.keys(tags)) tags[k] = tags[k].replace(/\s+/g, ' ').trim();
  return { body: text2.replace(/\s+/g, ' ').trim(), tags };
};

const clean = (t) => t.replace(/\s+/g, ' ').trim().replace(/^\|\s*/, '');

const typeText = (node, text) =>
  node.type ? clean(text.slice(node.type.pos, node.type.end)) : 'unknown';

/** `*.types.ts` 에서 Props 멤버와 공개 타입 별칭을 모읍니다. */
const collectTypes = (file) => {
  const text = read(file);
  const sf = source(file);
  const props = new Map();
  const aliases = new Map();

  const members = (decl) => {
    const out = [];
    for (const m of decl.members ?? decl.type?.members ?? []) {
      if (!ts.isPropertySignature(m)) continue;
      if (typeText(m, text) === 'undefined') continue;
      const { body, tags } = docOf(m, text);
      out.push({
        name: m.name.getText(sf).replace(/^'|'$/g, ''),
        optional: Boolean(m.questionToken),
        type: typeText(m, text),
        doc: body || tags.deprecated || '',
        def: tags.default,
        deprecated: tags.deprecated,
      });
    }
    return out;
  };

  sf.forEachChild((node) => {
    const exported = node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
    if (ts.isInterfaceDeclaration(node)) {
      const name = node.name.text;
      const heritage = (node.heritageClauses ?? [])
        .flatMap((h) => h.types.map((t) => t.expression.getText(sf)))
        .filter((h) => !/^(Omit|Pick|Partial)$/.test(h));
      if (/Props$/.test(name)) props.set(name, { members: members(node), heritage, exported });
      return;
    }
    if (ts.isTypeAliasDeclaration(node) && exported) {
      const { body, tags } = docOf(node, text);
      const t = clean(text.slice(node.type.pos, node.type.end));
      if (/Props$/.test(node.name.text) && node.type.members) {
        props.set(node.name.text, { members: members(node), heritage: [], exported });
      } else {
        aliases.set(node.name.text, { type: t, doc: body || tags.deprecated || '', deprecated: tags.deprecated });
      }
    }
  });

  return { props, aliases };
};

/** 컴포넌트 `.tsx` 의 JSDoc 에서 설명과 @example 블록을 뽑습니다. */
const collectComponentDoc = (file, name) => {
  const text = read(file);
  // 주석 경계(*/)를 넘지 않아야 앞쪽 주석까지 삼키지 않습니다.
  const re = /\/\*\*(?:(?!\*\/)[\s\S])*?@koast\/ui(?:(?!\*\/)[\s\S])*?\*\//g;
  // forwardRef 를 쓰는 컴포넌트는 `const <Name>Impl` 로 선언한 뒤 캐스팅해 export 합니다.
  const decls = ['export const ' + name, 'export function ' + name, 'const ' + name + 'Impl'];
  let block = null;
  for (const hit of text.matchAll(re)) {
    // 한 파일에 하위 컴포넌트 주석이 함께 있으면 메인 컴포넌트 바로 앞 블록을 고릅니다.
    const head = text.slice(hit.index + hit[0].length, hit.index + hit[0].length + 200).trimStart();
    if (decls.some((d) => head.startsWith(d) && !/[A-Za-z0-9_]/.test(head.charAt(d.length)))) {
      block = hit[0];
      break;
    }
    if (!block) block = hit[0];
  }
  if (!block) return { summary: '', example: '' };

  const lines = block
    .replace(/^\/\*\*/, '')
    .replace(/\*\/$/, '')
    .split('\n')
    .map((l) => l.replace(/^\s*\* ?/, ''));

  const summary = [];
  const example = [];
  let inExample = false;
  for (const line of lines) {
    if (/^@example/.test(line)) {
      inExample = true;
      continue;
    }
    // `@koast/ui Alert(알림) 컴포넌트입니다.` 처럼 첫 줄에 설명이 붙습니다.
    if (/^@koast\/ui/.test(line)) {
      summary.push(line.replace(/^@koast\/ui\s*/, ''));
      continue;
    }
    if (/^@\w+/.test(line)) {
      inExample = false;
      continue;
    }
    (inExample ? example : summary).push(line);
  }
  return {
    summary: summary.join(' ').replace(/\s+/g, ' ').trim(),
    example: example.join('\n').replace(/^\s*```tsx\n?/, '').replace(/```\s*$/, '').trim(),
  };
};

const esc = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');

const renderProps = (name, { members, heritage }) => {
  if (!members.length) return '';
  const rows = members.map((p) => {
    const flag = p.deprecated ? ' **(deprecated)**' : '';
    return `| \`${p.name}\`${p.optional ? '' : ' *(필수)*'} | \`${esc(p.type)}\` | ${p.def ? `\`${esc(p.def)}\`` : '—'} | ${esc(p.doc)}${flag} |`;
  });
  const ext = heritage.length
    ? `\n\n${heritage.map((h) => `\`${h}\``).join(' · ')} 를 확장합니다. 표준 HTML 속성(\`aria-*\` · \`data-*\` · \`id\` · 이벤트)은 그대로 전달됩니다.`
    : '';
  return `### \`${name}\`\n\n| prop | 타입 | 기본값 | 설명 |\n| :-- | :-- | :-- | :-- |\n${rows.join('\n')}${ext}\n`;
};

const renderAliases = (aliases) => {
  const rows = [...aliases].map(([name, a]) =>
    `| \`${name}\` | \`${esc(a.type)}\` | ${esc(a.doc)}${a.deprecated ? ' **(deprecated)**' : ''} |`);
  if (!rows.length) return '';
  return `## 타입\n\n| 이름 | 값 | 설명 |\n| :-- | :-- | :-- |\n${rows.join('\n')}\n`;
};

const build = (dir) => {
  const name = basename(dir);
  const files = readdirSync(dir);
  const typesFile = files.find((f) => /\.types\.ts$/.test(f)) ?? (files.includes('types.ts') ? 'types.ts' : null);
  const mainFile = files.find((f) => f === `${name}.tsx`);
  if (!typesFile || !mainFile) return null;

  const { props, aliases } = collectTypes(join(dir, typesFile));
  const { summary, example } = collectComponentDoc(join(dir, mainFile), name);

  const sections = [
    `# ${name}`,
    '',
    summary || '_설명 없음._',
    '',
    '```tsx',
    `import { ${name} } from '@koast/ui';`,
    '```',
    '',
  ];
  if (example) sections.push('## 사용 예', '', '```tsx', example, '```', '');
  const propBlocks = [...props].map(([n, p]) => renderProps(n, p)).filter(Boolean);
  if (propBlocks.length) sections.push('## Props', '', ...propBlocks);
  const aliasBlock = renderAliases(aliases);
  if (aliasBlock) sections.push(aliasBlock);
  sections.push(
    '## 규칙',
    '',
    '- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.',
    '- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.',
    '',
  );

  return { name, body: sections.join('\n') };
};

const dirs = readdirSync(SRC)
  .filter((d) => !INTERNAL.has(d) && statSync(join(SRC, d)).isDirectory())
  .sort();

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const built = [];
const skipped = [];
for (const d of dirs) {
  const doc = build(join(SRC, d));
  if (!doc) {
    skipped.push(d);
    continue;
  }
  writeFileSync(join(OUT, `${doc.name.toLowerCase()}.md`), `${doc.body}\n`, 'utf8');
  built.push(doc.name);
}

const index = [
  '# 컴포넌트 카탈로그',
  '',
  '`references/<이름>.md` 를 열어 props 와 예제를 확인하세요.',
  '',
  ...built.map((n) => `- [${n}](./${n.toLowerCase()}.md)`),
  '',
].join('\n');
writeFileSync(join(OUT, 'index.md'), index, 'utf8');

console.log(`생성 ${built.length}개 → ${OUT}`);
if (skipped.length) console.log(`건너뜀: ${skipped.join(', ')}`);
