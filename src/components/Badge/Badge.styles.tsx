import { twMerge } from '../../utils/twMerge';
import type { BadgeStatus, BadgeType, BadgeVariant } from './Badge.types';

/**
 * 형태별 치수입니다. 디자인 시스템이 높이를 고정값으로 정의합니다(dot 4, number 20, text 24).
 * number 는 pill(radius 무한), text 는 radius 4px 입니다.
 * number 의 min-w-5 는 한 자리 수에서도 원형을 유지하기 위한 파생값입니다.
 */
const TYPES: Record<BadgeType, string> = {
  dot: 'koast-inline-block koast-size-1 koast-shrink-0 koast-rounded-full',
  number:
    'koast-inline-flex koast-h-5 koast-min-w-5 koast-shrink-0 koast-items-center koast-justify-center koast-rounded-full koast-px-1 koast-py-0.5 koast-text-xs koast-font-medium koast-leading-4',
  text: 'koast-inline-flex koast-h-6 koast-shrink-0 koast-items-center koast-justify-center koast-rounded koast-px-2 koast-py-1 koast-text-sm koast-font-medium koast-leading-4',
};

/** 채운 면입니다. 라벨은 항상 채색 표면 위의 밝은 색(media 토큰)입니다. */
const PRIMARY: Record<BadgeStatus, string> = {
  neutral: 'koast-bg-inverse-bolder koast-text-on-dark',
  information: 'koast-bg-info-bold koast-text-on-dark',
  success: 'koast-bg-success-bold koast-text-on-dark',
  warning: 'koast-bg-warning-bold koast-text-on-dark',
  error: 'koast-bg-danger-bold koast-text-on-dark',
};

/**
 * 연한 면 + 1px 테두리입니다.
 * preflight 를 껐고 border-style 기본값이 none 이라 두께 클래스와 border-solid 가 같은 문자열에 있어야 합니다.
 */
const SECONDARY: Record<BadgeStatus, string> = {
  neutral:
    'koast-border koast-border-solid koast-bg-tertiary koast-border-primary koast-text-secondary',
  information:
    'koast-border koast-border-solid koast-bg-info-subtle koast-border-info koast-text-info-bold',
  success:
    'koast-border koast-border-solid koast-bg-success-subtle koast-border-success koast-text-success-bold',
  warning:
    'koast-border koast-border-solid koast-bg-warning-subtle koast-border-warning koast-text-warning-bold',
  error:
    'koast-border koast-border-solid koast-bg-danger-subtle koast-border-danger koast-text-danger-bold',
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
