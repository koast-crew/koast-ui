import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Building2, UserRound } from 'lucide-react';
import { Tree } from './Tree';
import type { TreeNode } from './types';

const SAMPLE: TreeNode = {
  id: 'root',
  name: '프로젝트',
  type: 'group',
  isOpen: true,
  children: [
    {
      id: 'src',
      name: 'src',
      type: 'group',
      isOpen: true,
      children: [
        {
          id: 'components',
          name: 'components',
          type: 'group',
          isOpen: true,
          children: [
            { id: 'button', name: 'Button.tsx', type: 'item' },
            { id: 'select', name: 'Select.tsx', type: 'item' },
          ],
        },
        { id: 'index', name: 'index.ts', type: 'item' },
      ],
    },
    { id: 'docs', name: 'docs', type: 'group', isOpen: false, children: [] },
    { id: 'readme', name: 'README.md', type: 'item' },
  ],
};

const meta: Meta<typeof Tree> = {
  title: 'Components/Tree',
  component: Tree,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    defaultData: SAMPLE,
    readOnly: false,
    onChange: fn(),
    onNodeAdd: fn(),
    onNodeRename: fn(),
    onNodeDelete: fn(),
    onNodeMove: fn(),
    onNodeClick: fn(),
    onSelectedChange: fn(),
  },
  argTypes: {
    readOnly: {
      control: 'boolean',
      description: '읽기 전용입니다. 추가·이름변경·삭제·드래그가 모두 막힙니다.',
    },
    defaultData: { control: false },
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
type Story = StoryObj<typeof Tree>;

/** 기본값입니다. 행에 마우스를 올리면 추가·이름변경·삭제 버튼이 나타납니다. */
export const Default: Story = {};

/** 읽기 전용입니다. 작업 버튼과 드래그가 모두 비활성화됩니다. */
export const ReadOnly: Story = {
  args: { readOnly: true },
};

/**
 * 키보드만으로 조작할 수 있습니다.
 * `Tab` 으로 행 사이 이동, `Enter`/`Space` 선택·펼치기, `←`/`→` 접기·펼치기,
 * `F2` 이름 바꾸기, `Delete` 삭제입니다.
 */
export const Keyboard: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      <Tree {...args} />
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
        <Tree
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

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 작업 단위 콜백으로 서버에 반영하는 예입니다. 요청은 0.5초 뒤 끝납니다.
 * 추가는 서버 id(`srv-…`)로 교체되고, 이름에 `실패` 를 넣으면 reject 되어 이전 이름으로 되돌아갑니다.
 */
export const ServerSync: Story = {
  render: (args) => {
    const [logs, setLogs] = useState<string[]>([]);
    const log = (line: string) => setLogs((prev) => [line, ...prev].slice(0, 6));

    return (
      <div className={'story-stack'}>
        <Tree
          {...args}
          onNodeAdd={async (node, parentId) => {
            await wait(500);
            const id = `srv-${ Math.random().toString(36).slice(2, 7) }`;
            log(`추가: ${ node.name } → ${ parentId } (id ${ id })`);
            return id;
          }}
          onNodeRename={async (node, name) => {
            await wait(500);
            if (name.includes('실패')) {
              log(`이름변경 실패: ${ node.name } → ${ name } (되돌림)`);
              throw new Error('rename failed');
            }
            log(`이름변경: ${ node.name } → ${ name }`);
          }}
          onNodeDelete={async (node) => {
            await wait(500);
            log(`삭제: ${ node.name }`);
          }}
          onNodeMove={async (node, parentId, index) => {
            await wait(500);
            log(`이동: ${ node.name } → ${ parentId } 의 ${ index }번째`);
          }}
        />
        <output className={'koast-block koast-rounded-lg koast-border koast-border-solid koast-border-secondary koast-bg-tertiary koast-p-3 koast-text-sm koast-text-primary'}>
          {logs.length ? logs.map((line, index) => <div key={index}>{line}</div>) : '편집하면 여기에 서버 요청이 기록됩니다.'}
        </output>
      </div>
    );
  },
};

const ORGANIZATION: TreeNode = {
  id: 'hq',
  name: '본사',
  type: 'group',
  isOpen: true,
  children: [
    {
      id: 'forecast',
      name: '예보팀',
      type: 'group',
      isOpen: true,
      children: [
        { id: 'u1', name: '김해양', type: 'item' },
        { id: 'u2', name: '이파도', type: 'item' },
      ],
    },
    {
      id: 'observe',
      name: '관측팀',
      type: 'group',
      isOpen: true,
      children: [{ id: 'u3', name: '박조류', type: 'item' }],
    },
    { id: 'u4', name: '최기상', type: 'item' },
  ],
};

/**
 * `icons` 로 종류별 아이콘을 바꿔 사무실 · 사용자 구조로 씁니다.
 * 끌어서 사람 사이에 놓으면 그 자리로, 사무실 가운데에 놓으면 그 사무실 안(하위 사무실 다음 첫 자리)으로 옮겨집니다.
 */
export const CustomIcon: Story = {
  args: {
    defaultData: ORGANIZATION,
    icons: { group: <Building2 />, item: <UserRound /> },
  },
};
