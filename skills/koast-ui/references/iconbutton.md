# IconButton

아이콘 버튼 컴포넌트입니다. 아이콘만 담는 정사각형 버튼으로 닫기·검색·설정 같은 보조 동작에 씁니다. 색상은 디자인 시스템의 시맨틱 토큰으로만 결정되며 Button 과 같은 색·상태 테이블을 공유합니다. 라벨이 없는 버튼이라 `aria-label` 이 **필수**입니다. 아이콘 자체는 `aria-hidden` 으로 감춰집니다. `selected` 를 주면 `aria-pressed` 가 함께 붙어 토글 버튼으로 읽힙니다.

```tsx
import { IconButton } from '@koast/ui';
```

## 사용 예

```tsx
// 닫기 버튼
<IconButton variant="text" color="secondary" aria-label="닫기" icon={<CloseIcon />} onClick={close} />

// 강조된 기본 동작
<IconButton variant="contained" aria-label="검색" icon={<SearchIcon />} />

// 토글 버튼 (aria-pressed 가 붙습니다)
<IconButton
  variant="contained"
  aria-label="즐겨찾기"
  icon={<StarIcon />}
  selected={bookmarked}
  onClick={() => setBookmarked((v) => !v)}
/>
```

## Props

### `IconButtonProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `icon` *(필수)* | `React.ReactNode` | — | 표시할 아이콘입니다. 크기는 `size` 에 따라 자동으로 맞춰지고 `aria-hidden` 으로 감싸집니다. |
| `aria-label` *(필수)* | `string` | — | 스크린 리더가 읽을 이름입니다. 아이콘만 있는 버튼이라 필수입니다. `aria-labelledby` 를 함께 주면 그쪽이 우선합니다. |
| `variant` | `IconButtonVariant` | `'outlined'` | 버튼의 변형입니다. `color='danger'` 는 filled 만 있어 항상 contained 로 동작합니다. |
| `color` | `IconButtonColorProp` | `'primary'` | 버튼의 의미(intent)입니다. 디자인 시스템에 정의된 값만 사용할 수 있습니다. |
| `size` | `IconButtonSizeProp` | `'md'` | 버튼의 크기입니다. 28 / 32 / 40px 정사각형입니다. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | 버튼의 HTML type 속성입니다. |
| `className` | `string` | — | 여백·정렬 같은 레이아웃 조정용입니다. 색상은 `color` / `variant` 로만 지정할 수 있습니다. |
| `disabled` | `boolean` | `false` | 비활성화 상태입니다. |
| `loading` | `boolean` | `false` | 로딩 상태입니다. 아이콘 자리에 스피너가 들어가고 버튼이 비활성화됩니다. |
| `selected` | `boolean` | — | 토글 버튼의 선택 상태입니다. Figma 의 Selected 축에 대응합니다. 값을 주면 `aria-pressed` 가 함께 붙어 토글 버튼으로 읽힙니다. 생략하면 토글이 아닌 일반 버튼으로 읽힙니다. |

## 타입

| 이름 | 값 | 설명 |
| :-- | :-- | :-- |
| `IconButtonColor` | `ButtonColor` | Figma 의 Type 축입니다. Button 과 같은 intent 집합을 그대로 씁니다. Figma 의 Property table 에는 `Destructive` 가 선언돼 있지만 실제 variant 는 없습니다. |
| `IconButtonColorProp` | `ButtonColorProp` | `color` prop 이 실제로 허용하는 값입니다. Button 과 같은 deprecated 별칭을 받습니다. |
| `IconButtonSize` | `ButtonSize` | Figma 의 Size 축입니다. xs=28px, sm=32px, md=40px 정사각형에 대응합니다. |
| `IconButtonSizeProp` | `ButtonSizeProp` | `size` prop 이 실제로 허용하는 값입니다. |
| `IconButtonVariant` | `ButtonVariant` | Figma 의 Style 축입니다. Filled / Outlined / Transparent 에 대응합니다. |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

