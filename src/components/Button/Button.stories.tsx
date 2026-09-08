import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Plus, Send, Download, ChevronRight } from 'lucide-react';
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    children: '버튼',
    variant: 'contained',
    color: 'primary',
    size: 'md',
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
      description: 'Figma 의 **Type** 축입니다.',
    },
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
      description:
        'Figma 의 **Style** 축입니다. contained=Filled, outlined=Outlined, text=Transparent.',
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md'],
      description:
        'Figma 의 **Size** 축입니다. 높이 28 / 40 / 48px 에 대응합니다.',
    },
    disabled: { control: 'boolean', description: 'Figma State=Disabled.' },
    loading: { control: 'boolean', description: 'Figma State=Loading.' },
    fullWidth: {
      control: 'boolean',
      description: '너비를 부모의 100%로 설정합니다.',
    },
    shadow: {
      control: 'boolean',
      description: '그림자입니다. contained 에만 적용됩니다.',
    },
    type: { control: 'radio', options: ['button', 'submit', 'reset'] },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

const TYPES = [
  ['primary', 'Primary'],
  ['secondary', 'Secondary'],
  ['danger', 'Destructive'],
] as const;

const STYLES = [
  ['contained', 'Filled'],
  ['outlined', 'Outlined'],
  ['text', 'Transparent'],
] as const;

/** 기본값입니다. Figma 의 `Type=Primary, Style=Filled, State=Default` 에 해당합니다. */
export const Default: Story = {};

/** **Type** 축입니다. Figma 의 Primary / Secondary / Destructive 에 대응합니다. */
export const Types: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {STYLES.map(([variant, styleName]) => (
        <div key={variant} className={'story-row'}>
          <span className={'story-label'}>{styleName}</span>
          {TYPES.map(([color, typeName]) => (
            <Button key={color} {...args} variant={variant} color={color}>
              {typeName}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

/** **Style** 축입니다. Figma 의 Filled / Outlined / Transparent 에 대응합니다. */
export const Styles: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {TYPES.map(([color, typeName]) => (
        <div key={color} className={'story-row'}>
          <span className={'story-label'}>{typeName}</span>
          {STYLES.map(([variant, styleName]) => (
            <Button key={variant} {...args} variant={variant} color={color}>
              {styleName}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

/** **State** 축입니다. Hovered / Pressed / Focused 는 직접 상호작용해야 나타납니다. */
export const States: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      <div className={'story-row'}>
        <span className={'story-label'}>{'Default'}</span>
        <Button {...args}>{'Default'}</Button>
      </div>
      <div className={'story-row'}>
        <span className={'story-label'}>{'Hovered'}</span>
        <Button {...args}>{'마우스를 올려보세요'}</Button>
      </div>
      <div className={'story-row'}>
        <span className={'story-label'}>{'Pressed'}</span>
        <Button {...args}>{'눌러보세요'}</Button>
      </div>
      <div className={'story-row'}>
        <span className={'story-label'}>{'Focused'}</span>
        <Button {...args}>{'Tab 으로 포커스'}</Button>
      </div>
      <div className={'story-row'}>
        <span className={'story-label'}>{'Disabled'}</span>
        <Button {...args} disabled>
          {'Disabled'}
        </Button>
      </div>
      <div className={'story-row'}>
        <span className={'story-label'}>{'Loading'}</span>
        <Button {...args} loading>
          {'Loading'}
        </Button>
      </div>
    </div>
  ),
};

/** **Size** 축입니다. 높이는 디자인 시스템이 28 / 40 / 48px 로 고정합니다. */
export const Sizes: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {(
        [
          ['xs', 'XSmall · 28px'],
          ['sm', 'Small · 40px'],
          ['md', 'Medium · 48px'],
        ] as const
      ).map(([size, name]) => (
        <div key={size} className={'story-row'}>
          <span className={'story-label'}>{name}</span>
          <Button {...args} size={size}>
            {'버튼'}
          </Button>
          <Button {...args} size={size} variant={'outlined'}>
            {'버튼'}
          </Button>
          <Button {...args} size={size} startIcon={<Plus />}>
            {'아이콘'}
          </Button>
        </div>
      ))}
    </div>
  ),
};

/** Type × Style 전체 매트릭스입니다. 디자인 검토용입니다. */
export const Matrix: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {TYPES.map(([color, typeName]) => (
        <div key={color} className={'story-row'}>
          <span className={'story-label'}>{typeName}</span>
          {STYLES.map(([variant]) => (
            <Button key={variant} {...args} color={color} variant={variant}>
              {'버튼'}
            </Button>
          ))}
          <Button {...args} color={color} disabled>
            {'비활성'}
          </Button>
        </div>
      ))}
    </div>
  ),
};

/** 아이콘 크기는 `size` 를 따라갑니다 (16 / 16 / 24px). 직접 지정하지 않아도 됩니다. */
export const WithIcons: Story = {
  render: (args) => (
    <div className={'story-row'}>
      <Button {...args} startIcon={<Plus />}>
        {'추가하기'}
      </Button>
      <Button {...args} variant={'outlined'} endIcon={<ChevronRight />}>
        {'다음'}
      </Button>
      <Button {...args} startIcon={<Send />} endIcon={<ChevronRight />}>
        {'전송하기'}
      </Button>
      <Button {...args} color={'secondary'} startIcon={<Download />}>
        {'다운로드'}
      </Button>
    </div>
  ),
};

/** `fullWidth` 는 부모 너비를 채웁니다. */
export const FullWidth: Story = {
  args: { fullWidth: true },
  decorators: [
    (Story) => (
      <div className={'w-80'}>
        <Story />
      </div>
    ),
  ],
};

/** `shadow` 는 contained 에만 적용됩니다. */
export const Shadow: Story = {
  render: (args) => (
    <div className={'story-row'}>
      <Button {...args} shadow>
        {'그림자'}
      </Button>
      <Button {...args} variant={'outlined'} shadow>
        {'적용 안 됨'}
      </Button>
    </div>
  ),
};

/** `className` 은 레이아웃 조정용이며 **소비 프로젝트의** Tailwind 클래스를 씁니다. 색상은 바꿀 수 없습니다. */
export const LayoutCustomization: Story = {
  render: (args) => (
    <div className={'flex flex-col w-80 gap-2'}>
      <Button {...args} className={'justify-between'}>
        {'좌우로 벌린 버튼'}
      </Button>
      <Button {...args} variant={'outlined'} className={'ml-auto w-40'}>
        {'우측 정렬 고정폭'}
      </Button>
    </div>
  ),
};

/** `href` 가 있으면 `<a>` 로 렌더링됩니다. 비활성 상태에서는 `<button>` 으로 떨어집니다. */
export const AsLink: Story = {
  render: (args) => (
    <div className={'story-row'}>
      <Button {...args} variant={'outlined'} href={'https://github.com'}>
        {'github'}
      </Button>
      <Button {...args} href={'https://naver.com'} endIcon={<ChevronRight />}>
        {'Naver 로 이동'}
      </Button>
      <Button
        {...args}
        variant={'text'}
        color={'secondary'}
        href={'https://google.com'}
      >
        {'Google 로 이동'}
      </Button>
    </div>
  ),
};
