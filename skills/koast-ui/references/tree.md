# Tree

Tree 컴포넌트입니다. 파일·폴더 계층을 펼침/접힘으로 보여주고, 추가·삭제·이름변경·이동을 처리합니다. 형제 사이에서는 항상 group 이 앞, item 이 뒤이며, 끌어서 노드 사이에 놓으면 그 자리로 옮겨집니다.

```tsx
import { Tree } from '@koast/ui';
```

## 사용 예

```tsx
const tree: TreeNode = {
  id: 'root', name: '관측소', type: 'group',
  children: [{ id: 'a', name: '수온.csv', type: 'item' }],
};

// 콜백이 reject 하면 트리가 되돌아갑니다. 알림은 콜백에서 띄우고 다시 throw 합니다.
<Tree
  defaultData={tree}
  onNodeAdd={async (node, parentId) => (await api.create(node, parentId)).id}
  onNodeRename={(node, name) => api.rename(node.id, name).catch((e) => { toast('실패'); throw e; })}
  onNodeDelete={(node) => api.remove(node.id)}
  onNodeMove={(node, parentId, index) => api.move(node.id, parentId, index)}
  icons={{ group: <Building2 />, item: <UserRound /> }}
  onSelect={(node) => setCurrent(node)}
/>

// 읽기 전용
<Tree defaultData={tree} readOnly />
```

## Props

### `TreeProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `defaultData` *(필수)* | `TreeNode` | — | 처음 그릴 트리입니다. 마운트 뒤에는 컴포넌트가 상태를 들고 있어 바꿔도 반영되지 않으므로, 서버에서 다시 받은 트리로 새로 그리려면 `key` 를 바꿔 다시 마운트하세요. 형제 사이에 group 과 item 이 섞여 있으면 group 을 앞으로 모아 그립니다. |
| `onChange` | `(data: TreeNode) => void` | — | 추가·이름변경·삭제·이동과 그 되돌리기 뒤에 전체 트리를 돌려줍니다. 펼침/접힘과 마운트 때는 부르지 않습니다. |
| `onNodeAdd` | `(node: TreeNode, parentId: string, index: number) => void \| Promise<string \| void>` | — | 노드를 추가하면 호출됩니다. 문자열로 resolve 하면 그 값을 새 id 로 교체하고, reject 하면 추가를 되돌립니다. 알림은 콜백 안에서 처리한 뒤 다시 throw 하세요. |
| `onNodeRename` | `(node: TreeNode, name: string) => void \| Promise<void>` | — | 이름을 바꾸면 바뀌기 전 노드와 새 이름으로 호출됩니다. reject 하면 이전 이름으로 되돌립니다. |
| `onNodeDelete` | `(node: TreeNode) => void \| Promise<void>` | — | 노드를 지우면 호출됩니다. reject 하면 원래 자리로 되살립니다. |
| `onNodeMove` | `(node: TreeNode, targetParentId: string, index: number) => void \| Promise<void>` | — | 노드를 옮기면 호출됩니다. `index` 는 옮긴 뒤 `targetParentId` 의 자식 중 위치이며, group 이 앞에 모인 순서 기준입니다. 같은 그룹 안 순서 변경도 포함하며, reject 하면 원래 자리로 되돌립니다. |
| `onNodeClick` | `(node: TreeNode, path: number[]) => void` | — |  |
| `onSelect` | `(node: TreeNode \| null, path: number[] \| null) => void` | — | 현재 활성(선택)된 노드가 바뀔 때마다 호출됩니다. `onNodeClick` 이 "무엇을 눌렀나"라면 이건 "지금 무엇이 선택되어 있나"입니다. 선택이 없으면 `null` 이 들어옵니다. |
| `readOnly` | `boolean` | — |  |
| `icons` | `TreeIcons` | — | 종류별 아이콘입니다. 넣지 않은 것은 기본 아이콘을, `groupOpen` 이 없으면 `group` 을 씁니다. |
| `aria-label` | `string` | `'트리'` | 트리 전체의 접근 가능한 이름입니다. |

## 타입

| 이름 | 값 | 설명 |
| :-- | :-- | :-- |
| `TreeDropPosition` | `'before' \| 'after' \| 'inside'` | 끌어서 놓을 자리입니다. 대상 노드의 앞 · 뒤, 또는 그룹 안입니다. |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

