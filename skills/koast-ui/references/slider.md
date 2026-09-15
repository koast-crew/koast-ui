# Slider

Slider 컴포넌트입니다. 정해진 범위 안에서 값을 드래그·키보드로 고르는 입력 컨트롤입니다. `value` / `defaultValue` 에 배열을 넘기면 썸이 두 개인 범위 슬라이더로 동작합니다.

```tsx
import { Slider } from '@koast/ui';
```

## 사용 예

```tsx
// 단일 값
<Slider label="Opacity" defaultValue={75} unit="%" showTicks step={10} />

// 범위
<Slider
  label="Wind Speed"
  min={0}
  max={60}
  defaultValue={[5, 25]}
  unit=" kts"
  onChange={(value) => setRange(value as [number, number])}
/>
```

## Props

### `SliderProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `className` | `string` | — | 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. |
| `min` | `number` | `0` | 최솟값입니다. |
| `max` | `number` | `100` | 최댓값입니다. |
| `step` | `number` | `1` | 값의 증분입니다. 눈금(`showTicks`)도 이 값을 기준으로 그려집니다. |
| `value` | `SliderValue` | — | 제어 값입니다. 배열을 넘기면 범위 슬라이더로 동작합니다. |
| `defaultValue` | `SliderValue` | `min` | 비제어 초기값입니다. 배열을 넘기면 범위 슬라이더로 동작합니다. |
| `size` | `SliderSize` | `'md'` | Figma 의 Size 축입니다. |
| `variant` | `SliderVariant` | `'plain'` | Figma Slider 셋의 Style 축입니다. |
| `disabled` | `boolean` | `false` | Figma State=Disabled 입니다. |
| `error` | `boolean` | `false` | Figma State=Error 입니다. |
| `label` | `ReactNode` | — | 헤더 왼쪽 라벨입니다. |
| `valueText` | `ReactNode` | — | 헤더 오른쪽 값 텍스트입니다. 미입력 시 `formatValue` 로 만든 값이 들어갑니다. |
| `showValue` | `boolean` | `true` | 헤더 값 텍스트 표시 여부입니다. |
| `showRangeLabels` | `boolean` | `true` | 트랙 아래 Min / Mid / Max 라벨 표시 여부입니다. |
| `showMidLabel` | `boolean` | `true` | Figma 의 Mid Value 축입니다. 가운데 라벨을 표시합니다. |
| `minLabel` | `ReactNode` | — | Min 라벨 텍스트입니다. 미입력 시 `formatValue(min)`. |
| `midLabel` | `ReactNode` | — | Mid 라벨 텍스트입니다. 미입력 시 `formatValue((min + max) / 2)`. |
| `maxLabel` | `ReactNode` | — | Max 라벨 텍스트입니다. 미입력 시 `formatValue(max)`. |
| `showTicks` | `boolean` | `false` | Figma 의 Show Ticks 축입니다. `step` 간격으로 눈금을 그립니다. |
| `helperText` | `ReactNode` | — | Figma 의 Show Helper 축입니다. 아래쪽 보조 문구입니다. |
| `showTooltip` | `boolean` | `true` | hover / focus / 드래그 중 썸 위에 값 툴팁을 띄웁니다. |
| `unit` | `string` | — | 툴팁 값 뒤에 얇게 붙는 단위입니다. 예: `'%'`. |
| `formatValue` | `(value: number) => string` | — | 값을 문자열로 바꿉니다. 헤더 · 툴팁 · 범위 라벨 · `aria-valuetext` 에 함께 쓰입니다. |
| `ariaLabel` | `string` | — | 접근성 이름입니다. `label` 이 없을 때 사용하세요. |
| `onChange` | `(value: SliderValue) => void` | — | 값이 바뀔 때마다 호출됩니다. 범위면 `[min, max]` 배열이 넘어옵니다. |
| `onChangeEnd` | `(value: SliderValue) => void` | — | 드래그가 끝나거나 키 조작이 끝났을 때 한 번 호출됩니다. |

## 타입

| 이름 | 값 | 설명 |
| :-- | :-- | :-- |
| `SliderSize` | `'sm' \| 'md' \| 'lg'` | Figma 의 Size 축입니다. Small / Medium / Large 에 대응합니다. |
| `SliderVariant` | `'plain' \| 'card'` | Figma Slider 셋의 Style 축입니다. card=테두리 카드, plain=테두리 없음. |
| `SliderRangeValue` | `[number, number]` | 범위 슬라이더의 값입니다. [작은 값, 큰 값] 순서로 유지됩니다. |
| `SliderValue` | `number \| SliderRangeValue` |  |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

