import React, { useRef, useState } from 'react';
import { TreeDropPosition, TreeIcons, TreeNode } from './types';
import { ChevronDown, ChevronRight, File, Folder, FolderOpen, FilePlus2, FolderPlus, PencilLine, Trash2 } from 'lucide-react';

interface TreeItemProps {
  node: TreeNode;
  path: number[];
  level: number;
  actions: {
    addNode: (path: number[], type: 'item' | 'group') => void;
    deleteNode: (path: number[]) => void;
    renameNode: (path: number[], name: string) => void;
    toggleOpen: (path: number[]) => void;
  };
  readOnly: boolean;
  selectedId?: string;
  onNodeClick?: (node: TreeNode, path: number[]) => void;
  onSelectId?: (id: string) => void;
  icons?: TreeIcons;
  drag: {
    target: { id: string; position: TreeDropPosition } | null;
    start: (id: string) => void;
    over: (id: string, position: TreeDropPosition) => void;
    end: () => void;
  };
}

/** 앞 · 뒤는 행 사이의 선으로, 그룹 안은 그 그룹 행의 테두리로 보여줍니다. */
const DROP_LINE_POSITION: Record<Exclude<TreeDropPosition, 'inside'>, string> = {
  before: '-koast-top-[5px]',
  after: '-koast-bottom-[5px]',
};

/** 끄는 동안 커서를 따라다니는 이름표입니다. 브라우저가 스냅샷을 뜬 뒤 바로 지웁니다. */
const attachDragGhost = (e: React.DragEvent, name: string) => {
  const ghost = document.createElement('div');
  ghost.className = 'koast-fixed koast-left-0 koast-top-[-1000px] koast-rounded-md koast-bg-primary koast-px-2 koast-py-1 koast-text-sm koast-text-primary koast-ring-1 koast-ring-inset koast-ring-interactive-primary';
  ghost.textContent = name;
  document.body.appendChild(ghost);
  e.dataTransfer.setDragImage(ghost, -12, -12);
  setTimeout(() => ghost.remove(), 0);
};

/** 단계별 들여쓰기 폭(px)입니다. item 도 group 과 같은 폭이라 아이콘이 chevron 자리에 맞춰집니다. */
const INDENT = 18;

