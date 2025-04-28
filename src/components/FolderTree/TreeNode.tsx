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
    <div className={'relative h-full'}>
      {node.type === 'folder' && node.isOpen && (
        <div
          className={'absolute w-px bg-gray-200'}
          style={{
            left: `${ level === 0 ? indentPixels : (indentPixels * 2) + (indentPixels / 2) }px`,
            top: '36px',
            height: `${ level === 0 ? 'calc(100% - 40px)' : 'calc(100% - 36px)' }`,
          }}
        />
      )}
      <div
        className={'py-1'}
        style={{
          marginLeft: level === 0 ? 0 : `${ (indentPixels / 2) + (node.type === 'file' ? ((indentPixels * 3) + 2) : indentPixels) }px`,
        }}
      >
        <div
          className={`group flex cursor-pointer items-center gap-0.5 rounded p-1 hover:bg-gray-100 ${
            selectedPath === currentPath ? 'bg-blue-100' : ''
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
              className={'cursor-pointer'}
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
              className={'rounded border px-2 py-1'}
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
              className={'flex cursor-pointer items-center gap-1'}
            >
              {node.type === 'file' ? <File className={'size-5'} /> : node.isOpen ? <FolderOpen className={'size-5'} /> : <Folder className={'size-5'} />}
              <span className={'max-w-[200px] truncate text-sm'}>{node.name}</span>
              {node.type === 'folder' && (!node.children || node.children.length === 0) && (
                <span className={'text-sm text-gray-400'}>{'(비어있음)'}</span>
              )}
            </span>
          )}

          {!readOnly && (
            <div className={'invisible ml-auto flex items-center gap-2.5 group-hover:visible'}>
              {node.type === 'folder' && (
                <>
                  <button onClick={(e) => handleAddNode(e, 'file')}>
                    <FilePlus2
                      className={'size-4 text-gray-400 hover:text-blue-500'}
                    />
                  </button>
                  <button onClick={(e) => handleAddNode(e, 'folder')}>
                    <FolderPlus
                      className={'size-4 text-gray-400 hover:text-blue-500'}
                    />
                  </button>
                </>
              )}
              <button
                onClick={() => setIsEditing(true)}
              >
                <PencilLine
                  className={'size-4 text-gray-400 hover:text-blue-500'}
                />
              </button>
              <button
                onClick={() => actions.deleteNode(path)}
              >
                <Trash2
                  className={'size-4 text-gray-400 hover:text-blue-500'}
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