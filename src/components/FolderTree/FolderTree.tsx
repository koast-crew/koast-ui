import React from 'react';
import { FolderTreeProps, TreeNode as TreeNodeType } from './types';
import { useTreeState } from './useTreeState';
import TreeNode from './TreeNode';

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
