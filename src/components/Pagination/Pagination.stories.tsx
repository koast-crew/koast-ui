import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    count: 20,
    siblingCount: 1,
    disabled: false,
  },
  argTypes: {
    count: { control: { type: 'number', min: 1 }, description: '전체 페이지 수입니다.' },
    siblingCount: {
      control: { type: 'number', min: 0, max: 3 },
      description: '현재 페이지 양옆에 항상 보이는 페이지 수입니다. 번호 칸은 `siblingCount * 2 + 5` 개로 고정됩니다.',
    },
    disabled: { control: 'boolean', description: '번호·이전·다음을 모두 비활성화합니다.' },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

/** 기본값입니다. 번호 칸 7개(첫 페이지 · 생략 · 현재 ±1 · 생략 · 마지막)로 고정됩니다. */
export const Default: Story = {
  render: (args) => <Pagination {...args} defaultPage={8} />,
};

/** 전체 페이지가 칸 수 이하면 생략 없이 전부 보여줍니다. */
export const WithoutEllipsis: Story = {
  args: { count: 5 },
  render: (args) => <Pagination {...args} defaultPage={3} />,
};

/** 생략 표시가 놓이는 자리입니다. 양 끝에서는 한쪽만 접히고 그만큼 반대쪽이 늘어납니다. */
export const EllipsisPlacement: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {[1, 4, 10, 17, 20].map((page) => (
        <div key={page} className={'story-row'}>
          <span className={'story-label'}>{`page = ${ page }`}</span>
          <Pagination {...args} page={page} />
        </div>
      ))}
    </div>
  ),
};

/** `siblingCount` 로 현재 페이지 양옆에 보이는 개수를 조절합니다. */
export const SiblingCount: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {[0, 1, 2].map((sibling) => (
        <div key={sibling} className={'story-row'}>
          <span className={'story-label'}>{`siblingCount = ${ sibling }`}</span>
          <Pagination {...args} siblingCount={sibling} page={10} />
        </div>
      ))}
    </div>
  ),
};

/** 첫 페이지에서는 이전이, 마지막 페이지에서는 다음이 비활성화됩니다. */
export const ControlBoundaries: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {[1, 20].map((page) => (
        <div key={page} className={'story-row'}>
          <span className={'story-label'}>{`page = ${ page }`}</span>
          <Pagination {...args} page={page} />
        </div>
      ))}
    </div>
  ),
};

/** 전체 비활성화 상태입니다. Figma 에 실측이 없어 Button 의 disabled 규칙에서 파생했습니다. */
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <Pagination {...args} page={8} />,
};

/** `page` 를 넘기면 제어 컴포넌트로 동작합니다. */
export const Controlled: Story = {
  render: (args) => {
    const [page, setPage] = useState(1);
    return (
      <div className={'story-stack'}>
        <Pagination {...args} page={page} onChange={setPage} />
        <span className={'story-note'}>{`현재 페이지: ${ page }`}</span>
      </div>
    );
  },
};
