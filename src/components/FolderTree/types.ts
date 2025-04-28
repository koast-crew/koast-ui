export interface TreeNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: TreeNode[];
  isOpen?: boolean;
  isEditing?: boolean;
}

export interface TreeAction {
  type: 'addNode' | 'deleteNode' | 'renameNode' | 'toggleOpen' | 'moveNode';
  payload: {
    path: number[];
    nodeType?: 'file' | 'folder';
    name?: string;
    targetPath?: number[];
  };
}

export interface FolderTreeProps {
  data: TreeNode;
  onChange?: (data: TreeNode)=> void;
  initOpenStatus?: 'open' | 'closed';
  indentPixels?: number;
  onNodeClick?: (node: TreeNode, path: number[])=> void;
  readOnly?: boolean;
}