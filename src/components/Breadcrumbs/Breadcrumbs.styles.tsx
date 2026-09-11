import { twMerge } from '../../utils/twMerge';

/**
 * preflight 가 꺼져 있어 `<ol>` 에 `padding-left: 40px` / `list-style: decimal` / `margin: 1em 0` 이
 * 그대로 살아 있습니다. 셋을 컴포넌트 안에서 직접 지웁니다.
 * 항목 간격 16px 은 디자인 시스템 고정값이고, 경로가 길어지면 줄바꿈됩니다.
 */
export const BREADCRUMBS_LIST
  = 'koast-m-0 koast-flex koast-list-none koast-flex-wrap koast-items-center koast-gap-4 koast-p-0';

/** 구분자와 항목을 같은 16px 간격으로 묶습니다. */
export const BREADCRUMBS_ITEM = 'koast-flex koast-items-center koast-gap-4';

/** 구분자는 24px 아이콘이며 보조 기술에 노출되지 않습니다. */
export const BREADCRUMBS_SEPARATOR
  = 'koast-inline-flex koast-shrink-0 koast-text-disabled [&_svg]:koast-size-6';

/** 링크가 아닌 항목(현재 위치 또는 `href` 없는 항목)의 치수는 Link 와 같습니다. */
const BREADCRUMBS_TEXT_BASE
  = 'koast-inline-flex koast-h-[26px] koast-items-center koast-gap-2 koast-rounded koast-px-1 koast-py-0.5 koast-text-base koast-font-medium koast-leading-5';

/** 현재 위치는 조상 항목보다 한 단계 진해 경로의 끝이라는 것이 색으로 드러납니다. */
export const getBreadcrumbsTextStyles = (isCurrent: boolean) =>
  twMerge(
    BREADCRUMBS_TEXT_BASE,
    isCurrent ? 'koast-text-secondary' : 'koast-text-interactive-secondary',
  );

/** 항목 아이콘은 16px 로 Link 의 leading icon 과 같습니다. */
export const BREADCRUMBS_ITEM_ICON
  = 'koast-inline-flex koast-shrink-0 [&_svg]:koast-size-4';

/** 루트의 최종 클래스명을 계산합니다. */
export const getBreadcrumbsStyles = (className: string) =>
  twMerge('koast-w-full', className);
