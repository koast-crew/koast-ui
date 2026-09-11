import { twMerge } from '../../utils/twMerge';
import type { TimeLineLayout } from './TimeLine.types';

const ROOT_BASE
  = 'koast-flex koast-w-full koast-items-center koast-rounded-lg koast-border koast-border-solid koast-border-secondary koast-bg-primary';

const ROOT_LAYOUT: Record<TimeLineLayout, string> = {
  desktop: 'koast-gap-3 koast-p-3',
  compact: 'koast-gap-3 koast-p-3',
  mobile: 'koast-gap-1 koast-p-2',
};

export const getRootStyles = (layout: TimeLineLayout, className: string) =>
  twMerge(ROOT_BASE, ROOT_LAYOUT[layout], className);

export const CONTROLS = 'koast-flex koast-shrink-0 koast-items-center koast-gap-0.5';

const CONTROL_BASE
  = 'koast-flex koast-items-center koast-justify-center koast-rounded-lg koast-border-solid koast-transition-colors koast-duration-200 focus-visible:koast-outline-none focus-visible:koast-ring-2 focus-visible:koast-ring-focus-ring';

export const getStepButtonStyles = (disabled: boolean) =>
  twMerge(
    CONTROL_BASE,
    'koast-size-8',
    disabled
      ? 'koast-cursor-not-allowed koast-bg-disabled koast-text-disabled'
      : 'koast-cursor-pointer koast-text-primary hover:koast-bg-interactive-secondary-hovered active:koast-bg-interactive-secondary-pressed',
  );

export const getPlayButtonStyles = (disabled: boolean) =>
  twMerge(
    CONTROL_BASE,
    'koast-size-10 koast-border-2 koast-border-solid',
    disabled
      ? 'koast-cursor-not-allowed koast-border-interactive-secondary koast-bg-disabled koast-text-disabled'
      : 'koast-cursor-pointer koast-border-interactive-primary koast-text-interactive-primary hover:koast-bg-interactive-selected active:koast-bg-interactive-selected-pressed',
  );

export const AREA = 'koast-flex koast-min-w-0 koast-grow';

const SEGMENT_HEIGHT: Record<TimeLineLayout, string> = {
  desktop: 'koast-h-10',
  compact: 'koast-h-10',
  mobile: 'koast-h-[60px]',
};

export const getSegmentStyles = (
  layout: TimeLineLayout,
  active: boolean,
  disabled: boolean,
) =>
  twMerge(
    'koast-flex koast-min-w-0 koast-grow koast-basis-0 koast-flex-col koast-justify-center koast-gap-1 koast-rounded koast-p-2 koast-transition-colors koast-duration-200 focus-visible:koast-outline-none focus-visible:koast-ring-2 focus-visible:koast-ring-inset focus-visible:koast-ring-focus-ring',
    SEGMENT_HEIGHT[layout],
    disabled
      ? 'koast-cursor-not-allowed'
      : twMerge(
          'koast-cursor-pointer',
          active ? 'koast-bg-interactive-selected' : 'hover:koast-bg-interactive-secondary-hovered',
        ),
  );

/** mobile 은 날짜와 요일을 세로로 쌓습니다. */
export const getDayLabelStyles = (layout: TimeLineLayout) =>
  twMerge(
    'koast-flex koast-min-w-0 koast-items-baseline koast-gap-1',
    layout === 'mobile' ? 'koast-flex-col koast-items-center koast-gap-0' : '',
  );

export const getDayDateStyles = (
  layout: TimeLineLayout,
  active: boolean,
  disabled: boolean,
) =>
  twMerge(
    'koast-truncate koast-leading-4',
    layout === 'mobile' ? 'koast-text-xs' : 'koast-text-sm',
    active ? 'koast-font-semibold' : 'koast-font-medium',
    disabled
      ? 'koast-text-disabled'
      : active
        ? 'koast-text-interactive-primary'
        : 'koast-text-primary',
  );

export const getDayWeekdayStyles = (active: boolean, disabled: boolean) =>
  twMerge(
    'koast-text-xs koast-font-normal koast-leading-4',
    disabled
      ? 'koast-text-disabled'
      : active
        ? 'koast-text-interactive-primary'
        : 'koast-text-tertiary',
  );

/**
 * 데이터가 없는 날은 회색 바입니다. Figma 의 #e4e4e7 에 해당하는 배경 토큰이 없어
 * 한 단계 연한 bg-tertiary 를 씁니다.
 */
