import { twMerge } from '../../utils/twMerge';

type TabState = 'selected' | 'unselected';

/**
 * 탭 높이 48px 은 디자인 시스템 고정값이고 폭은 라벨 + 좌우 32px 패딩으로 정해집니다.
 * 선택 탭에만 1px 테두리가 생기면 폭이 2px 흔들리므로 비선택 탭도 같은 두께의 투명 테두리를 둡니다.
 */
const TAB_BASE
  = 'koast-inline-flex koast-h-12 koast-shrink-0 koast-items-center koast-justify-center koast-gap-2 koast-whitespace-nowrap koast-border koast-border-solid koast-px-8 koast-text-base koast-font-medium koast-leading-5 koast-transition-colors koast-duration-200 [&_svg]:koast-size-6 focus-visible:koast-outline-none focus-visible:koast-ring-2 focus-visible:koast-ring-offset-2 focus-visible:koast-ring-focus-ring';

const TAB_SURFACE: Record<TabState, string> = {
  selected:
    'koast-border-interactive-primary koast-bg-primary koast-text-interactive-selected',
  unselected: 'koast-border-transparent koast-bg-primary koast-text-secondary',
};

/**
 * 포인터 상호작용 색입니다. 선택 여부에 따라 파랑 계열과 회색 계열로 갈립니다.
 * 선택 탭만 포커스에서 면이 옅은 파랑으로 바뀝니다(Figma `Selected=True, State=Focused`).
 */
const TAB_INTERACTION: Record<TabState, string> = {
  selected:
    'hover:koast-border-interactive-primary-hovered hover:koast-bg-interactive-selected-hovered hover:koast-text-interactive-primary-hovered focus-visible:koast-bg-interactive-selected active:koast-border-interactive-primary-pressed active:koast-bg-interactive-selected-pressed active:koast-text-interactive-primary-pressed',
  unselected:
    'hover:koast-bg-interactive-secondary-hovered active:koast-bg-interactive-secondary-pressed active:koast-text-interactive-secondary-pressed',
};

const TAB_DISABLED: Record<TabState, string> = {
  selected:
    'koast-cursor-not-allowed koast-border-disabled koast-bg-disabled koast-text-disabled',
  unselected:
    'koast-cursor-not-allowed koast-border-transparent koast-bg-primary koast-text-disabled',
};

export const getTabsRootStyles = (className: string) =>
  twMerge('koast-flex koast-w-full koast-flex-col', className);

/** 탭 줄 아래에 1px 구분선이 깔립니다. 다른 변까지 그려지지 않도록 두께를 0 으로 눌러둡니다. */
export const getTabListStyles = () =>
  'koast-flex koast-w-full koast-items-center koast-border-0 koast-border-b koast-border-solid koast-border-secondary';

export const getTabStyles = (selected: boolean, disabled: boolean) => {
  const state: TabState = selected ? 'selected' : 'unselected';

  return twMerge(
    TAB_BASE,
    disabled
      ? TAB_DISABLED[state]
      : twMerge('koast-cursor-pointer', TAB_SURFACE[state], TAB_INTERACTION[state]),
  );
};

/** Figma 에 패널 실측이 없어 Accordion 패널의 타이포그래피 규칙을 따랐습니다. */
export const getTabPanelStyles = (className: string) =>
  twMerge(
    'koast-pt-4 koast-text-base koast-font-medium koast-leading-5 koast-text-primary focus-visible:koast-outline-none focus-visible:koast-ring-2 focus-visible:koast-ring-focus-ring',
    className,
  );
