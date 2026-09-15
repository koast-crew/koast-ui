import { twMerge } from '../../utils/twMerge';

/** 번호·이전·다음이 공유하는 크기입니다. 한 줄이 26px 로 맞아 아이콘과 숫자가 같은 중심에 옵니다. */
const ITEM_BASE
  = 'koast-inline-flex koast-h-[26px] koast-shrink-0 koast-items-center koast-justify-center koast-rounded koast-text-sm koast-font-medium koast-leading-4 koast-transition-colors koast-duration-200 focus-visible:koast-outline focus-visible:koast-outline-2 focus-visible:koast-outline-offset-2 focus-visible:koast-outline-focus-ring';

/** 한·두 자리는 26x26 정사각이고, 세 자리부터 32px 로 늘어납니다. */
const PAGE_SIZE = 'koast-min-w-[26px] koast-px-1';

/** 아이콘 24px 이 26px 칸 안에 들어갑니다. 아이콘이 커서 좌우 패딩은 두지 않습니다. */
const CONTROL_SIZE = 'koast-size-[26px] [&_svg]:koast-size-6';

const PAGE_SURFACE = {
  selected:
    'koast-bg-interactive-selected koast-text-interactive-selected hover:koast-bg-interactive-selected-hovered hover:koast-text-interactive-primary-hovered',
  unselected:
    'koast-text-secondary hover:koast-bg-interactive-secondary-hovered',
} as const;

/** Figma 에 비활성 번호 실측이 없어 Button 의 disabled 규칙에서 파생했습니다. */
const PAGE_DISABLED = {
  selected: 'koast-cursor-not-allowed koast-bg-disabled koast-text-disabled',
  unselected: 'koast-cursor-not-allowed koast-text-disabled',
} as const;

export const getPaginationRootStyles = (className: string) =>
  twMerge('koast-inline-flex koast-items-center', className);

/** preflight 가 꺼져 있어 ul 의 브라우저 기본 여백·불릿을 직접 지웁니다. */
export const getPaginationListStyles = () =>
  'koast-m-0 koast-flex koast-list-none koast-items-center koast-gap-2 koast-p-0';

/**
 * li 가 flex 여야 합니다. 기본 블록이면 inline-flex 버튼이 텍스트 베이스라인에 앉는데,
 * 아이콘 버튼과 숫자 버튼의 베이스라인이 달라 li 높이가 갈리고 중심이 어긋납니다.
 */
export const PAGINATION_ITEM = 'koast-flex';

export const getPaginationPageStyles = (selected: boolean, disabled: boolean) => {
  const state = selected ? 'selected' : 'unselected';

  return twMerge(
    ITEM_BASE,
    PAGE_SIZE,
    disabled
      ? PAGE_DISABLED[state]
      : twMerge('koast-cursor-pointer', PAGE_SURFACE[state]),
  );
};

/**
 * 생략 표시입니다. 버튼이 아니므로 hover / focus 색을 붙이지 않습니다.
 * 아이콘 색만 Figma 의 `#18181b` 를 따릅니다.
 */
export const getPaginationEllipsisStyles = (disabled: boolean) =>
  twMerge(
    'koast-inline-flex koast-h-[26px] koast-shrink-0 koast-items-center koast-justify-center koast-rounded [&_svg]:koast-size-6',
    PAGE_SIZE,
    disabled ? 'koast-text-disabled' : 'koast-text-primary',
  );

export const getPaginationControlStyles = (disabled: boolean) =>
  twMerge(
    ITEM_BASE,
    CONTROL_SIZE,
    disabled
      ? 'koast-cursor-not-allowed koast-bg-disabled koast-text-disabled'
      : 'koast-cursor-pointer koast-text-secondary hover:koast-bg-interactive-secondary-hovered active:koast-bg-interactive-selected',
  );
