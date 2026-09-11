import { twMerge } from '../../utils/twMerge';
import type { SkeletonVariant } from './Skeleton.types';

/** Figma 실측: rect 261x145 r2 · circle 37x37 r99999 · text 261x37 r2 입니다. */
const VARIANTS: Record<SkeletonVariant, string> = {
  rect: 'koast-w-full koast-h-[145px] koast-rounded-sm',
  circle: 'koast-size-[37px] koast-rounded-full',
  text: 'koast-w-full koast-h-[37px] koast-rounded-sm',
};

/**
 * Figma 는 GRADIENT_LINEAR 로 좌→우 스윕을 그리지만 hex 가 기록돼 있지 않습니다.
 * 트랙·비활성 표면의 선례(TimeLine · Slider · Progressbar)를 따라 bg-tertiary 로 칠하고
 * 밝기 펄스로 대체했습니다. WCAG 2.3.3 을 위해 축소 설정에서는 멈춥니다.
 */
const PULSE = 'koast-animate-pulse motion-reduce:koast-animate-none';

export const getSkeletonStyles = (
  variant: SkeletonVariant,
  animated: boolean,
  className: string,
) =>
  twMerge(
    'koast-block koast-shrink-0 koast-bg-tertiary',
    VARIANTS[variant],
    animated ? PULSE : '',
    className,
  );

/** 여러 줄 텍스트 스켈레톤의 줄 간격입니다. */
export const TEXT_STACK = 'koast-flex koast-w-full koast-flex-col koast-gap-2';

/** 마지막 줄만 짧게 끊어 실제 문단처럼 보이게 합니다. */
export const TEXT_LAST_LINE = 'koast-w-3/5';
