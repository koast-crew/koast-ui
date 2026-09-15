import { twMerge } from '../../utils/twMerge';
import { SCROLLBAR } from '../../utils/scrollbar';
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
  = 'koast-flex koast-w-full koast-items-center koast-justify-between koast-gap-2.5 koast-rounded-lg koast-border-[1.5px] koast-border-solid koast-px-4 koast-text-base koast-font-medium koast-leading-5 koast-transition-colors koast-duration-200 focus-visible:koast-outline focus-visible:koast-outline-2 focus-visible:koast-outline-offset-2 focus-visible:koast-outline-focus-ring';

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
    'koast-truncate koast-leading-6',
    disabled
      ? 'koast-text-disabled'
      : filled
        ? 'koast-text-primary'
        : 'koast-text-tertiary',
  );

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
      ? 'koast-cursor-pointer koast-bg-interactive-selected koast-font-semibold koast-text-interactive-selected hover:koast-bg-interactive-selected-hovered active:koast-bg-interactive-selected-pressed'
      : 'koast-cursor-pointer koast-text-primary hover:koast-bg-interactive-secondary-hovered active:koast-bg-interactive-secondary-pressed';

  // 키보드 커서는 테두리 대신 hover 와 같은 면으로 표시합니다. 선택 항목에 선이 겹쳐 보이지 않습니다.
  const cursor = active && !disabled
    ? (selected ? 'koast-bg-interactive-selected-hovered' : 'koast-bg-interactive-secondary-hovered')
    : '';

  return twMerge(
    'koast-flex koast-h-9 koast-items-center koast-gap-2 koast-px-2 koast-text-base koast-font-medium koast-leading-5',
    surface,
    cursor,
    className,
  );
};

export const getHelpTextStyles = (error: boolean) =>
  twMerge(
    'koast-mb-0 koast-mt-2 koast-flex koast-items-center koast-gap-1 koast-text-base koast-font-medium koast-leading-5',
    error ? 'koast-text-danger' : 'koast-text-tertiary',
  );

/**
 * 폼 연동용 네이티브 select 입니다. 화면에서는 안 보이지만 포커스는 받을 수 있어야
 * required 검증 말풍선이 이 자리에 뜹니다. display:none / visibility:hidden 은 검증에서 제외됩니다.
 */
export const NATIVE_SELECT
  = 'koast-pointer-events-none koast-absolute koast-inset-0 koast-size-full koast-opacity-0';
