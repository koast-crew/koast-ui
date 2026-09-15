# Badge

Badge 컴포넌트입니다. 숫자나 상태를 강조하는 작은 알림 레이블로, 알림 수나 처리 상태를 시각적으로 표시할 때 씁니다. Figma 의 세 컴포넌트 셋(`Badge/Dot` · `Badge/Number` · `Badge/Text`)을 `type` 하나로 묶었습니다.

```tsx
import { Badge } from '@koast/ui';
```

## 사용 예

```tsx
// 텍스트 뱃지
<Badge status="success">완료</Badge>

// 숫자 뱃지 — 1000 은 +999 로 표시됩니다
<Badge type="number" status="error" count={1000} />

// 점 뱃지 — variant 는 무시됩니다
<Badge type="dot" status="warning" aria-label="확인하지 않은 알림" />

// 연한 면 + 1px 테두리
<Badge variant="secondary" status="information">진행 중</Badge>
```

## Props

### `BadgeProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `type` | `BadgeType` | `'text'` | 뱃지의 형태입니다. `dot` 은 내용 없이 4px 점만 그립니다. |
| `variant` | `BadgeVariant` | `'primary'` | 면 채움 방식입니다. `dot` 은 항상 primary 색을 씁니다. |
| `status` | `BadgeStatus` | `'neutral'` | 의미 색상입니다. |
| `count` | `number` | — | `type='number'` 일 때 표시할 수입니다. `max` 를 넘으면 `+{max}` 로 잘립니다. |
| `max` | `number` | `999` | `count` 의 상한입니다. |
| `children` | `React.ReactNode` | — | `type='text'` 일 때 표시할 라벨입니다. `count` 가 없으면 `number` 에서도 쓰입니다. |
| `className` | `string` | — | 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. 스크린 리더용 설명은 `aria-label` 로 넘깁니다. `dot` 은 이 값이 없으면 보조 기술에서 숨겨집니다. |

## 타입

| 이름 | 값 | 설명 |
| :-- | :-- | :-- |
| `BadgeType` | `'dot' \| 'number' \| 'text'` | Figma 의 컴포넌트 셋 구분(`Badge/Dot` · `Badge/Number` · `Badge/Text`)입니다. |
| `BadgeVariant` | `'primary' \| 'secondary'` | Figma 의 Type 축입니다. primary=채운 면, secondary=연한 면 + 1px 테두리입니다. |
| `BadgeStatus` | `'neutral' \| 'information' \| 'success' \| 'warning' \| 'error'` | Figma 의 Status 축입니다. |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

