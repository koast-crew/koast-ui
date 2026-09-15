import React from 'react';
import { FolderTreeProps, TreeNode as TreeNodeType } from './types';
import { useTreeState } from './useTreeState';
import TreeNode from './TreeNode';

/**
 * @koast/ui FolderTree(폴더 트리) 컴포넌트입니다.
 * 파일·폴더 계층을 펼침/접힘으로 보여주고, 추가·삭제·이름변경·이동을 처리합니다.
 *
 * @param {TreeNode} props.data - 루트 노드입니다. 하위는 `children` 으로 중첩합니다 : TreeNode
 * @param {(data: TreeNode) => void} [props.onChange] - 트리가 바뀔 때마다 전체 트리를 돌려줍니다 : (data) => void
 * @param {(node: TreeNode, path: number[]) => void} [props.onNodeClick] - 노드를 눌렀을 때 : (node, path) => void
 * @param {(node: TreeNode | null, path: number[] | null) => void} [props.onSelectedChange] - 선택된 노드가 바뀔 때. 선택이 없으면 null : (node, path) => void
 * @param {number} [props.indentPixels=12] - 단계별 들여쓰기 폭 : number
 * @param {boolean} [props.readOnly=false] - 편집 메뉴를 숨깁니다 : boolean
 * @param {string} [props['aria-label']='폴더 트리'] - 트리 전체의 접근 가능한 이름 : string
 *
 * @example
 * ```tsx
 * const [tree, setTree] = useState<TreeNode>({
 *   id: 'root', name: '관측소', type: 'folder',
 *   children: [{ id: 'a', name: '수온.csv', type: 'file' }],
 * });
 *
 * <FolderTree
 *   data={tree}
 *   onChange={setTree}
 *   onSelectedChange={(node) => setCurrent(node)}
 * />
 *
 * // 읽기 전용
 * <FolderTree data={tree} readOnly />
 * ```
 */
export function FolderTree(props: FolderTreeProps) {
  const {
    data,
    onChange,
    indentPixels = 12,
    onNodeClick,
    onSelectedChange,
    readOnly = false,
    'aria-label': ariaLabel,
  } = props;
  const { treeData, actions } = useTreeState(data);
  const [selectedPath, setSelectedPath] = React.useState<string>();

  React.useEffect(() => {
    onChange?.(treeData);
  }, [treeData, onChange]);

  /** 'a-b-c' 형태의 선택 경로를 실제 노드로 되짚습니다. */
  const selectedNode = React.useMemo(() => {
    if (!selectedPath) return null;
    const indexes = selectedPath === '' ? [] : selectedPath.split('-').map(Number);
    return indexes.reduce<TreeNodeType | null>(
      (node, index) => node?.children?.[index] ?? null,
      treeData,
    );
  }, [selectedPath, treeData]);

  React.useEffect(() => {
    if (selectedPath === undefined) return;
    const indexes = selectedPath === '' ? [] : selectedPath.split('-').map(Number);
    onSelectedChange?.(selectedNode, selectedNode ? indexes : null);
  }, [selectedNode, selectedPath, onSelectedChange]);

  return (
    <div
      role={'tree'}
      aria-label={ariaLabel ?? '폴더 트리'}
      className={'koast-max-h-[800px] koast-overflow-y-auto koast-overflow-x-hidden'}
    >
      <TreeNode
        node={treeData}
        path={[]}
        level={0}
        actions={actions}
        indentPixels={indentPixels}
        onNodeClick={onNodeClick}
        readOnly={readOnly}
        selectedPath={selectedPath}
        onSelect={setSelectedPath}
      />
    </div>
  );
}

export default FolderTree;
