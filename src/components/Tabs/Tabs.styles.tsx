import { twMerge } from '../../utils/twMerge';

type TabState = 'selected' | 'unselected';

/**
 * 탭 높이 48px 은 디자인 시스템 고정값이고 폭은 라벨 + 좌우 32px 패딩으로 정해집니다.
 * 모든 탭이 아래 2px 선을 갖고 색만 달라집니다(선택 파랑 / 비선택 회색). 그래서 폭이 흔들리지 않습니다.
 */
const TAB_BASE
  = 'koast-inline-flex koast-h-12 koast-shrink-0 koast-items-center koast-justify-center koast-gap-2 koast-whitespace-nowrap koast-border-0 koast-border-b-2 koast-border-solid koast-px-8 koast-text-base koast-font-medium koast-leading-5 koast-transition-colors koast-duration-200 [&_svg]:koast-size-6 focus-visible:koast-outline focus-visible:koast-outline-2 focus-visible:koast-outline-offset-2 focus-visible:koast-outline-focus-ring';

const TAB_SURFACE: Record<TabState, string> = {
  selected:
    'koast-border-interactive-primary koast-bg-primary koast-text-interactive-selected',
  unselected: 'koast-border-secondary koast-bg-primary koast-text-secondary',
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
    'koast-cursor-not-allowed koast-border-secondary koast-bg-primary koast-text-disabled',
};

export const getTabsRootStyles = (className: string) =>
  twMerge('koast-flex koast-w-full koast-flex-col koast-items-start', className);

/** 선은 탭마다 직접 그립니다. 탭 배경이 테두리 영역까지 칠해져 줄의 선을 덮기 때문입니다. */
export const getTabListStyles = () => 'koast-flex koast-w-fit koast-items-center';

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
    'koast-pt-4 koast-text-base koast-font-medium koast-leading-5 koast-text-primary focus-visible:koast-outline focus-visible:koast-outline-2 focus-visible:koast-outline-offset-2 focus-visible:koast-outline-focus-ring',
    className,
  );
