# KOAST UI

한국해양기상기술을 위한 **React UI 라이브러리**입니다.

작은 단위의 ui부터 프로젝트에 꼭 필요한 Slider, Legend 등 제작할 예정입니다.

(기존에는 [Verdaccio](https://verdaccio.org/)를 구축하여 진행했습니다만, 그렇게 진행할 필요가 없어서 npmjs.org에 직접 배포하는 방식으로 변경하였습니다.)

- NPM 배포 : [@koast/ui](https://www.npmjs.com/package/@koast/ui)
- 문서 : [@koast/ui storybook](https://koast-crew.github.io/koast-ui/)
- `Publish` 권한이 필요한 경우, `judahwon`에게 요청해주시기 바랍니다.
- 추가적으로, main branch에 push될 때마다 자동으로 배포되도록 설정하였습니다. 또한, PR merge될 때마다 NPM 배포도 자동으로 진행됩니다.

<br>

## 환경

- node >= 20
- npm >= 9
- react >= 18 (권장 >= 19)
- typescript >= 5
- tailwindcss >= 3 (라이브러리 개발 시에만 필요, 사용하는 쪽은 불필요)
- eslint >= 9
- vite >= 5

<br>

## 프로젝트 실행 방법(PR을 위한)

### 1. project clone

- https

```bash
git clone https://github.com/koast-crew/@koast/ui.git
```

### 2. npm install

```bash
npm install
```

### 3. npm run build

```bash
npm run build
```

### 4. npm run dev

- 아직은 playground이 없고, dev폴더에서 테스트를 해볼 수 있습니다.

```bash
npm run dev
```

<br>

## 프로젝트에서 @koast/ui 사용 방법

### 1. 패키지 설치

```bash
npm install @koast/ui
```

### 2. 패키지 사용

**설정도, 스타일 import도 필요 없습니다.** 설치하고 바로 쓰면 됩니다.

```tsx
import { Button } from "@koast/ui";

const App = () => {
  return <Button variant="contained" color="primary">Click me</Button>;
};

export default App;
```

<br>

### 스타일은 어떻게 적용되나요

패키지의 ESM 진입점이 CSS를 side-effect로 import하므로, **번들러가 알아서 주입합니다.**
Vite / webpack / Parcel / Next.js(App Router 포함) 모두 동작합니다. Tailwind 설정도 필요 없습니다.

> 이 CSS에는 전역 리셋(Tailwind preflight)이 들어있지 않습니다.
> 앱의 `body` 여백이나 폰트를 건드리지 않으며, 포함된 최소 리셋은 모두
> `:where()`로 감싸 명시도가 0이므로 앱 스타일이 항상 우선합니다.

수동 통로도 그대로 열려 있습니다. **CSS 로딩 순서를 직접 잡아야 하거나, UMD 빌드를 쓰는 경우**에 사용하세요.
(UMD는 `import` 구문을 쓸 수 없어 자동 주입이 되지 않습니다.)

```tsx
import "@koast/ui/styles.css";
```

중복 import는 무해합니다. 번들러가 같은 파일을 한 번만 포함합니다.

<br>

## 색상 시스템

색상은 **디자인 시스템의 시맨틱 토큰으로만** 결정됩니다.
컴포넌트에 임의의 색상 문자열이나 인라인 스타일을 넘길 수 없습니다.

```tsx
<Button color="primary" />   // ✅ 정해진 intent
<Button color="danger" />    // ✅
<Button color="#ff0000" />   // ❌ 타입 에러
<Button customStyle={{...}} />  // ❌ 제거된 prop
```

`color`가 받는 intent는 다음과 같습니다.

| intent | 용도 | hover/pressed |
| :-- | :-- | :-- |
| `primary` | brand 주요 액션 | 시스템 토큰 |
| `secondary` | brand 보조 액션 | 시스템 토큰 |
| `neutral` | 중립 액션 | 시스템 토큰 |
| `danger` | 삭제 등 되돌리기 어려운 액션 | 시스템 토큰 |
| `info` / `warning` / `success` | 상태 표현 | 불투명도 |

> `error`, `gray`는 각각 `danger`, `neutral`의 별칭으로 계속 동작하지만 deprecated입니다.

### 다크 모드

기본은 OS 설정을 따릅니다. 강제하려면 루트 요소에 속성을 지정하세요.

```html
<html data-koast-theme="dark">  <!-- 또는 "light" -->
```

### brand 색상 주입 (프로젝트별)

시맨틱 토큰은 라이브러리가 고정하지만, **brand 램프만은 프로젝트별로 주입**할 수 있습니다.
값을 주지 않으면 Tailwind blue로 동작합니다.

```ts
import { createBrandThemeCss } from "@koast/ui";

const css = createBrandThemeCss({
  light: {
    primary: {
      50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa",
      500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a",
    },
    // secondary 는 생략 가능
  },
  dark: {
    // 생략하면 light 값을 그대로 사용합니다.
    // 시맨틱 토큰이 모드별로 다른 단계를 참조하므로 램프가 같아도 결과 색은 달라집니다.
  },
});
```

만들어진 CSS를 전역 스타일에 넣거나 `<style>`로 렌더링하면 됩니다.
특정 하위 트리에만 적용하려면 `createBrandThemeStyle()`을 써서 인라인 `style`로 넘기세요.

<br>

## 토큰 수정 워크플로우

색상 토큰의 원본은 저장소 루트의 `semantic-color-tokens.csv` 하나입니다.

1. 피그마에서 바뀐 값을 `semantic-color-tokens.csv`에 반영합니다.
2. `npm run tokens` 를 실행합니다. (`npm run build` 시에도 자동 실행됩니다.)
3. 아래 파일들이 다시 생성됩니다. **직접 수정하지 마세요.**
   - `src/styles/tokens.generated.css` — CSS 변수 (light/dark)
   - `src/styles/tokens/tailwind.generated.js` — Tailwind theme 조각
   - `src/styles/tokens/tokens.generated.ts` — 토큰 메타데이터

컴포넌트에서는 역할별 시맨틱 클래스만 사용합니다.

```
koast-text-primary               content/primary
koast-text-interactive-primary   content/interactive/primary
koast-bg-danger-subtle           bg/danger-subtle
koast-border-focus-ring          border/focusRing
koast-shadow-cast                effect/shadow/cast
```

역할별로 스케일이 분리되어 있어 배경 토큰을 텍스트 색으로 쓰는 식의 오용이 불가능합니다.

<br>

## 제작할 컴포넌트 목록

### 베타 기능 (4월 완료)

| 제작여부 |  컴포넌트   |      설명       |
| :------: | :---------: | :-------------: |
|    ✅    |   Button    |      버튼       |
|    ✅    |   Select    | 셀렉트 드롭다운 |
|    ✅      |  TimeLine   |     타임라인    |
|    ✅      |  MapLegend  |    지도 범례    |

### 베타 기능 이후 제작 예정

| 제작여부 | 컴포넌트 |           설명            |
| :------: | :------: | :-----------------------: |
|          |  CheckBox   |    체크박스     |
|          | RadioGroup  |   라디오 그룹   |
|          |   Slider    |    슬라이더     |
|          |   Switch    |     스위치      |
|          |  TextField  |   텍스트 필드   |
|          |    Table    |     테이블      |
|          |  Progress   |  프로그레스 바  |
|          |  Accordion  |    아코디언     |
|          | Pagination  |  페이지네이션   |
|          | Skeleton | 스켈레톤 - 로딩 상태 표시 |
|          | Tooltip  |           툴팁            |
|          |  Alert   |           알림            |
