import React from 'react';
import { TreeDropPosition, TreeNode, TreeProps } from './types';
import {
  TreeAction,
  containsId,
  createId,
  findNodeAtPath,
  findNodeById,
  findParentById,
  findPathById,
  getIndexRange,
  treeReducer,
  useTreeState,
} from './useTreeState';
import TreeItem from './TreeItem';

/**
 * @koast/ui Tree 컴포넌트입니다.
 * 파일·폴더 계층을 펼침/접힘으로 보여주고, 추가·삭제·이름변경·이동을 처리합니다.
 * 형제 사이에서는 항상 group 이 앞, item 이 뒤이며, 끌어서 노드 사이에 놓으면 그 자리로 옮겨집니다.
 *
 * @param {TreeNode} props.defaultData - 처음 그릴 루트 노드입니다. 하위는 `children` 으로 중첩하며, 마운트 뒤 바꿔도 반영되지 않아 새 트리는 `key` 를 바꿔 다시 마운트합니다 : TreeNode
 * @param {(data: TreeNode) => void} [props.onChange] - 추가·이름변경·삭제·이동 뒤 전체 트리. 펼침/접힘과 마운트 때는 부르지 않습니다 : (data) => void
 * @param {Function} [props.onNodeAdd] - 추가 콜백. 문자열로 resolve 하면 새 id 로 교체, reject 하면 되돌립니다 : (node, parentId, index) => void | Promise<string | void>
 * @param {Function} [props.onNodeRename] - 이름변경 콜백. reject 하면 되돌립니다 : (node, name) => void | Promise<void>
 * @param {Function} [props.onNodeDelete] - 삭제 콜백. reject 하면 되돌립니다 : (node) => void | Promise<void>
 * @param {Function} [props.onNodeMove] - 이동 · 순서 변경 콜백. `index` 는 옮긴 뒤 위치이며 reject 하면 되돌립니다 : (node, targetParentId, index) => void | Promise<void>
 * @param {(node: TreeNode, path: number[]) => void} [props.onNodeClick] - 노드를 눌렀을 때 : (node, path) => void
 * @param {(node: TreeNode | null, path: number[] | null) => void} [props.onSelect] - 선택된 노드가 바뀔 때. 선택이 없으면 null : (node, path) => void
 * @param {boolean} [props.readOnly=false] - 편집 메뉴를 숨깁니다 : boolean
 * @param {TreeIcons} [props.icons] - 종류별 아이콘. 없는 것은 기본 아이콘 : { group?, groupOpen?, item? }
 * @param {string} [props['aria-label']='트리'] - 트리 전체의 접근 가능한 이름 : string
 *
 * @example
 * ```tsx
 * const tree: TreeNode = {
 *   id: 'root', name: '관측소', type: 'group',
 *   children: [{ id: 'a', name: '수온.csv', type: 'item' }],
 * };
 *
 * // 콜백이 reject 하면 트리가 되돌아갑니다. 알림은 콜백에서 띄우고 다시 throw 합니다.
 * <Tree
 *   defaultData={tree}
 *   onNodeAdd={async (node, parentId) => (await api.create(node, parentId)).id}
 *   onNodeRename={(node, name) => api.rename(node.id, name).catch((e) => { toast('실패'); throw e; })}
 *   onNodeDelete={(node) => api.remove(node.id)}
 *   onNodeMove={(node, parentId, index) => api.move(node.id, parentId, index)}
 *   icons={{ group: <Building2 />, item: <UserRound /> }}
 *   onSelect={(node) => setCurrent(node)}
 * />
 *
 * // 읽기 전용
 * <Tree defaultData={tree} readOnly />
 * ```
 */
