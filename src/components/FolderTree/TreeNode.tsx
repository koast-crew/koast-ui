import React, { useState } from 'react';
import { TreeNode } from './types';
import { ChevronDown, ChevronRight, File, Folder, FolderOpen, FilePlus2, FolderPlus, PencilLine, Trash2 } from 'lucide-react';

interface TreeNodeProps {
  node: TreeNode;
  path: number[];
  level: number;
  actions: {
    addNode: (path: number[], type: 'file' | 'folder', name?: string)=> void;
    deleteNode: (path: number[])=> void;
    renameNode: (path: number[], name: string)=> void;
    toggleOpen: (path: number[])=> void;
    moveNode: (path: number[], targetPath: number[])=> void;
  };
  indentPixels: number;
  readOnly: boolean;
  selectedPath?: string;
  onNodeClick?: (node: TreeNode, path: number[])=> void;
  onSelect?: (path: string)=> void;
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
    onSelect?.(currentPath);

    if (node.type === 'folder') {
      actions.toggleOpen(path);
    }
    onNodeClick?.(node, path);
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
          className={'koast-absolute koast-w-px koast-bg-gray-200'}
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
          className={`koast-group koast-flex koast-cursor-pointer koast-items-center koast-gap-0.5 koast-rounded koast-p-1 hover:koast-bg-gray-100 ${
            selectedPath === currentPath ? 'koast-bg-blue-100' : ''
          }`}
          onClick={handleNodeClick}
          draggable={!readOnly}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {node.type === 'folder' && (
            <button
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
              onKeyDown={handleKeyDown}
              onBlur={() => {
                actions.renameNode(path, editName);
                setIsEditing(false);
              }}
              autoFocus
              className={'koast-rounded koast-border koast-px-2 koast-py-1'}
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
              className={'koast-flex koast-cursor-pointer koast-items-center koast-gap-1'}
            >
              {node.type === 'file' ? <File className={'koast-size-5'} /> : node.isOpen ? <FolderOpen className={'koast-size-5'} /> : <Folder className={'koast-size-5'} />}
              <span className={'koast-max-w-[200px] koast-truncate koast-text-sm'}>{node.name}</span>
              {node.type === 'folder' && (!node.children || node.children.length === 0) && (
                <span className={'koast-text-sm koast-text-gray-400'}>{'(비어있음)'}</span>
              )}
            </span>
          )}

          {!readOnly && (
            <div className={'koast-invisible koast-ml-auto koast-flex koast-items-center koast-gap-2.5 group-hover:koast-visible'}>
              {node.type === 'folder' && (
                <>
                  <button onClick={(e) => handleAddNode(e, 'file')}>
                    <FilePlus2
                      className={'koast-size-4 koast-text-gray-400 hover:koast-text-blue-500'}
                    />
                  </button>
                  <button onClick={(e) => handleAddNode(e, 'folder')}>
                    <FolderPlus
                      className={'koast-size-4 koast-text-gray-400 hover:koast-text-blue-500'}
                    />
                  </button>
                </>
              )}
              <button
                onClick={() => setIsEditing(true)}
              >
                <PencilLine
                  className={'koast-size-4 koast-text-gray-400 hover:koast-text-blue-500'}
                />
              </button>
              <button
                onClick={() => actions.deleteNode(path)}
              >
                <Trash2
                  className={'koast-size-4 koast-text-gray-400 hover:koast-text-blue-500'}
                />
              </button>
            </div>
          )}
        </div>

        {node.type === 'folder' && node.isOpen && node.children?.map((child, index) => (
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
    </div>
  );
};

export default TreeNodeComponent;