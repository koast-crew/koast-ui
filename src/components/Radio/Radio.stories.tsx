import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    label: 'Label',
    disabled: false,
    required: false,
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Figma 의 **Checked** 축입니다. True / False.',
    },
    disabled: { control: 'boolean', description: 'Figma State=Disabled.' },
    required: { control: 'boolean', description: '라벨 뒤에 * 가 붙습니다.' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

/** 기본값입니다. Figma 의 `Checked=False, State=Default` 에 해당합니다. */
export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Radio
        {...args}
        name={'story-radio-default'}
        checked={checked}
        onChange={setChecked}
      />
    );
  },
};

/** **Checked** 축입니다. 선택된 원 안에는 8x8 점이 들어갑니다. */
export const CheckedStates: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      <div className={'story-row'}>
        <span className={'story-label'}>{'Checked=False'}</span>
        <Radio {...args} label={'False'} />
      </div>
      <div className={'story-row'}>
        <span className={'story-label'}>{'Checked=True'}</span>
        <Radio {...args} checked label={'True'} />
      </div>
    </div>
  ),
};

/** **State** 축입니다. Hovered / Pressed / Focused 는 직접 상호작용해야 나타납니다. */
export const States: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      <div className={'story-row'}>
        <span className={'story-label'}>{'Default'}</span>
        <Radio {...args} label={'False'} />
        <Radio {...args} checked label={'True'} />
      </div>
      <div className={'story-row'}>
        <span className={'story-label'}>{'Disabled'}</span>
        <Radio {...args} disabled label={'False'} />
        <Radio {...args} disabled checked label={'True'} />
      </div>
      <p className={'story-note'}>
        {'선택되지 않은 라디오는 체크박스와 달리 hover / pressed 에서 면 색까지 진해집니다.'}
      </p>
    </div>
  ),
};

/** 같은 `name` 을 주면 브라우저가 하나만 선택되도록 처리하고 방향키 이동도 붙습니다. */
export const Grouped: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      <Radio {...args} name={'story-radio-group'} value={'male'} label={'남성'} defaultChecked />
      <Radio {...args} name={'story-radio-group'} value={'female'} label={'여성'} />
      <Radio {...args} name={'story-radio-group'} value={'none'} label={'선택 안 함'} />
    </div>
  ),
};
