import React, { useState } from 'react';
import { TreeNode } from './types';
import { ChevronDown, ChevronRight, File, Folder, FolderOpen, FilePlus2, FolderPlus, PencilLine, Trash2 } from 'lucide-react';

interface TreeNodeProps {
  node: TreeNode;
  path: number[];
  level: number;
  actions: {
    addNode: (path: number[], type: 'file' | 'folder', name?: string) => void;
    deleteNode: (path: number[]) => void;
    renameNode: (path: number[], name: string) => void;
    toggleOpen: (path: number[]) => void;
    moveNode: (path: number[], targetPath: number[]) => void;
  };
  indentPixels: number;
  readOnly: boolean;
  selectedPath?: string;
  onNodeClick?: (node: TreeNode, path: number[]) => void;
  onSelect?: (path: string) => void;
}

const TreeNodeComponent = (props: TreeNodeProps) => {
  const {
    node,
    path,
    level,
    actions,
    indentPixels,
    readOnly,
    selectedPath,
    onNodeClick,
    onSelect,
  } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(node.name);
  const currentPath = path.join('-');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      actions.renameNode(path, editName);
      setIsEditing(false);
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditName(node.name);
    }
  };

  const handleNodeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectNode();
  };

  const selectNode = () => {
    onSelect?.(currentPath);

    if (node.type === 'folder') {
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
        if (node.type === 'folder' && !node.isOpen) {
          e.preventDefault();
          e.stopPropagation();
          actions.toggleOpen(path);
        }
        break;
      case 'ArrowLeft':
        if (node.type === 'folder' && node.isOpen) {
          e.preventDefault();
          e.stopPropagation();
          actions.toggleOpen(path);
        }
        break;
      case 'F2':
        if (!readOnly) {
          e.preventDefault();
          e.stopPropagation();
          setIsEditing(true);
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

  const handleAddNode = (e: React.MouseEvent, type: 'file' | 'folder') => {
    e.stopPropagation();
    if (!node.isOpen) {
      actions.toggleOpen(path);
    }
    actions.addNode(path, type);
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    e.dataTransfer.setData('text/plain', JSON.stringify({ path, type: node.type }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    const sourcePath = data.path;

    if (JSON.stringify(sourcePath) === JSON.stringify(path)) return;

    if (node.type === 'file') return;

    actions.moveNode(sourcePath, path);
  };

  return (
    <div className={'koast-relative koast-h-full'}>
      {node.type === 'folder' && node.isOpen && (
        <div
          className={'koast-absolute koast-w-px koast-bg-tertiary'}
          style={{
            left: `${ level === 0 ? indentPixels : (indentPixels * 2) + (indentPixels / 2) }px`,
            top: '36px',
            height: `${ level === 0 ? 'calc(100% - 40px)' : 'calc(100% - 36px)' }`,
          }}
        />
      )}
      <div
        className={'koast-py-1'}
        style={{
          marginLeft: level === 0 ? 0 : `${ (indentPixels / 2) + (node.type === 'file' ? ((indentPixels * 3) + 2) : indentPixels) }px`,
        }}
      >
        <div
          role={'treeitem'}
          tabIndex={0}
          aria-label={node.name}
          aria-level={level + 1}
          aria-selected={selectedPath === currentPath}
          aria-expanded={node.type === 'folder' ? Boolean(node.isOpen) : undefined}
          onKeyDown={handleRowKeyDown}
          className={`koast-group koast-flex koast-cursor-pointer koast-items-center koast-gap-0.5 koast-rounded koast-p-1 hover:koast-bg-interactive-secondary-hovered focus-visible:koast-outline-none focus-visible:koast-ring-2 focus-visible:koast-ring-focus-ring ${
            selectedPath === currentPath ? 'koast-bg-interactive-selected' : ''
          }`}
          onClick={handleNodeClick}
          draggable={!readOnly}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {node.type === 'folder' && (
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
              onBlur={() => {
                actions.renameNode(path, editName);
                setIsEditing(false);
              }}
              autoFocus
              aria-label={`${ node.name } 이름`}
              className={'koast-rounded koast-border koast-border-solid koast-border-interactive-secondary koast-bg-primary koast-px-2 koast-py-1 koast-text-sm koast-text-primary focus-visible:koast-outline-none focus-visible:koast-ring-2 focus-visible:koast-ring-focus-ring'}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span
              onDoubleClick={(e) => {
                e.stopPropagation();
                if (!readOnly) {
                  setIsEditing(true);
                }
              }}
              className={'koast-flex koast-cursor-pointer koast-items-center koast-gap-1 koast-text-primary'}
            >
              {node.type === 'file' ? <File className={'koast-size-5'} /> : node.isOpen ? <FolderOpen className={'koast-size-5'} /> : <Folder className={'koast-size-5'} />}
              <span className={'koast-max-w-[200px] koast-truncate koast-text-sm'}>{node.name}</span>
              {node.type === 'folder' && (!node.children || node.children.length === 0) && (
                <span className={'koast-text-sm koast-text-tertiary'}>{'(비어있음)'}</span>
              )}
            </span>
          )}

          {!readOnly && (
            <div className={'koast-invisible koast-ml-auto koast-flex koast-items-center koast-gap-2.5 group-focus-within:koast-visible group-hover:koast-visible'}>
              {node.type === 'folder' && (
                <>
                  <button
                    type={'button'}
                    aria-label={`${ node.name } 안에 새 파일 만들기`}
                    onClick={(e) => handleAddNode(e, 'file')}
                  >
                    <FilePlus2
                      className={'koast-size-4 koast-text-tertiary hover:koast-text-interactive-primary'}
                    />
                  </button>
                  <button
                    type={'button'}
                    aria-label={`${ node.name } 안에 새 폴더 만들기`}
                    onClick={(e) => handleAddNode(e, 'folder')}
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
                  setIsEditing(true);
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

        {node.type === 'folder' && node.isOpen && node.children?.length ? (
          <div role={'group'}>
            {node.children.map((child, index) => (
              <TreeNodeComponent
                key={child.id}
                node={child}
                path={[...path, index]}
                level={level + 1}
                actions={actions}
                indentPixels={indentPixels}
                onNodeClick={onNodeClick}
                readOnly={readOnly}
                selectedPath={selectedPath}
                onSelect={onSelect}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TreeNodeComponent;
