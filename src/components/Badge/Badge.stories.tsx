import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import type { BadgeStatus, BadgeVariant } from './Badge.types';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    type: 'text',
    variant: 'primary',
    status: 'neutral',
    children: 'Label',
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['dot', 'number', 'text'],
      description: 'Figma 의 컴포넌트 셋 구분입니다. `Badge/Dot` · `Badge/Number` · `Badge/Text`.',
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
      description: 'Figma 의 **Type** 축입니다. `dot` 에는 적용되지 않습니다.',
    },
    status: {
      control: 'radio',
      options: ['neutral', 'information', 'success', 'warning', 'error'],
      description: 'Figma 의 **Status** 축입니다.',
    },
    count: { control: 'number', description: '`type=number` 일 때 표시할 수입니다.' },
    max: { control: 'number', description: '`count` 의 상한입니다.' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

const STATUSES: BadgeStatus[] = ['neutral', 'information', 'success', 'warning', 'error'];
const VARIANTS: BadgeVariant[] = ['primary', 'secondary'];

/** 기본값입니다. Figma 의 `Badge/Text · Type=Primary, Status=Neutral` 에 해당합니다. */
export const Default: Story = {};

/** `Badge/Text` 셋 전체입니다. Type × Status 10개 변형입니다. */
export const Text: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {VARIANTS.map((variant) => (
        <div key={variant} className={'story-row'}>
          <span className={'story-label'}>{variant}</span>
          {STATUSES.map((status) => (
            <Badge key={status} {...args} type={'text'} variant={variant} status={status}>
              {'Label'}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

/** `Badge/Number` 셋 전체입니다. 높이 20px, pill 형태입니다. */
export const Number: Story = {
  args: { type: 'number', count: 1000 },
  render: (args) => (
    <div className={'story-stack'}>
      {VARIANTS.map((variant) => (
        <div key={variant} className={'story-row'}>
          <span className={'story-label'}>{variant}</span>
          {STATUSES.map((status) => (
            <Badge key={status} {...args} type={'number'} variant={variant} status={status} />
          ))}
        </div>
      ))}
    </div>
  ),
};

/** `count` 가 `max` 를 넘으면 Figma 표기를 따라 `+999` 로 잘립니다. */
export const NumberOverflow: Story = {
  args: { type: 'number', status: 'error' },
  render: (args) => (
    <div className={'story-row'}>
      {[1, 12, 345, 1000].map((count) => (
        <Badge key={count} {...args} count={count} />
      ))}
    </div>
  ),
};

/** `Badge/Dot` 셋 전체입니다. 4x4 점이며 Figma 에 Secondary 변형이 없습니다. */
export const Dot: Story = {
  args: { type: 'dot' },
  render: (args) => (
    <div className={'story-row'}>
      {STATUSES.map((status) => (
        <Badge key={status} {...args} type={'dot'} status={status} aria-label={status} />
      ))}
    </div>
  ),
};

/** 텍스트 옆에 붙여 쓰는 예시입니다. */
export const InContext: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      <div className={'story-row'}>
        <Badge {...args} type={'dot'} status={'error'} aria-label={'읽지 않음'} />
        <span>{'새 알림'}</span>
        <Badge {...args} type={'number'} status={'error'} count={12} />
      </div>
      <div className={'story-row'}>
        <span>{'관측 상태'}</span>
        <Badge {...args} type={'text'} variant={'secondary'} status={'success'}>{'정상'}</Badge>
        <Badge {...args} type={'text'} variant={'secondary'} status={'warning'}>{'점검'}</Badge>
        <Badge {...args} type={'text'} variant={'secondary'} status={'error'}>{'장애'}</Badge>
      </div>
    </div>
  ),
};
