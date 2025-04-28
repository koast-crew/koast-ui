import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Plus, Send, Download, ChevronRight } from 'lucide-react';

/**
 * Button 컴포넌트는 사용자 상호작용을 위한 기본적인 UI 요소입니다.
 * 다양한 크기, 색상, 변형을 지원하며 아이콘도 함께 사용할 수 있습니다.
 */
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
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
      description: '버튼의 색상을 지정합니다.',
      defaultValue: 'primary',
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
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

/**
 * 기본 버튼 예시입니다.
 */
export const Default: Story = {
  args: {
    children: '버튼',
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    type: 'button',
  },
};

/**
 * 버튼 변형(variant) 예시입니다. (줄바꿈을 위해 Fragment를 추가했습니다.)
 */
export const Variants: Story = {
  render: () => (
    <>
      <div className={'flex gap-4'}>
        <Button variant={'outlined'}>{'outlined'}</Button>
        <Button variant={'contained'}>{'contained'}</Button>
        <Button variant={'text'}>{'text'}</Button>
      </div>
    </>
  ),
};

/**
 * 버튼 색상(color) 예시입니다.
 */
export const Colors: Story = {
  render: () => (
    <>
      <div className={'flex flex-wrap gap-4'}>
        <Button variant={'contained'} color={'primary'}>{'Primary'}</Button>
        <Button variant={'contained'} color={'secondary'}>{'Secondary'}</Button>
        <Button variant={'contained'} color={'success'}>{'Success'}</Button>
        <Button variant={'contained'} color={'error'}>{'Error'}</Button>
        <Button variant={'contained'} color={'warning'}>{'Warning'}</Button>
        <Button variant={'contained'} color={'info'}>{'Info'}</Button>
        <Button variant={'contained'} color={'gray'}>{'Gray'}</Button>
      </div>
    </>
  ),
};

/**
 * 버튼 크기(size) 예시입니다.
 */
export const Sizes: Story = {
  render: () => (
    <>
      <div className={'flex items-center gap-4'}>
        <Button size={'xs'}>{'XS'}</Button>
        <Button size={'sm'}>{'SM'}</Button>
        <Button size={'md'}>{'MD'}</Button>
        <Button size={'lg'}>{'LG'}</Button>
        <Button size={'xl'}>{'XL'}</Button>
      </div>
    </>
  ),
};

/**
 * 아이콘이 있는 버튼 예시입니다.
 */
export const WithIcons: Story = {
  render: () => (
    <>
      <div className={'flex flex-wrap gap-4'}>
        <Button variant={'contained'} startIcon={<Plus />}>{'추가하기'}</Button>
        <Button variant={'outlined'} endIcon={<ChevronRight />}>{'다음'}</Button>
        <Button variant={'contained'} startIcon={<Send />} endIcon={<ChevronRight />}>{'전송하기'}</Button>
        <Button variant={'contained'} color={'gray'} startIcon={<Download />}>{'다운로드'}</Button>
      </div>
    </>
  ),
};

/**
 * 비활성화된 버튼 예시입니다.
 */
export const Disabled: Story = {
  render: () => (
    <>
      <div className={'flex gap-4'}>
        <Button variant={'outlined'} disabled>{'outlined'}</Button>
        <Button variant={'contained'} disabled>{'contained'}</Button>
        <Button variant={'text'} disabled>{'text'}</Button>
      </div>
    </>
  ),
};

/**
 * 로딩 상태의 버튼 예시입니다.
 */
export const Loading: Story = {
  render: () => (
    <>
      <div className={'flex gap-4'}>
        <Button variant={'text'} loading>{'로딩 중'}</Button>
        <Button variant={'contained'} loading>{'로딩 중'}</Button>
        <Button variant={'outlined'} loading>{'전송 중'}</Button>
        <Button variant={'contained'} loading startIcon={<Send size={16} />}>{'아이콘 포함'}</Button>
      </div>
    </>
  ),
};

/**
 * 전체 너비(fullWidth) 버튼 예시입니다.
 */
export const FullWidth: Story = {
  render: () => (
    <>
      <div className={'w-80'}>
        <Button variant={'contained'} fullWidth>{'전체 너비 버튼'}</Button>
        <div className={'h-4'} />
        <Button variant={'outlined'} fullWidth>{'전체 너비 버튼'}</Button>
      </div>
    </>
  ),
};

/**
 * 그림자 효과가 있는 버튼 예시입니다.
 */
export const Shadow: Story = {
  render: () => (
    <>
      <div className={'flex gap-4'}>
        <Button variant={'contained'}>{'그림자 없음'}</Button>
        <Button variant={'contained'} shadow>{'그림자 있음'}</Button>
      </div>
    </>
  ),
};

/**
 * 커스텀 스타일이 적용된 버튼 예시입니다.
 */
export const CustomStyled: Story = {
  render: () => (
    <>
      <div className={'flex gap-4'}>
        <Button
          variant={'contained'}
          customStyle={{
            color: 'white',
            borderRadius: '4px',
            padding: '10px 20px',
          }}
          className={'bg-green-500 hover:bg-green-700'}
        >
          {'커스텀 스타일'}
        </Button>
        <Button
          className={'border-none bg-gradient-to-r from-purple-500 to-pink-500 text-white transition-all duration-300 hover:from-purple-600 hover:to-pink-600'}
        >
          {'Tailwind 클래스'}
        </Button>
      </div>
    </>
  ),
};

/**
 * 링크 버튼 예시입니다.
 */
export const AsLink: Story = {
  render: () => (
    <>
      <div className={'flex flex-wrap gap-4'}>
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
          color={'info'}
        >
          {'Google로 이동'}
        </Button>
      </div>
    </>
  ),
};