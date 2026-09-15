#!/usr/bin/env node

import { cpSync, existsSync, lstatSync, mkdirSync, readFileSync, rmSync, symlinkSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const PKG = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = join(PKG, 'skills', 'koast-ui');
const DEST_DIR = resolve(process.cwd(), '.claude', 'skills');
const DEST = join(DEST_DIR, 'koast-ui');

const LEGACY = `
ℹ️  이 명령은 더 이상 필요하지 않습니다.

  @koast/ui 는 자체 완결형 CSS 를 배포하며, 스타일은 자동으로 딸려옵니다.
  tailwind.config 설정도, 별도의 CSS import 도 필요 없습니다.

    import { Button } from '@koast/ui';   // 이것만으로 스타일까지 적용됩니다

  Claude Code 스킬을 설치하려면:  npx @koast/ui init-skills
`;

/** 심링크면 라이브러리를 업데이트할 때 스킬 내용이 자동으로 따라옵니다. */
const link = () => {
  const target = relative(DEST_DIR, SOURCE);
  symlinkSync(target, DEST, process.platform === 'win32' ? 'junction' : 'dir');
  return '심링크';
};

/**
 * 이 명령이 만든 설치인지 봅니다. 심링크는 우리가 만든 것이고,
 * 복사본은 SKILL.md 의 frontmatter 로 알아봅니다(심링크를 못 만드는 환경의 결과물입니다).
 */
const isOurs = () => {
  const stat = lstatSync(DEST, { throwIfNoEntry: false });
  if (!stat) return false;
  if (stat.isSymbolicLink()) return true;
  if (!stat.isDirectory()) return false;
  try {
    return /^name:\s*koast-ui\s*$/m.test(readFileSync(join(DEST, 'SKILL.md'), 'utf8'));
  } catch {
    return false;
  }
};

const initSkills = (force) => {
  if (!existsSync(SOURCE)) {
    console.error(`✗ 스킬 원본을 찾지 못했습니다: ${SOURCE}`);
    process.exit(1);
  }

  const existing = lstatSync(DEST, { throwIfNoEntry: false });
  if (existing && !force && !isOurs()) {
    console.error(`
✗ ${relative(process.cwd(), DEST)} 가 이미 있고 @koast/ui 가 만든 것이 아닙니다.

  내용을 확인한 뒤 덮어쓰려면:  npx @koast/ui init-skills --force
`);
    process.exit(1);
  }

  // 우리 설치이거나 --force 면 지우고 다시 만듭니다. 갱신 경로가 여기 하나뿐이어야 합니다.
  if (existing) rmSync(DEST, { recursive: true, force: true });

  mkdirSync(DEST_DIR, { recursive: true });

  let how;
  try {
    how = link();
  } catch {
    // Windows 개발자 모드가 꺼져 있거나 권한이 없으면 복사로 대체합니다.
    cpSync(SOURCE, DEST, { recursive: true });
    how = '복사';
  }

  console.log(`
✓ Claude Code 스킬을 ${existing ? '갱신' : '설치'}했습니다 (${how})

  ${relative(process.cwd(), DEST)}

  Claude Code 를 이 디렉터리에서 열면 koast-ui 스킬이 자동으로 잡힙니다.
  ${how === '심링크'
    ? 'npm update @koast/ui 하면 스킬 내용도 함께 갱신됩니다.'
    : '심링크를 못 만들어 복사했습니다. 라이브러리를 업데이트한 뒤 이 명령을 다시 실행하면 갱신됩니다.'}
`);
};

const args = process.argv.slice(2);
const command = args[0];
const force = args.includes('--force') || args.includes('-f');

if (command === 'init-skills') initSkills(force);
else console.log(LEGACY);
