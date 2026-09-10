# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

`@koast/ui` — 한국해양기상기술(KOAST)용 React 컴포넌트 라이브러리. npm 에 배포되며 소비자는 설정 없이 `import { Button } from '@koast/ui'` 만으로 씁니다.

## 명령어

```bash
npm run dev              # vite dev 서버. 루트가 ./dev (playground) 입니다
npm run build            # prebuild(tokens) → tsc → vite build. dist/ 생성
npm run tokens           # CSV → 생성 파일 3개 재생성
npm run lint             # eslint . (포맷 검사 포함)
npm run lint:fix
npm run storybook        # 6006
npm run build-storybook
```

### 테스트

`npm test` 는 `vitest` 를 부르지만 **vitest 가 devDependency 에 없고 테스트 파일도 아직 없습니다.** 실행하면 npx 가 임의 버전을 받아옵니다.

테스트를 돌릴 때는 `--root .` 가 필요합니다. `vite.config.ts` 가 `root: command === 'serve' ? './dev' : undefined` 라서, vitest 는 serve 로 취급돼 루트가 `dev/` 로 잡히고 `src/` 의 테스트를 못 찾습니다.

```bash
npx vitest run --root . src/components/Button/Button.spec.tsx
```

## 아키텍처

### 토큰 파이프라인 — 색상의 단일 원본은 CSV

```
Figma  →(수동 대조)→  semantic-color-tokens.csv  →(npm run tokens)→  생성 파일 3개
```

`scripts/generate-tokens.mjs` 가 CSV 를 읽어 만듭니다. **셋 다 직접 수정 금지:**

- `src/styles/tokens.generated.css` — CSS 변수 (`:root`, `@media (prefers-color-scheme: dark)`, `[data-koast-theme='light'|'dark']` 4블록)
- `src/styles/tokens/tailwind.generated.js` — Tailwind theme 조각
- `src/styles/tokens/tokens.generated.ts` — 런타임 메타데이터

**Figma 가 원본이 아니라 CSV 가 원본입니다.** Figma 는 대조 대상이고, CSV 단계의 git diff 가 사람이 검토하는 지점으로 의도적으로 남아 있습니다. 과거에 명도 방향이 뒤집힌 값이 이 단계에서 걸린 적이 있습니다. `prebuild`/`npm run tokens` 에 네트워크 호출을 넣지 마세요 — 빌드는 오프라인·결정론적으로 유지합니다.

### 소비자 잠금 모델

이 라이브러리는 소비자가 색을 지정할 통로를 **의도적으로 없앴습니다.** 설계를 되돌리는 방향(임의 색 prop, `customStyle`, shadcn 식 소스 복사 배포)은 목표와 정면 충돌합니다.

- 컴포넌트는 시맨틱 토큰 클래스만 씁니다. `color` prop 은 정해진 intent 만 받습니다.
- Tailwind theme 에서 역할별 스케일이 분리돼 있어(`textColor` / `backgroundColor` / `borderColor`) 배경 토큰을 텍스트 색으로 쓰는 오용이 타입/클래스 수준에서 막힙니다.
- 소비자에게 열린 유일한 통로는 **brand 램프 주입**입니다: `src/theme/createBrandTheme.ts` 의 `createBrandThemeCss()` / `createBrandThemeStyle()`. 시맨틱 토큰은 리터럴 고정, brand 램프만 CSS 변수입니다.
- spacing/radius/typography 는 CSS 변수로 내보내지 말고 Tailwind theme 에 리터럴로만 등록합니다.

### 스타일 격리

- Tailwind prefix 는 `koast-` 입니다. 모든 유틸리티에 붙습니다.
- **preflight 는 꺼져 있습니다.** 소비자 앱 전역을 건드리지 않기 위해서입니다. `src/styles/base.css` 가 최소 리셋을 대신하며, 규칙 전부가 `:where()` 로 감싸여 명시도 0 입니다.
- twMerge 는 반드시 `src/utils/twMerge.ts` 의 것을 쓰세요. 기본 `tailwind-merge` 는 `koast-` 접두사를 유틸리티로 인식하지 못해 충돌을 못 풉니다.

### 빌드

`vite.config.ts` 라이브러리 모드. `es` + `umd`, react 계열은 external, `cssCodeSplit: false`.

커스텀 플러그인 `injectCssImport()` 가 ES 엔트리에 `import './style.css'` 를 다시 심습니다 — vite 가 CSS 추출 후 지워버리기 때문입니다. 덕분에 소비자가 스타일을 수동 import 하지 않아도 됩니다. UMD 는 `import` 구문을 못 써서 제외되며, UMD 사용자만 `@koast/ui/styles.css` 를 직접 넣습니다.

### Storybook

