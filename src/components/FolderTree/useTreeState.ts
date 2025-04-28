import { useReducer, useCallback } from 'react';
import { TreeNode, TreeAction } from './types';

const updateNodeAtPath = (
  tree: TreeNode,
  path: number[],
  updater: (node: TreeNode)=> TreeNode,
): TreeNode => {
  if (path.length === 0) return updater(tree);

  const [index, ...restPath] = path;
  const children = [...(tree.children || [])];
  children[index] = updateNodeAtPath(children[index], restPath, updater);

  return { ...tree, children };
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

const treeReducer = (state: TreeNode, action: TreeAction): TreeNode => {
  switch (action.type) {
    case 'addNode': {
      const { path, nodeType, name } = action.payload;
      return updateNodeAtPath(state, path, (node) => ({
        ...node,
        isOpen: true,
        children: sortNodes([
          ...(node.children || []),
          {
            id: Math.random().toString(36).substr(2, 9),
            name: name || nodeType === 'folder' ? '새 폴더' : '새 파일',
            type: nodeType || 'file',
            children: nodeType === 'folder' ? [] : undefined,
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
              ? { ...child, name: name || child.name }
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

      // 이동할 노드 가져오기
      let nodeToMove: TreeNode | null = null;
      const sourceState = updateNodeAtPath(state, path.slice(0, -1), (node) => {
        const index = path[path.length - 1];
        const children = [...(node.children || [])];
        nodeToMove = children[index];
        return {
          ...node,
          children: sortNodes(children.filter((_, i) => i !== index)),
        };
      });

      if (!nodeToMove) return state;

      // 새 위치에 노드 추가
      return updateNodeAtPath(sourceState, targetPath, (node) => ({
        ...node,
        isOpen: true,
        children: sortNodes([...(node.children || []), nodeToMove!]),
      }));
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