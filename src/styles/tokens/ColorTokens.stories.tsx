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
    <div className={'flex items-center gap-3 rounded border border-koast-secondary p-2'}>
      <span
        className={'size-10 shrink-0 rounded border border-koast-secondary'}
        style={{ background }}
      />
      <span className={'min-w-0 flex-1'}>
        <span className={'block truncate text-sm font-semibold text-koast-primary'}>{token.token}</span>
        <span className={'block truncate font-mono text-xs text-koast-tertiary'}>{token.cssVar}</span>
        <span className={'block truncate font-mono text-xs text-koast-subtle'}>
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
    <section className={'flex flex-col gap-2'}>
      <h3 className={'text-base font-bold text-koast-primary'}>
        {`${ CATEGORY_LABELS[category] ?? category } `}
        <span className={'font-mono text-xs font-normal text-koast-tertiary'}>{category}</span>
      </h3>
      <div className={'grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3'}>
        {tokens.map((token) => <Swatch key={token.cssVar} token={token} />)}
      </div>
    </section>
  );
};

/** 전체 토큰 목록입니다. 값은 `라이트 / 다크` 순서로 표기됩니다. */
export const AllTokens: Story = {
  render: () => (
    <div className={'flex flex-col gap-8 bg-koast-primary p-6'}>
      {Object.keys(CATEGORY_LABELS).map((category) => (
        <CategorySection key={category} category={category} />
      ))}
    </div>
  ),
};

/** 다크 모드에서의 동일한 토큰 목록입니다. */
export const DarkTheme: Story = {
  render: () => (
    <div data-koast-theme={'dark'} className={'flex flex-col gap-8 bg-koast-primary p-6'}>
      {Object.keys(CATEGORY_LABELS).map((category) => (
        <CategorySection key={category} category={category} />
      ))}
    </div>
  ),
};
