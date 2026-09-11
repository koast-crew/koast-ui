import type { Meta, StoryObj } from '@storybook/react';
import { ChevronRight, Home, Slash } from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';
import type { BreadcrumbItem } from './Breadcrumbs.types';

const PATH: BreadcrumbItem[] = [
  { label: '홈', href: '#' },
  { label: '카테고리', href: '#' },
  { label: '제품', href: '#' },
  { label: '관측소', href: '#' },
  { label: '상세 페이지' },
];

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { items: PATH },
  argTypes: {
    'items': {
      description:
        '최상위부터 현재 위치까지 순서대로 나열합니다. **마지막 항목이 현재 위치**로 간주됩니다.',
    },
    'aria-label': {
      control: 'text',
      description: '`<nav>` 의 접근 가능한 이름입니다.',
    },
    'separator': { control: false, description: '항목 사이 구분자입니다.' },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

/** 기본값입니다. Figma 의 `Level=5` 에 해당합니다. */
export const Default: Story = {};

/** **Level** 축입니다. Figma 는 2 ~ 5 단계를 정의하지만 구현은 개수 제한이 없습니다. */
export const Levels: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {[2, 3, 4, 5].map((level) => (
        <div key={level} className={'story-row'}>
          <span className={'story-label'}>{`Level=${ level }`}</span>
          <Breadcrumbs {...args} items={PATH.slice(0, level)} />
        </div>
      ))}
    </div>
  ),
};

/** Figma 항목에는 16px leading icon 자리가 있습니다. 항목별로 선택해서 넣습니다. */
export const WithIcons: Story = {
  args: {
    items: [
      { label: '홈', href: '#', icon: <Home /> },
      { label: '관측소', href: '#' },
      { label: '상세 페이지' },
    ],
  },
};

/** 구분자는 바꿀 수 있습니다. 어느 경우에도 보조 기술에는 노출되지 않습니다. */
export const CustomSeparator: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      <div className={'story-row'}>
        <span className={'story-label'}>{'기본 (chevron)'}</span>
        <Breadcrumbs {...args} items={PATH.slice(0, 3)} />
      </div>
      <div className={'story-row'}>
        <span className={'story-label'}>{'slash'}</span>
        <Breadcrumbs
          {...args}
          items={PATH.slice(0, 3)}
          separator={<Slash />}
        />
      </div>
      <div className={'story-row'}>
        <span className={'story-label'}>{'chevron-right'}</span>
        <Breadcrumbs
          {...args}
          items={PATH.slice(0, 3)}
          separator={<ChevronRight />}
        />
      </div>
    </div>
  ),
};

/**
 * `href` 가 없는 중간 항목은 링크가 아닌 텍스트로 표시됩니다.
 * 접근 권한이 없거나 라우트가 없는 단계에 씁니다.
 */
export const WithoutHref: Story = {
  args: {
    items: [
      { label: '홈', href: '#' },
      { label: '분류' },
      { label: '관측소', href: '#' },
      { label: '상세 페이지' },
    ],
  },
};

/** 경로가 길어지면 줄바꿈됩니다. Figma 는 한 줄만 정의합니다. */
export const Wrapping: Story = {
  render: (args) => (
    <div className={'koast-w-80'}>
      <Breadcrumbs
        {...args}
        items={[
          { label: '해양기상정보포털', href: '#' },
          { label: '실시간 관측자료', href: '#' },
          { label: '부이 관측소', href: '#' },
          { label: '동해 중부', href: '#' },
          { label: '2026년 9월 관측 상세' },
        ]}
      />
    </div>
  ),
};
