import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';
import type { SpinnerSize, SpinnerVariant } from './Spinner.types';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    size: 'md',
    variant: 'primary',
    label: '로딩 중',
    decorative: false,
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Figma 의 **Size** 축입니다. 16 / 24 / 32 / 48px.',
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'inherit'],
      description: 'Figma 의 **Type** 축입니다. `inherit` 은 Figma 에 없는 currentColor 모드입니다.',
    },
    label: { control: 'text' },
    decorative: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

const SIZES: SpinnerSize[] = ['sm', 'md', 'lg', 'xl'];
const VARIANTS: SpinnerVariant[] = ['primary', 'secondary'];

/** 기본값입니다. Figma `Spinner Loader · Size=md, Type=Primary` 에 해당합니다. */
export const Default: Story = {};

/** Figma `Size` 축 4단계입니다. lg / xl 은 Figma 의 뒤집힌 값을 바로잡았습니다. */
export const Sizes: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {VARIANTS.map((variant) => (
        <div key={variant} className={'story-row'}>
          <span className={'story-label'}>{variant}</span>
          {SIZES.map((size) => (
            <Spinner key={size} {...args} size={size} variant={variant} />
          ))}
        </div>
      ))}
    </div>
  ),
};

/**
 * `variant='inherit'` 는 부모의 글자색을 그대로 씁니다.
 * 이미 색이 정해진 버튼·배너 안에 넣을 때 쓰세요.
 */
export const Inherit: Story = {
  render: (args) => (
    <div className={'story-row koast-text-danger'}>
      <Spinner {...args} variant={'inherit'} size={'sm'} />
      <Spinner {...args} variant={'inherit'} size={'md'} />
      <span className={'story-note'}>{'부모의 koast-text-danger 를 물려받습니다'}</span>
    </div>
  ),
};

/**
 * 이미 문구가 있는 면 안에서는 `decorative` 로 두어
 * 스크린 리더가 "로딩 중"을 한 번 더 읽지 않게 합니다.
 */
export const Decorative: Story = {
  render: (args) => (
    <div className={'story-row'}>
      <Spinner {...args} size={'sm'} variant={'inherit'} decorative />
      <span>{'저장 중…'}</span>
    </div>
  ),
};