const TreeItem = (props: TreeItemProps) => {
  const {
    node,
    path,
    level,
    actions,
    readOnly,
    selectedId,
    onNodeClick,
    onSelectId,
    icons,
    drag,
  } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(node.name);
  const selected = selectedId === node.id;
  const dropPosition = drag.target?.id === node.id ? drag.target.position : null;

  const rowRef = useRef<HTMLDivElement>(null);
  // Enter · Escape 뒤 input 이 사라지며 blur 가 한 번 더 와도 두 번 처리하지 않습니다.
  const editingRef = useRef(false);

  /** 되돌리기나 id 교체로 이름이 바뀌었을 수 있어, 편집을 열 때마다 현재 이름에서 시작합니다. */
  const startEditing = () => {
    editingRef.current = true;
    setEditName(node.name);
    setIsEditing(true);
  };

  const finishEditing = (save: boolean, refocus: boolean) => {
    if (!editingRef.current) return;
    editingRef.current = false;
    if (save) actions.renameNode(path, editName);
    setIsEditing(false);
    if (refocus) rowRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') finishEditing(true, true);
    if (e.key === 'Escape') finishEditing(false, true);
  };

  const handleNodeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectNode();
  };

  const selectNode = () => {
    onSelectId?.(node.id);

    if (node.type === 'group') {
      actions.toggleOpen(path);
    }
    onNodeClick?.(node, path);
  };

  /** 트리 행의 키보드 조작입니다. WAI-ARIA tree 패턴을 따릅니다. */
  const handleRowKeyDown = (e: React.KeyboardEvent) => {
    if (isEditing) return;
    // 작업 버튼·입력란에서 올라온 키는 그쪽이 처리합니다. 행이 직접 포커스일 때만 반응합니다.
    if (e.target !== e.currentTarget) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        e.stopPropagation();
        selectNode();
        break;
      case 'ArrowRight':
        if (node.type === 'group' && !node.isOpen) {
          e.preventDefault();
          e.stopPropagation();
          actions.toggleOpen(path);
        }
        break;
      case 'ArrowLeft':
        if (node.type === 'group' && node.isOpen) {
          e.preventDefault();
          e.stopPropagation();
          actions.toggleOpen(path);
        }
        break;
      case 'F2':
        if (!readOnly) {
          e.preventDefault();
          e.stopPropagation();
          startEditing();
        }
        break;
      case 'Delete':
        if (!readOnly && path.length > 0) {
          e.preventDefault();
          e.stopPropagation();
          actions.deleteNode(path);
        }
        break;
    }
  };

  const handleAddNode = (e: React.MouseEvent, type: 'item' | 'group') => {
    e.stopPropagation();
    if (!node.isOpen) {
      actions.toggleOpen(path);
    }
    actions.addNode(path, type);
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', node.name);
    attachDragGhost(e, node.name);
    drag.start(node.id);
  };

  /** 커서가 행의 위 · 아래 어디에 있는지로 앞 · 뒤 · 안을 정합니다. 펼친 그룹의 아래쪽은 그룹 안입니다. */
  const handleDragOver = (e: React.DragEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientY - rect.top) / rect.height;
    let position: TreeDropPosition;
    if (node.type === 'item') position = ratio < 0.5 ? 'before' : 'after';
    else if (level === 0) position = 'inside';
    else if (ratio < 0.25) position = 'before';
    else if (ratio > 0.75 && !(node.isOpen && node.children?.length)) position = 'after';
    else position = 'inside';

    // 놓을 수 없는 자리도 금지 커서 대신 선만 숨깁니다. 놓아도 아무 일이 없습니다.
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    drag.over(node.id, position);
  };

  return (
    <div>
      <div className={'koast-py-1'} style={{ marginLeft: level === 0 ? 0 : INDENT }}>
        <div
          ref={rowRef}
          role={'treeitem'}
          tabIndex={0}
          aria-label={node.name}
          aria-level={level + 1}
          aria-selected={selected}
          aria-expanded={node.type === 'group' ? Boolean(node.isOpen) : undefined}
          onKeyDown={handleRowKeyDown}
          className={`koast-group koast-relative koast-flex koast-cursor-pointer koast-items-center koast-gap-0.5 koast-rounded-md koast-p-1 hover:koast-bg-interactive-secondary-hovered focus-visible:koast-outline focus-visible:koast-outline-2 focus-visible:koast-outline-offset-2 focus-visible:koast-outline-focus-ring ${
            dropPosition === 'inside'
              ? 'koast-ring-2 koast-ring-inset koast-ring-interactive-primary'
              : selected ? 'koast-ring-1 koast-ring-inset koast-ring-interactive-primary' : ''
          } ${ selected ? 'koast-bg-interactive-selected' : '' }`}
          onClick={handleNodeClick}
          draggable={!readOnly && !isEditing}
          onDragStart={handleDragStart}
          onDragEnd={drag.end}
          onDragOver={handleDragOver}
        >
          {dropPosition && dropPosition !== 'inside' && (
            <span
              aria-hidden={'true'}
              className={`koast-pointer-events-none koast-absolute koast-inset-x-0 koast-h-0.5 koast-rounded-full koast-bg-interactive-primary ${ DROP_LINE_POSITION[dropPosition] }`}
            />
          )}
          {node.type === 'group' && (
            <button
              type={'button'}
              tabIndex={-1}
              aria-label={`${ node.name } ${ node.isOpen ? '접기' : '펼치기' }`}
              onClick={(e) => {
                e.stopPropagation();
                actions.toggleOpen(path);
              }}
              className={'koast-cursor-pointer'}
            >
              {node.isOpen ? <ChevronDown /> : <ChevronRight />}
            </button>
          )}

          {isEditing ? (
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={(e) => {
                e.stopPropagation();
                handleKeyDown(e);
              }}
              onBlur={() => finishEditing(true, false)}
              autoFocus
              aria-label={`${ node.name } 이름`}
              className={'koast-rounded koast-border koast-border-solid koast-border-interactive-secondary koast-bg-primary koast-px-2 koast-py-1 koast-text-sm koast-text-primary focus-visible:koast-outline focus-visible:koast-outline-2 focus-visible:koast-outline-offset-2 focus-visible:koast-outline-focus-ring'}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span
              onDoubleClick={(e) => {
                e.stopPropagation();
                if (!readOnly) {
                  startEditing();
                }
              }}
              className={'koast-flex koast-cursor-pointer koast-items-center koast-gap-1 koast-text-primary'}
            >
              <span className={'koast-flex koast-size-5 koast-shrink-0 koast-items-center koast-justify-center [&_svg]:koast-size-5'}>
                {node.type === 'item' ? icons?.item ?? <File /> : node.isOpen ? icons?.groupOpen ?? icons?.group ?? <FolderOpen /> : icons?.group ?? <Folder />}
              </span>
              <span className={'koast-max-w-[200px] koast-truncate koast-text-sm koast-leading-6'}>{node.name}</span>
              {node.type === 'group' && (!node.children || node.children.length === 0) && (
                <span className={'koast-text-sm koast-text-tertiary'}>{'(비어있음)'}</span>
              )}
            </span>
          )}

          {!readOnly && (
            <div className={'koast-invisible koast-ml-auto koast-flex koast-items-center koast-gap-2.5 group-focus-within:koast-visible group-hover:koast-visible'}>
              {node.type === 'group' && (
                <>
                  <button
                    type={'button'}
                    aria-label={`${ node.name } 안에 새 파일 만들기`}
                    onClick={(e) => handleAddNode(e, 'item')}
                  >
                    <FilePlus2
                      className={'koast-size-4 koast-text-tertiary hover:koast-text-interactive-primary'}
                    />
                  </button>
                  <button
                    type={'button'}
                    aria-label={`${ node.name } 안에 새 폴더 만들기`}
                    onClick={(e) => handleAddNode(e, 'group')}
                  >
                    <FolderPlus
                      className={'koast-size-4 koast-text-tertiary hover:koast-text-interactive-primary'}
                    />
                  </button>
                </>
              )}
              <button
                type={'button'}
                aria-label={`${ node.name } 이름 바꾸기`}
                onClick={(e) => {
                  e.stopPropagation();
                  startEditing();
                }}
              >
                <PencilLine
                  className={'koast-size-4 koast-text-tertiary hover:koast-text-interactive-primary'}
                />
              </button>
              <button
                type={'button'}
                aria-label={`${ node.name } 삭제`}
                onClick={(e) => {
                  e.stopPropagation();
                  actions.deleteNode(path);
                }}
              >
                <Trash2
                  className={'koast-size-4 koast-text-tertiary hover:koast-text-interactive-primary'}
                />
              </button>
            </div>
          )}
        </div>

        {node.type === 'group' && node.isOpen && node.children?.length ? (
          <div role={'group'}>
            {node.children.map((child, index) => (
              <TreeItem
                key={child.id}
                node={child}
                path={[...path, index]}
                level={level + 1}
                actions={actions}
                onNodeClick={onNodeClick}
                readOnly={readOnly}
                selectedId={selectedId}
                onSelectId={onSelectId}
                icons={icons}
                drag={drag}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TreeItem;
