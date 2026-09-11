import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';
import type { SliderRangeValue } from './Slider.types';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    label: 'Label',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 60,
    unit: '%',
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Figma 의 **Size** 축입니다. Small / Medium / Large.',
    },
    variant: {
      control: 'radio',
      options: ['plain', 'card'],
      description: 'Figma Slider 셋의 **Style** 축입니다. card=테두리 카드.',
    },
    disabled: { control: 'boolean', description: 'Figma State=Disabled.' },
    error: { control: 'boolean', description: 'Figma State=Error.' },
    showTicks: { control: 'boolean', description: 'Figma 의 Show Ticks 축.' },
    showMidLabel: { control: 'boolean', description: 'Figma 의 Mid Value 축.' },
    showRangeLabels: { control: 'boolean' },
    showTooltip: { control: 'boolean' },
    helperText: { control: 'text', description: 'Figma 의 Show Helper 축.' },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

/** 기본값입니다. Figma 의 `Type=Single, Size=Medium, State=Default` 에 해당합니다. */
export const Default: Story = {};

/** **Size** 축입니다. 트랙 4/6/8px, 썸 12/16/20px 로 함께 커집니다. */
export const Sizes: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size}>
          <span className={'story-label'}>{`Size = ${ size }`}</span>
          <Slider {...args} size={size} />
        </div>
      ))}
    </div>
  ),
};

/**
 * **State** 축입니다. Hover / Focus / Active 는 포인터와 키보드로 확인합니다.
 * Disabled 와 Error 만 prop 으로 고정됩니다.
 */
export const States: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      <div>
        <span className={'story-label'}>{'Default'}</span>
        <Slider {...args} />
      </div>
      <div>
        <span className={'story-label'}>{'Disabled'}</span>
        <Slider {...args} disabled />
      </div>
      <div>
        <span className={'story-label'}>{'Error'}</span>
        <Slider {...args} error helperText={'값이 허용 범위를 벗어났습니다'} />
      </div>
    </div>
  ),
};

/** **Type=Range** 입니다. 썸마다 `role="slider"` 가 따로 붙습니다. */
export const Range: Story = {
  args: {
    label: 'Wind Speed',
    min: 0,
    max: 60,
    defaultValue: [5, 25],
    unit: ' kts',
    minLabel: '0 kts',
    maxLabel: '60 kts',
  },
};

/** **Show Ticks** 축입니다. `step` 간격으로 눈금을 그립니다. */
export const Ticks: Story = {
  args: { step: 10, showTicks: true },
};

/** **Show Helper** 축입니다. 트랙 아래 보조 문구가 붙습니다. */
export const Helper: Story = {
  args: { helperText: 'Adjust the value' },
};

/** **Mid Value** 축입니다. 가운데 라벨을 끄면 Min / Max 만 남습니다. */
export const RangeLabels: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      <div>
        <span className={'story-label'}>{'Mid = on'}</span>
        <Slider {...args} showMidLabel />
      </div>
      <div>
        <span className={'story-label'}>{'Mid = off'}</span>
        <Slider {...args} showMidLabel={false} />
      </div>
      <div>
        <span className={'story-label'}>{'labels = off'}</span>
        <Slider {...args} showRangeLabels={false} />
      </div>
    </div>
  ),
};

/** Figma Slider 셋의 **Style** 축입니다. `card` 는 16px 안쪽 여백과 1px 테두리를 씁니다. */
export const Variants: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      <div>
        <span className={'story-label'}>{'plain'}</span>
        <Slider {...args} variant={'plain'} />
      </div>
      <div>
        <span className={'story-label'}>{'card'}</span>
        <Slider {...args} variant={'card'} />
      </div>
    </div>
  ),
};

/** Figma Slider 셋의 **Type** 축(도메인 예시)입니다. 값 형식만 다릅니다. */
export const Presets: Story = {
  render: () => (
    <div className={'story-stack'}>
      <Slider
        size={'lg'}
        variant={'card'}
        label={'Opacity'}
        defaultValue={75}
        step={5}
        unit={'%'}
        showTicks
      />
      <Slider
        size={'lg'}
        variant={'card'}
        label={'Wind Speed'}
        min={0}
        max={60}
        defaultValue={[5, 25]}
        unit={' kts'}
        minLabel={'0 kts'}
        maxLabel={'60 kts'}
      />
      <Slider
        size={'lg'}
        variant={'card'}
        label={'Depth Range'}
        min={-500}
        max={0}
        step={10}
        defaultValue={[-200, -50]}
        unit={'m'}
        minLabel={'-500m'}
        maxLabel={'0m'}
      />
      <Slider
        size={'lg'}
        variant={'card'}
        label={'Temperature'}
        min={-20}
        max={50}
        defaultValue={45}
        unit={'°C'}
        minLabel={'-20°C'}
        maxLabel={'50°C'}
        helperText={'Adjust the value'}
      />
      <Slider
        size={'lg'}
        variant={'card'}
        label={'Wave Height'}
        min={0}
        max={15}
        step={0.5}
        defaultValue={2.5}
        unit={'m'}
        minLabel={'0m'}
        maxLabel={'15m'}
        formatValue={(value) => value.toFixed(1)}
      />
    </div>
  ),
};

/** 제어 컴포넌트로 쓰는 예시입니다. */
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState<SliderRangeValue>([20, 80]);
    return (
      <div className={'story-stack'}>
        <Slider
          {...args}
          label={'Controlled'}
          value={value}
          onChange={(next) => setValue(next as SliderRangeValue)}
        />
        <span className={'story-note'}>{`value = [${ value[0] }, ${ value[1] }]`}</span>
      </div>
    );
  },
};
