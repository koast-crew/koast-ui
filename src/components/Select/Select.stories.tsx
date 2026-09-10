import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectItem } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    label: 'Label',
    placeholder: '선택',
    helpText: 'Help message',
    size: 'md',
    visibleOptions: 8,
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Figma 의 **Size** 축입니다. 트리거 높이 40 / 48px 에 대응합니다.',
    },
    visibleOptions: {
      control: 'radio',
      options: [4, 6, 8],
      description: 'Figma 의 Option group **Number** 축입니다. 드롭다운 최대 높이를 정합니다.',
    },
    error: { control: 'boolean', description: 'Figma State=Error.' },
    disabled: { control: 'boolean', description: 'Figma State=Disabled.' },
    required: { control: 'boolean', description: '라벨 뒤에 * 가 붙습니다.' },
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
type Story = StoryObj<typeof Select>;

const OPTIONS = [
  'Option 01', 'Option 02', 'Option 03', 'Option 04',
  'Option 05', 'Option 06', 'Option 07', 'Option 08',
];

const renderOptions = () =>
  OPTIONS.map((option) => (
    <SelectItem key={option} value={option}>{option}</SelectItem>
  ));

/** 기본값입니다. Figma 의 `State=Default, Size=Medium` 에 해당합니다. */
export const Default: Story = {
  render: (args) => <Select {...args}>{renderOptions()}</Select>,
};

/** **Size** 축입니다. 트리거 높이만 달라지고 글자·아이콘 크기는 같습니다. */
export const Sizes: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {([['md', 'Medium · 48px'], ['sm', 'Small · 40px']] as const).map(([size, name]) => (
        <div key={size}>
          <span className={'story-label'}>{name}</span>
          <Select {...args} size={size} label={name}>{renderOptions()}</Select>
        </div>
      ))}
    </div>
  ),
};

/** **State** 축입니다. Hovered / Pressed / Focused 는 직접 상호작용해야 나타납니다. */
export const States: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      <Select {...args} label={'Default'}>{renderOptions()}</Select>
      <Select {...args} label={'Filled'} defaultValue={'Option 02'}>{renderOptions()}</Select>
      <Select {...args} label={'Error'} error helpText={'필수 항목입니다'}>{renderOptions()}</Select>
      <Select {...args} label={'Disabled'} disabled>{renderOptions()}</Select>
    </div>
  ),
};

/** Option group 의 **Number** 축입니다. 옵션 8개를 넣고 보이는 개수만 바꿉니다. */
export const VisibleOptions: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {([4, 6, 8] as const).map((count) => (
        <Select key={count} {...args} visibleOptions={count} label={`Number = ${ count }`}>
          {renderOptions()}
        </Select>
      ))}
    </div>
  ),
};

/** 라벨과 보조 문구는 생략할 수 있습니다. */
export const WithoutLabel: Story = {
  args: { label: undefined, helpText: undefined },
  render: (args) => <Select {...args}>{renderOptions()}</Select>,
};

/** 비활성 옵션은 키보드 이동에서도 건너뜁니다. */
export const DisabledOption: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectItem value={'a'}>{'선택 가능'}</SelectItem>
      <SelectItem value={'b'} disabled>{'선택 불가'}</SelectItem>
      <SelectItem value={'c'}>{'선택 가능'}</SelectItem>
    </Select>
  ),
};

/** 숫자 값도 그대로 쓸 수 있습니다. `0` 도 정상 표시됩니다. */
export const NumberValues: Story = {
  render: (args) => (
    <Select {...args} defaultValue={0}>
      <SelectItem value={0}>{'0 — 없음'}</SelectItem>
      <SelectItem value={10}>{'10'}</SelectItem>
      <SelectItem value={20}>{'20'}</SelectItem>
    </Select>
  ),
};

/** `value` 를 넘기면 제어 컴포넌트로 동작합니다. */
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | number>('Option 01');
    return (
      <div className={'story-stack'}>
        <Select {...args} value={value} onChange={setValue}>{renderOptions()}</Select>
        <span className={'story-note'}>{`선택된 값: ${ value }`}</span>
      </div>
    );
  },
};
