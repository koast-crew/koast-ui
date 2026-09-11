import { twMerge } from '../../utils/twMerge';
import type { SpinnerSize, SpinnerVariant } from './Spinner.types';

/** Figma 실측 지름입니다. lg / xl 의 뒤집힌 값을 바로잡아 단조 증가하게 맞췄습니다. */
const SIZES: Record<SpinnerSize, string> = {
  sm: 'koast-size-4',
  md: 'koast-size-6',
  lg: 'koast-size-8',
  xl: 'koast-size-12',
};

const VARIANTS: Record<SpinnerVariant, string> = {
  primary: 'koast-text-interactive-primary',
  secondary: 'koast-text-tertiary',
  inherit: '',
};

/**
 * 회전 애니메이션입니다. Figma 의 `Part/Spinner segments` 는 0/90/180/270 네 장의 정지 프레임이라
 * 실제 회전은 구현 쪽에서 만듭니다.
 * WCAG 2.3.3 을 위해 축소 설정에서는 회전을 끄고 제자리 밝기 펄스로 바꿉니다.
 */
const SPIN = 'koast-animate-spin motion-reduce:koast-animate-pulse';

export const getSpinnerStyles = (
  size: SpinnerSize,
  variant: SpinnerVariant,
  className: string,
) =>
  twMerge(
    'koast-inline-flex koast-shrink-0 koast-items-center koast-justify-center',
    SIZES[size],
    VARIANTS[variant],
    className,
  );

export const getIconStyles = () => twMerge('koast-size-full', SPIN);

/** Button 의 인라인 스피너와 같은 링 두께입니다. 24 뷰박스에 r10 · 굵기 4 입니다. */
export const TRACK_OPACITY = 'koast-opacity-25';
export const ARC_OPACITY = 'koast-opacity-75';
