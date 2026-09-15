# ControlGroup

컨트롤 그룹 컴포넌트입니다. Checkbox 또는 Radio 를 묶어 시각적·의미적 연결을 만듭니다. `name` 과 `disabled` 를 자식 컨트롤에 전파하고, `value` 또는 `defaultValue` 를 주면 선택 값까지 그룹이 직접 관리합니다(이때 자식은 각자의 `value` 로 식별됩니다). `type="radio"` 면 `role="radiogroup"` 이 되어 방향키 이동이 그룹 단위로 동작합니다.

```tsx
import { ControlGroup } from '@koast/ui';
```

## 사용 예

```tsx
// 체크박스 그룹 (값은 배열)
<ControlGroup label="관심 분야" value={topics} onChange={setTopics}>
  <Checkbox value="weather" label="기상" />
  <Checkbox value="ocean" label="해양" />
</ControlGroup>

// 라디오 그룹 (값은 단일)
<ControlGroup type="radio" label="배송 옵션" required defaultValue="normal">
  <Radio value="normal" label="일반 배송" />
  <Radio value="fast" label="빠른 배송" />
</ControlGroup>
```

## Props

### `ControlGroupBaseProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `label` | `React.ReactNode` | — | 그룹 전체를 설명하는 라벨입니다. |
| `required` | `boolean` | `false` | 라벨 뒤에 `*` 를 붙입니다. |
| `disabled` | `boolean` | `false` | 그룹 전체를 비활성화합니다. 자식 컨트롤로 그대로 전파됩니다. |
| `orientation` | `ControlGroupOrientation` | `'vertical'` | 나열 방향입니다. |
| `name` | `string` | — | 자식 radio 가 공유할 name 입니다. 생략하면 자동 생성됩니다. |
| `className` | `string` | — | 여백·너비 조정용입니다. 색상은 지정할 수 없습니다. |
| `children` *(필수)* | `React.ReactNode` | — | Checkbox 또는 Radio 목록입니다. |
| `id` | `string` | — |  |

### `CheckboxControlGroupProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `type` | `'checkbox'` | `'checkbox'` |  |
| `value` | `ControlValue[]` | — | 선택된 값 목록입니다. 지정하면 제어 컴포넌트로 동작합니다. |
| `defaultValue` | `ControlValue[]` | — | 비제어로 쓸 때의 초기 값 목록입니다. |
| `onChange` | `(value: ControlValue[]) => void` | — | 선택이 바뀔 때 호출됩니다. |

`ControlGroupBaseProps` 를 확장합니다. 표준 HTML 속성(`aria-*` · `data-*` · `id` · 이벤트)은 그대로 전달됩니다.

### `RadioControlGroupProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `type` *(필수)* | `'radio'` | — |  |
| `value` | `ControlValue` | — | 선택된 값입니다. 지정하면 제어 컴포넌트로 동작합니다. |
| `defaultValue` | `ControlValue` | — | 비제어로 쓸 때의 초기 값입니다. |
| `onChange` | `(value: ControlValue) => void` | — | 선택이 바뀔 때 호출됩니다. |

`ControlGroupBaseProps` 를 확장합니다. 표준 HTML 속성(`aria-*` · `data-*` · `id` · 이벤트)은 그대로 전달됩니다.

## 타입

| 이름 | 값 | 설명 |
| :-- | :-- | :-- |
| `ControlValue` | `string \| number` | 그룹 안에서 각 컨트롤을 구분하는 값입니다. |
| `ControlGroupType` | `'checkbox' \| 'radio'` | 묶는 컨트롤의 종류입니다. radio 는 하나만, checkbox 는 여러 개를 고를 수 있습니다. |
| `ControlGroupOrientation` | `'vertical' \| 'horizontal'` | 나열 방향입니다. Figma 는 세로만 정의합니다. |
| `ControlGroupProps` | `CheckboxControlGroupProps \| RadioControlGroupProps` |  |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

