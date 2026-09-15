# TimeLine

TimeLine 컴포넌트입니다. 시간의 흐름에 따라 변화하는 데이터를 탐색하고 재생하는 컨트롤입니다. `daily` 는 날짜 세그먼트로, `hourly` 는 연속 트랙으로 표시하며 레이아웃은 컨테이너 폭에 따라 자동 전환됩니다.

```tsx
import { TimeLine } from '@koast/ui';
```

## 사용 예

```tsx
<TimeLine
  type="daily"
  start={new Date('2026-09-01')}
  end={new Date('2026-09-04')}
  stepValue={3}
  stepUnit="hour"
  onChange={({ date }) => setDate(date)}
/>
```

## Props

### `TimeLineOnChangeProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `step` *(필수)* | `number` | — |  |
| `date` *(필수)* | `Date` | — |  |

### `TimeLineProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `className` | `string` | — | 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. |
| `start` *(필수)* | `Date` | — | 타임라인 시작 시각입니다. |
| `end` *(필수)* | `Date` | — | 타임라인 종료 시각입니다. |
| `initialDate` | `Date` | — | 초기 위치입니다. 미입력 시 첫 스텝에 놓입니다. |
| `stepValue` *(필수)* | `number` | — | 스텝 간격입니다. `stepUnit` 과 함께 계산됩니다. |
| `stepUnit` | `TimeUnit` | `'minute'` | 스텝 간격 단위입니다. |
| `steps` | `Date[] \| ((start: Date, end: Date, stepValue: number, stepUnit?: TimeUnit) => Date[])` | — | 시각 목록입니다. 불규칙한 경우 직접 넘깁니다. 넘기면 `stepValue` 계산보다 우선합니다. 어떤 날에 스텝이 하나도 없으면 그 날은 데이터 없음으로 표시됩니다. |
| `type` | `TimeLineType` | `'hourly'` | 표시 방식입니다. |
| `interval` | `TimeLineInterval` | `3` | hourly 눈금 간격(시간)입니다. |
| `animationSpeed` | `number` | `1000` | 한 스텝당 재생 간격(ms)입니다. 배속으로 나눠집니다. |
| `speeds` | `number[]` | `[0.5, 1, 2, 4]` | 배속 선택지입니다. |
| `speed` | `number` | — | 현재 배속입니다. 지정하면 제어 컴포넌트로 동작합니다. |
| `onSpeedChange` | `(speed: number) => void` | — | 배속이 바뀔 때 호출됩니다. |
| `loading` | `boolean` | `false` | 데이터를 불러오는 중임을 표시합니다. |
| `disabled` | `boolean` | `false` | 비활성화 상태입니다. |
| `onChange` | `(props: TimeLineOnChangeProps) => void` | — | 스텝이 바뀔 때 호출됩니다. |
| `renderGuideMessage` | `DateToStringFunc` | — | hourly 트랙에 마우스를 올렸을 때 표시할 텍스트입니다. |
| `renderSelectedGuideMessage` | `DateToStringFunc` | — | 현재 선택된 시각의 툴팁 텍스트입니다. |
| `renderRulerLabel` | `DateToStringFunc` | — | hourly 눈금 라벨 텍스트입니다. |

## 타입

| 이름 | 값 | 설명 |
| :-- | :-- | :-- |
| `TimeUnit` | `'year' \| 'month' \| 'day' \| 'hour' \| 'minute' \| 'second'` |  |
| `TimeLineType` | `'daily' \| 'hourly'` | Figma 의 Type 축입니다. daily=날짜 세그먼트, hourly=연속 트랙. |
| `TimeLineLayout` | `'desktop' \| 'compact' \| 'mobile'` | Figma 의 Layout 축입니다. 컨테이너 폭으로 자동 결정됩니다. |
| `TimeLineInterval` | `1 \| 3 \| 6` | hourly 눈금 간격(시간)입니다. |
| `DateToStringFunc` | `(date: Date) => string` |  |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