export const getDataBarStyles = (
  hasData: boolean,
  active: boolean,
  disabled: boolean,
) =>
  twMerge(
    'koast-h-1 koast-w-full koast-shrink-0 koast-rounded-sm',
    !hasData || disabled
      ? 'koast-bg-tertiary'
      : twMerge('koast-bg-interactive-primary', active ? '' : 'koast-opacity-35'),
  );

export const DIVIDER = 'koast-mx-0.5 koast-my-1 koast-shrink-0 koast-self-stretch koast-border-l koast-border-solid koast-border-secondary';

export const TRACK_BG = 'koast-h-1 koast-w-full koast-rounded-sm koast-bg-tertiary';

export const getProgressStyles = (disabled: boolean) =>
  twMerge(
    'koast-absolute koast-left-0 koast-top-1/2 koast-h-1 -koast-translate-y-1/2 koast-rounded-sm',
    disabled ? 'koast-bg-disabled' : 'koast-bg-interactive-primary',
  );

export const TICK = 'koast-absolute koast-top-1/2 koast-h-2.5 koast-w-px -koast-translate-x-1/2 -koast-translate-y-1/2 koast-bg-[rgb(var(--koast-content-tertiary))] koast-opacity-40';

export const PLAYHEAD_LINE = 'koast-absolute koast-top-1/2 koast-h-5 koast-w-0.5 -koast-translate-x-1/2 -koast-translate-y-1/2 koast-rounded-sm koast-bg-interactive-primary';

export const PLAYHEAD_DOT = 'koast-absolute koast-top-1/2 koast-size-2 -koast-translate-x-1/2 -koast-translate-y-1/2 koast-rounded-full koast-bg-interactive-primary';

export const RULER_LABEL = 'koast-absolute -koast-translate-x-1/2 koast-whitespace-nowrap koast-text-[10px] koast-font-normal koast-leading-[14px] koast-text-tertiary';

export const TOOLTIP
  = 'koast-pointer-events-none koast-absolute koast-bottom-full koast-z-10 koast-mb-1 koast-flex koast-items-center koast-gap-2 koast-whitespace-nowrap koast-rounded koast-bg-tertiary koast-px-2 koast-py-1 koast-shadow-[0_0_2px_var(--koast-shadow-core),0_2px_4px_var(--koast-shadow-cast)]';

/** 트랙 양끝에서는 툴팁이 컨테이너 밖으로 나가지 않도록 정렬을 바꿉니다. */
export const tooltipTransform = (ratio: number) =>
  ratio < 0.08 ? 'translateX(0)' : ratio > 0.92 ? 'translateX(-100%)' : 'translateX(-50%)';

export const TOOLTIP_DATE = 'koast-text-xs koast-font-normal koast-leading-4 koast-text-tertiary';
export const TOOLTIP_TIME = 'koast-text-base koast-font-semibold koast-leading-5 koast-text-primary';

export const getSpeedButtonStyles = (disabled: boolean) =>
  twMerge(
    'koast-flex koast-shrink-0 koast-items-center koast-gap-0.5 koast-rounded koast-border koast-border-solid koast-border-secondary koast-px-2 koast-py-1 koast-text-xs koast-font-medium koast-leading-4 focus-visible:koast-outline-none focus-visible:koast-ring-2 focus-visible:koast-ring-focus-ring',
    disabled
      ? 'koast-cursor-not-allowed koast-bg-disabled koast-text-disabled'
      : 'koast-cursor-pointer koast-bg-primary koast-text-secondary hover:koast-bg-interactive-secondary-hovered',
  );

export const SPEED_MENU
  = 'koast-absolute koast-bottom-full koast-right-0 koast-z-10 koast-mb-1 koast-m-0 koast-list-none koast-rounded koast-border koast-border-solid koast-border-secondary koast-bg-primary koast-px-0 koast-py-1 koast-shadow-[0_0_4px_var(--koast-shadow-core),0_4px_8px_var(--koast-shadow-cast)]';

export const getSpeedItemStyles = (selected: boolean) =>
  twMerge(
    'koast-cursor-pointer koast-px-3 koast-py-1 koast-text-xs koast-font-medium koast-leading-4',
    selected
      ? 'koast-bg-interactive-selected koast-text-interactive-primary'
      : 'koast-text-primary hover:koast-bg-interactive-secondary-hovered',
  );

export const TODAY_BADGE = 'koast-text-xs koast-font-normal koast-leading-4 koast-text-interactive-primary';
