import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * ButtonGroup 컴포넌트는 관련된 버튼들을 그룹화하는 컴포넌트입니다.
 * 다양한 크기, 색상, 변형을 지원하며 수직/수평 방향으로 배치할 수 있습니다.
 */
const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'contained', 'outlined'],
      description: '버튼 그룹의 변형을 지정합니다.',
      defaultValue: 'outlined',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
      description: '버튼 그룹의 색상을 지정합니다.',
      defaultValue: 'primary',
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: '버튼 그룹의 크기를 지정합니다.',
      defaultValue: 'md',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 그룹의 비활성화 상태를 지정합니다.',
      defaultValue: false,
    },
    fullWidth: {
      control: 'boolean',
      description: '버튼 그룹의 너비를 부모 요소의 100%로 설정합니다.',
      defaultValue: false,
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: '버튼 그룹의 방향을 설정합니다.',
      defaultValue: 'horizontal',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

/**
 * 기본 버튼 그룹 예시입니다.
 */
export const Default: Story = {
  args: {
    children: [
      <Button key={'one'}>{'One'}</Button>,
      <Button key={'two'}>{'Two'}</Button>,
      <Button key={'three'}>{'Three'}</Button>,
    ],
  },
  render: (args) => (
    <div className={'flex w-[800px] justify-center'}>
      <ButtonGroup {...args} />
    </div>
  ),
};

/**
 * 다양한 변형(variant)을 가진 버튼 그룹입니다.
 */
export const Variants: Story = {
  render: () => (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex items-center gap-2'}>
        <span className={'w-20 text-sm'}>{'Text:'}</span>
        <ButtonGroup variant={'text'}>
          <Button>{'One'}</Button>
          <Button>{'Two'}</Button>
          <Button>{'Three'}</Button>
        </ButtonGroup>
      </div>
      <div className={'flex items-center gap-2'}>
        <span className={'w-20 text-sm'}>{'Contained:'}</span>
        <ButtonGroup variant={'contained'}>
          <Button>{'One'}</Button>
          <Button>{'Two'}</Button>
          <Button>{'Three'}</Button>
        </ButtonGroup>
      </div>
      <div className={'flex items-center gap-2'}>
        <span className={'w-20 text-sm'}>{'Outlined:'}</span>
        <ButtonGroup variant={'outlined'}>
          <Button>{'One'}</Button>
          <Button>{'Two'}</Button>
          <Button>{'Three'}</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

/**
 * 다양한 크기와 색상을 가진 버튼 그룹입니다.
 */
export const SizesAndColors: Story = {
  render: () => (
    <div className={'flex flex-col gap-6'}>
      <div className={'flex flex-col gap-4'}>
        <h3 className={'text-sm font-medium'}>{'크기'}</h3>
        <div className={'flex items-center gap-2'}>
          <span className={'w-20 text-sm'}>{'XS:'}</span>
          <ButtonGroup size={'xs'}>
            <Button>{'One'}</Button>
            <Button>{'Two'}</Button>
            <Button>{'Three'}</Button>
          </ButtonGroup>
        </div>
        <div className={'flex items-center gap-2'}>
          <span className={'w-20 text-sm'}>{'SM:'}</span>
          <ButtonGroup size={'sm'}>
            <Button>{'One'}</Button>
            <Button>{'Two'}</Button>
            <Button>{'Three'}</Button>
          </ButtonGroup>
        </div>
        <div className={'flex items-center gap-2'}>
          <span className={'w-20 text-sm'}>{'MD:'}</span>
          <ButtonGroup size={'md'}>
            <Button>{'One'}</Button>
            <Button>{'Two'}</Button>
            <Button>{'Three'}</Button>
          </ButtonGroup>
        </div>
        <div className={'flex items-center gap-2'}>
          <span className={'w-20 text-sm'}>{'LG:'}</span>
          <ButtonGroup size={'lg'}>
            <Button>{'One'}</Button>
            <Button>{'Two'}</Button>
            <Button>{'Three'}</Button>
          </ButtonGroup>
        </div>
        <div className={'flex items-center gap-2'}>
          <span className={'w-20 text-sm'}>{'XL:'}</span>
          <ButtonGroup size={'xl'}>
            <Button>{'One'}</Button>
            <Button>{'Two'}</Button>
            <Button>{'Three'}</Button>
          </ButtonGroup>
        </div>
      </div>

      <div className={'flex flex-col gap-4'}>
        <h3 className={'text-sm font-medium'}>{'색상'}</h3>
        <div className={'flex items-center gap-2'}>
          <span className={'w-20 text-sm'}>{'Primary:'}</span>
          <ButtonGroup color={'primary'}>
            <Button>{'One'}</Button>
            <Button>{'Two'}</Button>
            <Button>{'Three'}</Button>
          </ButtonGroup>
        </div>
        <div className={'flex items-center gap-2'}>
          <span className={'w-20 text-sm'}>{'Secondary:'}</span>
          <ButtonGroup color={'secondary'}>
            <Button>{'One'}</Button>
            <Button>{'Two'}</Button>
            <Button>{'Three'}</Button>
          </ButtonGroup>
        </div>
        <div className={'flex items-center gap-2'}>
          <span className={'w-20 text-sm'}>{'Success:'}</span>
          <ButtonGroup color={'success'}>
            <Button>{'One'}</Button>
            <Button>{'Two'}</Button>
            <Button>{'Three'}</Button>
          </ButtonGroup>
        </div>
        <div className={'flex items-center gap-2'}>
          <span className={'w-20 text-sm'}>{'Error:'}</span>
          <ButtonGroup color={'error'}>
            <Button>{'One'}</Button>
            <Button>{'Two'}</Button>
            <Button>{'Three'}</Button>
          </ButtonGroup>
        </div>
        <div className={'flex items-center gap-2'}>
          <span className={'w-20 text-sm'}>{'Warning:'}</span>
          <ButtonGroup color={'warning'}>
            <Button>{'One'}</Button>
            <Button>{'Two'}</Button>
            <Button>{'Three'}</Button>
          </ButtonGroup>
        </div>
        <div className={'flex items-center gap-2'}>
          <span className={'w-20 text-sm'}>{'Info:'}</span>
          <ButtonGroup color={'info'}>
            <Button>{'One'}</Button>
            <Button>{'Two'}</Button>
            <Button>{'Three'}</Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  ),
};

/**
 * 수직 방향으로 배치된 버튼 그룹입니다.
 */
export const VerticalGroup: Story = {
  render: () => (
    <div className={'flex gap-8'}>
      <div className={'flex flex-col gap-2'}>
        <h3 className={'text-sm font-medium'}>{'기본'}</h3>
        <ButtonGroup orientation={'vertical'}>
          <Button>{'One'}</Button>
          <Button>{'Two'}</Button>
          <Button>{'Three'}</Button>
        </ButtonGroup>
      </div>

      <div className={'flex flex-col gap-2'}>
        <h3 className={'text-sm font-medium'}>{'text'}</h3>
        <ButtonGroup variant={'text'} orientation={'vertical'}>
          <Button>{'One'}</Button>
          <Button>{'Two'}</Button>
          <Button>{'Three'}</Button>
        </ButtonGroup>
      </div>

      <div className={'flex flex-col gap-2'}>
        <h3 className={'text-sm font-medium'}>{'Contained'}</h3>
        <ButtonGroup orientation={'vertical'} variant={'contained'}>
          <Button>{'One'}</Button>
          <Button>{'Two'}</Button>
          <Button>{'Three'}</Button>
        </ButtonGroup>
      </div>

      <div className={'flex flex-col gap-2'}>
        <h3 className={'text-sm font-medium'}>{'아이콘 포함'}</h3>
        <ButtonGroup orientation={'vertical'} variant={'contained'} color={'primary'}>
          <Button startIcon={<ChevronLeft />}>{'이전'}</Button>
          <Button>{'현재'}</Button>
          <Button endIcon={<ChevronRight />}>{'다음'}</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

/**
 * 비활성화된 버튼 그룹입니다.
 */
export const DisabledGroup: Story = {
  args: {
    disabled: true,
    children: [
      <Button key={'one'}>{'One'}</Button>,
      <Button key={'two'}>{'Two'}</Button>,
      <Button key={'three'}>{'Three'}</Button>,
    ],
  },
};

/**
 * 전체 너비를 차지하는 버튼 그룹입니다.
 */
export const FullWidthGroup: Story = {
  render: () => (
    <>
      <div className={'flex w-[500px] flex-col gap-4'}>
        <ButtonGroup fullWidth>
          <Button>{'One'}</Button>
          <Button>{'Two'}</Button>
          <Button>{'Three'}</Button>
        </ButtonGroup>
        <ButtonGroup fullWidth orientation={'vertical'}>
          <Button>{'One'}</Button>
          <Button>{'Two'}</Button>
          <Button>{'Three'}</Button>
        </ButtonGroup>
      </div>
    </>
  ),
};
