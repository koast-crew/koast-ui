#!/usr/bin/env node

import { cpSync, existsSync, lstatSync, mkdirSync, rmSync, symlinkSync } from 'node:fs';
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

const initSkills = () => {
  if (!existsSync(SOURCE)) {
    console.error(`✗ 스킬 원본을 찾지 못했습니다: ${SOURCE}`);
    process.exit(1);
  }

  if (existsSync(DEST) || lstatSync(DEST, { throwIfNoEntry: false })) {
    const stat = lstatSync(DEST);
    // 우리가 만든 링크만 조용히 갱신하고, 사람이 만든 폴더는 건드리지 않습니다.
    if (!stat.isSymbolicLink() && !stat.isDirectory()) {
      console.error(`✗ ${DEST} 가 이미 있습니다. 지우고 다시 실행하세요.`);
      process.exit(1);
    }
    if (stat.isDirectory() && !stat.isSymbolicLink()) {
      console.error(`✗ ${DEST} 폴더가 이미 있습니다. 내용을 확인하고 지운 뒤 다시 실행하세요.`);
      process.exit(1);
    }
    rmSync(DEST, { recursive: true, force: true });
  }

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
✓ Claude Code 스킬을 설치했습니다 (${how})

  ${relative(process.cwd(), DEST)}

  Claude Code 를 이 디렉터리에서 열면 koast-ui 스킬이 자동으로 잡힙니다.
  ${how === '심링크'
    ? 'npm update @koast/ui 하면 스킬 내용도 함께 갱신됩니다.'
    : '심링크를 못 만들어 복사했습니다. 라이브러리를 업데이트하면 이 명령을 다시 실행하세요.'}
`);
};

const [command] = process.argv.slice(2);

if (command === 'init-skills') initSkills();
else console.log(LEGACY);
