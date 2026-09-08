#!/usr/bin/env node
/**
 * semantic-color-tokens.csv 를 단일 원본으로 CSS 변수 / Tailwind theme / 타입 메타데이터를 생성합니다.
 * 피그마에서 토큰이 바뀌면 CSV 만 갱신하고 `npm run tokens` 를 실행하세요.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import palette from 'tailwindcss/colors.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CSV_PATH = path.join(ROOT, 'semantic-color-tokens.csv');

/** CSV 카테고리 -> CSS 변수 접두사 / Tailwind 스케일 매핑 */
const CATEGORIES = {
  'color/content': { prefix: 'content', scale: 'textColor', group: 'root' },
  'color/content/interactive': { prefix: 'content-interactive', scale: 'textColor', group: 'interactive' },
  'color/bg': { prefix: 'bg', scale: 'backgroundColor', group: 'root' },
  'color/bg/interactive': { prefix: 'bg-interactive', scale: 'backgroundColor', group: 'interactive' },
  'color/border': { prefix: 'border', scale: 'borderColor', group: 'root' },
  'color/border/interactive': { prefix: 'border-interactive', scale: 'borderColor', group: 'interactive' },
  'color/media': { prefix: 'media', scale: 'media', group: 'root' },
  'color/effect/shadow': { prefix: 'shadow', scale: 'boxShadowColor', group: 'root' },
};

/**
 * 프로젝트별로 주입받는 brand 램프의 기본값입니다.
 * secondary 는 중립(zinc)입니다. 피그마의 Secondary 버튼이 zinc 계열입니다.
 */
const BRAND_FALLBACK = { primary: palette.blue, secondary: palette.zinc };
const BRAND_STEPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
const BRAND_TONES = ['primary', 'secondary'];

const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const hexToChannels = (hex) => {
  const h = hex.replace('#', '').trim();
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return String((n >> 16) & 255) + ' ' + String((n >> 8) & 255) + ' ' + String(n & 255);
};

/** 피그마 참조('{Color/zinc/900}')를 해석합니다. brand 만 CSS 변수로 남기고 나머지는 리터럴로 고정합니다. */
const resolveRef = (raw) => {
  const body = raw.trim().replace(/^\{/, '').replace(/\}$/, '');
  const parts = body.split('/').map((p) => p.trim());
  const ns = parts[0].toLowerCase();
  const family = (parts[1] || '').toLowerCase();

  if (ns !== 'color') throw new Error('알 수 없는 네임스페이스: ' + raw);

  if (family === 'base') {
    const tone = (parts[2] || '').toLowerCase();
    if (tone === 'white') return { kind: 'channels', value: '255 255 255', display: '#ffffff' };
    if (tone === 'black') return { kind: 'channels', value: '0 0 0', display: '#000000' };
    throw new Error('알 수 없는 base 색상: ' + raw);
  }

  if (family === 'brand') {
    const tone = parts[2];
    const step = parts[3];
    if (!BRAND_FALLBACK[tone]) throw new Error('알 수 없는 brand 계열: ' + raw);
    if (!BRAND_STEPS.includes(step)) throw new Error('알 수 없는 brand 단계: ' + raw);
    return {
      kind: 'brand',
      value: 'var(--koast-brand-' + tone + '-' + step + ')',
      display: 'brand/' + tone + '/' + step,
    };
  }

  if (family === 'transparent') {
    // 그림자 전용 토큰입니다. 검정 기준 불투명도로 해석합니다.
    const alpha = Number(parts[2]) / 100;
    return { kind: 'literal', value: 'rgb(0 0 0 / ' + alpha + ')', display: 'rgba(0,0,0,' + alpha + ')' };
  }

  const ramp = palette[family];
  const step = parts[2];
  if (!ramp || !ramp[step]) throw new Error('Tailwind 팔레트에 없는 색상: ' + raw);
  return { kind: 'channels', value: hexToChannels(ramp[step]), display: ramp[step] };
};

const rows = fs.readFileSync(CSV_PATH, 'utf8')
  .split(/\r?\n/)
  .slice(1)
  .filter((line) => line.trim().length > 0)
  .map((line) => {
    const cells = line.split(',');
    const category = cells[0];
    const meta = CATEGORIES[category];
    if (!meta) throw new Error('알 수 없는 카테고리: ' + category);
    const token = kebab(cells[1]);
    return {
      category,
      meta,
      token,
      varName: '--koast-' + meta.prefix + '-' + token,
      light: resolveRef(cells[2]),
      dark: resolveRef(cells[3]),
    };
  });

/* --------------------------------------------------------------- CSS ---- */

const indent = (block, pad) => block.split('\n').map((line) => pad + line).join('\n');

const brandVarBlock = BRAND_TONES
  .flatMap((tone) => BRAND_STEPS.map((step) =>
    '  --koast-brand-' + tone + '-' + step + ': ' + hexToChannels(BRAND_FALLBACK[tone][step]) + ';',
  ))
  .join('\n');

const semanticVarBlock = (mode) => rows
  .map((row) => '  ' + row.varName + ': ' + row[mode].value + ';')
  .join('\n');

