import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    helpText: 'Help message',
  },
  argTypes: {
    error: { control: 'boolean', description: 'Figma State=Error.' },
    disabled: { control: 'boolean', description: 'Figma State=Disabled.' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean', description: '라벨 뒤에 * 가 붙습니다.' },
    autoResize: { control: 'boolean', description: '내용에 맞춰 높이를 늘립니다. 최소 180px.' },
    resizable: { control: 'boolean', description: '세로 크기 조절 손잡이를 켭니다.' },
    maxLength: { control: 'number' },
    showCount: { control: 'boolean', description: 'Figma 의 Character Counter 입니다.' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helpText: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TextArea>;

/** 기본값입니다. Figma 의 `State=Default` 에 해당합니다. 상자 높이는 180px 고정입니다. */
export const Default: Story = {};

/** **State** 축입니다. Hovered / Pressed / Focused 는 직접 상호작용해야 나타납니다. */
export const States: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      <TextArea {...args} label={'Default'} />
      <TextArea {...args} label={'Filled'} defaultValue={'입력된 값'} />
      <TextArea {...args} label={'Error'} error helpText={'필수 항목입니다'} />
      <TextArea {...args} label={'Disabled'} disabled defaultValue={'입력된 값'} />
    </div>
  ),
};

/** Figma 의 **Character Counter** 입니다. `maxLength` 를 주면 라벨 오른쪽에 나옵니다. */
export const WithCounter: Story = {
  args: { maxLength: 200, defaultValue: '고객 피드백을 입력합니다.' },
};

/** 내용에 맞춰 높이를 늘립니다. 고정 높이 180px 이 최소값입니다. */
export const AutoResize: Story = {
  args: {
    autoResize: true,
    defaultValue: Array.from({ length: 8 }, (_, index) => `${ index + 1 }번째 줄`).join('\n'),
  },
};

/** 크기 조절 손잡이를 끕니다. */
export const NotResizable: Story = {
  args: { resizable: false },
};

/** 라벨과 보조 문구는 생략할 수 있습니다. */
export const WithoutLabel: Story = {
  args: { label: undefined, helpText: undefined },
};

/** `value` 를 넘기면 제어 컴포넌트로 동작합니다. */
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('KOAST');
    return (
      <div className={'story-stack'}>
        <TextArea {...args} value={value} onChange={setValue} maxLength={100} />
        <span className={'story-note'}>{`${ value.length }자 입력됨`}</span>
      </div>
    );
  },
};
