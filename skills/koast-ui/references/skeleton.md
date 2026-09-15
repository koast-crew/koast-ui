# Skeleton

Skeleton 컴포넌트입니다. 콘텐츠가 도착하기 전에 자리와 뼈대를 먼저 보여 주어 레이아웃이 튀는 것을 막습니다. 순수 장식이므로 항상 `aria-hidden` 입니다. 스크린 리더에게 로딩을 알리려면 스켈레톤을 감싼 영역에 `aria-busy="true"` 를 두거나 Spinner 를 함께 두세요. `prefers-reduced-motion` 에서는 펄스가 멈춥니다.

```tsx
import { Skeleton } from '@koast/ui';
```

## 사용 예

```tsx
// 아바타 + 두 줄 텍스트
<div className="flex gap-2" aria-busy="true">
  <Skeleton variant="circle" />
  <Skeleton variant="text" lines={2} height={16} />
</div>

// 썸네일 자리
<Skeleton variant="rect" height={180} />

// 애니메이션 없이
<Skeleton variant="rect" animated={false} />
```

## Props

### `SkeletonProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `variant` | `SkeletonVariant` | `'rect'` | Figma 의 Type 축입니다. |
| `width` | `number \| string` | — | 가로 크기입니다. 숫자는 px 로 해석됩니다. 미입력 시 rect·text 는 부모 폭, circle 은 37px 입니다. |
| `height` | `number \| string` | — | 세로 크기입니다. 숫자는 px 로 해석됩니다. 미입력 시 Figma 실측값(rect 145 / text 37 / circle 37)입니다. |
| `lines` | `number` | `1` | `variant='text'` 일 때 쌓을 줄 수입니다. 2줄 이상이면 마지막 줄이 60% 폭으로 짧아집니다. Figma 에는 없는 축이며 기본값 1 이 Figma 와 같습니다. |
| `animated` | `boolean` | `true` | 펄스 애니메이션을 끕니다. |
| `className` | `string` | — | 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. |

## 타입

| 이름 | 값 | 설명 |
| :-- | :-- | :-- |
| `SkeletonVariant` | `'rect' \| 'circle' \| 'text'` | Figma `Part/Skeleton Segments` 의 Type 축입니다. |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

