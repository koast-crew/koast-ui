import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Plus, Send, Download, ChevronRight } from 'lucide-react';

/** 사용자 상호작용을 위한 기본 UI 요소입니다. 크기·색상·변형과 아이콘을 지원합니다. */
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'contained', 'outlined'],
      description: '버튼의 변형을 지정합니다.',
      defaultValue: 'outlined',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
      description: '버튼의 의미(intent)를 지정합니다. 디자인 시스템에 정의된 값만 사용할 수 있습니다.',
      defaultValue: 'primary',
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md'],
      description: '버튼의 크기를 지정합니다.',
      defaultValue: 'md',
    },
    type: {
      control: 'radio',
      options: ['button', 'submit', 'reset'],
      description: '버튼의 HTML type 속성을 지정합니다.',
      defaultValue: 'button',
    },
    disabled: {
      control: 'boolean',
      description: '버튼의 비활성화 상태를 지정합니다.',
      defaultValue: false,
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태를 표시합니다.',
      defaultValue: false,
    },
    fullWidth: {
      control: 'boolean',
      description: '버튼의 너비를 부모 요소의 100%로 설정합니다.',
      defaultValue: false,
    },
    shadow: {
      control: 'boolean',
      description: '버튼에 그림자 효과를 추가합니다. (contained 변형에만 적용)',
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/** 기본 버튼 예시입니다. */
export const Default: Story = {
  args: {
    children: '버튼',
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    type: 'button',
  },
};

/** 버튼 변형(variant) 예시입니다. (줄바꿈을 위해 Fragment를 추가했습니다.) */
export const Variants: Story = {
  render: () => (
    <>
      <div className={'koast-flex koast-gap-4'}>
        <Button variant={'outlined'}>{'outlined'}</Button>
        <Button variant={'contained'}>{'contained'}</Button>
        <Button variant={'text'}>{'text'}</Button>
      </div>
    </>
  ),
};

/** 버튼 색상(color) 예시입니다. */
export const Colors: Story = {
  render: () => (
    <>
      <div className={'koast-flex koast-flex-wrap koast-gap-4'}>
        <Button variant={'contained'} color={'primary'}>{'Primary'}</Button>
        <Button variant={'contained'} color={'secondary'}>{'Secondary'}</Button>
        <Button variant={'contained'} color={'danger'}>{'Danger'}</Button>
      </div>
    </>
  ),
};

/** 버튼 크기(size) 예시입니다. */
export const Sizes: Story = {
  render: () => (
    <>
      <div className={'koast-flex koast-items-center koast-gap-4'}>
        <Button size={'xs'}>{'XS'}</Button>
        <Button size={'sm'}>{'SM'}</Button>
        <Button size={'md'}>{'MD'}</Button>
      </div>
    </>
  ),
};

/** 아이콘이 있는 버튼 예시입니다. */
export const WithIcons: Story = {
  render: () => (
    <>
      <div className={'koast-flex koast-flex-wrap koast-gap-4'}>
        <Button variant={'contained'} startIcon={<Plus />}>{'추가하기'}</Button>
        <Button variant={'outlined'} endIcon={<ChevronRight />}>{'다음'}</Button>
        <Button variant={'contained'} startIcon={<Send />} endIcon={<ChevronRight />}>{'전송하기'}</Button>
        <Button variant={'contained'} color={'secondary'} startIcon={<Download />}>{'다운로드'}</Button>
      </div>
    </>
  ),
};

/** 비활성화된 버튼 예시입니다. */
export const Disabled: Story = {
  render: () => (
    <>
      <div className={'koast-flex koast-gap-4'}>
        <Button variant={'outlined'} disabled>{'outlined'}</Button>
        <Button variant={'contained'} disabled>{'contained'}</Button>
        <Button variant={'text'} disabled>{'text'}</Button>
      </div>
    </>
  ),
};

/** 로딩 상태의 버튼 예시입니다. */
export const Loading: Story = {
  render: () => (
    <>
      <div className={'koast-flex koast-gap-4'}>
        <Button variant={'text'} loading>{'로딩 중'}</Button>
        <Button variant={'contained'} loading>{'로딩 중'}</Button>
        <Button variant={'outlined'} loading>{'전송 중'}</Button>
        <Button variant={'contained'} loading startIcon={<Send size={16} />}>{'아이콘 포함'}</Button>
      </div>
    </>
  ),
};

/** 전체 너비(fullWidth) 버튼 예시입니다. */
export const FullWidth: Story = {
  render: () => (
    <>
      <div className={'koast-w-80'}>
        <Button variant={'contained'} fullWidth>{'전체 너비 버튼'}</Button>
        <div className={'koast-h-4'} />
        <Button variant={'outlined'} fullWidth>{'전체 너비 버튼'}</Button>
      </div>
    </>
  ),
};

/** 그림자 효과가 있는 버튼 예시입니다. */
export const Shadow: Story = {
  render: () => (
    <>
      <div className={'koast-flex koast-gap-4'}>
        <Button variant={'contained'}>{'그림자 없음'}</Button>
        <Button variant={'contained'} shadow>{'그림자 있음'}</Button>
      </div>
    </>
  ),
};

/** `className` 은 레이아웃 조정용입니다. 색상 클래스는 시맨틱 토큰을 덮어쓰므로 쓰지 마세요. */
export const LayoutCustomization: Story = {
  render: () => (
    <>
      <div className={'koast-flex koast-w-80 koast-flex-col koast-gap-2'}>
        <Button variant={'contained'} className={'koast-justify-between'}>
          {'좌우로 벌린 버튼'}
        </Button>
        <Button variant={'outlined'} className={'koast-ml-auto koast-w-40'}>
          {'우측 정렬 고정폭'}
        </Button>
      </div>
    </>
  ),
};

/** 링크 버튼 예시입니다. */
export const AsLink: Story = {
  render: () => (
    <>
      <div className={'koast-flex koast-flex-wrap koast-gap-4'}>
        <Button href={'https://github.com'}>
          {'github'}
        </Button>
        <Button
          href={'https://naver.com'}
          variant={'contained'}
          color={'primary'}
          endIcon={<ChevronRight size={16} />}
        >
          {'Naver로 이동'}
        </Button>
        <Button
          href={'https://google.com'}
          variant={'text'}
          color={'secondary'}
        >
          {'Google로 이동'}
        </Button>
      </div>
    </>
  ),
};