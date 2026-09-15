# @koast/ui

한국해양기상기술(KOAST)을 위한 **React 컴포넌트 라이브러리**입니다.
Figma 디자인 시스템을 그대로 옮긴 29종의 컴포넌트를 **설정 없이** 쓸 수 있습니다.

[![npm](https://img.shields.io/npm/v/@koast/ui.svg)](https://www.npmjs.com/package/@koast/ui)

- **문서** — [Storybook](https://koast-crew.github.io/koast-ui/)
- **패키지** — [npmjs.com/package/@koast/ui](https://www.npmjs.com/package/@koast/ui)

<br>

## 설치

```bash
npm install @koast/ui
```

```tsx
import { Button, TextField } from '@koast/ui';

export default function App() {
  return (
    <form>
      <TextField label="관측소" placeholder="이름을 입력하세요" />
      <Button color="primary">저장</Button>
    </form>
  );
}
```

**이게 전부입니다.** Tailwind 설정도, CSS import 도 필요 없습니다.

<br>

## 설계 원칙

### 설정이 필요 없습니다

스타일이 패키지 안에 완결돼 있습니다. ESM 진입점이 CSS 를 side-effect 로 import 하므로
Vite · webpack · Parcel · Next.js(App Router 포함) 어디서든 번들러가 알아서 주입합니다.

UMD 빌드를 쓸 때만 CSS 를 직접 넣습니다.

```tsx
import '@koast/ui/styles.css';
```

### 앱을 침범하지 않습니다

- Tailwind preflight 를 껐습니다. `body` 여백이나 폰트 같은 앱 전역 스타일을 건드리지 않습니다.
- 포함된 최소 리셋은 전부 `:where()` 로 감싸 **명시도가 0** 입니다. 앱 스타일이 항상 이깁니다.
- 모든 유틸리티에 `koast-` 접두사가 붙어 앱의 Tailwind 와 클래스가 충돌하지 않습니다.

### 색은 소비자가 정하지 않습니다

디자인 시스템의 일관성을 코드 수준에서 강제합니다. 자세한 내용은 [색상 시스템](#색상-시스템)을 보세요.

```tsx
<Button color="danger">삭제</Button>              // ✅ 정해진 intent
<Button color="#ff0000">삭제</Button>             // ❌ 타입 에러
<Button className="bg-red-500">삭제</Button>      // ❌ 토큰 체계 우회
```

<br>

## 컴포넌트

| 분류 | 컴포넌트 |
| :-- | :-- |
| **입력** | `TextField` · `TextArea` · `Select` · `Checkbox` · `Radio` · `Switch` · `Slider` · `ControlGroup` · `Label` |
| **액션** | `Button` · `IconButton` |
| **피드백** | `Alert` · `Toast` · `Modal` · `Tooltip` · `Progressbar` · `Spinner` · `Skeleton` |
| **표시** | `Badge` · `StatusChip` · `Accordion` |
| **내비게이션** | `Tabs` · `Breadcrumbs` · `Pagination` · `Link` · `FolderTree` |
| **도메인** | `TimeLine` · `MapLegend` |

각 컴포넌트의 props 와 예제는 [Storybook](https://koast-crew.github.io/koast-ui/) 에 있습니다.

<br>

## 색상 시스템

색상은 **디자인 시스템의 시맨틱 토큰으로만** 결정됩니다.
컴포넌트에 임의의 색상 문자열이나 인라인 스타일을 넘길 수 없습니다.

`Button` 의 `color` 가 받는 intent 는 셋뿐입니다.

| intent | 용도 | 비고 |
| :-- | :-- | :-- |
| `primary` | brand 주요 액션 | |
| `secondary` | brand 보조 액션 | |
| `danger` | 삭제 등 되돌리기 어려운 액션 | `variant` 와 무관하게 항상 filled 로 그려집니다 |

> `error` / `gray` / `neutral` / `info` / `warning` / `success` 는 deprecated 이며
> `neutral`·`gray` → `secondary`, `error` → `danger`, 나머지는 `primary` 로 떨어집니다.
> authoritative 한 목록은 `src/components/Button/Button.types.ts` 입니다.

`className` 은 **너비·여백·정렬 같은 레이아웃 조정에만** 씁니다.

```tsx
<Button className="w-full mt-4">저장</Button>
```

### 다크 모드

기본은 OS 설정(`prefers-color-scheme`)을 따릅니다. 강제하려면 조상 요소에 속성을 지정하세요.

```html
<html data-koast-theme="dark">  <!-- 또는 "light" -->
```

### brand 색상 주입

시맨틱 토큰은 라이브러리가 고정하지만, **brand 램프만은 프로젝트별로 주입**할 수 있습니다.
값을 주지 않으면 Tailwind blue 로 동작합니다.

```ts
import { createBrandThemeCss } from '@koast/ui';

const css = createBrandThemeCss({
  light: {
    primary: {
      50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa',
      500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a',
    },
    // secondary 는 생략 가능
  },
  // dark 를 생략하면 light 값을 그대로 씁니다.
  // 시맨틱 토큰이 모드별로 다른 단계를 참조하므로 램프가 같아도 결과 색은 달라집니다.
});
```

만들어진 CSS 를 전역 스타일에 넣거나 `<style>` 로 렌더링하면 됩니다.
특정 하위 트리에만 적용하려면 `createBrandThemeStyle()` 로 인라인 `style` 을 받으세요.

50~900 단계를 전부 hex 로 채워야 하고, 형식이 틀리면 예외를 던집니다.

<br>

## Claude Code 스킬

이 패키지에는 [Claude Code](https://claude.com/claude-code) 용 스킬이 들어 있습니다.
컴포넌트별 props · 예제와 색 토큰 규칙이 담겨 있어, 라이브러리를 잘 몰라도
Claude 가 알아서 맞는 prop 을 씁니다.

```bash
npx @koast/ui init-skills
```

`.claude/skills/koast-ui` 를 `node_modules/@koast/ui/skills/koast-ui` 로 심링크합니다.
`npm update @koast/ui` 하면 스킬 내용도 함께 갱신됩니다.

> Claude Code 는 `node_modules` 를 탐색하지 않아 `npm install` 만으로는 스킬이 잡히지 않습니다.
> 심링크를 만들 수 없는 환경에서는 자동으로 복사로 대체되며, 이때는 라이브러리를 올릴 때마다
> 명령을 다시 실행하면 됩니다. 팀 전체에 공유하려면 `.claude/skills/` 를 커밋하세요.

<br>

## 폰트

라이브러리는 `font-family` 를 지정하지 않고 앱의 폰트를 그대로 물려받습니다.
다만 **Pretendard 를 기준으로 설계했습니다.**

아이콘과 라벨을 나란히 놓을 때 글자의 세로 위치가 폰트의 ascent/descent 비대칭만큼 달라집니다.
14px 기준 실측값입니다.

| 폰트 | 아이콘 대비 글자 편차 |
| :-- | --: |
| Nanum Gothic | 0.0px |
| **Pretendard** | **0.5px** |
| system-ui (Segoe UI) | 0.5px |
| Noto Sans KR | 1.0px |
| IBM Plex Sans KR | 1.0px |

컴포넌트 내부에서 CSS `text-box: trim-both cap alphabetic` 으로 이 편차를 0.5px 이하로 눌러 두었지만,
이 속성은 Chrome 133+ / Edge 132+ / Safari 18.2+ / Firefox 154+ 에서만 동작합니다(글로벌 약 85%).
그 밖의 브라우저에서는 위 표의 값이 그대로 나오므로, **폰트를 고를 수 있다면 Pretendard 를 권장합니다.**

<br>

## 아이콘

컴포넌트 내부 아이콘은 [`lucide-react`](https://lucide.dev/) v1 을 씁니다.
`startIcon` · `icon` 같은 prop 에 아이콘을 넘길 때 같은 세트를 쓰면 굵기와 크기가 맞습니다.

```tsx
import { Trash2 } from 'lucide-react';

<Button color="danger" startIcon={<Trash2 />}>삭제</Button>
```

<br>

---

<br>

## 기여

### 환경

- node >= 20 · npm >= 9
- react >= 18 (권장 >= 19) · typescript >= 5
- tailwindcss >= 3 · vite >= 5 · eslint >= 9 (라이브러리 개발 시에만 필요)

### 실행

```bash
git clone https://github.com/koast-crew/koast-ui.git
cd koast-ui
npm install

npm run storybook   # 6006 — 컴포넌트 작업은 여기서
npm run dev         # vite dev 서버 (루트는 ./dev playground)
npm run build       # prebuild(tokens) → tsc → vite build
npm run lint        # eslint (포맷 검사 포함)
```

### 색상 토큰 수정

색상 토큰의 원본은 저장소 루트의 `semantic-color-tokens.csv` **하나**입니다.
Figma 는 대조 대상이고, CSV 단계의 git diff 가 사람이 검토하는 지점입니다.

1. Figma 에서 바뀐 값을 `semantic-color-tokens.csv` 에 반영합니다.
2. `npm run tokens` 를 실행합니다. (`npm run build` 시 자동 실행됩니다.)
3. 아래 파일이 다시 생성됩니다. **직접 수정하지 마세요.**
   - `src/styles/tokens.generated.css` — CSS 변수 (light/dark)
   - `src/styles/tokens/tailwind.generated.js` — Tailwind theme 조각
   - `src/styles/tokens/tokens.generated.ts` — 토큰 메타데이터

컴포넌트에서는 역할별 시맨틱 클래스만 씁니다.

```
koast-text-primary               content/primary
koast-text-interactive-primary   content/interactive/primary
koast-bg-danger-subtle           bg/danger-subtle
koast-border-focus-ring          border/focusRing
koast-shadow-cast                effect/shadow/cast
```

역할별로 스케일이 분리돼 있어 배경 토큰을 텍스트 색으로 쓰는 식의 오용이 타입·클래스 수준에서 막힙니다.

### Claude Code 스킬 갱신

컴포넌트의 props 나 JSDoc 을 고쳤다면 스킬 레퍼런스를 다시 생성하세요.

```bash
npm run skill-docs
```

`src/components/*/*.types.ts` 의 JSDoc 을 파싱해 `skills/koast-ui/references/` 를 만듭니다.
손으로 고치지 마세요.

### 배포

`main` 에 push 되면 CI(`.github/workflows/main.yml`)가 자동으로 움직입니다.

- Storybook 을 GitHub Pages 로 배포합니다.
- 커밋 메시지에 `Merge pull request` 가 포함되면 patch 버전 bump → 태그 → GitHub Release → `npm publish` 까지 진행됩니다.

> **`main` 에 직접 push 하면 배포가 일어납니다.** PR 을 거쳐 주세요.
> `publish` 권한이 필요하면 `judahwon` 에게 요청하세요.
