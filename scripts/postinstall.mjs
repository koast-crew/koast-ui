#!/usr/bin/env node

/** 파일은 건드리지 않고 안내만 합니다. 소비자 레포에 무언가를 쓰는 postinstall 은 만들지 않습니다. */
if (!process.env.CI) {
  console.log(
    '\n@koast/ui — Claude Code 스킬을 쓰려면: npx @koast/ui init-skills\n',
  );
}
