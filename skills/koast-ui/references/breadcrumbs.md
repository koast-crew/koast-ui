# Breadcrumbs

탐색 경로(Breadcrumbs) 컴포넌트입니다. 계층 구조에서 사용자의 현재 위치를 보여주고 상위 경로로 바로 이동하게 합니다. `<nav>` + `<ol>` 구조로 렌더링되며 마지막 항목이 현재 위치로 간주되어 `aria-current="page"` 가 붙고 링크가 아닌 텍스트가 됩니다. 구분자는 보조 기술에서 숨겨집니다.

```tsx
import { Breadcrumbs } from '@koast/ui';
```

## 사용 예

```tsx
<Breadcrumbs
  items={[
    { label: '홈', href: '/' },
    { label: '카테고리', href: '/category' },
    { label: '제품', href: '/category/product' },
    { label: '상세 페이지' },
  ]}
/>

// 라우터 연동
<Breadcrumbs
  items={[
    { label: '홈', href: '/', onClick: (e) => { e.preventDefault(); navigate('/'); } },
    { label: '관측소' },
  ]}
/>
```

## Props

### `BreadcrumbsProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `items` *(필수)* | `BreadcrumbItem[]` | — | 최상위부터 현재 위치까지 순서대로 나열한 항목 배열입니다. 마지막 항목이 현재 위치입니다. |
| `separator` | `React.ReactNode` | `<ChevronRight />` | 항목 사이의 구분자입니다. 보조 기술에는 노출되지 않습니다. |
| `className` | `string` | — | 여백·정렬 같은 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

