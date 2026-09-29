# Table

Table 컴포넌트입니다. 컬럼 정의(`columns`)와 행 데이터(`data`)로 표를 그립니다. 셀 내용은 `render` 가 자유롭게 렌더링하고, 테이블은 레이아웃 · 구분선 · 정렬 · 선택 · 로딩/에러/빈 상태만 책임집니다. CSS grid 로 그리므로 `gridTemplateColumns` 에 `fr` 단위를 쓸 수 있습니다.

```tsx
import { Table } from '@koast/ui';
```

## 사용 예

```tsx
const columns: TableColumn<User>[] = [
  { id: 'name', label: '이름', render: (user) => user.name, description: (user) => user.email, sortable: true },
  { id: 'role', label: '권한', align: 'center', render: (user) => <Badge>{user.role}</Badge> },
];

<Table
  data={users}
  columns={columns}
  getRowId={(user) => user.id}
  gridTemplateColumns={'2fr 1fr'}
  sort={sort}
  onSortChange={setSort}
  selectable
  selectedIds={selectedIds}
  onSelectionChange={setSelectedIds}
/>
```

## Props

### `TableProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `data` *(필수)* | `T[]` | — | 행 데이터입니다. |
| `columns` *(필수)* | `TableColumn<T>[]` | — | 컬럼 정의입니다. |
| `getRowId` *(필수)* | `(item: T) => TableRowId` | — | 행을 구분하는 id 를 뽑습니다. 선택 상태도 이 값으로 관리합니다. |
| `gridTemplateColumns` | `string` | — | CSS grid 의 열 템플릿입니다. `selectable` 이면 앞에 체크 열(40px)이 자동으로 붙습니다. |
| `size` | `TableSize` | `'md'` | 디자인 시스템의 Size 축입니다. |
| `isLoading` | `boolean` | `false` | 로딩 상태입니다. 헤더는 남기고 본문 자리에 `loadingContent` 를 그립니다. |
| `isError` | `boolean` | `false` | 에러 상태입니다. |
| `loadingContent` | `React.ReactNode` | `<Spinner />` | 로딩 중 본문 자리에 그릴 내용입니다. |
| `errorContent` | `React.ReactNode` | — | 에러일 때 본문 자리에 그릴 내용입니다. |
| `emptyContent` | `React.ReactNode` | — | 데이터가 없을 때 본문 자리에 그릴 내용입니다. |
| `sort` | `TableSort` | — | 현재 정렬 상태입니다. 정렬 중인 헤더는 Selected 면으로 그려집니다. |
| `onSortChange` | `(sort: TableSort) => void` | — | 정렬 헤더를 누를 때 호출됩니다. 같은 컬럼을 다시 누르면 방향이 뒤집힙니다. |
| `selectable` | `boolean` | `false` | 맨 앞에 체크 열을 붙입니다. |
| `selectedIds` | `TableRowId[]` | — | 선택된 행의 키 목록입니다. |
| `onSelectionChange` | `(selectedIds: TableRowId[]) => void` | — | 행 또는 헤더 체크박스를 누를 때 바뀐 뒤의 선택 목록 전체로 호출됩니다. 헤더 체크박스는 현재 `data` 의 행만 넣고 빼며, `data` 밖의 id 는 그대로 둡니다. |
| `onRowClick` | `(item: T, index: number) => void` | — | 행을 누를 때 호출됩니다. 지정하면 행이 포커스를 받고 Enter 로도 호출됩니다. |
| `aria-label` | `string` | — | 스크린 리더가 읽을 표 이름입니다. |
| `className` | `string` | — | 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. |

## 타입

| 이름 | 값 | 설명 |
| :-- | :-- | :-- |
| `TableSize` | `'sm' \| 'md'` | 디자인 시스템의 Size 축입니다. md 는 헤더 64 · 셀 48px, sm 은 헤더 48 · 셀 40px 입니다. |
| `TableAlign` | `'left' \| 'center' \| 'right'` | 헤더와 셀에 함께 적용되는 가로 정렬입니다. |
| `TableSortDirection` | `'asc' \| 'desc'` |  |
| `TableRowId` | `string \| number` |  |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

