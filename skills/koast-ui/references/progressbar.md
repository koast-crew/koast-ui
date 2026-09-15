# Progressbar

Progressbar 컴포넌트입니다. 파일 업로드·설치처럼 끝이 있는 작업의 진행 상태를 가로 막대로 보여 줍니다. 진행률을 알 수 없는 구간에서는 `indeterminate` 로 두면 `aria-valuenow` 없이 대기 상태만 알립니다.

```tsx
import { Progressbar } from '@koast/ui';
```

## 사용 예

```tsx
// 기본 사용
<Progressbar label="업로드" value={60} helperText="파일을 올리는 중입니다" />

// 완료 — 보조 문구에 체크 아이콘이 붙습니다
<Progressbar label="업로드" value={100} helperText="업로드를 마쳤습니다" />

// 오류
<Progressbar label="업로드" value={40} error helperText="업로드에 실패했습니다" />

// 진행률을 알 수 없을 때
<Progressbar indeterminate ariaLabel="데이터를 불러오는 중" />
```

## Props

### `ProgressbarProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `value` | `number` | `0` | 현재 진행 값입니다. `indeterminate` 면 무시됩니다. |
| `min` | `number` | `0` | 최솟값입니다. |
| `max` | `number` | `100` | 최댓값입니다. |
| `indeterminate` | `boolean` | `false` | 진행률을 알 수 없는 상태입니다. 지시자가 트랙 전체를 덮고 `aria-valuenow` 가 빠집니다. |
| `error` | `boolean` | `false` | Figma 의 `Errpr`(오타) 축입니다. 지시자와 보조 문구가 danger 색으로 바뀝니다. |
| `label` | `ReactNode` | — | 헤더 왼쪽 라벨입니다. |
| `valueText` | `ReactNode` | — | 헤더 오른쪽 값 텍스트입니다. 미입력 시 `formatValue` 결과가 들어갑니다. |
| `showValue` | `boolean` | `true` | 헤더 값 텍스트 표시 여부입니다. |
| `helperText` | `ReactNode` | — | 트랙 아래 보조 문구입니다. Figma 의 `Part/Help message` 입니다. |
| `formatValue` | `(percent: number) => string` | `(percent) => `${ Math.round(percent) }%`` | 백분율을 문자열로 바꿉니다. 헤더 값 텍스트와 `aria-valuetext` 에 함께 쓰입니다. |
| `ariaLabel` | `string` | — | 접근성 이름입니다. `label` 이 없을 때 사용하세요. |
| `className` | `string` | — | 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. |

## 타입

| 이름 | 값 | 설명 |
| :-- | :-- | :-- |
| `ProgressbarTone` | `'neutral' \| 'success' \| 'error'` | 보조 문구의 의미 색상입니다. 값이 모두 찼으면 success, `error` 면 danger 입니다. |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

