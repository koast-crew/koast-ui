import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ControlGroup } from './ControlGroup';
import { Checkbox } from '../Checkbox/Checkbox';
import { Radio } from '../Radio/Radio';
import type { ControlValue } from './ControlGroup.types';

const meta: Meta<typeof ControlGroup> = {
  title: 'Components/ControlGroup',
  component: ControlGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    label: 'Label',
    type: 'checkbox',
    orientation: 'vertical',
    required: false,
    disabled: false,
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['checkbox', 'radio'],
      description: 'Figma 의 **Check group / Radio group** 두 세트에 대응합니다.',
    },
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: 'Figma 는 세로만 정의합니다. 가로는 같은 12px 간격으로 파생했습니다.',
    },
    required: { control: 'boolean', description: '그룹 라벨 뒤에 * 가 붙습니다.' },
    disabled: { control: 'boolean', description: '자식 컨트롤 전체로 전파됩니다.' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ControlGroup>;

const ITEMS = [
  { value: 'item-01', label: 'Label 01' },
  { value: 'item-02', label: 'Label 02' },
  { value: 'item-03', label: 'Label 03' },
  { value: 'item-04', label: 'Label 04' },
];

/** 기본값입니다. Figma 의 `Check group, Number=4` 에 해당합니다. */
export const Default: Story = {
  render: (args) => (
    <ControlGroup {...args}>
      {ITEMS.map((item) => (
        <Checkbox key={item.value} value={item.value} label={item.label} />
      ))}
    </ControlGroup>
  ),
};

/** **Number** 축입니다. 항목 수만 달라지고 간격은 항상 12px 입니다. */
export const Counts: Story = {
  render: (args) => (
    <div className={'story-row'}>
      {[2, 4, 6, 8].map((count) => (
        <ControlGroup {...args} key={count} label={`Number=${ count }`}>
          {Array.from({ length: count }, (_, index) => (
            <Checkbox
              key={index}
              value={`item-${ index }`}
              label={`Label ${ String(index + 1).padStart(2, '0') }`}
            />
          ))}
        </ControlGroup>
      ))}
    </div>
  ),
};

/** 라디오 그룹입니다. `role="radiogroup"` 이 붙고 방향키로 항목을 옮길 수 있습니다. */
export const RadioGroup: Story = {
  render: (args) => {
    const [value, setValue] = useState<ControlValue>('item-01');
    return (
      <ControlGroup
        type={'radio'}
        label={'배송 옵션'}
        orientation={args.orientation}
        required={args.required}
        disabled={args.disabled}
        value={value}
        onChange={setValue}
      >
        {ITEMS.map((item) => (
          <Radio key={item.value} value={item.value} label={item.label} />
        ))}
      </ControlGroup>
    );
  },
};

/** 체크박스 그룹의 선택 값을 그룹이 배열로 관리합니다. */
export const ManagedCheckbox: Story = {
  render: (args) => {
    const [value, setValue] = useState<ControlValue[]>(['item-02']);
    return (
      <div className={'story-stack'}>
        <ControlGroup
          label={'관심 분야'}
          orientation={args.orientation}
          required={args.required}
          disabled={args.disabled}
          value={value}
          onChange={setValue}
        >
          {ITEMS.map((item) => (
            <Checkbox key={item.value} value={item.value} label={item.label} />
          ))}
        </ControlGroup>
        <span className={'story-note'}>{`선택: ${ value.join(', ') || '없음' }`}</span>
      </div>
    );
  },
};

/** 그룹 전체 비활성화입니다. 자식 컨트롤이 각자 disabled 를 받지 않아도 전파됩니다. */
export const Disabled: Story = {
  render: (args) => (
    <ControlGroup
      label={args.label}
      orientation={args.orientation}
      required={args.required}
      disabled
      defaultValue={['item-01']}
    >
      {ITEMS.map((item) => (
        <Checkbox key={item.value} value={item.value} label={item.label} />
      ))}
    </ControlGroup>
  ),
};

/** 가로 나열입니다. Figma 에는 없고 좁은 항목을 한 줄에 놓기 위해 파생했습니다. */
export const Horizontal: Story = {
  render: (args) => (
    <ControlGroup {...args} orientation={'horizontal'}>
      {ITEMS.map((item) => (
        <Checkbox key={item.value} value={item.value} label={item.label} />
      ))}
    </ControlGroup>
  ),
};
