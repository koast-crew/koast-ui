import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Info, MessageSquare, Settings } from 'lucide-react';
import { TabItem, Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    'aria-label': '상품 정보',
  },
  argTypes: {
    value: {
      control: 'text',
      description: '선택된 탭의 값입니다. 지정하면 제어 컴포넌트로 동작합니다.',
    },
    defaultValue: {
      control: 'text',
      description: '비제어로 쓸 때의 초기 선택값입니다. 없으면 첫 번째 활성 탭이 선택됩니다.',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 560 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const ITEMS = ['01', '02', '03'];

const renderItems = () =>
  ITEMS.map((item) => (
    <TabItem key={item} value={item} label={`Label ${ item }`}>
      {`Tab ${ item } 패널 내용입니다.`}
    </TabItem>
  ));

/** 기본값입니다. Figma 의 `Tabs / Items=3` 에 해당하며 첫 탭이 선택됩니다. */
export const Default: Story = {
  render: (args) => <Tabs {...args}>{renderItems()}</Tabs>,
};

/** **Selected** 축입니다. 선택 탭만 1px 파란 테두리와 파란 라벨을 갖습니다. */
export const Selected: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue={'02'}>
      {renderItems()}
    </Tabs>
  ),
};

/** Figma 의 **Number** 축은 항목 개수일 뿐이라 prop 이 아니라 자식 개수로 정해집니다. */
export const ItemCounts: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {[2, 4, 6].map((count) => (
        <div key={count}>
          <span className={'story-label'}>{`Number = ${ count }`}</span>
          <Tabs {...args} id={`tabs-count-${ count }`}>
            {Array.from({ length: count }, (_, index) => {
              const value = String(index + 1).padStart(2, '0');
              return (
                <TabItem key={value} value={value} label={`Label ${ value }`}>
                  {`Tab ${ value } 패널 내용입니다.`}
                </TabItem>
              );
            })}
          </Tabs>
        </div>
      ))}
    </div>
  ),
};

/** Figma 의 `Leading icon` 슬롯입니다. 24px 아이콘이 라벨 앞에 8px 간격으로 붙습니다. */
export const WithIcon: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabItem value={'detail'} label={'설명'} icon={<Info aria-hidden />}>
        {'상품 상세 설명입니다.'}
      </TabItem>
      <TabItem value={'review'} label={'리뷰'} icon={<MessageSquare aria-hidden />}>
        {'리뷰 12건이 있습니다.'}
      </TabItem>
      <TabItem value={'spec'} label={'사양'} icon={<Settings aria-hidden />}>
        {'제품 사양표입니다.'}
      </TabItem>
    </Tabs>
  ),
};

/** 비활성 탭은 선택할 수 없고 방향키 이동에서도 건너뜁니다. */
export const Disabled: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabItem value={'01'} label={'사용 가능'}>{'01 패널'}</TabItem>
      <TabItem value={'02'} label={'사용 불가'} disabled>{'02 패널'}</TabItem>
      <TabItem value={'03'} label={'사용 가능'}>{'03 패널'}</TabItem>
    </Tabs>
  ),
};

/** `value` 를 넘기면 제어 컴포넌트로 동작합니다. */
export const Controlled: Story = {
  render: (args) => {
    const [tab, setTab] = useState('02');
    return (
      <div className={'story-stack'}>
        <Tabs {...args} value={tab} onChange={setTab}>
          {renderItems()}
        </Tabs>
        <span className={'story-note'}>{`선택된 탭: ${ tab }`}</span>
      </div>
    );
  },
};
