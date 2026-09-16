import { twMerge } from '../../utils/twMerge';
import type { BadgeStatus, BadgeType, BadgeVariant } from './Badge.types';

/**
 * 형태별 치수입니다. 디자인 시스템이 높이를 고정값으로 정의합니다(dot 4, number 20, text 24).
 * number 는 pill(radius 무한), text 는 radius 4px 입니다.
 * number 의 min-w-5 는 내용이 좁을 때 높이보다 납작해지지 않게 잡아 주는 하한입니다.
 */
const TYPES: Record<BadgeType, string> = {
  dot: 'koast-inline-block koast-size-1 koast-shrink-0 koast-rounded-full',
  number:
    'koast-inline-flex koast-h-5 koast-min-w-5 koast-shrink-0 koast-items-center koast-justify-center koast-rounded-full koast-px-2 koast-py-0.5 koast-text-xs koast-font-medium koast-leading-4',
  text: 'koast-inline-flex koast-h-6 koast-shrink-0 koast-items-center koast-justify-center koast-rounded koast-px-2 koast-py-1 koast-text-sm koast-font-medium koast-leading-4',
};

/** 채운 면입니다. 라벨은 면 색을 따라 반전되는 inverse 토큰입니다(Button contained 와 같은 규칙). */
const PRIMARY: Record<BadgeStatus, string> = {
  neutral: 'koast-bg-inverse-bolder koast-text-interactive-inverse',
  information: 'koast-bg-info-bold koast-text-interactive-inverse',
  success: 'koast-bg-success-bold koast-text-interactive-inverse',
  warning: 'koast-bg-warning-bold koast-text-interactive-inverse',
  error: 'koast-bg-danger-bold koast-text-interactive-inverse',
};

/** 연한 면 + 1px 선입니다. inset ring 이라 primary 와 바깥 너비가 같습니다. */
const SECONDARY: Record<BadgeStatus, string> = {
  neutral:
    'koast-bg-tertiary koast-text-secondary koast-ring-1 koast-ring-inset koast-ring-primary',
  information:
    'koast-bg-info-subtle koast-text-info-bold koast-ring-1 koast-ring-inset koast-ring-info',
  success:
    'koast-bg-success-subtle koast-text-success-bold koast-ring-1 koast-ring-inset koast-ring-success',
  warning:
    'koast-bg-warning-subtle koast-text-warning-bold koast-ring-1 koast-ring-inset koast-ring-warning',
  error:
    'koast-bg-danger-subtle koast-text-danger-bold koast-ring-1 koast-ring-inset koast-ring-danger',
};

/** dot 은 Figma 에 Secondary 변형이 없어 variant 와 무관하게 채운 면 색만 씁니다. */
export const getBadgeStyles = (
  type: BadgeType,
  variant: BadgeVariant,
  status: BadgeStatus,
  className: string,
) =>
  twMerge(
    TYPES[type],
    type !== 'dot' && variant === 'secondary'
      ? SECONDARY[status]
      : PRIMARY[status],
    className,
  );

/** `max` 를 넘으면 Figma 의 `+999` 표기를 따라 `+{max}` 로 자릅니다. */
export const formatBadgeCount = (count: number, max: number) =>
  count > max ? `+${ max }` : String(count);
