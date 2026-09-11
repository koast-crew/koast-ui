import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { FolderTree } from './FolderTree';
import type { TreeNode } from './types';

const SAMPLE: TreeNode = {
  id: 'root',
  name: '프로젝트',
  type: 'folder',
  isOpen: true,
  children: [
    {
      id: 'src',
      name: 'src',
      type: 'folder',
      isOpen: true,
      children: [
        {
          id: 'components',
          name: 'components',
          type: 'folder',
          isOpen: true,
          children: [
            { id: 'button', name: 'Button.tsx', type: 'file' },
            { id: 'select', name: 'Select.tsx', type: 'file' },
          ],
        },
        { id: 'index', name: 'index.ts', type: 'file' },
      ],
    },
    { id: 'docs', name: 'docs', type: 'folder', isOpen: false, children: [] },
    { id: 'readme', name: 'README.md', type: 'file' },
  ],
};

const meta: Meta<typeof FolderTree> = {
  title: 'Components/FolderTree',
  component: FolderTree,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    data: SAMPLE,
    indentPixels: 12,
    readOnly: false,
    // FolderTree 는 마운트 직후 effect 에서 onChange 를 부릅니다.
    // argTypesRegex 가 만드는 암묵적 action 을 쓰면 렌더 중 호출로 경고가 납니다.
    onChange: fn(),
    onNodeClick: fn(),
    onSelectedChange: fn(),
  },
  argTypes: {
    indentPixels: { control: { type: 'number', min: 4, max: 32 } },
    readOnly: {
      control: 'boolean',
      description: '읽기 전용입니다. 추가·이름변경·삭제·드래그가 모두 막힙니다.',
    },
    data: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FolderTree>;

/** 기본값입니다. 행에 마우스를 올리면 추가·이름변경·삭제 버튼이 나타납니다. */
export const Default: Story = {};

/** 읽기 전용입니다. 작업 버튼과 드래그가 모두 비활성화됩니다. */
export const ReadOnly: Story = {
  args: { readOnly: true },
};

/** 들여쓰기 폭을 조절합니다. */
export const Indent: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {[8, 12, 24].map((px) => (
        <div key={px}>
          <span className={'story-label'}>{`indentPixels = ${ px }`}</span>
          <FolderTree {...args} indentPixels={px} />
        </div>
      ))}
    </div>
  ),
};

/**
 * 키보드만으로 조작할 수 있습니다.
 * `Tab` 으로 행 사이 이동, `Enter`/`Space` 선택·펼치기, `←`/`→` 접기·펼치기,
 * `F2` 이름 바꾸기, `Delete` 삭제입니다.
 */
export const Keyboard: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      <FolderTree {...args} />
      <span className={'story-note'}>
        {'Tab 으로 포커스를 옮기고 Enter · ← · → · F2 · Delete 를 눌러보세요.'}
      </span>
    </div>
  ),
};

/**
 * 현재 활성(선택)된 노드를 바깥으로 내보냅니다.
 * `onSelectedChange` 는 "지금 무엇이 선택되어 있나"를, `onNodeClick` 은 "무엇을 눌렀나"를 알려줍니다.
 * 두 값 모두 Storybook 의 **Actions** 패널에도 기록됩니다.
 */
export const SelectedOutput: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<{ name: string; type: string; path: string } | null>(null);
    const [clicked, setClicked] = useState<string>('아직 없음');

    return (
      <div className={'story-stack'}>
        <FolderTree
          {...args}
          onSelectedChange={(node, path) => {
            args.onSelectedChange?.(node, path);
            setSelected(node ? { name: node.name, type: node.type, path: (path ?? []).join('-') || 'root' } : null);
          }}
          onNodeClick={(node, path) => {
            args.onNodeClick?.(node, path);
            setClicked(node.name);
          }}
        />
        <output
          className={'koast-block koast-rounded-lg koast-border koast-border-solid koast-border-secondary koast-bg-tertiary koast-p-3 koast-text-sm koast-text-primary'}
        >
          <div>{`활성 노드: ${ selected ? `${ selected.name } (${ selected.type })` : '없음' }`}</div>
          <div>{`경로: ${ selected ? selected.path : '-' }`}</div>
          <div className={'koast-text-tertiary'}>{`마지막 클릭: ${ clicked }`}</div>
        </output>
      </div>
    );
  },
};
