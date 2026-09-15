# Button

버튼 컴포넌트입니다. 색상은 디자인 시스템의 시맨틱 토큰으로만 결정됩니다. `color` 는 정해진 intent 값만 받고, 임의의 색상 문자열이나 인라인 스타일은 받지 않습니다. `aria-label`, `aria-describedby`, `id`, `title`, `data-*` 같은 네이티브 속성과 `ref` 를 그대로 전달합니다. 색을 지정하는 `style` / `color` 속성만 막혀 있습니다.

```tsx
import { Button } from '@koast/ui';
```

## 사용 예

```tsx
<Button variant="contained" color="primary" onClick={handleClick}>
  확인
</Button>

<Button color="danger" startIcon={<TrashIcon />}>
  삭제
</Button>

<Button href="https://example.com">
  링크 버튼
</Button>
```

## Props

### `ButtonSharedProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `variant` | `ButtonVariant` | `'outlined'` | 버튼의 변형입니다. `color='danger'` 는 filled 만 있어 항상 contained 로 동작합니다. |
| `color` | `ButtonColorProp` | `'primary'` | 버튼의 의미(intent)입니다. 디자인 시스템에 정의된 값만 사용할 수 있습니다. |
| `size` | `ButtonSizeProp` | `'md'` | 버튼의 크기입니다. |
| `className` | `string` | — | 여백·정렬·너비 같은 레이아웃 조정용입니다. 색상은 `color` / `variant` 로만 지정할 수 있습니다. |
| `disabled` | `boolean` | `false` | 비활성화 상태입니다. |
| `children` | `React.ReactNode` | — | 버튼 내부에 표시될 콘텐츠입니다. |
| `startIcon` | `React.ReactNode` | — | 버튼 왼쪽에 표시될 아이콘입니다. 크기는 버튼 size 에 따라 자동으로 맞춰집니다. |
| `endIcon` | `React.ReactNode` | — | 버튼 오른쪽에 표시될 아이콘입니다. 크기는 버튼 size 에 따라 자동으로 맞춰집니다. |
| `loading` | `boolean` | `false` | 로딩 상태입니다. |
| `fullWidth` | `boolean` | `false` | 너비를 부모의 100%로 설정합니다. |
| `shadow` | `boolean` | `false` | 그림자 효과입니다. contained 변형에만 적용됩니다. |

### `ButtonAsButtonProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | 버튼의 HTML type 속성입니다. |

`ButtonSharedProps` 를 확장합니다. 표준 HTML 속성(`aria-*` · `data-*` · `id` · 이벤트)은 그대로 전달됩니다.

### `ButtonAsAnchorProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `href` *(필수)* | `string` | — | 링크 URL 입니다. 이 속성이 있으면 `<a>` 태그로 렌더링됩니다. |

`ButtonSharedProps` 를 확장합니다. 표준 HTML 속성(`aria-*` · `data-*` · `id` · 이벤트)은 그대로 전달됩니다.

## 타입

| 이름 | 값 | 설명 |
| :-- | :-- | :-- |
| `ButtonColor` | `'primary' \| 'secondary' \| 'danger'` | 버튼이 표현할 수 있는 의미(intent)입니다. 디자인 시스템의 Type 축에 1:1로 대응합니다. 임의의 색상 문자열은 받지 않습니다. |
| `DeprecatedButtonColor` | `'error' \| 'gray' \| 'neutral' \| 'info' \| 'warning' \| 'success'` | 디자인 시스템에서 제거된 intent 입니다. 다음 major 에서 삭제됩니다. `error` 는 `danger`, `gray` / `neutral` 은 `secondary` 를 사용하세요. `info` / `warning` / `success` 는 대응하는 intent 가 없어 `primary` 로 동작합니다. **(deprecated)** |
| `ButtonColorProp` | `ButtonColor \| DeprecatedButtonColor` | `color` prop 이 실제로 허용하는 값입니다. |
| `ButtonSize` | `'xs' \| 'sm' \| 'md'` | 디자인 시스템의 Size 축입니다. xs=28px, sm=40px, md=48px 높이에 대응합니다. |
| `DeprecatedButtonSize` | `'lg' \| 'xl'` | 디자인 시스템에 없는 크기입니다. 다음 major 에서 삭제되며 `md` 로 동작합니다. **(deprecated)** |
| `ButtonSizeProp` | `ButtonSize \| DeprecatedButtonSize` | `size` prop 이 실제로 허용하는 값입니다. |
| `ButtonVariant` | `'contained' \| 'outlined' \| 'text'` | 디자인 시스템의 Style 축입니다. Filled / Outlined / Transparent 에 대응합니다. |
| `ButtonProps` | `ButtonAsButtonProps \| ButtonAsAnchorProps` | `href` 유무로 갈리는 판별 유니온입니다. `ref` 도 각 형태에 맞는 엘리먼트 타입으로 좁혀지므로 `useRef<HTMLButtonElement>(null)` 을 그대로 넘길 수 있습니다. |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

