# Accordion

Accordion 컴포넌트입니다. 여러 항목을 세로로 쌓아 제목만 보여주다가, 헤더를 누르면 해당 내용을 펼칩니다. 기본은 한 번에 하나만 펼쳐지며 `multiple` 로 다중 펼침으로 바꿉니다. 헤더 사이는 위/아래 방향키와 Home / End 로 이동하고, Enter / Space 로 펼치고 접습니다. 펼침·접힘은 200ms 높이 전환으로 이어집니다. 운영체제에서 동작 줄이기를 켜면 즉시 전환됩니다.

```tsx
import { Accordion } from '@koast/ui';
```

## 사용 예

```tsx
<Accordion defaultValue={['faq-1']}>
  <AccordionItem value="faq-1" title="배송 문의">영업일 기준 2~3일 소요됩니다.</AccordionItem>
  <AccordionItem value="faq-2" title="교환 문의">수령 후 7일 이내 가능합니다.</AccordionItem>
</Accordion>

// 다중 펼침 + 제어
<Accordion multiple size="sm" value={open} onChange={setOpen}>
  <AccordionItem value="a" title="A">내용 A</AccordionItem>
  <AccordionItem value="b" title="B">내용 B</AccordionItem>
</Accordion>
```

## Props

### `AccordionProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `size` | `AccordionSize` | `'md'` | 헤더 높이·제목 크기입니다. md=48px, sm=40px. |
| `multiple` | `boolean` | `false` | 여러 항목을 동시에 펼칠 수 있게 합니다. |
| `value` | `string[]` | — | 펼쳐진 항목의 `value` 목록입니다. 지정하면 제어 컴포넌트로 동작합니다. |
| `defaultValue` | `string[]` | — | 비제어로 쓸 때의 초기 펼침 목록입니다. |
| `onChange` | `(expanded: string[]) => void` | — | 펼침 상태가 바뀔 때 호출됩니다. `multiple` 이 false 면 길이가 0 또는 1 입니다. |
| `headingLevel` | `AccordionHeadingLevel` | `3` | 헤더를 감싸는 제목 태그의 단계입니다. |
| `className` | `string` | — | 너비·여백 같은 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. |
| `children` *(필수)* | `React.ReactNode` | — | 항목 목록입니다. `AccordionItem` 만 넣습니다. |
| `id` | `string` | — |  |

### `AccordionItemProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `value` *(필수)* | `string` | — | 항목을 구분하는 값입니다. 펼침 상태의 키로 쓰입니다. |
| `title` *(필수)* | `React.ReactNode` | — | 헤더에 표시되는 제목입니다. |
| `children` *(필수)* | `React.ReactNode` | — | 펼쳤을 때 표시되는 내용입니다. |
| `disabled` | `boolean` | `false` | 비활성화 상태입니다. 펼치거나 접을 수 없고 키보드 이동에서도 건너뜁니다. |
| `className` | `string` | — | 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. |

## 타입

| 이름 | 값 | 설명 |
| :-- | :-- | :-- |
| `AccordionSize` | `'sm' \| 'md'` | 디자인 시스템의 Type 축입니다. default=48px, compact=40px 헤더 높이에 대응합니다. |
| `AccordionHeadingLevel` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | 헤더를 감싸는 제목 태그의 단계입니다. 문서 구조에 맞춰 조정합니다. |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

