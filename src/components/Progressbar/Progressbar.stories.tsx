import type { Meta, StoryObj } from '@storybook/react';
import { Progressbar } from './Progressbar';

const meta: Meta<typeof Progressbar> = {
  title: 'Components/Progressbar',
  component: Progressbar,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    label: 'Label',
    value: 50,
    min: 0,
    max: 100,
    error: false,
    indeterminate: false,
    showValue: true,
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    min: { control: 'number' },
    max: { control: 'number' },
    error: { control: 'boolean', description: 'Figma 의 **Errpr** 축입니다.' },
    indeterminate: {
      control: 'boolean',
      description: 'Figma 에 없는 축입니다. 진행률을 모를 때 `aria-valuenow` 를 빼고 대기 상태만 알립니다.',
    },
    showValue: { control: 'boolean' },
    label: { control: 'text' },
    helperText: { control: 'text' },
    ariaLabel: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div className={'w-80'}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Progressbar>;

const STEPS = [0, 25, 50, 75, 100];

/** 기본값입니다. Figma `Progress · Progress(%)=50, Errpr=False` 에 해당합니다. */
export const Default: Story = {};

/** Figma `Progress` 셋의 `Progress(%)` 축 5단계입니다. */
export const Steps: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {STEPS.map((step) => (
        <Progressbar key={step} {...args} value={step} helperText={'Help message'} />
      ))}
    </div>
  ),
};

/**
 * Figma `Errpr=True` 입니다. 지시자가 danger-bold 로 바뀌고
 * 보조 문구에 `CircleX` 아이콘이 붙습니다.
 */
export const Error: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {STEPS.map((step) => (
        <Progressbar key={step} {...args} value={step} error helperText={'Help message'} />
      ))}
    </div>
  ),
};

/**
 * 100% 는 Figma 에서 보조 문구가 success 색 + `Check` 아이콘으로 바뀝니다.
 * `error` 가 함께 켜지면 error 가 이깁니다.
 */
export const Completed: Story = {
  args: { value: 100, helperText: '업로드를 마쳤습니다' },
};

/** 보조 문구 없이 막대만 씁니다. 라벨도 빼면 `ariaLabel` 로 이름을 줍니다. */
export const BarOnly: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      <Progressbar {...args} value={40} showValue={false} />
      <Progressbar {...args} label={undefined} value={40} ariaLabel={'설치 진행률'} />
    </div>
  ),
};

/**
 * 진행률을 알 수 없는 상태입니다. Figma 에는 없지만 접근성 요구(값을 모를 때 `aria-valuenow` 생략)로 넣었습니다.
 * `prefers-reduced-motion` 에서는 펄스가 멈춥니다.
 */
export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    label: '불러오는 중',
    helperText: '잠시만 기다려 주세요',
  },
};

/** `min` / `max` 를 바꿔도 백분율과 `aria-value*` 가 함께 따라갑니다. */
export const CustomRange: Story = {
  args: {
    min: 0,
    max: 8,
    value: 3,
    label: '3 / 8 단계',
    formatValue: (percent: number) => `${ Math.round((percent / 100) * 8) }단계`,
    helperText: '설치 중입니다',
  },
};
