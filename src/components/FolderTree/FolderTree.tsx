import React from 'react';
import { FolderTreeProps } from './types';
import { useTreeState } from './useTreeState';
import TreeNode from './TreeNode';

export function FolderTree(props: FolderTreeProps) {
  const {
    data,
    onChange,
    indentPixels = 12,
    onNodeClick,
    readOnly = false,
  } = props;
  const { treeData, actions } = useTreeState(data);
  const [selectedPath, setSelectedPath] = React.useState<string>();

  React.useEffect(() => {
    onChange?.(treeData);
  }, [treeData, onChange]);

  return (
    <div className={'max-h-[800px] overflow-y-auto overflow-x-hidden'}>
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
