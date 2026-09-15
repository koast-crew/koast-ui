# Label

라벨 컴포넌트입니다. 입력 필드나 컨트롤과 연결되어 해당 요소의 목적을 설명합니다. Checkbox / Radio / Switch / ControlGroup 의 라벨도 모두 이 컴포넌트가 그립니다. 컨트롤을 감싸는 `<label>` 안에서 쓰일 때는 `as="span"` 으로 렌더링해 태그 중첩을 피합니다.

```tsx
import { Label } from '@koast/ui';
```

## 사용 예

```tsx
// 입력 필드와 연결
<Label htmlFor="email" type="required">이메일</Label>
<input id="email" />

// 선택 입력 표기
<Label htmlFor="nickname" type="optional">닉네임</Label>

// 컨트롤을 감싸는 label 안에서 문구만 그릴 때
<Label as="span" disabled>약관 동의</Label>
```

## Props

### `LabelProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `children` *(필수)* | `React.ReactNode` | — | 라벨 문구입니다. |
| `type` | `LabelType` | `'none'` | 보조 표기입니다. |
| `htmlFor` | `string` | — | 연결할 입력 요소의 id 입니다. 지정하면 기본 태그가 `label` 이 됩니다. |
| `disabled` | `boolean` | `false` | 비활성화 상태입니다. 연결된 컨트롤의 disabled 를 그대로 받습니다. |
| `optionalText` | `string` | `'(Optional)'` | `(Optional)` 자리에 들어갈 문구입니다. |
| `as` | `LabelAs` | `htmlFor 가 있으면 'label', 없으면 'span'` | 렌더링할 태그입니다. |
| `className` | `string` | — | 여백 조정용입니다. 색상은 지정할 수 없습니다. |
| `id` | `string` | — |  |

## 타입

| 이름 | 값 | 설명 |
| :-- | :-- | :-- |
| `LabelType` | `'none' \| 'optional' \| 'required'` | Figma `Part/Label` 의 Type 축입니다. 보조 표기 없음 / (Optional) / * 세 가지입니다. |
| `LabelAs` | `'label' \| 'span'` | 렌더링할 태그입니다. 컨트롤을 감싸는 `<label>` 안에서 쓸 때는 `span` 이어야 중첩이 생기지 않습니다. |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

