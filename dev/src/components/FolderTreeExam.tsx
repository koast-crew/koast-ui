import React, { useState } from 'react';
import { FolderTree, TreeNode } from '../../../src';

const initialData: TreeNode = {
  id: 'root',
  name: '전체폴더',
  type: 'folder',
  isOpen: true,
  children: [
    {
      id: 'folder1',
      name: '폴더1',
      type: 'folder',
      isOpen: true,
      children: [
        {
          id: 'file1',
          name: '파일1',
          type: 'file',
        },
        {
          id: 'file2',
          name: '파일2',
          type: 'file',
        },
      ],
    },
    {
      id: 'folder2',
      name: '폴더2',
      type: 'folder',
      children: [
        {
          id: 'file3',
          name: '파일3',
          type: 'file',
        },
      ],
    },
  ],
};

export default function FolderTreeExam() {
  const [treeData, setTreeData] = useState<TreeNode>(initialData);

  const handleChange = (newData: TreeNode) => {
    setTreeData(newData);
    console.log('Tree data changed:', newData);
  };

  const handleNodeClick = (node: TreeNode, path: number[]) => {
    console.log('Clicked node:', node);
    console.log('Node path:', path);
  };

  return (
    <div className={'w-[400px]'}>
      <h2 className={'mb-4 text-xl font-bold'}>{'Folder Tree Example'}</h2>
      <FolderTree
        data={treeData}
        onChange={handleChange}
        onNodeClick={handleNodeClick}
        indentPixels={12}
      />
    </div>
  );
}
