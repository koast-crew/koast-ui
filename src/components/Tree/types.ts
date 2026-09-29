import type React from 'react';

export interface TreeNode {
  id: string;
  name: string;
  /** `group` 은 자식을 가질 수 있고 `item` 은 끝 노드입니다. 형제 사이에서는 항상 group 이 앞, item 이 뒤에 옵니다. */
  type: 'group' | 'item';
  children?: TreeNode[];
  isOpen?: boolean;
}

/** 끌어서 놓을 자리입니다. 대상 노드의 앞 · 뒤, 또는 그룹 안입니다. */
export type TreeDropPosition = 'before' | 'after' | 'inside';

export interface TreeIcons {
  group?: React.ReactNode;
  groupOpen?: React.ReactNode;
  item?: React.ReactNode;
}

export interface TreeProps {
  /**
   * 처음 그릴 트리입니다. 마운트 뒤에는 컴포넌트가 상태를 들고 있어 바꿔도 반영되지 않으므로,
   * 서버에서 다시 받은 트리로 새로 그리려면 `key` 를 바꿔 다시 마운트하세요.
   * 형제 사이에 group 과 item 이 섞여 있으면 group 을 앞으로 모아 그립니다.
   */
  'defaultData': TreeNode;
  /** 추가·이름변경·삭제·이동과 그 되돌리기 뒤에 전체 트리를 돌려줍니다. 펼침/접힘과 마운트 때는 부르지 않습니다. */
  'onChange'?: (data: TreeNode) => void;
  /**
   * 노드를 추가하면 호출됩니다. 문자열로 resolve 하면 그 값을 새 id 로 교체하고, reject 하면 추가를 되돌립니다.
   * 알림은 콜백 안에서 처리한 뒤 다시 throw 하세요.
   */
  'onNodeAdd'?: (node: TreeNode, parentId: string, index: number) => void | Promise<string | void>;
  /** 이름을 바꾸면 바뀌기 전 노드와 새 이름으로 호출됩니다. reject 하면 이전 이름으로 되돌립니다. */
  'onNodeRename'?: (node: TreeNode, name: string) => void | Promise<void>;
  /** 노드를 지우면 호출됩니다. reject 하면 원래 자리로 되살립니다. */
  'onNodeDelete'?: (node: TreeNode) => void | Promise<void>;
  /**
   * 노드를 옮기면 호출됩니다. `index` 는 옮긴 뒤 `targetParentId` 의 자식 중 위치이며, group 이 앞에 모인 순서 기준입니다.
   * 같은 그룹 안 순서 변경도 포함하며, reject 하면 원래 자리로 되돌립니다.
   */
  'onNodeMove'?: (node: TreeNode, targetParentId: string, index: number) => void | Promise<void>;
  'onNodeClick'?: (node: TreeNode, path: number[]) => void;
  /**
   * 현재 활성(선택)된 노드가 바뀔 때마다 호출됩니다.
   * `onNodeClick` 이 "무엇을 눌렀나"라면 이건 "지금 무엇이 선택되어 있나"입니다.
   * 선택이 없으면 `null` 이 들어옵니다.
   */
  'onSelect'?: (node: TreeNode | null, path: number[] | null) => void;
  'readOnly'?: boolean;
  /** 종류별 아이콘입니다. 넣지 않은 것은 기본 아이콘을, `groupOpen` 이 없으면 `group` 을 씁니다. */
  'icons'?: TreeIcons;
  /** 트리 전체의 접근 가능한 이름입니다. @default '트리' */
  'aria-label'?: string;
}
