import { twMerge } from '../../utils/twMerge';
import type {
  StatusChipShape,
  StatusChipSize,
  StatusChipStatus,
  StatusChipVariant,
} from './StatusChip.types';

const BASE
  = 'koast-inline-flex koast-box-border koast-items-center koast-gap-1 koast-font-medium koast-align-middle [&_svg]:koast-size-6 [&_svg]:koast-shrink-0';

/**
 * 최소 높이는 디자인 시스템이 고정값으로 정의합니다(32 / 28).
 * 아이콘(24px)이 있을 때의 높이가 그대로 최소 높이가 되므로, 아이콘이 없어도 같은 높이를 유지합니다.
 */
const SIZES: Record<StatusChipSize, string> = {
  md: 'koast-min-h-8 koast-py-1 koast-text-base koast-leading-5',
  sm: 'koast-min-h-7 koast-py-0.5 koast-text-sm koast-leading-4',
};

/** 리딩 아이콘 쪽 padding 이 4px 좁습니다. 아이콘이 없으면 좌우를 같은 값으로 맞춥니다. */
const PADDINGS: Record<StatusChipSize, { withIcon: string; textOnly: string }> = {
  md: { withIcon: 'koast-pl-3 koast-pr-4', textOnly: 'koast-px-4' },
  sm: { withIcon: 'koast-pl-2 koast-pr-3', textOnly: 'koast-px-3' },
};

const SHAPES: Record<StatusChipShape, string> = {
  round: 'koast-rounded-full',
  square: 'koast-rounded',
};

/** 진한 면입니다. 라벨·아이콘은 면 색을 따라 반전되는 inverse 토큰을 씁니다. */
const FILLED: Record<StatusChipStatus, string> = {
  neutral: 'koast-bg-inverse-bolder koast-text-interactive-inverse',
  info: 'koast-bg-info-bold koast-text-interactive-inverse',
  error: 'koast-bg-danger-bold koast-text-interactive-inverse',
  success: 'koast-bg-success-bold koast-text-interactive-inverse',
  warning: 'koast-bg-warning-bold koast-text-interactive-inverse',
};

/** 옅은 면입니다. outlined / transparent 가 공유하며 라벨은 한 단계 진한 bold 토큰입니다. */
const SUBTLE: Record<StatusChipStatus, string> = {
  neutral: 'koast-bg-secondary koast-text-primary',
  info: 'koast-bg-info-subtle koast-text-info-bold',
  error: 'koast-bg-danger-subtle koast-text-danger-bold',
  success: 'koast-bg-success-subtle koast-text-success-bold',
  warning: 'koast-bg-warning-subtle koast-text-warning-bold',
};

const OUTLINE_BORDERS: Record<StatusChipStatus, string> = {
  neutral: 'koast-border koast-border-solid koast-border-secondary',
  info: 'koast-border koast-border-solid koast-border-info',
  error: 'koast-border koast-border-solid koast-border-danger',
  success: 'koast-border koast-border-solid koast-border-success',
  warning: 'koast-border koast-border-solid koast-border-warning',
};

/**
 * 옅은 면에서는 아이콘이 라벨보다 한 단계 밝습니다(라벨 bold, 아이콘 기본).
 * neutral 은 Figma 에서 아이콘과 라벨이 같은 색이라 상속만 시킵니다.
 */
const SUBTLE_ICONS: Record<StatusChipStatus, string> = {
  neutral: '',
  info: '[&_svg]:koast-text-info',
  error: '[&_svg]:koast-text-danger',
  success: '[&_svg]:koast-text-success',
  warning: '[&_svg]:koast-text-warning',
};

/** 상태칩의 최종 클래스명을 계산합니다. */
export const getStatusChipStyles = (
  variant: StatusChipVariant,
  status: StatusChipStatus,
  shape: StatusChipShape,
  size: StatusChipSize,
  hasIcon: boolean,
  className: string,
) =>
  twMerge(
    BASE,
    SIZES[size],
    hasIcon ? PADDINGS[size].withIcon : PADDINGS[size].textOnly,
    SHAPES[shape],
    variant === 'filled' ? FILLED[status] : SUBTLE[status],
    variant === 'outlined' ? OUTLINE_BORDERS[status] : '',
    variant === 'filled' ? '' : SUBTLE_ICONS[status],
    className,
  );
