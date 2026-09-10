import { twMerge } from '../../utils/twMerge';
import type { SelectSize, SelectVisibleOptions } from './Select.types';

/** 트리거 높이는 디자인 시스템이 고정값으로 정의합니다(40 / 48). 글자·아이콘 크기는 size 와 무관합니다. */
const TRIGGER_HEIGHTS: Record<SelectSize, string> = {
  sm: 'koast-h-10',
  md: 'koast-h-12',
};

/** 옵션 36px × 개수 + 목록 상하 패딩 8px + 테두리 2px. border-box 라 테두리까지 더해야 잘리지 않습니다. */
const MENU_MAX_HEIGHTS: Record<SelectVisibleOptions, string> = {
  4: 'koast-max-h-[154px]',
  6: 'koast-max-h-[226px]',
  8: 'koast-max-h-[298px]',
};

const TRIGGER_BASE
  = 'koast-flex koast-w-full koast-items-center koast-justify-between koast-gap-2.5 koast-rounded-lg koast-border-[1.5px] koast-border-solid koast-px-4 koast-text-base koast-font-medium koast-leading-5 koast-transition-colors koast-duration-200 focus-visible:koast-outline-none';

export const getTriggerStyles = (
  size: SelectSize,
  disabled: boolean,
  error: boolean,
  open: boolean,
  className: string,
) => {
  const border = error
    ? 'koast-border-interactive-danger'
    : open
      ? 'koast-border-interactive-primary'
      : 'koast-border-interactive-secondary hover:koast-border-interactive-primary-hovered active:koast-border-interactive-primary-pressed';

  return twMerge(
    TRIGGER_BASE,
    TRIGGER_HEIGHTS[size],
    disabled
      ? 'koast-cursor-not-allowed koast-border-interactive-secondary koast-bg-disabled koast-text-disabled'
      : twMerge('koast-cursor-pointer koast-bg-primary', border),
    className,
  );
};

/** 값이 있으면 본문 색, placeholder 면 한 단계 연한 색입니다. */
export const getTriggerTextStyles = (disabled: boolean, filled: boolean) =>
  twMerge(
    'koast-truncate',
    disabled
      ? 'koast-text-disabled'
      : filled
        ? 'koast-text-primary'
        : 'koast-text-tertiary',
  );

/**
 * 트랙 8px, 썸은 pill 입니다. 색은 토큰을 참조해 다크 모드까지 따라갑니다.
 * scrollbar-width / scrollbar-color 를 함께 쓰면 Chrome 이 ::-webkit-scrollbar 를 무시하므로 쓰지 않습니다.
 * Firefox 는 이 규칙이 안 먹어 기본 스크롤바가 나옵니다.
 */
const SCROLLBAR
  = '[&::-webkit-scrollbar]:koast-w-2 [&::-webkit-scrollbar-button]:koast-hidden [&::-webkit-scrollbar-track]:koast-rounded-full [&::-webkit-scrollbar-track]:koast-bg-tertiary [&::-webkit-scrollbar-thumb]:koast-rounded-full [&::-webkit-scrollbar-thumb]:koast-bg-[rgb(var(--koast-content-secondary))]';

export const getMenuStyles = (visibleOptions: SelectVisibleOptions) =>
  twMerge(
    // preflight 가 꺼져 있어 ul 의 브라우저 기본 여백·불릿을 직접 지웁니다.
    'koast-absolute koast-left-0 koast-top-full koast-z-10 koast-m-0 koast-mt-1 koast-w-full koast-list-none koast-overflow-y-auto koast-rounded koast-border koast-border-solid koast-border-secondary koast-bg-primary koast-px-0 koast-py-1',
    'koast-shadow-[0_0_4px_var(--koast-shadow-core),0_4px_8px_var(--koast-shadow-cast)]',
    MENU_MAX_HEIGHTS[visibleOptions],
    SCROLLBAR,
  );

export const getOptionStyles = (
  selected: boolean,
  disabled: boolean,
  active: boolean,
  className: string,
) => {
  const surface = disabled
    ? 'koast-cursor-not-allowed koast-bg-disabled koast-text-disabled'
    : selected
      ? 'koast-cursor-pointer koast-bg-interactive-selected koast-text-primary hover:koast-bg-interactive-selected-hovered active:koast-bg-interactive-selected-pressed'
      : 'koast-cursor-pointer koast-text-primary hover:koast-bg-interactive-secondary-hovered active:koast-bg-interactive-secondary-pressed';

  return twMerge(
    'koast-flex koast-h-9 koast-items-center koast-gap-2 koast-px-2 koast-text-base koast-font-medium koast-leading-5',
    surface,
    // 링을 바깥에 그리면 위아래 항목을 2px 씩 덮습니다.
    active ? 'koast-ring-2 koast-ring-inset koast-ring-focus-ring' : '',
    className,
  );
};

export const getHelpTextStyles = (error: boolean) =>
  twMerge(
    'koast-mb-0 koast-mt-2 koast-flex koast-items-center koast-gap-1 koast-text-base koast-font-medium koast-leading-5',
    error ? 'koast-text-danger' : 'koast-text-tertiary',
  );
