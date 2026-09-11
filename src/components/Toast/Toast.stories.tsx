import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';
import type { ToastStatus, ToastType } from './Toast.types';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    title: 'Title',
    children: 'Description',
    status: 'neutral',
    type: 'text',
  },
  argTypes: {
    status: {
      control: 'radio',
      options: [
        'brand',
        'neutral',
        'info',
        'success',
        'warning',
        'error',
        'inverse',
      ],
      description: 'Figma 의 **Status** 축입니다. Figma 표기 `Netural` / `Information` 에 대응합니다.',
    },
    type: {
      control: 'radio',
      options: ['text', 'action', 'longAction'],
      description: 'Figma 의 **Type** 축입니다. `Text only` / `Text & Action` / `Text & Long Action`.',
    },
    title: { control: 'text' },
    children: { control: 'text' },
    actionLabel: { control: 'text' },
    duration: { control: 'number' },
    onAction: { control: false },
    onClose: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

const STATUSES: ToastStatus[] = [
  'brand',
  'neutral',
  'info',
  'success',
  'warning',
  'error',
  'inverse',
];
const TYPES: ToastType[] = ['text', 'action', 'longAction'];

/** 기본값입니다. Figma 의 `Type=Text only, Status=Netural` 에 해당합니다. */
export const Default: Story = {
  render: (args) => (
    <div className={'koast-w-[360px]'}>
      <Toast {...args} />
    </div>
  ),
};

/** **Status** 축입니다. 일곱 상태가 각각 고정된 면·테두리 색을 가집니다. */
export const Statuses: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {STATUSES.map((status) => (
        <div key={status} className={'koast-w-[360px]'}>
          <Toast {...args} status={status} title={status} />
        </div>
      ))}
    </div>
  ),
};

/** **Type** 축입니다. action 은 본문 오른쪽, longAction 은 본문 아래에 액션 행이 붙습니다. */
export const Types: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {TYPES.map((type) => (
        <div key={type} className={'story-stack'}>
          <span className={'story-label'}>{type}</span>
          <div className={'koast-w-[360px]'}>
            <Toast
              {...args}
              type={type}
              status={'info'}
              actionLabel={type === 'longAction' ? '변경 내용 되돌리기' : 'Action'}
              onAction={() => {}}
              onClose={() => {}}
            />
          </div>
        </div>
      ))}
      <span className={'story-note'}>
        {'Figma 의 Text only 에는 닫기 버튼이 없지만, 구현에서는 Type 과 무관하게 onClose 로 켭니다.'}
      </span>
    </div>
  ),
};

/** 진한 면 변형입니다. 제목·본문·버튼 라벨이 모두 반전 색을 씁니다. */
export const Inverse: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {TYPES.map((type) => (
        <div key={type} className={'koast-w-[360px]'}>
          <Toast
            {...args}
            type={type}
            status={'inverse'}
            title={type}
            actionLabel={'Action'}
            onAction={() => {}}
            onClose={() => {}}
          />
        </div>
      ))}
    </div>
  ),
};

/**
 * `duration` 을 주면 지정한 시간 뒤에 `onClose` 가 호출됩니다.
 * 포인터를 올리거나 닫기 버튼에 포커스를 두면 타이머가 멈추고, 벗어나면 남은 시간부터 이어집니다.
 */
export const AutoDismiss: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);

    return (
      <div className={'story-stack'}>
        <div className={'koast-w-[360px]'}>
          {open
            ? (
                <Toast
                  {...args}
                  status={'success'}
                  type={'action'}
                  title={'업로드 완료'}
                  actionLabel={'보기'}
                  onAction={() => {}}
                  onClose={() => setOpen(false)}
                  duration={4000}
                >
                  {'4초 뒤에 사라집니다. 마우스를 올리면 멈춥니다.'}
                </Toast>
              )
            : (
                <button
                  type={'button'}
                  className={'koast-inline-flex koast-h-10 koast-items-center koast-rounded-lg koast-border koast-border-solid koast-border-primary koast-px-4 koast-text-sm koast-text-primary'}
                  onClick={() => setOpen(true)}
                >
                  {'다시 띄우기'}
                </button>
              )}
        </div>
      </div>
    );
  },
};

/** 본문 없이 제목만 쓰는 경우입니다. 높이가 80 → 56px 로 줄어듭니다. */
export const TitleOnly: Story = {
  render: (args) => (
    <div className={'koast-w-[360px]'}>
      <Toast {...args} status={'warning'} title={'설정이 저장되었습니다'} onClose={() => {}}>
        {null}
      </Toast>
    </div>
  ),
};
