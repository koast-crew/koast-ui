# Checkbox

체크박스 컴포넌트입니다. 여러 옵션 중 하나 이상을 선택하거나, 동의 여부를 확인하는 데 씁니다. 네이티브 `<input type="checkbox">` 를 그대로 쓰고 화면에만 숨겨, 키보드 조작(Space)과 스크린리더 동작을 브라우저에 맡깁니다. 라벨은 `Label` 컴포넌트가 그립니다. `ControlGroup` 안에 넣으면 name · disabled · 선택 값을 그룹에서 물려받습니다.

```tsx
import { Checkbox } from '@koast/ui';
```

## 사용 예

```tsx
// 비제어
<Checkbox label="이용약관 동의" defaultChecked />

// 제어
<Checkbox label="뉴스레터 수신" checked={agreed} onChange={setAgreed} />

// 부분 선택
<Checkbox label="전체 선택" checked="partial" onChange={selectAll} />
```

## Props

### `CheckboxProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `checked` | `CheckboxChecked` | — | 선택 상태입니다. 지정하면 제어 컴포넌트로 동작합니다. |
| `defaultChecked` | `CheckboxChecked` | `false` | 비제어로 쓸 때의 초기 상태입니다. |
| `onChange` | `(checked: boolean) => void` | — | 선택 상태가 바뀔 때 호출됩니다. `'partial'` 에서는 항상 `true` 로 넘어갑니다. |
| `label` | `React.ReactNode` | — | 체크박스 오른쪽에 표시되는 라벨입니다. |
| `value` | `ControlValue` | — | ControlGroup 안에서 이 항목을 구분하는 값입니다. |
| `required` | `boolean` | `false` | 필수 입력 여부입니다. 라벨 뒤에 `*` 가 붙습니다. |
| `disabled` | `boolean` | `false` | 비활성화 상태입니다. 상위 ControlGroup 의 disabled 도 그대로 받습니다. |
| `className` | `string` | — | 여백 조정용입니다. 색상은 지정할 수 없습니다. |
| `id` | `string` | — |  |
| `name` | `string` | — |  |

## 타입

| 이름 | 값 | 설명 |
| :-- | :-- | :-- |
| `CheckboxChecked` | `boolean \| 'partial'` | Figma `Part/Check` 의 Checked 축입니다. `'partial'` 은 부분 선택(indeterminate)입니다. |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

