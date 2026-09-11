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

/**
 * 아이콘만 펼침 상태에서 hover / active 색이 바뀝니다. 제목 색은 그대로입니다.
 * 펼침 화살표는 아이콘을 갈아 끼우지 않고 180도 돌립니다 — lucide chevron 은 상하 대칭이라 결과가 같고, 회전만 전환할 수 있습니다.
 */
export const getAccordionIconStyles = (expanded: boolean, disabled: boolean) =>
  twMerge(
    'koast-size-6 koast-shrink-0 koast-transition-[color,transform] koast-duration-200 koast-ease-out motion-reduce:koast-transition-none',
    expanded ? 'koast-rotate-180' : 'koast-rotate-0',
    disabled ? 'koast-text-disabled' : 'koast-text-primary',
    !disabled && expanded
      ? 'group-hover:koast-text-interactive-primary-hovered group-active:koast-text-interactive-primary-pressed'
      : '',
  );

/**
 * 펼침 높이는 grid-template-rows 를 0fr ↔ 1fr 로 전환해 만듭니다. 내용 높이를 재지 않아도 되고 max-height 처럼 이징이 깨지지 않습니다.
 */
export const getAccordionPanelStyles = (expanded: boolean) =>
  twMerge(
    'koast-grid koast-transition-[grid-template-rows] koast-duration-200 koast-ease-out motion-reduce:koast-transition-none',
    expanded ? 'koast-grid-rows-[1fr]' : 'koast-grid-rows-[0fr]',
  );

/**
 * 0fr 행에서 실제로 높이가 0 이 되려면 그리드 아이템의 min-height:auto 를 눌러야 합니다.
 * visibility 는 접힐 때만 높이 전환이 끝난 뒤 바뀌도록 미뤄, 접히는 동안은 내용이 보이면서도 접힌 뒤에는 포커스·낭독 대상에서 빠집니다.
 * 전환 대상이 visibility 뿐이라 여기 걸린 delay 는 높이에 영향을 주지 않습니다.
 */
export const getAccordionPanelClipStyles = (expanded: boolean) =>
  twMerge(
    'koast-min-h-0 koast-overflow-hidden koast-transition-[visibility] koast-duration-0 motion-reduce:koast-delay-0',
    expanded ? 'koast-visible koast-delay-0' : 'koast-invisible koast-delay-200',
  );

/** 패딩은 잘리는 상자 안쪽에 둡니다. 바깥에 두면 접힘 상태에서도 패딩 높이가 남습니다. */
export const ACCORDION_PANEL_CONTENT
  = 'koast-px-4 koast-pb-4 koast-pt-2 koast-text-base koast-font-medium koast-leading-5 koast-text-tertiary';

/** preflight 가 꺼져 있어 제목 태그의 브라우저 기본 여백을 직접 지웁니다. */
export const ACCORDION_HEADING_RESET = 'koast-m-0 koast-text-base koast-font-normal';
