import React from 'react';
import { Tree, TreeNode } from '../../../src';

const initialData: TreeNode = {
  id: 'root',
  name: '전체폴더',
  type: 'group',
  isOpen: true,
  children: [
    {
      id: 'folder1',
      name: '폴더1',
      type: 'group',
      isOpen: true,
      children: [
        {
          id: 'file1',
          name: '파일1',
          type: 'item',
        },
        {
          id: 'file2',
          name: '파일2',
          type: 'item',
        },
      ],
    },
    {
      id: 'folder2',
      name: '폴더2',
      type: 'group',
      children: [
        {
          id: 'file3',
          name: '파일3',
          type: 'item',
        },
      ],
    },
  ],
};

export default function TreeExam() {
  const handleChange = (newData: TreeNode) => {
    console.log('Tree data changed:', newData);
  };

  const handleNodeClick = (node: TreeNode, path: number[]) => {
    console.log('Clicked node:', node);
    console.log('Node path:', path);
  };

  return (
    <div className={'koast-w-[400px]'}>
      <h2 className={'koast-mb-4 koast-text-xl koast-font-bold'}>{'Tree Example'}</h2>
      <Tree
        defaultData={initialData}
        onChange={handleChange}
        onNodeClick={handleNodeClick}
      />
    </div>
  );
}
