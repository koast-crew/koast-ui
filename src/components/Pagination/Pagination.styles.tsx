import { twMerge } from '../../utils/twMerge';

/**
 * 번호·이전·다음이 공유하는 크기입니다. 높이 24px, radius 4px 은 디자인 시스템 고정값입니다.
 * 번호 칸은 세 자리 기준 40px 이 되도록 최소 폭을 두어 페이지가 바뀌어도 줄이 흔들리지 않게 합니다.
 */
const ITEM_BASE
  = 'koast-inline-flex koast-h-6 koast-shrink-0 koast-items-center koast-justify-center koast-rounded koast-text-sm koast-font-medium koast-leading-4 koast-transition-colors koast-duration-200 focus-visible:koast-outline-none focus-visible:koast-ring-2 focus-visible:koast-ring-offset-2 focus-visible:koast-ring-focus-ring';

const PAGE_SIZE = 'koast-min-w-[40px] koast-px-2';

/** 아이콘 24px 이 24px 칸 안에 들어갑니다. Figma 의 좌우 8px 패딩보다 아이콘이 커서 패딩을 두지 않습니다. */
const CONTROL_SIZE = 'koast-size-6 [&_svg]:koast-size-6';

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
    'koast-inline-flex koast-h-6 koast-shrink-0 koast-items-center koast-justify-center koast-rounded [&_svg]:koast-size-6',
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
