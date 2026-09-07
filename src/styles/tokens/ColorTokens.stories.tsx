import type { Meta, StoryObj } from '@storybook/react';
import { koastColorTokens, type KoastColorToken } from './tokens.generated';

/** CSV 에서 생성된 시맨틱 컬러 토큰 전체입니다. 견본은 현재 테마를 그대로 반영합니다. */
const meta: Meta = {
  title: 'Design System/Color Tokens',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '디자인 시스템의 시맨틱 컬러 토큰입니다. 컴포넌트는 이 토큰만 사용하며 raw 팔레트를 직접 쓰지 않습니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const CATEGORY_LABELS: Record<string, string> = {
  'color/content': '콘텐츠 (텍스트·아이콘)',
  'color/content/interactive': '콘텐츠 · 대화형',
  'color/bg': '배경',
  'color/bg/interactive': '배경 · 대화형',
  'color/border': '테두리',
  'color/border/interactive': '테두리 · 대화형',
  'color/media': '미디어',
  'color/effect/shadow': '그림자',
};

/** 그림자 토큰은 채널이 아닌 완성된 색상 값이라 미리보기 방식이 다릅니다. */
const isLiteralToken = (token: KoastColorToken) => token.category === 'color/effect/shadow';

const Swatch = ({ token }: { token: KoastColorToken }) => {
  const background = isLiteralToken(token)
    ? `var(${ token.cssVar })`
    : `rgb(var(${ token.cssVar }))`;

  return (
    <div className={'koast-flex koast-items-center koast-gap-3 koast-rounded koast-border koast-border-secondary koast-p-2'}>
      <span
        className={'koast-size-10 koast-shrink-0 koast-rounded koast-border koast-border-secondary'}
        style={{ background }}
      />
      <span className={'koast-min-w-0 koast-flex-1'}>
        <span className={'koast-block koast-truncate koast-text-sm koast-font-semibold koast-text-primary'}>{token.token}</span>
        <span className={'koast-block koast-truncate koast-font-mono koast-text-xs koast-text-tertiary'}>{token.cssVar}</span>
        <span className={'koast-block koast-truncate koast-font-mono koast-text-xs koast-text-subtle'}>
          {`${ token.light } / ${ token.dark }`}
        </span>
      </span>
    </div>
  );
};

const CategorySection = ({ category }: { category: string }) => {
  const tokens = koastColorTokens.filter((token) => token.category === category);
  if (tokens.length === 0) return null;

  return (
    <section className={'koast-flex koast-flex-col koast-gap-2'}>
      <h3 className={'koast-text-base koast-font-bold koast-text-primary'}>
        {`${ CATEGORY_LABELS[category] ?? category } `}
        <span className={'koast-font-mono koast-text-xs koast-font-normal koast-text-tertiary'}>{category}</span>
      </h3>
      <div className={'koast-grid koast-grid-cols-1 koast-gap-2 sm:koast-grid-cols-2 lg:koast-grid-cols-3'}>
        {tokens.map((token) => <Swatch key={token.cssVar} token={token} />)}
      </div>
    </section>
  );
};

/** 전체 토큰 목록입니다. 값은 `라이트 / 다크` 순서로 표기됩니다. */
export const AllTokens: Story = {
  render: () => (
    <div className={'koast-flex koast-flex-col koast-gap-8 koast-bg-primary koast-p-6'}>
      {Object.keys(CATEGORY_LABELS).map((category) => (
        <CategorySection key={category} category={category} />
      ))}
    </div>
  ),
};

/** 다크 모드에서의 동일한 토큰 목록입니다. */
export const DarkTheme: Story = {
  render: () => (
    <div data-koast-theme={'dark'} className={'koast-flex koast-flex-col koast-gap-8 koast-bg-primary koast-p-6'}>
      {Object.keys(CATEGORY_LABELS).map((category) => (
        <CategorySection key={category} category={category} />
      ))}
    </div>
  ),
};
