import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Bookmark, Pencil, Search, Settings, Trash2, X } from 'lucide-react';
import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    'icon': <Search />,
    'aria-label': '검색',
    'variant': 'contained',
    'color': 'primary',
    'size': 'md',
  },
  argTypes: {
    'icon': { control: false, description: '표시할 아이콘입니다.' },
    'aria-label': {
      control: 'text',
      description:
        '스크린 리더가 읽을 이름입니다. 아이콘만 있는 버튼이라 **필수**입니다.',
    },
    'color': {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
      description: 'Figma 의 **Type** 축입니다.',
    },
    'variant': {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
      description:
        'Figma 의 **Style** 축입니다. contained=Filled, outlined=Outlined, text=Transparent.',
    },
    'size': {
      control: 'radio',
      options: ['xs', 'sm', 'md'],
      description:
        'Figma 의 **Size** 축입니다. 28 / 32 / 40px 정사각형에 대응합니다.',
    },
    'disabled': { control: 'boolean', description: 'Figma State=Disabled.' },
    'loading': { control: 'boolean', description: 'Figma State=Loading.' },
    'selected': {
      control: 'boolean',
      description: 'Figma 의 **Selected** 축입니다. 주면 `aria-pressed` 가 붙습니다.',
    },
    'type': { control: 'radio', options: ['button', 'submit', 'reset'] },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

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

const SIZES = [
  ['xs', 'XSmall · 28px'],
  ['sm', 'Small · 32px'],
  ['md', 'Medium · 40px'],
] as const;

/** 기본값입니다. Figma 의 `Type=Primary, Style=Filled, State=Default` 에 해당합니다. */
export const Default: Story = {};

/** **Type** 축입니다. `danger` 는 Figma 의 Property table 에만 있고 variant 는 없어 Button 에서 파생했습니다. */
export const Types: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {STYLES.map(([variant, styleName]) => (
        <div key={variant} className={'story-row'}>
          <span className={'story-label'}>{styleName}</span>
          {TYPES.map(([color, typeName]) => (
            <IconButton
              key={color}
              {...args}
              variant={variant}
              color={color}
              aria-label={`${ typeName } ${ styleName } 검색`}
            />
          ))}
        </div>
      ))}
    </div>
  ),
};

/** **Size** 축입니다. 28 / 32 / 40px 정사각형이고 아이콘은 16 / 16 / 24px 입니다. */
export const Sizes: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {SIZES.map(([size, sizeName]) => (
        <div key={size} className={'story-row'}>
          <span className={'story-label'}>{sizeName}</span>
          {STYLES.map(([variant, styleName]) => (
            <IconButton
              key={variant}
              {...args}
              size={size}
              variant={variant}
              aria-label={`${ sizeName } ${ styleName } 검색`}
            />
          ))}
        </div>
      ))}
    </div>
  ),
};

/** **State** 축입니다. Hovered / Pressed / Focused 는 실제 상호작용으로 확인하세요. */
export const States: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {STYLES.map(([variant, styleName]) => (
        <div key={variant} className={'story-row'}>
          <span className={'story-label'}>{styleName}</span>
          <IconButton {...args} variant={variant} aria-label={`${ styleName } 기본`} />
          <IconButton {...args} variant={variant} loading aria-label={`${ styleName } 저장 중`} />
          <IconButton {...args} variant={variant} disabled aria-label={`${ styleName } 비활성`} />
        </div>
      ))}
      <span className={'story-note'}>
        {'왼쪽부터 Default · Loading · Disabled 입니다. Tab 키로 이동하면 Focused 링이 보입니다.'}
      </span>
    </div>
  ),
};

/**
 * **Selected** 축입니다. Figma 는 Filled 에만 정의했고 나머지 Style 은 같은 규칙으로 파생했습니다.
 * `selected` 를 주면 `aria-pressed` 가 붙어 토글 버튼으로 읽힙니다.
 */
export const Selected: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {TYPES.map(([color, typeName]) => (
        <div key={color} className={'story-row'}>
          <span className={'story-label'}>{typeName}</span>
          {STYLES.map(([variant, styleName]) => (
            <IconButton
              key={variant}
              {...args}
              color={color}
              variant={variant}
              selected
              icon={<Bookmark />}
              aria-label={`${ typeName } ${ styleName } 즐겨찾기 해제`}
            />
          ))}
        </div>
      ))}
    </div>
  ),
};

/** 실제 토글 동작입니다. 누를 때마다 `aria-pressed` 가 뒤집힙니다. */
export const Toggle: Story = {
  render: (args) => {
    const [bookmarked, setBookmarked] = useState(false);

    return (
      <div className={'story-row'}>
        <IconButton
          {...args}
          variant={'outlined'}
          icon={<Bookmark />}
          selected={bookmarked}
          onClick={() => setBookmarked((value) => !value)}
          aria-label={bookmarked ? '즐겨찾기 해제' : '즐겨찾기 추가'}
        />
        <span className={'story-note'}>
          {bookmarked ? 'aria-pressed="true"' : 'aria-pressed="false"'}
        </span>
      </div>
    );
  },
};

/**
 * 자주 쓰는 조합입니다.
 * 닫기 버튼은 `variant="text" color="secondary"`, 파괴적 동작은 `color="danger"` 를 씁니다.
 */
export const Usage: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      <div className={'story-row'}>
        <span className={'story-label'}>{'닫기'}</span>
        <IconButton {...args} variant={'text'} color={'secondary'} icon={<X />} aria-label={'닫기'} />
      </div>
      <div className={'story-row'}>
        <span className={'story-label'}>{'수정'}</span>
        <IconButton {...args} variant={'outlined'} color={'secondary'} icon={<Pencil />} aria-label={'수정'} />
      </div>
      <div className={'story-row'}>
        <span className={'story-label'}>{'설정'}</span>
        <IconButton {...args} variant={'text'} icon={<Settings />} aria-label={'설정'} />
      </div>
      <div className={'story-row'}>
        <span className={'story-label'}>{'삭제'}</span>
        <IconButton {...args} variant={'contained'} color={'danger'} icon={<Trash2 />} aria-label={'삭제'} />
      </div>
    </div>
  ),
};
