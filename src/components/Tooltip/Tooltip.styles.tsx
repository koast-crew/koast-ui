import { twMerge } from '../../utils/twMerge';
import type {
  TooltipAlign,
  TooltipPlacement,
  TooltipVariant,
} from './Tooltip.types';

/** 가로 변(top/bottom)에 놓이면 정렬이 좌우, 세로 변(left/right)에 놓이면 상하로 바뀝니다. */
const isHorizontal = (placement: TooltipPlacement) =>
  placement === 'top' || placement === 'bottom';

/** 최소 너비 56px 는 Figma 수치에서 유도한 값입니다(화살표 32 + 좌우 padding 12×2). 짧은 문구에서 화살표가 패널 밖으로 나가지 않게 합니다. */
const PANEL_BASE
  = 'koast-pointer-events-none koast-absolute koast-z-20 koast-w-max koast-min-w-14 koast-rounded-lg koast-p-3 koast-text-base koast-font-medium koast-leading-5';

/** Select 드롭다운과 같은 2겹 그림자입니다. Figma 의 드롭섀도 두 장이 core / cast 토큰에 대응합니다. */
const PANEL_SHADOW
  = 'koast-shadow-[0_0_4px_var(--koast-shadow-core),0_4px_8px_var(--koast-shadow-cast)]';

/** 화살표 높이 8px 만큼 트리거에서 띄웁니다. 화살표를 끈 경우에도 같은 간격을 유지합니다. */
const PANEL_PLACEMENTS: Record<TooltipPlacement, string> = {
  top: 'koast-bottom-full koast-mb-2',
  bottom: 'koast-top-full koast-mt-2',
  left: 'koast-right-full koast-mr-2',
  right: 'koast-left-full koast-ml-2',
};

const PANEL_ALIGN_X: Record<TooltipAlign, string> = {
  start: 'koast-left-0',
  center: 'koast-left-1/2 -koast-translate-x-1/2',
  end: 'koast-right-0',
};

const PANEL_ALIGN_Y: Record<TooltipAlign, string> = {
  start: 'koast-top-0',
  center: 'koast-top-1/2 -koast-translate-y-1/2',
  end: 'koast-bottom-0',
};

const SURFACES: Record<TooltipVariant, string> = {
  default: 'koast-bg-inverse-bolder koast-text-interactive-inverse',
  inverse: 'koast-bg-primary koast-text-primary',
};

const ARROW_SURFACES: Record<TooltipVariant, string> = {
  default: 'koast-bg-inverse-bolder',
  inverse: 'koast-bg-primary',
};

export const getPanelStyles = (
  placement: TooltipPlacement,
  align: TooltipAlign,
  variant: TooltipVariant,
) =>
  twMerge(
    PANEL_BASE,
    PANEL_SHADOW,
    PANEL_PLACEMENTS[placement],
    isHorizontal(placement) ? PANEL_ALIGN_X[align] : PANEL_ALIGN_Y[align],
    SURFACES[variant],
  );

/**
 * 화살표를 담는 클리핑 상자입니다. Figma 의 Arrow 프레임(32x8 / 8x32)과 같은 크기이며,
 * 안쪽 마름모를 잘라내 밑변 32px · 돌출 8px 의 납작한 삼각형을 만듭니다.
 */
const ARROW_BOX_BASE = 'koast-absolute koast-overflow-hidden';

const ARROW_BOXES: Record<TooltipPlacement, string> = {
  top: 'koast-top-full koast-h-2 koast-w-8',
  bottom: 'koast-bottom-full koast-h-2 koast-w-8',
  left: 'koast-left-full koast-h-8 koast-w-2',
  right: 'koast-right-full koast-h-8 koast-w-2',
};

/** 모서리 정렬에서는 패널 padding(12px) 만큼 안쪽으로 들여 화살표가 라운드에 걸치지 않게 합니다. */
const ARROW_ALIGN_X: Record<TooltipAlign, string> = {
  start: 'koast-left-3',
  center: 'koast-left-1/2 -koast-translate-x-1/2',
  end: 'koast-right-3',
};

const ARROW_ALIGN_Y: Record<TooltipAlign, string> = {
  start: 'koast-top-3',
  center: 'koast-top-1/2 -koast-translate-y-1/2',
  end: 'koast-bottom-3',
};

export const getArrowBoxStyles = (
  placement: TooltipPlacement,
  align: TooltipAlign,
) =>
  twMerge(
    ARROW_BOX_BASE,
    ARROW_BOXES[placement],
    isHorizontal(placement) ? ARROW_ALIGN_X[align] : ARROW_ALIGN_Y[align],
  );

/**
 * Figma 의 Bracket(23x23, r2)을 45도 돌린 마름모입니다.
 * 대각선이 23 * √2 ≈ 32.5px 라 상자 밖으로 나가는 부분이 잘리고 꼭짓점만 8px 돌출합니다.
 * 오프셋 19.76 / 4.76 은 꼭짓점을 상자 변에 정확히 붙이기 위한 값입니다(11.5 ± 32.53 / 2).
 */
const ARROW_BASE = 'koast-absolute koast-size-[23px] koast-rotate-45 koast-rounded-[2px]';

const ARROW_OFFSETS: Record<TooltipPlacement, string> = {
  top: 'koast-left-1/2 koast-top-[-19.76px] -koast-translate-x-1/2',
  bottom: 'koast-left-1/2 koast-top-[4.76px] -koast-translate-x-1/2',
  left: 'koast-left-[-19.76px] koast-top-1/2 -koast-translate-y-1/2',
  right: 'koast-left-[4.76px] koast-top-1/2 -koast-translate-y-1/2',
};

export const getArrowStyles = (
  placement: TooltipPlacement,
  variant: TooltipVariant,
) => twMerge(ARROW_BASE, ARROW_OFFSETS[placement], ARROW_SURFACES[variant]);

export const getRootStyles = (className: string) =>
  twMerge('koast-relative koast-inline-flex', className);
