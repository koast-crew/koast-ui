# Pagination

Pagination 컴포넌트입니다. 여러 페이지로 나뉜 목록을 번호와 이전/다음 버튼으로 옮겨 다닙니다. 번호 칸은 `siblingCount * 2 + 5` 개로 고정되고 넘치는 구간은 생략 표시(…)로 접힙니다.

```tsx
import { Pagination } from '@koast/ui';
```

## 사용 예

```tsx
// 비제어
<Pagination count={20} onChange={(page) => load(page)} />

// 제어 + 양옆 2개씩 노출
<Pagination count={50} page={page} onChange={setPage} siblingCount={2} />
```

## Props

### `PaginationProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `count` *(필수)* | `number` | — | 전체 페이지 수입니다. 1 미만이면 아무것도 그리지 않습니다. |
| `page` | `number` | — | 현재 페이지(1부터 시작)입니다. 지정하면 제어 컴포넌트로 동작합니다. |
| `defaultPage` | `number` | `1` | 비제어로 쓸 때의 초기 페이지입니다. |
| `onChange` | `(page: number) => void` | — | 페이지가 바뀔 때 호출됩니다. 범위를 벗어난 이동은 호출되지 않습니다. |
| `siblingCount` | `number` | `1` | 현재 페이지 양옆에 항상 보이는 페이지 수입니다. 1 이면 번호 칸이 최대 7개입니다. |
| `disabled` | `boolean` | `false` | 전체를 비활성화합니다. 번호·이전·다음 모두 누를 수 없습니다. |
| `previousLabel` | `string` | `'이전 페이지'` | 이전 버튼의 접근 가능한 이름입니다. |
| `nextLabel` | `string` | `'다음 페이지'` | 다음 버튼의 접근 가능한 이름입니다. |
| `pageLabel` | `(page: number) => string` | `(page) => `${page} 페이지`` | 번호 버튼의 접근 가능한 이름을 만듭니다. |
| `className` | `string` | — | 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. |
| `id` | `string` | — | 루트 요소의 id 입니다. 내부 요소 id 의 접두사로도 쓰입니다. |

## 타입

| 이름 | 값 | 설명 |
| :-- | :-- | :-- |
| `PaginationItem` | `number \| 'ellipsis'` | 페이지 목록의 한 칸입니다. `'ellipsis'` 는 생략 표시(…)입니다. |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