const css = [
  '/**',
  ' * 자동 생성 파일입니다. 수정하려면 semantic-color-tokens.csv 를 고치고 `npm run tokens` 를 실행하세요.',
  ' * 채널 표기(`R G B`)는 Tailwind 불투명도 수식어(`/50`)를 지원하기 위한 것입니다.',
  ' */',
  ':root {',
  '  color-scheme: light;',
  '',
  '  /* brand 램프 — 프로젝트별 주입 지점 (기본값: Tailwind blue) */',
  brandVarBlock,
  '',
  '  /* 시맨틱 토큰 — 라이브러리 고정 */',
  semanticVarBlock('light'),
  '}',
  '',
  '/* OS 설정을 따르는 경우 */',
  '@media (prefers-color-scheme: dark) {',
  '  :root:not([data-koast-theme=\'light\']) {',
  '    color-scheme: dark;',
  indent(semanticVarBlock('dark'), '  '),
  '  }',
  '}',
  '',
  '/* 명시적 테마 지정. 하위 트리에도 적용 가능하며, 소스 순서상 :root 보다 뒤에 와야 합니다. */',
  '[data-koast-theme=\'light\'] {',
  '  color-scheme: light;',
  semanticVarBlock('light'),
  '}',
  '',
  '[data-koast-theme=\'dark\'] {',
  '  color-scheme: dark;',
  semanticVarBlock('dark'),
  '}',
  '',
].join('\n');

/* ---------------------------------------------------------- Tailwind ---- */

const tailwindValue = (row) => row.light.kind === 'literal'
  ? 'var(' + row.varName + ')'
  : 'rgb(var(' + row.varName + ') / <alpha-value>)';

const buildScale = (scaleName) => {
  const scoped = rows.filter((row) => row.meta.scale === scaleName);
  const root = {};
  const interactive = {};
  scoped.forEach((row) => {
    const target = row.meta.group === 'interactive' ? interactive : root;
    target[row.token] = tailwindValue(row);
  });
  const scale = { ...root };
  if (Object.keys(interactive).length > 0) scale.interactive = interactive;
  return scale;
};

const exportConst = (name, value) => 'export const ' + name + ' = ' + JSON.stringify(value, null, 2) + ';\n';

const tailwindFile = [
  '/**',
  ' * 자동 생성 파일입니다. 수정하려면 semantic-color-tokens.csv 를 고치고 `npm run tokens` 를 실행하세요.',
  ' */',
  exportConst('koastTextColor', buildScale('textColor')),
  exportConst('koastBackgroundColor', buildScale('backgroundColor')),
  exportConst('koastBorderColor', buildScale('borderColor')),
  exportConst('koastBoxShadowColor', buildScale('boxShadowColor')),
  exportConst('koastMediaColor', buildScale('media')),
].join('\n');

/* ---------------------------------------------------------------- TS ---- */

const tsTokens = rows
  .map((row) => [
    '  {',
    '    category: \'' + row.category + '\',',
    '    token: \'' + row.token + '\',',
    '    cssVar: \'' + row.varName + '\',',
    '    light: \'' + row.light.display + '\',',
    '    dark: \'' + row.dark.display + '\',',
    '  },',
  ].join('\n'))
  .join('\n');

const tsFile = [
  '/**',
  ' * 자동 생성 파일입니다. 수정하려면 semantic-color-tokens.csv 를 고치고 `npm run tokens` 를 실행하세요.',
  ' */',
  '',
  '/** 시맨틱 컬러 토큰 메타데이터입니다. 스토리북 팔레트 문서와 테스트에서 사용합니다. */',
  'export interface KoastColorToken {',
  '  category: string;',
  '  token: string;',
  '  cssVar: string;',
  '  light: string;',
  '  dark: string;',
  '}',
  '',
  'export const koastColorTokens: readonly KoastColorToken[] = [',
  tsTokens,
  '];',
  '',
  '/** 프로젝트별로 주입 가능한 brand 램프의 단계입니다. */',
  'export const KOAST_BRAND_STEPS = [' + BRAND_STEPS.map((s) => '\'' + s + '\'').join(', ') + '] as const;',
  '',
  'export type KoastBrandStep = typeof KOAST_BRAND_STEPS[number];',
  'export type KoastBrandTone = \'primary\' | \'secondary\';',
  '',
].join('\n');

fs.writeFileSync(path.join(ROOT, 'src/styles/tokens.generated.css'), css, 'utf8');
fs.writeFileSync(path.join(ROOT, 'src/styles/tokens/tailwind.generated.js'), tailwindFile, 'utf8');
fs.writeFileSync(path.join(ROOT, 'src/styles/tokens/tokens.generated.ts'), tsFile, 'utf8');

console.log('✅ 시맨틱 토큰 ' + rows.length + '개 생성 완료');
console.log('   - src/styles/tokens.generated.css');
console.log('   - src/styles/tokens/tailwind.generated.js');
console.log('   - src/styles/tokens/tokens.generated.ts');