export function Tree(props: TreeProps) {
  const {
    defaultData,
    onChange,
    onNodeAdd,
    onNodeRename,
    onNodeDelete,
    onNodeMove,
    onNodeClick,
    onSelect,
    readOnly = false,
    icons,
    'aria-label': ariaLabel,
  } = props;
  const [treeData, dispatch] = useTreeState(defaultData);
  const [selectedId, setSelectedId] = React.useState<string>();
  const [draggingId, setDraggingId] = React.useState<string | null>(null);
  const [dropTarget, setDropTarget] = React.useState<{ id: string; position: TreeDropPosition } | null>(null);
  const treeRef = React.useRef(treeData);
  treeRef.current = treeData;
  const changedRef = React.useRef(false);
  // 인라인 콜백이 렌더마다 바뀌어도 effect 가 다시 돌지 않도록 최신 값만 ref 로 들고 있습니다.
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;
  const onSelectRef = React.useRef(onSelect);
  onSelectRef.current = onSelect;

  React.useEffect(() => {
    if (!changedRef.current) return;
    changedRef.current = false;
    onChangeRef.current?.(treeData);
  }, [treeData]);

  // 서버 응답으로 바뀐 id 를 따라가, 교체 전에 잡힌 되돌리기도 현재 노드를 가리키게 합니다.
  const idMapRef = React.useRef(new Map<string, string>());
  const resolveId = (id: string) => {
    let current = id;
    while (idMapRef.current.has(current)) current = idMapRef.current.get(current)!;
    return current;
  };

  const commit = (action: TreeAction) => {
    if (treeReducer(treeRef.current, action) === treeRef.current) return;
    changedRef.current = true;
    if (action.type === 'replaceId') {
      idMapRef.current.set(action.id, action.newId);
      setSelectedId((id) => id === action.id ? action.newId : id);
    }
    dispatch(action);
  };

  /** 콜백이 throw 하거나 reject 하면 `rollback` 으로 방금 편집을 되돌립니다. */
  function run<R>(call: (() => R | Promise<R>) | undefined, rollback: () => void, onResolve?: (value: R) => void) {
    if (!call) return;
    let result: R | Promise<R>;
    try {
      result = call();
    } catch (error) {
      rollback();
      throw error;
    }
    Promise.resolve(result).then((value) => onResolve?.(value), rollback);
  }

  const actions = {
    toggleOpen: (path: number[]) => dispatch({ type: 'toggleOpen', path }),

    addNode: (path: number[], type: 'item' | 'group') => {
      const parent = findNodeAtPath(treeRef.current, path);
      if (!parent) return;
      const node: TreeNode = {
        id: createId(),
        name: type === 'group' ? '새 폴더' : '새 파일',
        type,
        children: type === 'group' ? [] : undefined,
        isOpen: true,
      };
      const index = getIndexRange(parent.children || [], type)[1];
      commit({ type: 'insert', parentId: parent.id, node, index });
      run(
        onNodeAdd && (() => onNodeAdd(node, parent.id, index)),
        () => commit({ type: 'remove', id: resolveId(node.id) }),
        (newId) => {
          if (typeof newId === 'string' && newId !== node.id) commit({ type: 'replaceId', id: node.id, newId });
        },
      );
    },

    deleteNode: (path: number[]) => {
      if (path.length === 0) return;
      const node = findNodeAtPath(treeRef.current, path);
      const parent = node && findParentById(treeRef.current, node.id);
      if (!node || !parent) return;
      const index = parent.children!.indexOf(node);
      commit({ type: 'remove', id: node.id });
      run(
        onNodeDelete && (() => onNodeDelete(node)),
        () => commit({ type: 'insert', parentId: resolveId(parent.id), node, index }),
      );
    },

    renameNode: (path: number[], name: string) => {
      const node = findNodeAtPath(treeRef.current, path);
      const nextName = name.trim();
      if (!node || !nextName || nextName === node.name) return;
      commit({ type: 'rename', id: node.id, name: nextName });
      run(
        onNodeRename && (() => onNodeRename(node, nextName)),
        () => commit({ type: 'rename', id: resolveId(node.id), name: node.name }),
      );
    },

  };

  /**
   * 끌고 있는 노드를 `id` 의 앞 · 뒤 · 안에 놓았을 때의 부모와 위치입니다.
   * 자기 자신이나 하위로 들어가거나, 제자리라 바뀌는 게 없으면 null 입니다.
   */
  const resolveDrop = (id: string, position: TreeDropPosition) => {
    const tree = treeRef.current;
    const source = draggingId ? findNodeById(tree, draggingId) : null;
    const sourceParent = source && findParentById(tree, source.id);
    if (!source || !sourceParent || source.id === id) return null;

    const parent = position === 'inside' ? findNodeById(tree, id) : findParentById(tree, id);
    if (!parent || parent.type !== 'group' || containsId(source, parent.id)) return null;

    const siblings = (parent.children || []).filter((child) => child.id !== source.id);
    const [min, max] = getIndexRange(siblings, source.type);
    const index = position === 'inside' ? min : siblings.findIndex((child) => child.id === id) + (position === 'after' ? 1 : 0);
    // group 은 item 뒤로, item 은 group 앞으로 갈 수 없습니다.
    if (index < min || index > max) return null;
    if (parent.id === sourceParent.id && index === sourceParent.children!.indexOf(source)) return null;

    return { source, sourceParent, parentId: parent.id, index };
  };

  const endDrag = () => {
    setDraggingId(null);
    setDropTarget(null);
  };

  const drop = () => {
    const resolved = dropTarget && resolveDrop(dropTarget.id, dropTarget.position);
    endDrag();
    if (!resolved) return;

    const { source, sourceParent, parentId, index } = resolved;
    const originalIndex = sourceParent.children!.indexOf(source);
    commit({ type: 'move', id: source.id, parentId, index });
    run(
      onNodeMove && (() => onNodeMove(source, parentId, index)),
      () => commit({ type: 'move', id: resolveId(source.id), parentId: resolveId(sourceParent.id), index: originalIndex }),
    );
  };

  const drag = {
    target: dropTarget,
    start: setDraggingId,
    over: (id: string, overPosition: TreeDropPosition) => {
      // 그룹 행의 위 · 아래 끝이 놓을 수 없는 자리면 그 그룹 안으로 받아 빈 구간을 없앱니다.
      const position = !resolveDrop(id, overPosition) && resolveDrop(id, 'inside') ? 'inside' : overPosition;
      const valid = Boolean(resolveDrop(id, position));
      setDropTarget((prev) => {
        if (!valid) return null;
        return prev?.id === id && prev.position === position ? prev : { id, position };
      });
    },
    end: endDrag,
  };

  const selectedNode = selectedId ? findNodeById(treeData, selectedId) : null;
  const selectedPathKey = selectedId ? findPathById(treeData, selectedId)?.join('-') ?? null : null;
  const selectedNodeRef = React.useRef(selectedNode);
  selectedNodeRef.current = selectedNode;
  // 펼침처럼 선택과 무관한 변경에는 부르지 않도록 id · 경로 · 이름이 바뀔 때만 알립니다.
  const selectionKey = selectedId === undefined ? undefined : `${ selectedId }|${ selectedPathKey }|${ selectedNode?.name }`;

  React.useEffect(() => {
    if (selectionKey === undefined) return;
    onSelectRef.current?.(selectedNodeRef.current, selectedPathKey === null ? null : selectedPathKey.split('-').filter(Boolean).map(Number));
  }, [selectionKey, selectedPathKey]);

  return (
    <div
      role={'tree'}
      aria-label={ariaLabel ?? '트리'}
      className={'koast-max-h-[800px] koast-overflow-y-auto koast-overflow-x-hidden'}
      onDragOver={(e) => {
        if (draggingId) e.preventDefault();
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDropTarget(null);
      }}
      onDrop={(e) => {
        e.preventDefault();
        drop();
      }}
    >
      <TreeItem
        node={treeData}
        path={[]}
        level={0}
        actions={actions}
        onNodeClick={onNodeClick}
        readOnly={readOnly}
        selectedId={selectedId}
        onSelectId={setSelectedId}
        icons={icons}
        drag={drag}
      />
    </div>
  );
}

export default Tree;
