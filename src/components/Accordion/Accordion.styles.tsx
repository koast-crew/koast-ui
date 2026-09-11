import { twMerge } from '../../utils/twMerge';
import type { AccordionSize } from './Accordion.types';

/**
 * 헤더 높이는 디자인 시스템이 고정값으로 정의합니다(48 / 40).
 * 세로 padding(12 / 8)은 Figma 값 그대로 두되 높이 + 수직 중앙 정렬이 실제 정렬을 잡습니다.
 */
const HEADER_SIZES: Record<AccordionSize, string> = {
  md: 'koast-h-12 koast-px-4 koast-py-3',
  sm: 'koast-h-10 koast-px-4 koast-py-2',
};

/** 제목 타이포그래피입니다. md 는 20/24, sm 은 16/20 이며 weight 는 둘 다 600 입니다. */
const TITLE_SIZES: Record<AccordionSize, string> = {
  md: 'koast-text-xl koast-font-semibold koast-leading-6',
  sm: 'koast-text-base koast-font-semibold koast-leading-5',
};

const HEADER_BASE
  = 'koast-group koast-flex koast-w-full koast-items-center koast-justify-between koast-gap-2.5 koast-text-left koast-transition-colors koast-duration-200 focus-visible:koast-outline-none focus-visible:koast-ring-2 focus-visible:koast-ring-offset-2 focus-visible:koast-ring-focus-ring';

/**
 * 헤더의 포인터 상호작용 색입니다. 접힘은 회색 계열, 펼침은 선택(파랑) 계열로 갈립니다.
 * 디자인 시스템이 Selected 축으로 Hovered / Pressed 색을 따로 정의합니다.
 */
const HEADER_INTERACTION: Record<'collapsed' | 'expanded', string> = {
  collapsed:
    'hover:koast-bg-interactive-secondary-hovered active:koast-bg-interactive-secondary-pressed',
  expanded:
    'hover:koast-bg-interactive-selected-hovered active:koast-bg-interactive-selected-pressed',
};

export const getAccordionRootStyles = (className: string) =>
  twMerge('koast-flex koast-w-full koast-flex-col', className);

/** 항목마다 1px 아래 구분선이 붙습니다. border-style 을 켜면 나머지 변이 medium 으로 그려지므로 0 으로 눌러둡니다. */
export const getAccordionItemStyles = (className: string) =>
  twMerge(
    'koast-border-0 koast-border-b koast-border-solid koast-border-secondary koast-bg-primary',
    className,
  );

export const getAccordionHeaderStyles = (
  size: AccordionSize,
  expanded: boolean,
  disabled: boolean,
) =>
  twMerge(
    HEADER_BASE,
    HEADER_SIZES[size],
    disabled
      ? 'koast-cursor-not-allowed koast-bg-disabled'
      : twMerge(
          'koast-cursor-pointer',
          HEADER_INTERACTION[expanded ? 'expanded' : 'collapsed'],
        ),
  );

export const getAccordionTitleStyles = (size: AccordionSize, disabled: boolean) =>
  twMerge(
    'koast-min-w-0 koast-flex-1',
    TITLE_SIZES[size],
    disabled ? 'koast-text-disabled' : 'koast-text-primary',
  );

/** 아이콘만 펼침 상태에서 hover / active 색이 바뀝니다. 제목 색은 그대로입니다. */
export const getAccordionIconStyles = (expanded: boolean, disabled: boolean) =>
  twMerge(
    'koast-size-6 koast-shrink-0 koast-transition-colors koast-duration-200',
    disabled ? 'koast-text-disabled' : 'koast-text-primary',
    !disabled && expanded
      ? 'group-hover:koast-text-interactive-primary-hovered group-active:koast-text-interactive-primary-pressed'
      : '',
  );

export const getAccordionPanelStyles = (className: string) =>
  twMerge(
    'koast-px-4 koast-pb-4 koast-pt-2 koast-text-base koast-font-medium koast-leading-5 koast-text-tertiary',
    className,
  );

/** preflight 가 꺼져 있어 제목 태그의 브라우저 기본 여백을 직접 지웁니다. */
export const ACCORDION_HEADING_RESET = 'koast-m-0 koast-text-base koast-font-normal';
