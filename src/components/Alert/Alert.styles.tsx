import { twMerge } from '../../utils/twMerge';
import type { AlertStatus, AlertVariant } from './Alert.types';

/**
 * 아이콘(24) 과 닫기 버튼(40) 이 세로로 다른 높이라 상단 정렬로 고정합니다.
 * Figma 의 72px 은 pad 16 + 본문 40 + pad 16 이라 높이를 따로 고정하지 않아도 같은 값이 나옵니다.
 */
const ROOT_BASE
  = 'koast-flex koast-w-full koast-items-start koast-gap-2 koast-rounded-lg koast-p-4';

/** 진한 면입니다. 테두리는 면보다 한 단계 밝은 같은 계열 1px 입니다. */
const FILLED: Record<AlertStatus, string> = {
  brand:
    'koast-border koast-border-solid koast-bg-brand koast-border-info koast-text-interactive-inverse',
  neutral:
    'koast-border koast-border-solid koast-bg-inverse-bold koast-border-primary koast-text-interactive-inverse',
  info: 'koast-border koast-border-solid koast-bg-info-bold koast-border-info koast-text-interactive-inverse',
  success:
    'koast-border koast-border-solid koast-bg-success-bold koast-border-success koast-text-interactive-inverse',
  warning:
    'koast-border koast-border-solid koast-bg-warning-bold koast-border-warning koast-text-interactive-inverse',
  error:
    'koast-border koast-border-solid koast-bg-danger-bold koast-border-danger koast-text-interactive-inverse',
};

/** 옅은 면입니다. outlined / transparent 가 공유합니다. */
const SUBTLE: Record<AlertStatus, string> = {
  brand: 'koast-bg-info-subtle',
  neutral: 'koast-bg-secondary',
  info: 'koast-bg-info-subtle',
  success: 'koast-bg-success-subtle',
  warning: 'koast-bg-warning-subtle',
  error: 'koast-bg-danger-subtle',
};

/** outlined 만 2px 테두리입니다. filled 의 1px 과 달리 면보다 진한 색입니다. */
const OUTLINE_BORDERS: Record<AlertStatus, string> = {
  brand: 'koast-border-2 koast-border-solid koast-border-info',
  neutral: 'koast-border-2 koast-border-solid koast-border-primary',
  info: 'koast-border-2 koast-border-solid koast-border-info',
  success: 'koast-border-2 koast-border-solid koast-border-success',
  warning: 'koast-border-2 koast-border-solid koast-border-warning',
  error: 'koast-border-2 koast-border-solid koast-border-danger',
};

/** 옅은 면에서만 아이콘이 status 색을 가집니다. 진한 면에서는 면 색을 반전한 라벨 색을 상속합니다. */
const SUBTLE_ICONS: Record<AlertStatus, string> = {
  brand: 'koast-text-info',
  neutral: 'koast-text-primary',
  info: 'koast-text-info',
  success: 'koast-text-success',
  warning: 'koast-text-warning',
  error: 'koast-text-danger',
};

export const getAlertStyles = (
  variant: AlertVariant,
  status: AlertStatus,
  className: string,
) =>
  twMerge(
    ROOT_BASE,
    variant === 'filled' ? FILLED[status] : SUBTLE[status],
    variant === 'outlined' ? OUTLINE_BORDERS[status] : '',
    className,
  );

export const getAlertIconStyles = (variant: AlertVariant, status: AlertStatus) =>
  twMerge(
    'koast-flex koast-shrink-0 koast-items-center [&_svg]:koast-size-6 [&_svg]:koast-shrink-0',
    variant === 'filled' ? '' : SUBTLE_ICONS[status],
  );

export const getAlertContentStyles = () =>
  'koast-flex koast-min-w-0 koast-flex-1 koast-flex-col koast-gap-1';

export const getAlertTitleStyles = (variant: AlertVariant) =>
  twMerge(
    'koast-text-base koast-font-medium koast-leading-5',
    variant === 'filled' ? '' : 'koast-text-primary',
  );

/** preflight 가 꺼져 있어 `<p>` 의 브라우저 기본 여백(1em)을 직접 지웁니다. */
export const getAlertDescriptionStyles = (variant: AlertVariant) =>
  twMerge(
    'koast-m-0 koast-text-sm koast-font-normal koast-leading-4',
    variant === 'filled' ? '' : 'koast-text-tertiary',
  );

/**
 * 닫기 버튼입니다. 채색된 면 안에 들어가므로 ring-offset 을 주지 않습니다
 * (offset 은 흰 띠를 그려 면 위에서 튑니다).
 */
export const getAlertCloseStyles = (variant: AlertVariant) =>
  twMerge(
    'koast-inline-flex koast-size-10 koast-shrink-0 koast-items-center koast-justify-center koast-rounded-lg koast-transition-colors koast-duration-200 [&_svg]:koast-size-6 [&_svg]:koast-shrink-0 focus-visible:koast-outline-none focus-visible:koast-ring-2 focus-visible:koast-ring-focus-ring',
    variant === 'filled'
      ? ''
      : 'koast-text-tertiary hover:koast-text-primary',
  );
