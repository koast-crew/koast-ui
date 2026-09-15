# Radio

라디오 컴포넌트입니다. 상호 배타적인 옵션 중 하나만 고를 때 씁니다. 네이티브 `<input type="radio">` 를 그대로 쓰고 화면에만 숨겨, 같은 `name` 끼리의 방향키 이동과 스크린리더 동작을 브라우저에 맡깁니다. 라벨은 `Label` 컴포넌트가 그립니다. `ControlGroup type="radio"` 안에 넣으면 name · disabled · 선택 값을 그룹에서 물려받습니다.

```tsx
import { Radio } from '@koast/ui';
```

## 사용 예

```tsx
// 단독 사용 (name 으로 묶습니다)
<Radio name="gender" value="male" label="남성" defaultChecked />
<Radio name="gender" value="female" label="여성" />

// ControlGroup 과 함께
<ControlGroup type="radio" label="배송 옵션" defaultValue="normal">
  <Radio value="normal" label="일반 배송" />
  <Radio value="fast" label="빠른 배송" />
</ControlGroup>
```

## Props

### `RadioProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `checked` | `boolean` | — | 선택 상태입니다. 지정하면 제어 컴포넌트로 동작합니다. |
| `defaultChecked` | `boolean` | `false` | 비제어로 쓸 때의 초기 상태입니다. |
| `onChange` | `(checked: boolean) => void` | — | 선택될 때 호출됩니다. 라디오는 해제가 없어 항상 `true` 로 넘어갑니다. |
| `label` | `React.ReactNode` | — | 라디오 오른쪽에 표시되는 라벨입니다. |
| `value` | `ControlValue` | — | ControlGroup 안에서 이 항목을 구분하는 값입니다. |
| `name` | `string` | — | 같은 그룹으로 묶을 name 입니다. ControlGroup 안에서는 그룹의 name 을 물려받습니다. |
| `required` | `boolean` | `false` | 필수 입력 여부입니다. 라벨 뒤에 `*` 가 붙습니다. |
| `disabled` | `boolean` | `false` | 비활성화 상태입니다. 상위 ControlGroup 의 disabled 도 그대로 받습니다. |
| `className` | `string` | — | 여백 조정용입니다. 색상은 지정할 수 없습니다. |
| `id` | `string` | — |  |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

