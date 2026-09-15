# MapLegend

MapLegend(지도 범례) 컴포넌트입니다. 지도 위에 띄우는 레이어 선택 툴바와 범례 패널입니다. 연속값은 bar, 분류값은 circle 로 표시합니다.

```tsx
import { MapLegend } from '@koast/ui';
```

## 사용 예

```tsx
<MapLegend
  selectedLayerId={layerId}
  onLayerSelect={setLayerId}
  toolbarButtons={[{ id: 'sst', label: '수온', icon: <Thermometer /> }]}
  legendData={{ sst: { colors: ['#2563eb', '#ef4444'], values: ['0', '30'] } }}
/>

// 분류값 범례
<MapLegend
  legendType="circle"
  selectedLayerId="grade"
  toolbarButtons={[{ id: 'grade', label: '등급' }]}
  legendData={{ grade: [{ color: '#16a34a', value: '양호' }] }}
/>
```

## Props

### `MapLegendProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `visible` | `boolean` | `true` | 범례의 표시 여부를 결정합니다. |
| `onClose` | `() => void` | — | 범례 닫기 버튼 클릭 시 호출될 함수입니다. |
| `selectedLayerId` *(필수)* | `string` | — | 현재 선택된 레이어 ID입니다. |
| `onLayerSelect` | `(id: string) => void` | — | 레이어 선택 시 호출될 함수입니다. |
| `toolbarButtons` *(필수)* | `ToolbarButton[]` | — | 툴바 버튼 배열의 배열입니다. 중첩 배열을 사용하여 버튼 그룹을 구성할 수 있습니다. |
| `legendData` *(필수)* | `Record<string, BarLegendData \| CircleLegendData[]>` | — | 범례 데이터를 포함하는 객체입니다. 키는 레이어 ID와 일치해야 합니다. |
| `className` | `string` | — | 범례 컨테이너에 추가할 CSS 클래스명입니다. |
| `title` | `string` | `'범례'` | 범례 제목입니다. |
| `excludeButtonIds` | `string[]` | `[]` | 필터링할 버튼 ID 배열입니다. 이 배열에 포함된 ID를 가진 버튼은 표시되지 않습니다. |
| `legendType` | `LegendType` | `'bar'` | 범례 표시 타입입니다. 'bar': 연속된 색상 막대 형태로 표시합니다. 'circle': 개별 항목을 원형과 텍스트로 표시합니다. |

## 타입

| 이름 | 값 | 설명 |
| :-- | :-- | :-- |
| `LegendType` | `'bar' \| 'circle'` | 범례 표시 타입을 정의합니다. |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

