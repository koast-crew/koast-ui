import { useReducer } from 'react';
import { TreeNode } from './types';

/** 내부 전용 액션입니다. 경로는 형제 순서가 바뀌면 무효가 되므로 편집은 모두 id 로 가리킵니다. */
export type TreeAction =
  | { type: 'toggleOpen'; path: number[] }
  | { type: 'insert'; parentId: string; node: TreeNode; index?: number }
  | { type: 'remove'; id: string }
  | { type: 'rename'; id: string; name: string }
  | { type: 'move'; id: string; parentId: string; index: number }
  | { type: 'replaceId'; id: string; newId: string };

const updateNodeAtPath = (
  tree: TreeNode,
  path: number[],
  updater: (node: TreeNode) => TreeNode,
): TreeNode => {
  if (path.length === 0) return updater(tree);

  const [index, ...restPath] = path;
  const children = [...(tree.children || [])];
  if (!children[index]) return tree;
  children[index] = updateNodeAtPath(children[index], restPath, updater);

  return { ...tree, children };
};

/** id 로 찾은 노드 하나에만 `updater` 를 적용합니다. */
const updateNodeById = (
  tree: TreeNode,
  id: string,
  updater: (node: TreeNode) => TreeNode,
): TreeNode => {
  if (tree.id === id) return updater(tree);
  if (!tree.children?.length) return tree;

  let changed = false;
  const children = tree.children.map((child) => {
    const next = updateNodeById(child, id, updater);
    if (next !== child) changed = true;
    return next;
  });

  return changed ? { ...tree, children } : tree;
};

export const findNodeAtPath = (tree: TreeNode, path: number[]): TreeNode | null =>
  path.reduce<TreeNode | null>(
    (node, index) => node?.children?.[index] ?? null,
    tree,
  );

/** `id` 가 `node` 자신이거나 그 하위에 있으면 true 입니다. */
export const containsId = (node: TreeNode, id: string): boolean => {
  if (node.id === id) return true;
  return (node.children || []).some((child) => containsId(child, id));
};

/** `id` 를 바로 아래 자식으로 가진 노드를 찾습니다. */
export const findParentById = (tree: TreeNode, id: string): TreeNode | null => {
  if (tree.children?.some((child) => child.id === id)) return tree;
  for (const child of tree.children || []) {
    const found = findParentById(child, id);
    if (found) return found;
  }
  return null;
};

const removeNodeById = (
  tree: TreeNode,
  id: string,
): { tree: TreeNode; removed: TreeNode | null } => {
  const parent = findParentById(tree, id);
  if (!parent) return { tree, removed: null };

  const removed = parent.children!.find((child) => child.id === id)!;
  return {
    tree: updateNodeById(tree, parent.id, (node) => ({
      ...node,
      children: node.children!.filter((child) => child.id !== id),
    })),
    removed,
  };
};

/** `index` 는 종류별 구간 안으로 좁혀지고, 없으면 그 구간의 맨 뒤에 넣습니다. */
const insertIntoGroupById = (
  tree: TreeNode,
  groupId: string,
  node: TreeNode,
  index?: number,
): TreeNode =>
  updateNodeById(tree, groupId, (group) => {
    const children = [...(group.children || [])];
    const [min, max] = getIndexRange(children, node.type);
    children.splice(Math.min(Math.max(index ?? max, min), max), 0, node);
    return { ...group, isOpen: true, children };
  });

/** 형제 중 `type` 이 들어갈 수 있는 index 범위입니다. group 은 앞 구간, item 은 뒤 구간입니다. */
export const getIndexRange = (children: TreeNode[], type: TreeNode['type']): [number, number] => {
  const groups = children.filter((child) => child.type === 'group').length;
  return type === 'group' ? [0, groups] : [groups, children.length];
};

/** 데이터가 섞여 들어와도 모든 그룹에서 group 을 앞으로, item 을 뒤로 모읍니다. 각 구간의 순서는 유지합니다. */
export const normalizeOrder = (node: TreeNode): TreeNode => {
  if (!node.children) return node;
  const children = node.children.map(normalizeOrder);
  return {
    ...node,
    children: [...children.filter((child) => child.type === 'group'), ...children.filter((child) => child.type === 'item')],
  };
};

export const createId = () =>
  `node-${ Date.now().toString(36) }-${ Math.random().toString(36).slice(2, 9) }`;

/** 내부 전용입니다. 배럴로 내보내지 않으며 테스트에서 직접 호출하려고 export 합니다. */
export const treeReducer = (state: TreeNode, action: TreeAction): TreeNode => {
  switch (action.type) {
    case 'toggleOpen':
      return updateNodeAtPath(state, action.path, (node) => ({
        ...node,
        isOpen: !node.isOpen,
      }));

    case 'insert':
      return insertIntoGroupById(state, action.parentId, action.node, action.index);

    case 'remove':
      return removeNodeById(state, action.id).tree;

    case 'rename':
      return updateNodeById(state, action.id, (node) => ({ ...node, name: action.name }));

    case 'move': {
      const target = findNodeById(state, action.parentId);
      const source = findNodeById(state, action.id);
      if (!source || !target || target.type !== 'group') return state;
      // 자기 자신이나 자기 하위 그룹으로 옮기면 그 가지가 트리에서 떨어져 나갑니다.
      if (containsId(source, target.id)) return state;

      const { tree, removed } = removeNodeById(state, action.id);
      return removed ? insertIntoGroupById(tree, action.parentId, removed, action.index) : state;
    }

    case 'replaceId':
      return updateNodeById(state, action.id, (node) => ({ ...node, id: action.newId }));

    default:
      return state;
  }
};

export const findNodeById = (tree: TreeNode, id: string): TreeNode | null => {
  if (tree.id === id) return tree;
  for (const child of tree.children || []) {
    const found = findNodeById(child, id);
    if (found) return found;
  }
  return null;
};

/** 루트에서 `id` 까지의 인덱스 경로입니다. 없으면 null 입니다. */
export const findPathById = (tree: TreeNode, id: string): number[] | null => {
  if (tree.id === id) return [];
  for (const [index, child] of (tree.children || []).entries()) {
    const rest = findPathById(child, id);
    if (rest) return [index, ...rest];
  }
  return null;
};

export const useTreeState = (initialData: TreeNode) => useReducer(treeReducer, initialData, normalizeOrder);
