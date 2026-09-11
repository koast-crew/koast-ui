import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    variant: 'rect',
    lines: 1,
    animated: true,
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['rect', 'circle', 'text'],
      description: 'Figma `Part/Skeleton Segments` 의 **Type** 축입니다.',
    },
    width: { control: 'text' },
    height: { control: 'text' },
    lines: {
      control: { type: 'number', min: 1, max: 6 },
      description: 'Figma 에 없는 축입니다. `variant=text` 에서만 쓰입니다.',
    },
    animated: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div className={'koast-w-[261px]'}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

/** 기본값입니다. Figma `Part/Skeleton Segments · Type=Rect` (261x145, r2) 와 같습니다. */
export const Default: Story = {};

/** Figma `Type` 축 3종을 실측 기본 크기 그대로 둔 모습입니다. */
export const Variants: Story = {
  render: (args) => (
    <div className={'koast-flex koast-flex-col koast-gap-4'}>
      <Skeleton {...args} variant={'rect'} />
      <Skeleton {...args} variant={'text'} />
      <Skeleton {...args} variant={'circle'} />
    </div>
  ),
};

/** `lines` 로 문단을 만듭니다. 마지막 줄만 60% 폭으로 짧아집니다. */
export const TextLines: Story = {
  args: { variant: 'text', lines: 3, height: 16 },
};

/** `animated={false}` 는 펄스를 끕니다. `prefers-reduced-motion` 에서도 같은 상태가 됩니다. */
export const Static: Story = {
  args: { animated: false },
};

/**
 * Figma `Skeleton` 셋의 `Type=Video` 입니다.
 * 치수 덤프가 없어 prop 축이 아니라 조합 예시로만 둡니다.
 */
export const PresetVideo: Story = {
  render: (args) => (
    <div className={'koast-flex koast-flex-col koast-gap-3'} aria-busy={'true'}>
      <Skeleton {...args} variant={'rect'} height={147} />
      <div className={'koast-flex koast-gap-3'}>
        <Skeleton {...args} variant={'circle'} />
        <div className={'koast-flex koast-w-full koast-flex-col koast-gap-2'}>
          <Skeleton {...args} variant={'text'} height={16} />
          <Skeleton {...args} variant={'text'} height={12} width={'60%'} />
        </div>
      </div>
    </div>
  ),
};

/**
 * Figma `Skeleton` 셋의 `Type=Blog` 입니다.
 * 치수 덤프가 없어 prop 축이 아니라 조합 예시로만 둡니다.
 */
export const PresetBlog: Story = {
  render: (args) => (
    <div className={'koast-flex koast-flex-col koast-gap-3'} aria-busy={'true'}>
      <Skeleton {...args} variant={'rect'} height={145} />
      <Skeleton {...args} variant={'text'} height={24} width={'70%'} />
      <Skeleton {...args} variant={'text'} lines={3} height={14} />
    </div>
  ),
};

/**
 * Figma `Skeleton` 셋의 `Type=Feed` 입니다.
 * 치수 덤프가 없어 prop 축이 아니라 조합 예시로만 둡니다.
 */
export const PresetFeed: Story = {
  render: (args) => (
    <div className={'koast-flex koast-flex-col koast-gap-5'} aria-busy={'true'}>
      {[0, 1, 2].map((row) => (
        <div key={row} className={'koast-flex koast-gap-3'}>
          <Skeleton {...args} variant={'circle'} />
          <div className={'koast-flex koast-w-full koast-flex-col koast-gap-2'}>
            <Skeleton {...args} variant={'text'} height={14} width={'40%'} />
            <Skeleton {...args} variant={'text'} lines={2} height={12} />
          </div>
        </div>
      ))}
    </div>
  ),
};