`.storybook/preview.ts` 가 `data-koast-theme` 를 `<html>` 에 명시적으로 겁니다. 기본값 `light`, 툴바에서 Light/Dark 전환. 속성을 안 걸면 OS 의 `prefers-color-scheme` 를 따라가 버리고, **다크 테마는 Figma 에 존재하지 않아 디자인 대조가 불가능해집니다.**

Docs 크롬은 CSS 변수가 아니라 theming 객체로 칠해져서 globals 토글에 반응시킬 수 없습니다. `parameters.docs.theme` 을 manager 와 같은 다크로 고정하고, 컴포넌트가 실제로 올라가는 `.docs-story` 면만 `story-utils.css` 가 토큰 테마를 따라가게 했습니다.

## 함정

**테두리 두께만으로는 선이 안 그려집니다.** preflight 가 꺼져 있어 Tailwind 의 전역 `border-style: solid` 리셋이 없고, `base.css` 는 `:where(button, …) { border: 0 }` 으로 오히려 style 을 `none` 으로 만듭니다. `koast-border-2` 같은 클래스는 **반드시 `koast-border-solid` 와 함께** 써야 합니다. (`TimeSlider`, `Button` 은 대응돼 있고 `Select` / `ButtonGroup` / `FolderTree` 는 아직입니다.)

**`[&_svg]:koast-size-*` 를 덮으려면 명시도를 올려야 합니다.** 컴포넌트가 size 별 아이콘 크기를 이 후손 선택자(명시도 0,1,1)로 지정하므로, 안쪽 특정 svg 만 다른 크기로 만들려면 `[&_[data-…]]:koast-size-4` 처럼 속성 선택자로 이겨야 합니다. 평범한 `koast-size-4`(0,1,0)는 집니다.

**README 의 color intent 표는 낡았습니다.** `neutral` / `info` / `warning` / `success` 를 지원 intent 처럼 적어놨지만, 실제로는 `src/components/Button/Button.types.ts` 가 authoritative 하며 이들은 deprecated 입니다(`neutral`→`secondary`, 나머지→`primary` 로 떨어짐). 실제 intent 는 `primary` / `secondary` / `danger` 셋뿐입니다.

## 코드 스타일

포맷은 Prettier 가 아니라 **ESLint(@stylistic)** 가 담당합니다(`.prettierignore` 참고). `stylistic.configs.customize` 프리셋에 세 가지를 덮어씁니다:

- `jsx-curly-brace-presence: always` — JSX 의 props/children 문자열은 반드시 중괄호로 감쌉니다: `className={'koast-flex'}`, `{'버튼'}`
- `template-curly-spacing: always` — `` `${ value }` ``
- `jsx-curly-spacing: { when: 'never', children: true }`

주석과 문서는 한국어로 작성합니다.

## 배포

`main` 에 push 되면 CI(`.github/workflows/main.yml`)가 자동으로 움직입니다. Storybook 은 GitHub Pages 로, 커밋 메시지에 `Merge pull request` 가 포함되면 patch 버전 bump + 태그 + GitHub Release + `npm publish` 까지 진행됩니다. **main 에 직접 push 하면 배포가 일어납니다.**

## 참고 문서

- `docs/2026-09-04-color-token-setup.md` — 색상 토큰 도입 배경
- `docs/2026-09-07-figma-rest-token-pipeline.md` — Figma REST 파이프라인 설계, MCP 를 안 쓴 이유

## 주의할 점

- 모든 파일 내에 주석은 최대한 달지 않는다.
- 그럼에도 정말 꼭 필요한 내용이 있다면 1~2줄 내로 적는다.
- 다만 메인 컴포넌트에 주석은 반드시 달아야 하며, 이는 사용자가 해당 컴포넌트에 마우스오버했을 때 IDE에서 설명이 나오는 것을 참조할 수 있도록 하기 위함이다. 이 때 아래와 같은 형식으로 작성한다. (예시는 `Select.tsx`의 주석)
```Select.tsx
/**
* @koast/ui Select(Dropdown) 컴포넌트입니다.
* Select 컴포넌트의 옵션으로 사용됩니다.
*
* @param {string | number} props.value - 항목의 값입니다.
* @param {React.ReactNode} props.children - 항목에 표시될 내용 : React.ReactNode
* @param {boolean} [props.disabled=false] - 비활성화 상태 : boolean
* @param {string} [props.className] - 추가 CSS 클래스 : string
*
* @example
* ```tsx
* // 문자열 값 사용
* <SelectItem value="option1">옵션 1</SelectItem>
*
* // 숫자 값 사용
* <SelectItem value={10}>10</SelectItem>
* ```
*/
```
- git 명령어는 사용하지 않으며, 사용자 요청시에만 사용한다. 특히 `git push` 는 절대 사용하지 않는다.