import { twMerge } from '../../utils/twMerge';
import type { ToastStatus, ToastType } from './Toast.types';

const ROOT_BASE = 'koast-flex koast-w-full koast-gap-1 koast-rounded-lg koast-p-4';

/**
 * Toast 는 Alert 와 달리 진한 면 변형이 없고, 옅은 면 + 1px 테두리 한 가지뿐입니다.
 * inverse 만 테두리 없는 진한 면입니다.
 */
const SURFACES: Record<ToastStatus, string> = {
  brand:
    'koast-border koast-border-solid koast-bg-info-subtle koast-border-info',
  neutral:
    'koast-border koast-border-solid koast-bg-primary koast-border-primary',
  info: 'koast-border koast-border-solid koast-bg-info-subtle koast-border-info',
  success:
    'koast-border koast-border-solid koast-bg-success-subtle koast-border-success',
  warning:
    'koast-border koast-border-solid koast-bg-warning-subtle koast-border-warning',
  error:
    'koast-border koast-border-solid koast-bg-danger-subtle koast-border-danger',
  inverse: 'koast-bg-inverse-bolder koast-text-interactive-inverse',
};

/**
 * longAction 만 액션 행이 본문 아래로 내려갑니다.
 * text 는 Figma 상 세로지만 자식이 하나뿐이라 가로여도 결과가 같고, 닫기 버튼만 붙는 경우를 함께 처리합니다.
 */
export const getToastStyles = (
  type: ToastType,
  status: ToastStatus,
  className: string,
) =>
  twMerge(
    ROOT_BASE,
    type === 'longAction' ? 'koast-flex-col' : 'koast-flex-row',
    SURFACES[status],
    className,
  );

export const getToastContentStyles = () =>
  'koast-flex koast-min-w-0 koast-flex-1 koast-flex-col koast-gap-1';

export const getToastTitleStyles = (status: ToastStatus) =>
  twMerge(
    'koast-text-xl koast-font-semibold koast-leading-6',
    status === 'inverse' ? '' : 'koast-text-primary',
  );

/** preflight 가 꺼져 있어 `<p>` 의 브라우저 기본 여백(1em)을 직접 지웁니다. */
export const getToastDescriptionStyles = (status: ToastStatus) =>
  twMerge(
    'koast-m-0 koast-text-base koast-font-medium koast-leading-5',
    status === 'inverse' ? '' : 'koast-text-tertiary',
  );

/** 액션 버튼과 닫기 버튼을 담는 행입니다. longAction 에서는 본문 아래 전체 폭을 차지합니다. */
export const getToastButtonGroupStyles = (type: ToastType) =>
  twMerge(
    'koast-flex koast-items-center koast-gap-2',
    type === 'longAction' ? '' : 'koast-shrink-0',
  );

/**
 * 액션 버튼입니다. Button 의 `variant='text' color='secondary' size='md'` 와 같은 타이포·높이이고
 * 좌우 padding 만 8px 로 좁습니다(Figma 실측 pad 12/8).
 */
const ACTION_BASE
  = 'koast-inline-flex koast-h-12 koast-shrink-0 koast-items-center koast-justify-center koast-rounded-lg koast-px-2 koast-py-3 koast-text-sm koast-font-semibold koast-leading-4 koast-transition-colors koast-duration-200 focus-visible:koast-outline-none focus-visible:koast-ring-2 focus-visible:koast-ring-focus-ring';

export const getToastActionStyles = (status: ToastStatus) =>
  twMerge(
    ACTION_BASE,
    status === 'inverse'
      ? 'koast-text-interactive-inverse'
      : 'koast-text-interactive-secondary hover:koast-bg-interactive-secondary-hovered hover:koast-text-interactive-secondary-hovered active:koast-bg-interactive-secondary-pressed active:koast-text-interactive-secondary-pressed',
  );

/** 닫기 버튼입니다. 채색된 면 안이라 ring-offset 을 주지 않습니다(흰 띠가 면 위에서 튑니다). */
export const getToastCloseStyles = (status: ToastStatus) =>
  twMerge(
    'koast-inline-flex koast-size-10 koast-shrink-0 koast-items-center koast-justify-center koast-rounded-lg koast-transition-colors koast-duration-200 [&_svg]:koast-size-6 [&_svg]:koast-shrink-0 focus-visible:koast-outline-none focus-visible:koast-ring-2 focus-visible:koast-ring-focus-ring',
    status === 'inverse' ? '' : 'koast-text-tertiary hover:koast-text-primary',
  );
