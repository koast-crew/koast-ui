import { twMerge } from '../../utils/twMerge';
import type { SliderSize, SliderVariant } from './Slider.types';

/** 썸의 시각 상태입니다. 우선순위는 disabled > error > active > focus > hover 입니다. */
export type SliderThumbState =
  | 'default'
  | 'hover'
  | 'focus'
  | 'active'
  | 'disabled'
  | 'error';

/**
 * Figma 실측 치수입니다. 트랙 높이 4/6/8, 썸 지름 12/16/20(hover 14/18/22),
 * Track Area 높이 28/29/30 입니다.
 */
const TRACK_HEIGHTS: Record<SliderSize, string> = {
  sm: 'koast-h-1',
  md: 'koast-h-1.5',
  lg: 'koast-h-2',
};

const TRACK_AREA_HEIGHTS: Record<SliderSize, string> = {
  sm: 'koast-h-7',
  md: 'koast-h-[29px]',
  lg: 'koast-h-[30px]',
};

const THUMB_SIZES: Record<SliderSize, string> = {
  sm: 'koast-size-3',
  md: 'koast-size-4',
  lg: 'koast-size-5',
};

const THUMB_HOVER_SIZES: Record<SliderSize, string> = {
  sm: 'koast-size-3.5',
  md: 'koast-size-[18px]',
  lg: 'koast-size-[22px]',
};

const LABEL_FONTS: Record<SliderSize, string> = {
  sm: 'koast-text-xs koast-font-medium koast-leading-4',
  md: 'koast-text-sm koast-font-medium koast-leading-4',
  lg: 'koast-text-base koast-font-semibold koast-leading-5',
};

const VALUE_FONTS: Record<SliderSize, string> = {
  sm: 'koast-text-xs koast-font-normal koast-leading-4',
  md: 'koast-text-sm koast-font-normal koast-leading-4',
  lg: 'koast-text-base koast-font-normal koast-leading-5',
};

const RANGE_LABEL_FONTS: Record<SliderSize, string> = {
  sm: 'koast-text-xs koast-font-normal koast-leading-4',
  md: 'koast-text-xs koast-font-normal koast-leading-4',
  lg: 'koast-text-sm koast-font-normal koast-leading-4',
};

const HELPER_FONTS: Record<SliderSize, string> = {
  sm: 'koast-text-[11px] koast-font-normal koast-leading-[13px]',
  md: 'koast-text-xs koast-font-normal koast-leading-[15px]',
  lg: 'koast-text-xs koast-font-normal koast-leading-[15px]',
};

const VARIANTS: Record<SliderVariant, string> = {
  plain: '',
  card: 'koast-rounded-lg koast-border koast-border-solid koast-border-secondary koast-bg-primary koast-p-4',
};

export const getRootStyles = (
  variant: SliderVariant,
  disabled: boolean,
  className: string,
) =>
  twMerge(
    'koast-flex koast-w-full koast-flex-col koast-gap-1.5',
    VARIANTS[variant],
    disabled ? 'koast-cursor-not-allowed' : '',
    className,
  );

export const HEADER = 'koast-flex koast-w-full koast-items-baseline koast-justify-between koast-gap-2';

/** 라벨 · 값 · 범위 라벨은 상태별로 같은 색을 씁니다. */
const TEXT_TONES = {
  normal: 'koast-text-primary',
  disabled: 'koast-text-disabled',
  error: 'koast-text-danger',
};

export const getLabelStyles = (
  size: SliderSize,
  disabled: boolean,
  error: boolean,
) =>
  twMerge(
    'koast-min-w-0 koast-truncate',
    LABEL_FONTS[size],
    disabled ? TEXT_TONES.disabled : error ? TEXT_TONES.error : TEXT_TONES.normal,
  );

export const getValueStyles = (
  size: SliderSize,
  disabled: boolean,
  error: boolean,
) =>
  twMerge(
    'koast-shrink-0 koast-whitespace-nowrap',
    VALUE_FONTS[size],
    disabled
      ? TEXT_TONES.disabled
      : error
        ? TEXT_TONES.error
        : 'koast-text-secondary',
  );

export const getTrackAreaStyles = (size: SliderSize, disabled: boolean) =>
  twMerge(
    'koast-relative koast-w-full koast-touch-none koast-select-none',
    TRACK_AREA_HEIGHTS[size],
    disabled ? 'koast-cursor-not-allowed' : 'koast-cursor-pointer',
  );

export const getTrackStyles = (size: SliderSize, disabled: boolean) =>
  twMerge(
    'koast-absolute koast-left-0 koast-top-1/2 koast-w-full -koast-translate-y-1/2 koast-rounded-full',
    TRACK_HEIGHTS[size],
    // Figma 의 disabled 트랙은 배경과 채움이 같은 회색이라 값 구분이 사라집니다.
    disabled ? 'koast-bg-[rgb(var(--koast-content-disabled))]' : 'koast-bg-tertiary',
  );

