import { twMerge } from '../../utils/twMerge';
import type { AlertStatus, AlertVariant } from './Alert.types';

const ROOT_BASE
  = 'koast-flex koast-w-full koast-gap-2 koast-rounded-lg koast-p-4';

/** 본문이 있으면 아이콘을 제목 줄에 맞춰 위로 붙이고, 제목뿐이면 40px 닫기 버튼 한가운데 둡니다. */
const ALIGN = { withBody: 'koast-items-start', titleOnly: 'koast-items-center' };

/** 진한 면입니다. 선은 면보다 한 단계 밝은 같은 계열 1px 이며, 안쪽 ring 이라 바깥 치수를 바꾸지 않습니다. */
const FILLED: Record<AlertStatus, string> = {
  brand:
    'koast-ring-1 koast-ring-inset koast-bg-brand koast-ring-interactive-primary koast-text-interactive-inverse',
  neutral:
    'koast-ring-1 koast-ring-inset koast-bg-inverse-bold koast-ring-primary koast-text-interactive-inverse',
  info: 'koast-ring-1 koast-ring-inset koast-bg-info-bold koast-ring-info koast-text-interactive-inverse',
  success:
    'koast-ring-1 koast-ring-inset koast-bg-success-bold koast-ring-success koast-text-interactive-inverse',
  warning:
    'koast-ring-1 koast-ring-inset koast-bg-warning-bold koast-ring-warning koast-text-interactive-inverse',
  error:
    'koast-ring-1 koast-ring-inset koast-bg-danger-bold koast-ring-danger koast-text-interactive-inverse',
};

/** 옅은 면입니다. outlined / transparent 가 공유합니다. brand 만 interactive 계열이라 주입한 램프를 따라갑니다. */
const SUBTLE: Record<AlertStatus, string> = {
  brand: 'koast-bg-interactive-selected',
  neutral: 'koast-bg-secondary',
  info: 'koast-bg-info-subtle',
  success: 'koast-bg-success-subtle',
  warning: 'koast-bg-warning-subtle',
  error: 'koast-bg-danger-subtle',
};

/** outlined 만 2px 선입니다. filled 의 1px 과 달리 면보다 진한 색입니다. */
const OUTLINE_BORDERS: Record<AlertStatus, string> = {
  brand: 'koast-ring-2 koast-ring-inset koast-ring-interactive-primary',
  neutral: 'koast-ring-2 koast-ring-inset koast-ring-primary',
  info: 'koast-ring-2 koast-ring-inset koast-ring-info',
  success: 'koast-ring-2 koast-ring-inset koast-ring-success',
  warning: 'koast-ring-2 koast-ring-inset koast-ring-warning',
  error: 'koast-ring-2 koast-ring-inset koast-ring-danger',
};

/** 옅은 면에서만 아이콘이 status 색을 가집니다. 진한 면에서는 면 색을 반전한 라벨 색을 상속합니다. */
const SUBTLE_ICONS: Record<AlertStatus, string> = {
  brand: 'koast-text-interactive-primary',
  neutral: 'koast-text-primary',
  info: 'koast-text-info',
  success: 'koast-text-success',
  warning: 'koast-text-warning',
  error: 'koast-text-danger',
};

export const getAlertStyles = (
  variant: AlertVariant,
  status: AlertStatus,
  hasDescription: boolean,
  className: string,
) =>
  twMerge(
    ROOT_BASE,
    hasDescription ? ALIGN.withBody : ALIGN.titleOnly,
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
    'koast-break-words koast-text-base koast-font-medium koast-leading-5',
    variant === 'filled' ? '' : 'koast-text-primary',
  );

/** preflight 가 꺼져 있어 `<p>` 의 브라우저 기본 여백(1em)을 직접 지웁니다. */
export const getAlertDescriptionStyles = (variant: AlertVariant) =>
  twMerge(
    'koast-m-0 koast-break-words koast-text-sm koast-font-normal koast-leading-4',
    variant === 'filled' ? '' : 'koast-text-tertiary',
  );

/**
 * 닫기 버튼입니다. 채색된 면 안에 들어가므로 ring-offset 을 주지 않습니다
 * (offset 은 흰 띠를 그려 면 위에서 튑니다).
 */
export const getAlertCloseStyles = (variant: AlertVariant) =>
  twMerge(
    'koast-inline-flex koast-size-10 koast-shrink-0 koast-items-center koast-justify-center koast-rounded-lg koast-transition-colors koast-duration-200 [&_svg]:koast-size-6 [&_svg]:koast-shrink-0 focus-visible:koast-outline focus-visible:koast-outline-2 focus-visible:koast-outline-offset-2 focus-visible:koast-outline-focus-ring',
    variant === 'filled'
      ? ''
      : 'koast-text-tertiary hover:koast-text-primary',
  );
