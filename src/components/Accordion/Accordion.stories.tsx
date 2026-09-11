import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    size: 'md',
    multiple: false,
    headingLevel: 3,
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Figma 의 **Type** 축입니다. 헤더 높이 40 / 48px 에 대응합니다.',
    },
    multiple: {
      control: 'boolean',
      description: '여러 항목을 동시에 펼칠 수 있게 합니다. Figma 의 Accordion group 은 단일 펼침입니다.',
    },
    headingLevel: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: '헤더를 감싸는 제목 태그 단계입니다.',
    },
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
type Story = StoryObj<typeof Accordion>;

const ITEMS = ['01', '02', '03', '04', '05'];

const renderItems = () =>
  ITEMS.map((item) => (
    <AccordionItem key={item} value={item} title={`Title ${ item }`}>
      {'Description'}
    </AccordionItem>
  ));

/** 기본값입니다. Figma 의 `Accordion group / Type=Default` 에 해당합니다. */
export const Default: Story = {
  render: (args) => (
    <Accordion {...args} defaultValue={['01']}>
      {renderItems()}
    </Accordion>
  ),
};

/** **Size** 축입니다. 헤더 높이와 제목 크기만 달라지고 패널은 같습니다. */
export const Sizes: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {([['md', 'Medium · 48px / 20px'], ['sm', 'Small · 40px / 16px']] as const).map(
        ([size, name]) => (
          <div key={size}>
            <span className={'story-label'}>{name}</span>
            <Accordion {...args} size={size} defaultValue={['01']}>
              {renderItems()}
            </Accordion>
          </div>
        ),
      )}
    </div>
  ),
};

/** **Selected** 축입니다. 펼침 / 접힘 두 상태를 나란히 둡니다. */
export const Selected: Story = {
  render: (args) => (
    <Accordion {...args} multiple defaultValue={['01']}>
      <AccordionItem value={'01'} title={'Selected = True'}>{'Description'}</AccordionItem>
      <AccordionItem value={'02'} title={'Selected = False'}>{'Description'}</AccordionItem>
    </Accordion>
  ),
};

/** 여러 항목을 동시에 펼칩니다. 기본값은 단일 펼침입니다. */
export const Multiple: Story = {
  args: { multiple: true },
  render: (args) => (
    <Accordion {...args} defaultValue={['01', '02']}>
      {renderItems()}
    </Accordion>
  ),
};

/** 비활성 항목은 펼칠 수 없고 방향키 이동에서도 건너뜁니다. */
export const Disabled: Story = {
  render: (args) => (
    <Accordion {...args} defaultValue={['01']}>
      <AccordionItem value={'01'} title={'사용 가능'}>{'Description'}</AccordionItem>
      <AccordionItem value={'02'} title={'사용 불가'} disabled>{'Description'}</AccordionItem>
      <AccordionItem value={'03'} title={'사용 가능'}>{'Description'}</AccordionItem>
    </Accordion>
  ),
};

/** 패널에는 임의의 노드를 넣을 수 있습니다. */
export const RichContent: Story = {
  render: (args) => (
    <Accordion {...args} defaultValue={['01']}>
      <AccordionItem value={'01'} title={'배송 안내'}>
        <div className={'story-stack'}>
          <span>{'영업일 기준 2~3일 소요됩니다.'}</span>
          <span>{'도서·산간 지역은 하루 더 걸릴 수 있습니다.'}</span>
        </div>
      </AccordionItem>
      <AccordionItem value={'02'} title={'교환 안내'}>
        {'수령 후 7일 이내에 신청할 수 있습니다.'}
      </AccordionItem>
    </Accordion>
  ),
};

/** `value` 를 넘기면 제어 컴포넌트로 동작합니다. */
export const Controlled: Story = {
  render: (args) => {
    const [open, setOpen] = useState<string[]>(['02']);
    return (
      <div className={'story-stack'}>
        <Accordion {...args} value={open} onChange={setOpen}>
          {renderItems()}
        </Accordion>
        <span className={'story-note'}>{`펼쳐진 항목: ${ open.join(', ') || '없음' }`}</span>
      </div>
    );
  },
};
