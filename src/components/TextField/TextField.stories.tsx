import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Search } from 'lucide-react';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    helpText: 'Help message',
    size: 'md',
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Figma 의 **Size** 축입니다. 상자 높이 40 / 48px 에 대응합니다.',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
    },
    error: { control: 'boolean', description: 'Figma State=Error.' },
    disabled: { control: 'boolean', description: 'Figma State=Disabled.' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean', description: '라벨 뒤에 * 가 붙습니다.' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helpText: { control: 'text' },
    trailingIcon: { control: false },
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
type Story = StoryObj<typeof TextField>;

/** 기본값입니다. Figma 의 `State=Default, Size=Medium` 에 해당합니다. */
export const Default: Story = {};

/** **Size** 축입니다. 상자 높이만 달라지고 글자·아이콘 크기는 같습니다. */
export const Sizes: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {([['md', 'Medium · 48px'], ['sm', 'Small · 40px']] as const).map(([size, name]) => (
        <div key={size}>
          <span className={'story-label'}>{name}</span>
          <TextField {...args} size={size} label={name} />
        </div>
      ))}
    </div>
  ),
};

/** **State** 축입니다. Hovered / Pressed / Focused 는 직접 상호작용해야 나타납니다. */
export const States: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      <TextField {...args} label={'Default'} />
      <TextField {...args} label={'Filled'} defaultValue={'입력된 값'} />
      <TextField {...args} label={'Error'} error helpText={'필수 항목입니다'} />
      <TextField {...args} label={'Disabled'} disabled defaultValue={'입력된 값'} />
    </div>
  ),
};

/** Figma 의 `Trailing icon` 슬롯입니다. 아이콘은 24x24 로 그려집니다. */
export const WithTrailingIcon: Story = {
  args: { trailingIcon: <Search /> },
};

/** 라벨과 보조 문구는 생략할 수 있습니다. */
export const WithoutLabel: Story = {
  args: { label: undefined, helpText: undefined },
};

/** `required` 는 라벨 뒤에 `*` 를 붙이고 `aria-required` 를 겁니다. */
export const Required: Story = {
  args: { required: true },
};

/** `value` 를 넘기면 제어 컴포넌트로 동작합니다. */
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('KOAST');
    return (
      <div className={'story-stack'}>
        <TextField {...args} value={value} onChange={setValue} maxLength={20} />
        <span className={'story-note'}>{`입력된 값: ${ value }`}</span>
      </div>
    );
  },
};
