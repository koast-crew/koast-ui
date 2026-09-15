---
name: koast-ui
description: "@koast/ui React 컴포넌트 라이브러리로 UI 를 만든다. 컴포넌트 28종의 props·예제와 색 토큰 규칙을 제공한다. 트리거: @koast/ui, koast-ui, koast 컴포넌트, koast 버튼/셀렉트/모달, 디자인 시스템 컴포넌트로 화면 만들기, koast 브랜드 색 주입, koast 다크 모드. 사용 금지: @koast/ui 를 쓰지 않는 프로젝트, 라이브러리 자체를 수정하는 작업."
---

# @koast/ui

한국해양기상기술(KOAST)용 React 컴포넌트 라이브러리입니다. **설정 없이 import 만 하면 됩니다.**

```bash
npm install @koast/ui
```

```tsx
import { Button, TextField } from '@koast/ui';
```

스타일은 패키지가 알아서 주입합니다. Tailwind 설정도, CSS import 도 필요 없습니다.
UMD 빌드를 쓸 때만 `import '@koast/ui/styles.css'` 를 직접 넣습니다.

**테스트 코드를 쓸 때는 한 줄이 더 필요합니다.** ESM 진입점이 `.css` 를 import 하는데 Node 는 이를 모릅니다.

```ts
// vitest.config.ts
test: { server: { deps: { inline: ['@koast/ui'] } } }
```

## 작업 순서

1. 필요한 컴포넌트를 `references/index.md` 에서 찾습니다.
2. 해당 `references/<이름>.md` 를 읽어 props 와 예제를 확인합니다. **추측해서 prop 을 만들지 마세요.**
3. 아래 「색을 다루는 법」을 지켜 작성합니다.

## 색을 다루는 법 — 가장 중요합니다

이 라이브러리는 **소비자가 색을 지정할 통로를 의도적으로 없앴습니다.** 아래 셋이 전부입니다.

**1. intent prop** — 컴포넌트마다 정해진 값만 받습니다.

```tsx
<Button color="danger">삭제</Button>
<Alert status="warning" title="확인이 필요합니다" />
<StatusChip status="success">완료</StatusChip>
```

`Button` 의 intent 는 `primary` · `secondary` · `danger` 셋뿐입니다.
`error` · `gray` · `neutral` · `info` · `warning` · `success` 는 deprecated 이며 가장 가까운 값으로 떨어집니다.
`danger` 는 `variant` 와 무관하게 항상 filled 로 그려집니다 — 디자인 시스템에 다른 면이 없습니다.

**2. brand 램프 주입** — 프로젝트 고유색이 필요할 때 쓰는 유일한 통로입니다.

```tsx
import { createBrandThemeStyle } from '@koast/ui';

const style = createBrandThemeStyle({
  light: { primary: { 50: '#eff6ff', /* … 900 까지 전부 */ } },
  dark: { primary: { /* 생략하면 light 값을 씁니다 */ } },
});

<div style={style}>{/* 이 하위 트리에 적용됩니다 */}</div>
```

문자열 CSS 가 필요하면 `createBrandThemeCss()` 를 씁니다. 50~900 단계를 **전부** hex 로 채워야 하고, 형식이 틀리면 예외를 던집니다.
주입한 램프는 `Alert` · `Toast` 의 `status="brand"` 와 `Button` 의 `color="primary"`, 포커스 링까지 함께 따라갑니다.

**3. 다크 모드** — 조상 엘리먼트에 `data-koast-theme` 를 겁니다.

```tsx
<html data-koast-theme="dark">
```

속성이 없으면 OS 의 `prefers-color-scheme` 를 따라갑니다.

### 하지 말아야 할 것

```tsx
// ✗ className 으로 색 넣기 — 토큰 체계를 우회합니다
<Button className="bg-red-500 text-white">삭제</Button>

// ✗ 인라인 스타일로 색 넣기 — style 의 색 속성은 막혀 있습니다
<Button style={{ backgroundColor: 'red' }}>삭제</Button>

// ✓ intent 를 씁니다
<Button color="danger">삭제</Button>
```

`className` 은 **너비·여백·정렬 같은 레이아웃 조정에만** 씁니다.

```tsx
<Button className="w-full mt-4">저장</Button>
```

## 알아둘 것

- **Tailwind 는 필요 없습니다.** 라이브러리 내부 유틸리티에는 전부 `koast-` 접두사가 붙어 있어 앱의 Tailwind 와 충돌하지 않습니다. 소비자가 `koast-` 클래스를 직접 쓸 일은 없습니다.
- **전역 리셋이 없습니다.** Tailwind preflight 를 껐고, 포함된 최소 리셋은 전부 `:where()` 로 감싸 명시도가 0 이라 앱 스타일이 항상 우선합니다.
- **기준 폰트는 Pretendard 입니다.** `font-family` 를 강제하지는 않지만, 아이콘+라벨의 세로 정렬이 폰트 메트릭에 좌우됩니다. 고를 수 있다면 Pretendard 를 쓰세요.
- **아이콘은 `lucide-react` v1** 을 씁니다. 내부 아이콘은 패키지에 번들돼 있어 추가 설치가 필요 없지만, `startIcon` · `icon` 에 아이콘을 **직접 넘기려면 소비자 쪽에 `npm install lucide-react` 가 필요합니다**(optional peerDependency). 같은 세트를 쓰면 굵기·크기가 맞습니다.
- **포커스 링은 `outline`** 으로 그려집니다. 소비자가 `outline` 을 덮어쓰면 포커스 표시가 사라집니다.
- **`ref` 를 받습니다.** `TextField` · `TextArea` 는 내부 입력 요소로, `Select` 는 트리거 `<button>` 으로 전달됩니다. 검증 실패 시 `focus()`, `Modal` 의 `initialFocusRef`, react-hook-form 의 `register()` 에 그대로 씁니다. `Button` · `IconButton` · `Link` 도 같습니다.
- **`onChange` 는 `(value, event)` 입니다.** 네이티브 시그니처가 아니라 값이 먼저 옵니다. react-hook-form 과 쓸 때는 `onChange={(_, e) => field.onChange(e)}` 로 감쌉니다.
- **치수는 `html { font-size: 16px }` 기준**입니다. 문서에 적힌 px 값은 모두 `rem` 이라 앱의 루트 글자 크기를 따라 스케일됩니다. 루트가 14px 인 앱에서는 `Button` md 가 42px 입니다.

## 컴포넌트 목록

`references/index.md` 에 28종 전체가 있습니다. 자주 쓰는 것:

| 용도 | 컴포넌트 |
| :-- | :-- |
| 입력 | `TextField` · `TextArea` · `Select` · `Checkbox` · `Radio` · `Switch` · `Slider` · `ControlGroup` · `Label` |
| 액션 | `Button` · `IconButton` |
| 피드백 | `Alert` · `Toast` · `Modal` · `Tooltip` · `Progressbar` · `Spinner` · `Skeleton` |
| 표시 | `Badge` · `StatusChip` · `Accordion` |
| 이동 | `Tabs` · `Breadcrumbs` · `Pagination` · `Link` · `FolderTree` |
| 도메인 | `TimeLine` · `MapLegend` |

## 참조 파일

- `references/index.md` — 컴포넌트 전체 목록
- `references/<이름>.md` — props 표 · 타입 · 사용 예 (소스에서 자동 생성)
