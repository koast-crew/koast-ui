import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    label: 'Label',
    disabled: false,
    required: false,
  },
  argTypes: {
    checked: {
      control: 'radio',
      options: [false, true, 'partial'],
      description: 'Figma 의 **Checked** 축입니다. Unchecked / Checked / Partial.',
    },
    disabled: { control: 'boolean', description: 'Figma State=Disabled.' },
    required: { control: 'boolean', description: '라벨 뒤에 * 가 붙습니다.' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/** 기본값입니다. Figma 의 `Checked=Unchecked, State=Default` 에 해당합니다. */
export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Checkbox {...args} checked={checked} onChange={setChecked} />;
  },
};

/** **Checked** 축 3개입니다. Partial 은 네이티브 indeterminate 로 표현합니다. */
export const CheckedStates: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {([[false, 'Unchecked'], [true, 'Checked'], ['partial', 'Partial']] as const).map(
        ([checked, name]) => (
          <div key={String(checked)} className={'story-row'}>
            <span className={'story-label'}>{name}</span>
            <Checkbox {...args} checked={checked} label={name} />
          </div>
        ),
      )}
    </div>
  ),
};

/** **State** 축입니다. Hovered / Pressed / Focused 는 직접 상호작용해야 나타납니다. */
export const States: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      <div className={'story-row'}>
        <span className={'story-label'}>{'Default'}</span>
        <Checkbox {...args} label={'Unchecked'} />
        <Checkbox {...args} checked label={'Checked'} />
        <Checkbox {...args} checked={'partial'} label={'Partial'} />
      </div>
      <div className={'story-row'}>
        <span className={'story-label'}>{'Disabled'}</span>
        <Checkbox {...args} disabled label={'Unchecked'} />
        <Checkbox {...args} disabled checked label={'Checked'} />
        <Checkbox {...args} disabled checked={'partial'} label={'Partial'} />
      </div>
      <p className={'story-note'}>
        {'Tab 으로 포커스하면 상자 바깥 2px 위치에 포커스 링이 그려집니다.'}
      </p>
    </div>
  ),
};

/** 라벨 없이 체크박스만 씁니다. 표 머리글 같은 자리에서 쓰며 `aria-label` 로 이름을 줍니다. */
export const WithoutLabel: Story = {
  render: (args) => (
    <Checkbox {...args} label={undefined} aria-label={'전체 선택'} />
  ),
};

/** 필수 표시입니다. `Label` 의 `Type=Required` 를 그대로 씁니다. */
export const Required: Story = {
  render: (args) => <Checkbox {...args} required label={'이용약관 동의'} />,
};
