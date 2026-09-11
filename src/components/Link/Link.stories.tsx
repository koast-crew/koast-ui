import type { Meta, StoryObj } from '@storybook/react';
import { ChevronRight, ExternalLink, FileText, Home } from 'lucide-react';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    children: 'Label',
    href: '#',
    variant: 'standalone',
    color: 'primary',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['standalone', 'underline'],
      description:
        'Figma 의 **Style** 축입니다. standalone=Standalone, underline=Underline.',
    },
    color: {
      control: 'radio',
      options: ['primary', 'secondary'],
      description: 'Figma 의 **Type** 축입니다.',
    },
    disabled: { control: 'boolean', description: 'Figma State=Disabled.' },
    visited: {
      control: 'boolean',
      description:
        'Figma State=Visited. 지정하지 않아도 브라우저 `:visited` 를 따라갑니다.',
    },
    href: { control: 'text' },
    target: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

const COLORS = [
  ['primary', 'Primary'],
  ['secondary', 'Secondary'],
] as const;

const VARIANTS = [
  ['standalone', 'Standalone'],
  ['underline', 'Underline'],
] as const;

/** 기본값입니다. Figma 의 `Style=Standalone, Type=Primary, State=Default` 에 해당합니다. */
export const Default: Story = {};

/** **Type** 축입니다. Figma 의 Primary / Secondary 에 대응합니다. */
export const Types: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {VARIANTS.map(([variant, styleName]) => (
        <div key={variant} className={'story-row'}>
          <span className={'story-label'}>{styleName}</span>
          {COLORS.map(([color, typeName]) => (
            <Link key={color} {...args} variant={variant} color={color}>
              {typeName}
            </Link>
          ))}
        </div>
      ))}
    </div>
  ),
};

/** **Style** 축입니다. Standalone 은 밑줄이 없고 Underline 은 밑줄이 붙습니다. */
export const Styles: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {COLORS.map(([color, typeName]) => (
        <div key={color} className={'story-row'}>
          <span className={'story-label'}>{typeName}</span>
          {VARIANTS.map(([variant, styleName]) => (
            <Link key={variant} {...args} variant={variant} color={color}>
              {styleName}
            </Link>
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
        <Link {...args}>{'Default'}</Link>
      </div>
      <div className={'story-row'}>
        <span className={'story-label'}>{'Hovered'}</span>
        <Link {...args}>{'마우스를 올려보세요'}</Link>
      </div>
      <div className={'story-row'}>
        <span className={'story-label'}>{'Pressed'}</span>
        <Link {...args}>{'눌러보세요'}</Link>
      </div>
      <div className={'story-row'}>
        <span className={'story-label'}>{'Focused'}</span>
        <Link {...args}>{'Tab 으로 포커스'}</Link>
      </div>
      <div className={'story-row'}>
        <span className={'story-label'}>{'Visited'}</span>
        <Link {...args} visited>{'방문한 링크'}</Link>
      </div>
      <div className={'story-row'}>
        <span className={'story-label'}>{'Disabled'}</span>
        <Link {...args} disabled>{'비활성'}</Link>
      </div>
    </div>
  ),
};

/** 라벨 앞 아이콘은 16px, 뒤 아이콘은 24px 입니다. Figma 기본 구성은 둘 다 있는 형태입니다. */
export const WithIcons: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      <div className={'story-row'}>
        <span className={'story-label'}>{'양쪽'}</span>
        <Link {...args} startIcon={<FileText />} endIcon={<ChevronRight />}>
          {'Label'}
        </Link>
      </div>
      <div className={'story-row'}>
        <span className={'story-label'}>{'앞만'}</span>
        <Link {...args} startIcon={<Home />}>{'홈으로'}</Link>
      </div>
      <div className={'story-row'}>
        <span className={'story-label'}>{'뒤만'}</span>
        <Link {...args} endIcon={<ChevronRight />}>{'자세히 보기'}</Link>
      </div>
    </div>
  ),
};

/**
 * `target="_blank"` 를 주면 `rel="noopener noreferrer"` 가 자동으로 붙고
 * 접근 가능한 이름 끝에 "(새 창에서 열림)" 이 화면에 보이지 않는 형태로 추가됩니다.
 */
export const NewWindow: Story = {
  args: {
    href: 'https://www.kma.go.kr',
    target: '_blank',
    children: '기상청',
  },
  render: (args) => <Link {...args} endIcon={<ExternalLink />} />,
};

/**
 * 본문 안에 섞이는 링크는 `variant='underline'` 로 씁니다.
 * 색만으로 구분하면 색각 이상 사용자가 주변 텍스트와 구별하지 못합니다.
 */
export const InParagraph: Story = {
  render: (args) => (
    <p
      className={
        'koast-m-0 koast-max-w-96 koast-text-base koast-leading-6 koast-text-primary'
      }
    >
      {'해양 관측 자료는 '}
      <Link {...args} variant={'underline'}>{'관측소 목록'}</Link>
      {' 에서 확인할 수 있고, 상세한 조건은 '}
      <Link {...args} variant={'underline'} color={'secondary'}>
        {'이용약관'}
      </Link>
      {' 을 참고하세요.'}
    </p>
  ),
};
