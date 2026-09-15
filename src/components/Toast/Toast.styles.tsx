import { twMerge } from '../../utils/twMerge';
import type { ToastStatus, ToastType } from './Toast.types';

const ROOT_BASE = 'koast-flex koast-w-full koast-gap-1 koast-rounded-lg koast-p-4';

/** 본문이 있으면 제목 줄에 맞춰 위로 붙이고, 제목뿐이면 40px 버튼 한가운데 둡니다. */
const ALIGN = { withBody: 'koast-items-start', titleOnly: 'koast-items-center' };

/**
 * Toast 는 Alert 와 달리 진한 면 변형이 없고, 옅은 면 + 1px 선 한 가지뿐입니다.
 * inverse 만 선 없는 진한 면입니다. 선은 안쪽 ring 이라 status 간 바깥 치수가 같습니다.
 */
const SURFACES: Record<ToastStatus, string> = {
  brand:
    'koast-ring-1 koast-ring-inset koast-bg-interactive-selected koast-ring-interactive-primary',
  neutral:
    'koast-ring-1 koast-ring-inset koast-bg-primary koast-ring-primary',
  info: 'koast-ring-1 koast-ring-inset koast-bg-info-subtle koast-ring-info',
  success:
    'koast-ring-1 koast-ring-inset koast-bg-success-subtle koast-ring-success',
  warning:
    'koast-ring-1 koast-ring-inset koast-bg-warning-subtle koast-ring-warning',
  error:
    'koast-ring-1 koast-ring-inset koast-bg-danger-subtle koast-ring-danger',
  inverse: 'koast-bg-inverse-bolder koast-text-interactive-inverse',
};

/**
 * longAction 만 액션 행이 본문 아래로 내려갑니다.
 * text 는 Figma 상 세로지만 자식이 하나뿐이라 가로여도 결과가 같고, 닫기 버튼만 붙는 경우를 함께 처리합니다.
 */
export const getToastStyles = (
  type: ToastType,
  status: ToastStatus,
  hasDescription: boolean,
  className: string,
) =>
  twMerge(
    ROOT_BASE,
    // longAction 은 세로 스택이라 가로 정렬 규칙이 필요 없습니다.
    type === 'longAction'
      ? 'koast-flex-col'
      : `koast-flex-row ${ hasDescription ? ALIGN.withBody : ALIGN.titleOnly }`,
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

/**
 * 액션 버튼과 닫기 버튼을 담는 행입니다. longAction 은 본문 아래 전체 폭에서 오른쪽으로 붙습니다.
 * 가로 배치에서는 본문 길이와 무관하게 항상 세로 가운데에 옵니다.
 */
export const getToastButtonGroupStyles = (type: ToastType) =>
  twMerge(
    'koast-flex koast-items-center koast-gap-2',
    type === 'longAction' ? 'koast-justify-end' : 'koast-shrink-0 koast-self-center',
  );

/**
 * 액션 버튼입니다. Button 의 `variant='text' color='secondary' size='md'` 와 같은 타이포·높이이고
 * 좌우 padding 만 8px 로 좁습니다(Figma 실측 pad 12/8).
 * 최소 폭을 높이와 맞춰 `보기` 처럼 짧은 라벨이 세로로 길쭉해 보이지 않게 합니다.
 */
const ACTION_BASE
  = 'koast-inline-flex koast-h-12 koast-min-w-12 koast-shrink-0 koast-items-center koast-justify-center koast-rounded-lg koast-px-2 koast-py-3 koast-text-sm koast-font-semibold koast-leading-4 koast-transition-colors koast-duration-200 focus-visible:koast-outline focus-visible:koast-outline-2 focus-visible:koast-outline-offset-2 focus-visible:koast-outline-focus-ring';

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
    'koast-inline-flex koast-size-10 koast-shrink-0 koast-items-center koast-justify-center koast-rounded-lg koast-transition-colors koast-duration-200 [&_svg]:koast-size-6 [&_svg]:koast-shrink-0 focus-visible:koast-outline focus-visible:koast-outline-2 focus-visible:koast-outline-offset-2 focus-visible:koast-outline-focus-ring',
    status === 'inverse' ? '' : 'koast-text-tertiary hover:koast-text-primary',
  );
