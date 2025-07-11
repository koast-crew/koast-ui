#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Windows에서도 __dirname을 사용할 수 있도록 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsConfigPath = path.join(process.cwd(), "tailwind.config.js");
const tsConfigPath = path.join(process.cwd(), "tailwind.config.ts");
const newContent = "'./node_modules/@koast/ui/dist/*.{js,jsx,ts,tsx}',";

// js 또는 ts 설정 파일 확인
let configPath = null;
if (fs.existsSync(jsConfigPath)) {
  configPath = jsConfigPath;
} else if (fs.existsSync(tsConfigPath)) {
  configPath = tsConfigPath;
}

if (configPath) {
  let configFile = fs.readFileSync(configPath, "utf8");

  if (!configFile.includes(newContent)) {
    configFile = configFile.replace(
      /content:\s*\[\s*/m,
      `content: [\n    ${newContent}\n\t\t`
    );

    fs.writeFileSync(configPath, configFile, "utf8");
    console.log(`✅ Tailwind content 설정이 ${path.basename(configPath)}에 자동으로 추가되었습니다!`);
  } else {
    console.log(`ℹ️ Tailwind content 설정이 ${path.basename(configPath)}에 이미 존재합니다.`);
  }
} else {
  console.log("⚠️ tailwind.config.js 또는 tailwind.config.ts 파일이 존재하지 않습니다. 직접 './node_modules/@koast/ui/dist/*.{js,jsx,ts,tsx}' 를 content에 추가해주세요.");
}
