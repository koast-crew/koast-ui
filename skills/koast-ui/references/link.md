# Link

링크 컴포넌트입니다. 항상 `<a>` 로 렌더링되며, 색상은 디자인 시스템의 시맨틱 토큰으로만 결정됩니다. `color` 는 정해진 intent 값만 받고, 임의의 색상 문자열이나 인라인 스타일은 받지 않습니다. `target="_blank"` 를 주면 `rel="noopener noreferrer"` 가 자동으로 붙고, 접근 가능한 이름 끝에 "(새 창에서 열림)" 이 화면에는 보이지 않는 형태로 추가됩니다. `aria-label`, `aria-current`, `id`, `title`, `data-*` 같은 네이티브 속성과 `ref` 를 그대로 전달합니다. 색을 지정하는 `style` / `color` 속성만 막혀 있습니다.

```tsx
import { Link } from '@koast/ui';
```

## 사용 예

```tsx
<Link href="/notices">공지사항</Link>

// 본문 안에 섞이는 링크는 밑줄로 표시합니다
<Link href="/terms" variant="underline" color="secondary">이용약관</Link>

// 새 창으로 열리는 외부 링크
<Link href="https://www.kma.go.kr" target="_blank" endIcon={<ExternalLink />}>
  기상청
</Link>
```

## Props

### `LinkProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `href` *(필수)* | `string` | — | 이동할 URL 입니다. `disabled` 일 때는 `href` 속성을 내보내지 않습니다. |
| `variant` | `LinkVariant` | `'standalone'` | 링크의 표시 방식입니다. |
| `color` | `LinkColor` | `'primary'` | 링크의 의미(intent)입니다. 디자인 시스템에 정의된 값만 사용할 수 있습니다. |
| `children` | `React.ReactNode` | — | 링크에 표시될 내용입니다. |
| `startIcon` | `React.ReactNode` | — | 라벨 왼쪽에 표시될 16px 아이콘입니다. |
| `endIcon` | `React.ReactNode` | — | 라벨 오른쪽에 표시될 24px 아이콘입니다. Figma 기본 구성은 `chevron-right` 입니다. |
| `disabled` | `boolean` | `false` | 비활성화 상태입니다. `href` 가 제거되고 포커스를 받지 않습니다. |
| `visited` | `boolean` | `false` | 방문 색을 강제로 적용합니다. 지정하지 않아도 브라우저의 `:visited` 를 따라 방문 색이 적용됩니다. |
| `className` | `string` | — | 여백·정렬 같은 레이아웃 조정용입니다. 색상은 `color` / `variant` 로만 지정할 수 있습니다. |
| `paddingLeft` | `number` | — | 좌측 안쪽 여백(px)입니다. 지정하지 않으면 디자인 시스템 기본값 4px 입니다. |
| `paddingRight` | `number` | — | 우측 안쪽 여백(px)입니다. 지정하지 않으면 디자인 시스템 기본값 4px 입니다. |

## 타입

| 이름 | 값 | 설명 |
| :-- | :-- | :-- |
| `LinkVariant` | `'standalone' \| 'underline'` | 디자인 시스템의 Style 축입니다. `standalone` 은 밑줄 없이 색으로만, `underline` 은 밑줄로 링크임을 표시합니다. |
| `LinkColor` | `'primary' \| 'secondary'` | 디자인 시스템의 Type 축입니다. 임의의 색상 문자열은 받지 않습니다. |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