export const getFillStyles = (
  size: SliderSize,
  disabled: boolean,
  error: boolean,
) =>
  twMerge(
    'koast-absolute koast-top-1/2 -koast-translate-y-1/2 koast-rounded-full',
    TRACK_HEIGHTS[size],
    disabled
      ? 'koast-bg-[rgb(var(--koast-content-disabled))]'
      : error
        ? 'koast-bg-interactive-danger'
        : 'koast-bg-interactive-primary',
  );

/** 눈금은 Figma 에서 1x4 이지만 색이 기록돼 있지 않아 TimeLine 의 눈금 표현을 따릅니다. */
export const TICK
  = 'koast-pointer-events-none koast-absolute koast-top-1/2 koast-h-1 koast-w-px -koast-translate-x-1/2 -koast-translate-y-1/2 koast-bg-[rgb(var(--koast-content-tertiary))] koast-opacity-40';

/** 썸의 히트 영역입니다. Figma 는 44x44 이지만 세로는 Track Area 를 넘지 않게 잘랐습니다. */
export const getThumbHitStyles = (disabled: boolean) =>
  twMerge(
    'koast-group koast-absolute koast-top-0 koast-flex koast-h-full koast-w-11 -koast-translate-x-1/2 koast-items-center koast-justify-center koast-bg-transparent focus-visible:koast-outline-none',
    disabled ? 'koast-cursor-not-allowed' : 'koast-cursor-grab active:koast-cursor-grabbing',
  );

const THUMB_BORDERS: Record<SliderThumbState, string> = {
  default: 'koast-border-interactive-secondary koast-bg-primary',
  hover: 'koast-border-interactive-secondary-hovered koast-bg-primary',
  focus: 'koast-border-interactive-primary-pressed koast-bg-primary',
  active: 'koast-border-interactive-primary koast-bg-primary',
  disabled: 'koast-border-interactive-secondary koast-bg-disabled',
  error: 'koast-border-interactive-danger koast-bg-primary',
};

/** Figma Focus 변형의 두 겹 드롭섀도(#0000001f / #00000029)는 shadow 토큰과 같은 값입니다. */
const THUMB_SHADOW
  = 'koast-shadow-[0_0_4px_var(--koast-shadow-core),0_4px_8px_var(--koast-shadow-cast)]';

/**
 * 포커스 링입니다. Figma Focus 변형에는 없지만 Button·Accordion·TextField 와 같은 표현으로 통일했습니다.
 * 썸이 pointer-events 를 받지 않아 히트 영역의 focus-visible 을 group 으로 전달받습니다.
 */
const THUMB_FOCUS_RING
  = 'group-focus-visible:koast-ring-2 group-focus-visible:koast-ring-offset-2 group-focus-visible:koast-ring-focus-ring';

export const getThumbStyles = (size: SliderSize, state: SliderThumbState) =>
  twMerge(
    'koast-pointer-events-none koast-rounded-full koast-border-2 koast-border-solid koast-transition-all koast-duration-150',
    state === 'hover' ? THUMB_HOVER_SIZES[size] : THUMB_SIZES[size],
    THUMB_BORDERS[state],
    state === 'focus' || state === 'active' ? THUMB_SHADOW : '',
    state === 'disabled' ? '' : THUMB_FOCUS_RING,
  );

export const TOOLTIP
  = 'koast-pointer-events-none koast-absolute koast-bottom-full koast-left-1/2 koast-z-10 koast-mb-1 -koast-translate-x-1/2 koast-flex koast-items-center koast-gap-0.5 koast-whitespace-nowrap koast-rounded koast-bg-interactive-primary koast-px-2 koast-py-1';

export const TOOLTIP_VALUE = 'koast-text-xs koast-font-semibold koast-leading-4 koast-text-interactive-inverse';
export const TOOLTIP_UNIT = 'koast-text-xs koast-font-normal koast-leading-4 koast-text-interactive-inverse';

export const RANGE_LABELS = 'koast-flex koast-w-full koast-items-center';

export const getRangeLabelStyles = (
  size: SliderSize,
  disabled: boolean,
  error: boolean,
  align: 'left' | 'center' | 'right',
) =>
  twMerge(
    'koast-min-w-0 koast-flex-1 koast-truncate',
    RANGE_LABEL_FONTS[size],
    align === 'left'
      ? 'koast-text-left'
      : align === 'center'
        ? 'koast-text-center'
        : 'koast-text-right',
    disabled
      ? TEXT_TONES.disabled
      : error
        ? TEXT_TONES.error
        : 'koast-text-secondary',
  );

/** Figma 는 disabled 에서도 보조 문구만 tertiary 를 유지합니다. */
export const getHelperStyles = (size: SliderSize, error: boolean) =>
  twMerge(
    HELPER_FONTS[size],
    error ? TEXT_TONES.error : 'koast-text-tertiary',
  );
