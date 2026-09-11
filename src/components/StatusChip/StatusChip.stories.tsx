import type { Meta, StoryObj } from '@storybook/react';
import { StatusChip } from './StatusChip';
import type {
  StatusChipShape,
  StatusChipStatus,
  StatusChipVariant,
} from './StatusChip.types';

const meta: Meta<typeof StatusChip> = {
  title: 'Components/StatusChip',
  component: StatusChip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    children: 'Label',
    status: 'neutral',
    variant: 'filled',
    shape: 'round',
    size: 'md',
  },
  argTypes: {
    status: {
      control: 'radio',
      options: ['neutral', 'info', 'error', 'success', 'warning'],
      description: 'Figma 의 **Status** 축입니다. Figma 표기 `Netural` / `Information` 에 대응합니다.',
    },
    variant: {
      control: 'radio',
      options: ['filled', 'outlined', 'transparent'],
      description: 'Figma 의 **Style** 축입니다.',
    },
    shape: {
      control: 'radio',
      options: ['round', 'square'],
      description: 'Figma 의 **Type** 축입니다. round=pill, square=4px.',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Figma 의 Small / Medium 컴포넌트 셋입니다. 최소 높이 28 / 32px.',
    },
    children: { control: 'text' },
    icon: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof StatusChip>;

const STATUSES: StatusChipStatus[] = ['neutral', 'info', 'error', 'success', 'warning'];
const VARIANTS: StatusChipVariant[] = ['filled', 'outlined', 'transparent'];
const SHAPES: StatusChipShape[] = ['round', 'square'];

/** 기본값입니다. Figma 의 `Style=Filled, Status=Netural, Type=Round` 에 해당합니다. */
export const Default: Story = {};

/** **Status** 축입니다. 다섯 상태가 각각 고정된 색과 기본 아이콘을 가집니다. */
export const Statuses: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {VARIANTS.map((variant) => (
        <div key={variant} className={'story-row'}>
          <span className={'story-label'}>{variant}</span>
          {STATUSES.map((status) => (
            <StatusChip key={status} {...args} variant={variant} status={status}>
              {status}
            </StatusChip>
          ))}
        </div>
      ))}
    </div>
  ),
};

/** **Type** 축입니다. 모서리만 달라지고 나머지 치수는 같습니다. */
export const Shapes: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {SHAPES.map((shape) => (
        <div key={shape} className={'story-row'}>
          <span className={'story-label'}>{shape}</span>
          {STATUSES.map((status) => (
            <StatusChip key={status} {...args} shape={shape} status={status}>
              {status}
            </StatusChip>
          ))}
        </div>
      ))}
    </div>
  ),
};

/** 크기 축입니다. 아이콘은 두 크기 모두 24px 로 같고 라벨과 여백만 줄어듭니다. */
export const Sizes: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      <div className={'story-row'}>
        <span className={'story-label'}>{'md · 32px'}</span>
        {STATUSES.map((status) => (
          <StatusChip key={status} {...args} size={'md'} status={status}>{'Label'}</StatusChip>
        ))}
      </div>
      <div className={'story-row'}>
        <span className={'story-label'}>{'sm · 28px'}</span>
        {STATUSES.map((status) => (
          <StatusChip key={status} {...args} size={'sm'} status={status}>{'Label'}</StatusChip>
        ))}
      </div>
    </div>
  ),
};

/** 아이콘 없이 라벨만 쓰는 경우입니다. 좌우 여백이 같아지고 높이는 그대로 유지됩니다. */
export const WithoutIcon: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      <div className={'story-row'}>
        <span className={'story-label'}>{'icon={false}'}</span>
        {STATUSES.map((status) => (
          <StatusChip key={status} {...args} icon={false} status={status}>
            {status}
          </StatusChip>
        ))}
      </div>
      <span className={'story-note'}>
        {'neutral 은 Figma 에 기본 아이콘이 정해져 있지 않아 icon 을 넘기지 않으면 라벨만 표시됩니다.'}
      </span>
    </div>
  ),
};
