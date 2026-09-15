# Spinner

Spinner 컴포넌트입니다. 끝을 알 수 없는 대기(데이터 로딩, 응답 대기)를 회전하는 링으로 알립니다. 진행률을 아는 작업에는 Progressbar 를 쓰세요. 기본은 `role="status"` 와 이름을 가진 독립 요소입니다. 이미 "저장 중" 같은 문구가 있는 버튼 안에 넣을 때는 `decorative` 로 두어 중복 안내를 막습니다. `prefers-reduced-motion` 에서는 회전을 끄고 제자리 밝기 펄스로 바꿉니다.

```tsx
import { Spinner } from '@koast/ui';
```

## 사용 예

```tsx
// 기본 사용
<Spinner />

// 큰 스피너 + 직접 지정한 이름
<Spinner size="xl" label="지도를 불러오는 중" />

// 이미 문구가 있는 면 안에서 색을 물려받아 장식으로만 쓰기
<button>
  <Spinner size="sm" variant="inherit" decorative />
  {'저장 중'}
</button>
```

## Props

### `SpinnerProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `size` | `SpinnerSize` | `'md'` | Figma 의 Size 축입니다. 16 / 24 / 32 / 48px. |
| `variant` | `SpinnerVariant` | `'primary'` | Figma 의 Type 축입니다. |
| `label` | `string` | `'로딩 중'` | 스크린 리더가 읽을 이름입니다. |
| `decorative` | `boolean` | `false` | 장식으로만 쓸 때 켭니다. `role="status"` 와 이름이 빠지고 `aria-hidden` 이 붙습니다. 이미 "저장 중" 같은 문구를 가진 버튼 안에 넣을 때 씁니다. |
| `className` | `string` | — | 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. |

## 타입

| 이름 | 값 | 설명 |
| :-- | :-- | :-- |
| `SpinnerSize` | `'sm' \| 'md' \| 'lg' \| 'xl'` | Figma 의 Size 축입니다. 실측은 sm 16 · md 24 · xl 32 · lg 48 이지만 lg 와 xl 이 뒤집힌 실수로 보고 lg 32 · xl 48 로 바로잡았습니다. |
| `SpinnerVariant` | `'primary' \| 'secondary' \| 'inherit'` | Figma 의 Type 축입니다. `inherit` 은 Figma 에 없으며 버튼처럼 이미 색이 정해진 면 안에 넣을 때 쓰는 `currentColor` 모드입니다. |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

