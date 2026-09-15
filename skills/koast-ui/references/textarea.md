# TextArea

TextArea 컴포넌트입니다. 여러 줄 텍스트를 입력받는 요소로, 라벨·글자 수 카운터·보조 문구·오류 상태를 함께 표시합니다.

```tsx
import { TextArea } from '@koast/ui';
```

## 사용 예

```tsx
<TextArea label="의견" placeholder="의견을 입력하세요" value={memo} onChange={setMemo} />

<TextArea label="자기소개" maxLength={500} helpText="500자 이내로 작성하세요" />

<TextArea label="메모" autoResize error helpText="필수 항목입니다" required />
```

## Props

### `TextAreaProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `value` | `string` | — | 입력 값입니다. 지정하면 제어 컴포넌트로 동작합니다. |
| `defaultValue` | `string` | — | 비제어로 쓸 때의 초기 값입니다. |
| `onChange` | `(value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void` | — | 값이 바뀔 때 호출됩니다. 첫 인자가 문자열 값, 둘째 인자가 원본 이벤트입니다. |
| `onFocus` | `(event: React.FocusEvent<HTMLTextAreaElement>) => void` | — | 포커스를 얻을 때 호출됩니다. |
| `onBlur` | `(event: React.FocusEvent<HTMLTextAreaElement>) => void` | — | 포커스를 잃을 때 호출됩니다. |
| `label` | `React.ReactNode` | — | 입력 상자 위에 표시되는 라벨입니다. |
| `placeholder` | `string` | — | 값이 없을 때 표시되는 문구입니다. |
| `helpText` | `React.ReactNode` | — | 입력 상자 아래에 표시되는 보조 문구입니다. `error` 면 빨간색과 경고 아이콘이 함께 표시됩니다. |
| `error` | `boolean` | `false` | 오류 상태입니다. |
| `disabled` | `boolean` | `false` | 비활성화 상태입니다. |
| `readOnly` | `boolean` | `false` | 읽기 전용 상태입니다. |
| `required` | `boolean` | `false` | 필수 입력 여부입니다. 라벨 뒤에 `*` 가 붙습니다. |
| `maxLength` | `number` | — | 입력 가능한 최대 글자 수입니다. 지정하면 라벨 오른쪽에 글자 수 카운터가 나옵니다. |
| `showCount` | `boolean` | `maxLength 가 있으면 true` | 글자 수 카운터 표시 여부입니다. |
| `autoResize` | `boolean` | `false` | 내용에 맞춰 높이를 늘립니다. 고정 높이 180px 이 최소값이 됩니다. |
| `resizable` | `boolean` | `true` | 사용자가 세로로 크기를 조절할 수 있게 합니다. `autoResize` 면 무시됩니다. |
| `className` | `string` | — | 너비·여백 같은 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. |
| `id` | `string` | — |  |
| `name` | `string` | — |  |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

