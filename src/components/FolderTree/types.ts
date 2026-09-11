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
  'data': TreeNode;
  'onChange'?: (data: TreeNode) => void;
  'initOpenStatus'?: 'open' | 'closed';
  'indentPixels'?: number;
  'onNodeClick'?: (node: TreeNode, path: number[]) => void;
  /**
   * 현재 활성(선택)된 노드가 바뀔 때마다 호출됩니다.
   * `onNodeClick` 이 "무엇을 눌렀나"라면 이건 "지금 무엇이 선택되어 있나"입니다.
   * 선택이 없으면 `null` 이 들어옵니다.
   */
  'onSelectedChange'?: (node: TreeNode | null, path: number[] | null) => void;
  'readOnly'?: boolean;
  /** 트리 전체의 접근 가능한 이름입니다. @default '폴더 트리' */
  'aria-label'?: string;
}
