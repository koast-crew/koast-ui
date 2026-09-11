import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    label: 'Label',
    labelPlacement: 'end',
    icon: false,
    disabled: false,
    required: false,
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Figma 의 **Checked** 축입니다. True / False.',
    },
    icon: {
      control: 'boolean',
      description: 'Figma 의 **Icon** 축입니다. 손잡이 안에 체크 / X 를 표시합니다.',
    },
    labelPlacement: {
      control: 'radio',
      options: ['start', 'end'],
      description: 'Figma `Switch label` 의 **Direction** 축입니다. end 가 Direction=Left.',
    },
    disabled: { control: 'boolean', description: 'Figma State=Disabled.' },
    required: { control: 'boolean', description: '라벨 뒤에 * 가 붙습니다.' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

/** 기본값입니다. Figma 의 `Checked=False, State=Default, Icon=False` 에 해당합니다. */
export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Switch {...args} checked={checked} onChange={setChecked} />;
  },
};

/** **Checked** 축입니다. 손잡이는 16px 을 이동하고 꺼짐 상태에서만 그림자가 붙습니다. */
export const CheckedStates: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      <div className={'story-row'}>
        <span className={'story-label'}>{'Checked=False'}</span>
        <Switch {...args} label={'False'} />
      </div>
      <div className={'story-row'}>
        <span className={'story-label'}>{'Checked=True'}</span>
        <Switch {...args} checked label={'True'} />
      </div>
    </div>
  ),
};

/** **Icon** 축입니다. 켜짐에는 체크, 꺼짐에는 X 가 들어갑니다. */
export const WithIcon: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      <div className={'story-row'}>
        <span className={'story-label'}>{'Icon=True'}</span>
        <Switch {...args} icon label={'False'} />
        <Switch {...args} icon checked label={'True'} />
      </div>
      <div className={'story-row'}>
        <span className={'story-label'}>{'Disabled'}</span>
        <Switch {...args} icon disabled label={'False'} />
        <Switch {...args} icon disabled checked label={'True'} />
      </div>
    </div>
  ),
};

/** **Direction** 축입니다. 라벨을 스위치 앞/뒤 어디에도 둘 수 있습니다. */
export const LabelPlacement: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      <div className={'story-row'}>
        <span className={'story-label'}>{'end (Direction=Left)'}</span>
        <Switch {...args} labelPlacement={'end'} />
      </div>
      <div className={'story-row'}>
        <span className={'story-label'}>{'start (Direction=Right)'}</span>
        <Switch {...args} labelPlacement={'start'} />
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
        <Switch {...args} label={'False'} />
        <Switch {...args} checked label={'True'} />
      </div>
      <div className={'story-row'}>
        <span className={'story-label'}>{'Disabled'}</span>
        <Switch {...args} disabled label={'False'} />
        <Switch {...args} disabled checked label={'True'} />
      </div>
    </div>
  ),
};
