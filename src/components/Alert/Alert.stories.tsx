import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import type { AlertStatus, AlertVariant } from './Alert.types';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    title: 'Title',
    children: 'Description',
    status: 'neutral',
    variant: 'filled',
  },
  argTypes: {
    closable: { control: 'boolean', description: '닫기 버튼 표시 여부입니다. 기본 true.' },
    status: {
      control: 'radio',
      options: ['brand', 'neutral', 'info', 'success', 'warning', 'error'],
      description: 'Figma 의 **Status** 축입니다. Figma 표기 `Netural` / `Information` 에 대응합니다.',
    },
    variant: {
      control: 'radio',
      options: ['filled', 'outlined', 'transparent'],
      description: 'Figma 의 **Style** 축입니다. filled 1px · outlined 2px · transparent 테두리 없음.',
    },
    title: { control: 'text' },
    children: { control: 'text' },
    icon: { control: false },
    onClose: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

const STATUSES: AlertStatus[] = [
  'brand',
  'neutral',
  'info',
  'success',
  'warning',
  'error',
];
const VARIANTS: AlertVariant[] = ['filled', 'outlined', 'transparent'];

/** 기본값입니다. Figma 의 `Status=Netural, Style=Filled` 에 해당합니다. */
export const Default: Story = {
  render: (args) => (
    <div className={'koast-w-80'}>
      <Alert {...args} />
    </div>
  ),
};

/** **Status** × **Style** 18개 조합 전부입니다. Figma 컴포넌트 셋과 같은 순서입니다. */
export const Statuses: Story = {
  render: (args) => (
    <div className={'story-stack koast-gap-6'}>
      {VARIANTS.map((variant) => (
        <div key={variant} className={'story-stack'}>
          <span className={'story-label'}>{variant}</span>
          {STATUSES.map((status) => (
            <div key={status} className={'koast-w-80'}>
              <Alert {...args} variant={variant} status={status} title={status} />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

/** 닫기 버튼은 기본으로 켜져 있고, `closable={false}` 로 끕니다. 누르면 알림이 스스로 사라집니다. */
export const Closable: Story = {
  render: (args) => (
    <div className={'story-stack koast-gap-6'}>
      <div className={'story-stack'}>
        <span className={'story-label'}>{'기본 (closable)'}</span>
        {VARIANTS.map((variant) => (
          <div key={variant} className={'koast-w-80'}>
            <Alert {...args} variant={variant} status={'info'} title={'Title'} />
          </div>
        ))}
      </div>
      <div className={'story-stack'}>
        <span className={'story-label'}>{'closable={false}'}</span>
        {VARIANTS.map((variant) => (
          <div key={variant} className={'koast-w-80'}>
            <Alert {...args} variant={variant} status={'info'} title={'Title'} closable={false} />
          </div>
        ))}
      </div>
      <span className={'story-note koast-w-80'}>
        {'Figma 의 Transparent 변형에는 닫기 버튼이 없지만, 구현에서는 Style 과 무관하게 closable 로 켭니다.'}
      </span>
    </div>
  ),
};

/** 본문 없이 제목만 쓰는 경우입니다. 높이가 72 → 52px 로 줄어듭니다. */
export const TitleOnly: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {STATUSES.map((status) => (
        <div key={status} className={'koast-w-80'}>
          <Alert
            {...args}
            variant={'outlined'}
            status={status}
            title={status}
          >
            {null}
          </Alert>
        </div>
      ))}
    </div>
  ),
};

/** 아이콘 축입니다. `icon` 을 넘기지 않으면 status 별 기본 아이콘이, `false` 면 아이콘이 빠집니다. */
export const WithoutIcon: Story = {
  render: (args) => (
    <div className={'story-stack koast-gap-6'}>
      {STATUSES.map((status) => (
        <div key={status} className={'story-stack'}>
          <span className={'story-label'}>{status}</span>
          <div className={'koast-w-80'}>
            <Alert {...args} status={status} title={'기본 아이콘'} />
          </div>
          <div className={'koast-w-80'}>
            <Alert {...args} status={status} title={'icon 없음'} icon={false} />
          </div>
        </div>
      ))}
      <span className={'story-note koast-w-80'}>
        {'Figma 가 brand · neutral 자리에 Icon placeholder 만 둬서, 구현에서는 중립적인 Astroid 를 기본값으로 씁니다.'}
      </span>
    </div>
  ),
};

/** 본문이 길어지면 세로로 늘어나고 아이콘·닫기 버튼은 상단에 고정됩니다. */
export const LongDescription: Story = {
  render: (args) => (
    <div className={'koast-w-80'}>
      <Alert {...args} status={'warning'} variant={'outlined'} title={'저장하지 않은 변경 사항이 있습니다'}>
        {'페이지를 벗어나면 지금까지 입력한 내용이 사라집니다. 계속하기 전에 저장 버튼을 눌러 주세요.'}
      </Alert>
    </div>
  ),
};
