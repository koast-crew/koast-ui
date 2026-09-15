# Select

Select(Dropdown) 컴포넌트입니다. 여러 옵션 중 하나를 선택하는 입력 요소로, 라벨·보조 문구·오류 상태를 함께 표시합니다.

```tsx
import { Select } from '@koast/ui';
```

## 사용 예

```tsx
<Select label="국가" placeholder="선택하세요" value={country} onChange={setCountry}>
  <SelectItem value="kr">대한민국</SelectItem>
  <SelectItem value="jp">일본</SelectItem>
</Select>

<Select error helpText="필수 항목입니다" size="sm" visibleOptions={4}>
  <SelectItem value={10}>10</SelectItem>
</Select>
```

## Props

### `SelectProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `value` | `T` | — | 선택된 값입니다. 지정하면 제어 컴포넌트로 동작합니다. |
| `defaultValue` | `T` | — | 비제어로 쓸 때의 초기 값입니다. |
| `onChange` | `(value: T) => void` | — | 값이 바뀔 때 호출됩니다. |
| `label` | `React.ReactNode` | — | 트리거 위에 표시되는 라벨입니다. |
| `placeholder` | `string` | — | 값이 없을 때 트리거에 표시되는 문구입니다. |
| `helpText` | `React.ReactNode` | — | 트리거 아래에 표시되는 보조 문구입니다. `error` 면 빨간색과 경고 아이콘이 함께 표시됩니다. |
| `error` | `boolean` | `false` | 오류 상태입니다. |
| `disabled` | `boolean` | `false` | 비활성화 상태입니다. |
| `required` | `boolean` | `false` | 필수 입력 여부입니다. 라벨 뒤에 `*` 가 붙습니다. |
| `size` | `SelectSize` | `'md'` | 트리거 높이입니다. |
| `visibleOptions` | `SelectVisibleOptions` | `8` | 드롭다운에 한 번에 보이는 옵션 수입니다. |
| `className` | `string` | — | 너비·여백 같은 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. |
| `children` *(필수)* | `React.ReactNode` | — | 옵션 목록입니다. `SelectItem` 만 넣습니다. |
| `id` | `string` | — |  |
| `name` | `string` | — |  |

### `SelectItemProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `value` *(필수)* | `string \| number` | — | 항목의 값입니다. |
| `children` *(필수)* | `React.ReactNode` | — | 항목에 표시될 내용입니다. |
| `disabled` | `boolean` | `false` | 비활성화 상태입니다. |
| `className` | `string` | — | 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. |

## 타입

| 이름 | 값 | 설명 |
| :-- | :-- | :-- |
| `SelectSize` | `'sm' \| 'md'` | 디자인 시스템의 Size 축입니다. sm=40px, md=48px 트리거 높이에 대응합니다. |
| `SelectVisibleOptions` | `4 \| 6 \| 8` | 드롭다운에 한 번에 보이는 옵션 수입니다. 이 값이 최대 높이를 정합니다. |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

