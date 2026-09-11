import { useReducer, useCallback } from 'react';
import { TreeNode, TreeAction } from './types';

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

const findNodeAtPath = (tree: TreeNode, path: number[]): TreeNode | null =>
  path.reduce<TreeNode | null>(
    (node, index) => node?.children?.[index] ?? null,
    tree,
  );

/** `id` 가 `node` 자신이거나 그 하위에 있으면 true 입니다. */
const containsId = (node: TreeNode, id: string): boolean => {
  if (node.id === id) return true;
  return (node.children || []).some((child) => containsId(child, id));
};

const sortNodes = (children: TreeNode[]) => {
  return [...children].sort((a, b) => {
    // 폴더를 먼저 정렬
    if (a.type !== b.type) {
      return a.type === 'folder' ? -1 : 1;
    }

    // 이름으로 정렬 (한글, 영문 모두 지원)
    return a.name.localeCompare(b.name, undefined, {
      numeric: true,
      sensitivity: 'base',
    });
  });
};

/** id 로 노드를 떼어냅니다. 인덱스 경로와 달리 형제 순서가 바뀌어도 안전합니다. */
const removeNodeById = (
  tree: TreeNode,
  id: string,
): { tree: TreeNode; removed: TreeNode | null } => {
  const children = tree.children;
  if (!children?.length) return { tree, removed: null };

  const index = children.findIndex((child) => child.id === id);
  if (index !== -1) {
    return {
      tree: { ...tree, children: children.filter((_, i) => i !== index) },
      removed: children[index],
    };
  }

  let removed: TreeNode | null = null;
  const nextChildren = children.map((child) => {
    if (removed) return child;
    const result = removeNodeById(child, id);
    if (result.removed) removed = result.removed;
    return result.tree;
  });

  return removed ? { tree: { ...tree, children: nextChildren }, removed } : { tree, removed: null };
};

/** id 로 찾은 폴더에 노드를 넣습니다. */
const insertIntoFolderById = (
  tree: TreeNode,
  folderId: string,
  node: TreeNode,
): TreeNode => {
  if (tree.id === folderId) {
    return {
      ...tree,
      isOpen: true,
      children: sortNodes([...(tree.children || []), node]),
    };
  }

  if (!tree.children?.length) return tree;

  return {
    ...tree,
    children: tree.children.map((child) => insertIntoFolderById(child, folderId, node)),
  };
};

const createId = () =>
  `node-${ Date.now().toString(36) }-${ Math.random().toString(36).slice(2, 9) }`;

/** 내부 전용입니다. 배럴로 내보내지 않으며 테스트에서 직접 호출하려고 export 합니다. */
export const treeReducer = (state: TreeNode, action: TreeAction): TreeNode => {
  switch (action.type) {
    case 'addNode': {
      const { path, nodeType, name } = action.payload;
      const type = nodeType || 'file';
      // name 은 비어 있을 때만 기본 이름으로 떨어집니다.
      const nodeName = name?.trim() || (type === 'folder' ? '새 폴더' : '새 파일');

      return updateNodeAtPath(state, path, (node) => ({
        ...node,
        isOpen: true,
        children: sortNodes([
          ...(node.children || []),
          {
            id: createId(),
            name: nodeName,
            type,
            children: type === 'folder' ? [] : undefined,
            isOpen: true,
          },
        ]),
      }));
    }

    case 'deleteNode': {
      const { path } = action.payload;
      const parentPath = path.slice(0, -1);
      const index = path[path.length - 1];

      return updateNodeAtPath(state, parentPath, (node) => ({
        ...node,
        children: sortNodes(
          node.children?.filter((_, i) => i !== index) || [],
        ),
      }));
    }

    case 'renameNode': {
      const { path, name } = action.payload;
      const parentPath = path.slice(0, -1);

      return updateNodeAtPath(state, parentPath, (node) => ({
        ...node,
        children: sortNodes(
          node.children?.map((child, i) =>
            i === path[path.length - 1]
              ? { ...child, name: name?.trim() || child.name }
              : child,
          ) || [],
        ),
      }));
    }

    case 'toggleOpen': {
      const { path } = action.payload;
      return updateNodeAtPath(state, path, (node) => ({
        ...node,
        isOpen: !node.isOpen,
      }));
    }

    case 'moveNode': {
      const { path, targetPath } = action.payload;
      if (!targetPath) return state;

      // 인덱스 경로는 떼어내는 순간 형제 순서가 바뀌어 무효가 됩니다.
      // 손대기 전에 양쪽을 id 로 확정한 뒤 id 기준으로 옮깁니다.
      const source = findNodeAtPath(state, path);
      const target = findNodeAtPath(state, targetPath);
      if (!source || !target) return state;
      if (target.type !== 'folder') return state;
      if (source.id === target.id) return state;

      // 자기 자신이나 자기 하위 폴더로는 옮길 수 없습니다. 옮기면 그 가지가 트리에서 떨어져 나갑니다.
      if (containsId(source, target.id)) return state;

      // 이미 그 폴더 바로 아래에 있으면 옮길 필요가 없습니다.
      if (target.children?.some((child) => child.id === source.id)) return state;

      const { tree: withoutSource, removed } = removeNodeById(state, source.id);
      if (!removed) return state;

      return insertIntoFolderById(withoutSource, target.id, removed);
    }

    default:
      return state;
  }
};

export const useTreeState = (initialData: TreeNode) => {
  const [treeData, dispatch] = useReducer(treeReducer, initialData);

  const addNode = useCallback((path: number[], nodeType: 'file' | 'folder', name?: string) => {
    dispatch({ type: 'addNode', payload: { path, nodeType, name } });
  }, []);

  const deleteNode = useCallback((path: number[]) => {
    dispatch({ type: 'deleteNode', payload: { path } });
  }, []);

  const renameNode = useCallback((path: number[], name: string) => {
    dispatch({ type: 'renameNode', payload: { path, name } });
  }, []);

  const toggleOpen = useCallback((path: number[]) => {
    dispatch({ type: 'toggleOpen', payload: { path } });
  }, []);

  const moveNode = useCallback((path: number[], targetPath: number[]) => {
    dispatch({ type: 'moveNode', payload: { path, targetPath } });
  }, []);

  return {
    treeData,
    actions: {
      addNode,
      deleteNode,
      renameNode,
      toggleOpen,
      moveNode,
    },
  };
};
