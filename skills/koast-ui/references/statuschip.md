# StatusChip

StatusChip(상태칩) 컴포넌트입니다. 항목의 상태나 진행 상황을 나타내는 작은 레이블이며, 클릭할 수 없는 표시 전용 요소입니다.

```tsx
import { StatusChip } from '@koast/ui';
```

## 사용 예

```tsx
<StatusChip status="success">완료됨</StatusChip>

<StatusChip status="warning" variant="outlined" shape="square" size="sm">
  대기 중
</StatusChip>

<StatusChip status="info" icon={false}>진행 중</StatusChip>
```

## Props

### `StatusChipProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `status` | `StatusChipStatus` | `'neutral'` | 상태 색을 정합니다. |
| `variant` | `StatusChipVariant` | `'filled'` | 면 처리 방식입니다. |
| `shape` | `StatusChipShape` | `'round'` | 모서리 모양입니다. |
| `size` | `StatusChipSize` | `'md'` | 칩 크기입니다. |
| `icon` | `React.ReactNode \| false` | — | 라벨 앞 아이콘입니다. 지정하지 않으면 status 별 기본 아이콘이 붙고(neutral 은 기본 아이콘 없음), `false` 를 주면 아이콘 없이 라벨만 표시합니다. |
| `children` *(필수)* | `React.ReactNode` | — | 칩에 표시될 라벨입니다. |
| `className` | `string` | — | 너비·여백 같은 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. |

## 타입

| 이름 | 값 | 설명 |
| :-- | :-- | :-- |
| `StatusChipVariant` | `'filled' \| 'outlined' \| 'transparent'` | Figma 의 **Style** 축입니다. filled 는 진한 면, outlined 는 옅은 면 + 1px 테두리, transparent 는 테두리 없는 옅은 면입니다. |
| `StatusChipStatus` | `'neutral' \| 'info' \| 'error' \| 'success' \| 'warning'` | Figma 의 **Status** 축입니다. Figma 표기 `Netural` / `Information` 은 각각 neutral / info 로 정리했습니다. |
| `StatusChipShape` | `'round' \| 'square'` | Figma 의 **Type** 축입니다. round 는 pill, square 는 4px 라운드입니다. |
| `StatusChipSize` | `'sm' \| 'md'` | Figma 의 컴포넌트 셋 구분입니다. md=32px, sm=28px 최소 높이에 대응합니다. |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

