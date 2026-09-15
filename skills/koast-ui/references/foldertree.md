# FolderTree

FolderTree(폴더 트리) 컴포넌트입니다. 파일·폴더 계층을 펼침/접힘으로 보여주고, 추가·삭제·이름변경·이동을 처리합니다.

```tsx
import { FolderTree } from '@koast/ui';
```

## 사용 예

```tsx
const [tree, setTree] = useState<TreeNode>({
  id: 'root', name: '관측소', type: 'folder',
  children: [{ id: 'a', name: '수온.csv', type: 'file' }],
});

<FolderTree
  data={tree}
  onChange={setTree}
  onSelectedChange={(node) => setCurrent(node)}
/>

// 읽기 전용
<FolderTree data={tree} readOnly />
```

## Props

### `FolderTreeProps`

| prop | 타입 | 기본값 | 설명 |
| :-- | :-- | :-- | :-- |
| `data` *(필수)* | `TreeNode` | — |  |
| `onChange` | `(data: TreeNode) => void` | — |  |
| `initOpenStatus` | `'open' \| 'closed'` | — |  |
| `indentPixels` | `number` | — |  |
| `onNodeClick` | `(node: TreeNode, path: number[]) => void` | — |  |
| `onSelectedChange` | `(node: TreeNode \| null, path: number[] \| null) => void` | — | 현재 활성(선택)된 노드가 바뀔 때마다 호출됩니다. `onNodeClick` 이 "무엇을 눌렀나"라면 이건 "지금 무엇이 선택되어 있나"입니다. 선택이 없으면 `null` 이 들어옵니다. |
| `readOnly` | `boolean` | — |  |
| `aria-label` | `string` | `'폴더 트리'` | 트리 전체의 접근 가능한 이름입니다. |

## 규칙

- 색은 `color` / `status` / `variant` 같은 정해진 intent 로만 지정합니다. `className` 으로 색 클래스를 넣지 마세요.
- `className` 은 너비·여백·정렬 같은 레이아웃 조정에만 씁니다.

