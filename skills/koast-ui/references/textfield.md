# TextField

TextField 컴포넌트입니다. 한 줄 텍스트를 입력받는 요소로, 라벨·보조 문구·오류 상태를 함께 표시합니다.

```tsx
import { TextField } from '@koast/ui';
```

## 사용 예

```tsx
<TextField label="이름" placeholder="이름을 입력하세요" value={name} onChange={setName} />

<TextField label="이메일" size="sm" error helpText="이메일 형식이 아닙니다" required />

<TextField label="검색" trailingIcon={<Search />} />
```

## Props

### `TextFieldProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `value` | `string` | — | 입력 값입니다. 지정하면 제어 컴포넌트로 동작합니다. |
| `defaultValue` | `string` | — | 비제어로 쓸 때의 초기 값입니다. |
| `onChange` | `(value: string, event: React.ChangeEvent<HTMLInputElement>) => void` | — | 값이 바뀔 때 호출됩니다. 첫 인자가 문자열 값, 둘째 인자가 원본 이벤트입니다. |
| `onFocus` | `(event: React.FocusEvent<HTMLInputElement>) => void` | — | 포커스를 얻을 때 호출됩니다. |
| `onBlur` | `(event: React.FocusEvent<HTMLInputElement>) => void` | — | 포커스를 잃을 때 호출됩니다. |
| `label` | `React.ReactNode` | — | 입력 상자 위에 표시되는 라벨입니다. |
| `placeholder` | `string` | — | 값이 없을 때 표시되는 문구입니다. |
| `helpText` | `React.ReactNode` | — | 입력 상자 아래에 표시되는 보조 문구입니다. `error` 면 빨간색과 경고 아이콘이 함께 표시됩니다. |
| `trailingIcon` | `React.ReactNode` | — | 상자 오른쪽 끝에 놓이는 24x24 아이콘입니다. |
| `error` | `boolean` | `false` | 오류 상태입니다. |
| `disabled` | `boolean` | `false` | 비활성화 상태입니다. |
| `readOnly` | `boolean` | `false` | 읽기 전용 상태입니다. |
| `required` | `boolean` | `false` | 필수 입력 여부입니다. 라벨 뒤에 `*` 가 붙습니다. |
| `size` | `TextFieldSize` | `'md'` | 입력 상자 높이입니다. |
| `type` | `TextFieldType` | `'text'` | input 의 type 입니다. |
| `maxLength` | `number` | — | 입력 가능한 최대 글자 수입니다. |
| `className` | `string` | — | 너비·여백 같은 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. |
| `id` | `string` | — |  |
| `name` | `string` | — |  |
| `autoComplete` | `string` | — |  |

## 타입

| 이름 | 값 | 설명 |
| :-- | :-- | :-- |
| `TextFieldSize` | `'sm' \| 'md'` | 디자인 시스템의 Size 축입니다. sm=40px, md=48px 입력 상자 높이에 대응합니다. |
| `TextFieldType` | `'text' \| 'password' \| 'email' \| 'number' \| 'tel' \| 'url' \| 'search'` | 단일 줄 입력에서 쓰는 input type 만 열어 둡니다. |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

