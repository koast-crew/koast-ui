# Switch

스위치 컴포넌트입니다. 설정을 즉시 켜고 끄는 두 가지 상태를 전환할 때 씁니다. 네이티브 `<input type="checkbox" role="switch">` 를 그대로 쓰고 화면에만 숨겨, 키보드 조작(Space)과 스크린리더 동작을 브라우저에 맡깁니다. 라벨은 Checkbox / Radio 와 같은 규칙(gap 8px · 세로 가운데 정렬)으로 `Label` 이 그립니다.

```tsx
import { Switch } from '@koast/ui';
```

## 사용 예

```tsx
// 비제어
<Switch label="다크 모드" defaultChecked />

// 제어 + 상태 아이콘
<Switch label="알림 설정" icon checked={on} onChange={setOn} />

// 라벨을 왼쪽에
<Switch label="자동 저장" labelPlacement="start" />
```

## Props

### `SwitchProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `checked` | `boolean` | — | 켜짐 상태입니다. 지정하면 제어 컴포넌트로 동작합니다. |
| `defaultChecked` | `boolean` | `false` | 비제어로 쓸 때의 초기 상태입니다. |
| `onChange` | `(checked: boolean) => void` | — | 상태가 바뀔 때 호출됩니다. |
| `label` | `React.ReactNode` | — | 스위치 옆에 표시되는 라벨입니다. |
| `labelPlacement` | `SwitchLabelPlacement` | `'end'` | 라벨 위치입니다. |
| `icon` | `boolean` | `false` | 손잡이 안에 상태 아이콘(체크 / X)을 표시합니다. Figma 의 Icon 축입니다. |
| `value` | `ControlValue` | — | 폼 전송에 쓰이는 값입니다. |
| `required` | `boolean` | `false` | 필수 입력 여부입니다. 라벨 뒤에 `*` 가 붙습니다. |
| `disabled` | `boolean` | `false` | 비활성화 상태입니다. 상위 ControlGroup 의 disabled 도 그대로 받습니다. |
| `className` | `string` | — | 여백 조정용입니다. 색상은 지정할 수 없습니다. |
| `id` | `string` | — |  |
| `name` | `string` | — |  |

## 타입

| 이름 | 값 | 설명 |
| :-- | :-- | :-- |
| `SwitchLabelPlacement` | `'start' \| 'end'` | Figma `Switch label` 의 Direction 축입니다. `'end'` 는 스위치가 왼쪽(Direction=Left)입니다. |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

