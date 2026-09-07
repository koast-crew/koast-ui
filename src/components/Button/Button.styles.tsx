import { twMerge } from 'tailwind-merge';
import type {
  ButtonColor,
  ButtonColorProp,
  ButtonSize,
  ButtonVariant,
} from './Button.types';

/**
 * 1.0.x 호환 별칭을 현재 intent 로 정규화합니다.
 * 타입 밖에서 들어온 값(순수 JS 소비자)은 'primary' 로 안전하게 떨어집니다.
 */
const COLOR_ALIASES: Record<string, ButtonColor> = {
  error: 'danger',
  gray: 'neutral',
};

const KNOWN_COLORS: readonly ButtonColor[] = [
  'primary', 'secondary', 'neutral', 'danger', 'info', 'warning', 'success',
];

export const normalizeColor = (color: ButtonColorProp): ButtonColor => {
  const aliased = COLOR_ALIASES[color] ?? color;
  return KNOWN_COLORS.includes(aliased as ButtonColor) ? aliased as ButtonColor : 'primary';
};

const SIZES: Record<ButtonSize, string> = {
  xs: 'koast-text-xs koast-px-2 koast-py-1 koast-gap-1',
  sm: 'koast-text-sm koast-px-3 koast-py-1.5 koast-gap-1.5',
  md: 'koast-text-base koast-px-4 koast-py-2 koast-gap-2',
  lg: 'koast-text-lg koast-px-5 koast-py-2.5 koast-gap-2',
  xl: 'koast-text-xl koast-px-6 koast-py-3 koast-gap-2.5',
};

/**
 * intent × variant 색상 표입니다.
 *
 * 모든 값이 시맨틱 토큰 클래스(`*-koast-*`)로만 이루어져 있습니다.
 * raw 팔레트(`bg-blue-600` 등)는 여기에 들어올 수 없습니다.
 */
const COLORS: Record<ButtonColor, Record<ButtonVariant, string>> = {
  primary: {
    contained: 'koast-bg-interactive-primary koast-text-interactive-inverse hover:koast-bg-interactive-primary-hovered active:koast-bg-interactive-primary-pressed',
    outlined: 'koast-border koast-border-interactive-primary koast-text-interactive-primary hover:koast-bg-interactive-selected hover:koast-border-interactive-primary-hovered hover:koast-text-interactive-primary-hovered active:koast-bg-interactive-selected-pressed',
    text: 'koast-text-interactive-primary hover:koast-bg-interactive-selected hover:koast-text-interactive-primary-hovered active:koast-bg-interactive-selected-pressed',
  },
  secondary: {
    contained: 'koast-bg-interactive-secondary koast-text-interactive-secondary hover:koast-bg-interactive-secondary-hovered active:koast-bg-interactive-secondary-pressed',
    outlined: 'koast-border koast-border-interactive-secondary koast-text-interactive-secondary hover:koast-bg-interactive-secondary hover:koast-border-interactive-secondary-hovered hover:koast-text-interactive-secondary-hovered active:koast-bg-interactive-secondary-hovered',
    text: 'koast-text-interactive-secondary hover:koast-bg-interactive-secondary hover:koast-text-interactive-secondary-hovered active:koast-bg-interactive-secondary-hovered',
  },
  neutral: {
    contained: 'koast-bg-inverse-bold koast-text-interactive-inverse hover:koast-bg-inverse-bolder active:koast-opacity-90',
    outlined: 'koast-border koast-border-primary koast-text-secondary hover:koast-bg-tertiary active:koast-bg-tertiary active:koast-opacity-90',
    text: 'koast-text-secondary hover:koast-bg-tertiary active:koast-bg-tertiary active:koast-opacity-90',
  },
  danger: {
    contained: 'koast-bg-interactive-danger koast-text-on-dark hover:koast-bg-interactive-danger-hovered active:koast-bg-interactive-danger-pressed',
    outlined: 'koast-border koast-border-danger koast-text-danger hover:koast-bg-danger-subtle hover:koast-border-interactive-danger-hovered hover:koast-text-danger-bold active:koast-bg-danger-subtle active:koast-opacity-90',
    text: 'koast-text-danger hover:koast-bg-danger-subtle hover:koast-text-danger-bold active:koast-bg-danger-subtle active:koast-opacity-90',
  },
  info: {
    contained: 'koast-bg-info-bold koast-text-interactive-inverse hover:koast-opacity-90 active:koast-opacity-80',
    outlined: 'koast-border koast-border-info koast-text-info hover:koast-bg-info-subtle hover:koast-text-info-bold active:koast-opacity-90',
    text: 'koast-text-info hover:koast-bg-info-subtle hover:koast-text-info-bold active:koast-opacity-90',
  },
  warning: {
    contained: 'koast-bg-warning-bold koast-text-on-light hover:koast-opacity-90 active:koast-opacity-80',
    outlined: 'koast-border koast-border-warning koast-text-warning hover:koast-bg-warning-subtle hover:koast-text-warning-bold active:koast-opacity-90',
    text: 'koast-text-warning hover:koast-bg-warning-subtle hover:koast-text-warning-bold active:koast-opacity-90',
  },
  success: {
    contained: 'koast-bg-success-bold koast-text-on-light hover:koast-opacity-90 active:koast-opacity-80',
    outlined: 'koast-border koast-border-success koast-text-success hover:koast-bg-success-subtle hover:koast-text-success-bold active:koast-opacity-90',
    text: 'koast-text-success hover:koast-bg-success-subtle hover:koast-text-success-bold active:koast-opacity-90',
  },
};

/**
 * 비활성 상태 스타일입니다. 시스템의 disabled 토큰을 사용하며,
 * 예전처럼 `opacity-50` 으로 뭉개지 않습니다.
 */
const DISABLED: Record<ButtonVariant, string> = {
  contained: 'koast-bg-disabled koast-text-disabled',
  outlined: 'koast-border koast-border-disabled koast-text-disabled koast-bg-transparent',
  text: 'koast-text-disabled koast-bg-transparent',
};

/** 포커스 링. 이전 구현은 `focus:outline-none` 만 있고 대체 표시가 없었습니다. */
const FOCUS_RING = 'focus-visible:koast-outline-none focus-visible:koast-ring-2 focus-visible:koast-ring-focus-ring focus-visible:koast-ring-offset-2';

/**
 * 버튼의 최종 클래스명을 계산합니다.
 */
export const getButtonStyles = (
  variant: ButtonVariant,
  color: ButtonColorProp,
  size: ButtonSize,
  disabled: boolean,
  loading: boolean,
  fullWidth: boolean,
  shadow: boolean,
  className: string,
) => {
  const isInactive = disabled || loading;

  return twMerge(
    'koast-inline-flex koast-items-center koast-justify-center koast-rounded koast-font-semibold koast-transition-all koast-duration-200',
    SIZES[size],
    isInactive ? DISABLED[variant] : COLORS[normalizeColor(color)][variant],
    isInactive ? 'koast-cursor-not-allowed koast-pointer-events-none' : FOCUS_RING,
    loading ? 'koast-relative' : '',
    variant === 'contained' && shadow && !isInactive ? 'koast-shadow-lg koast-shadow-cast' : '',
    fullWidth ? 'koast-w-full' : '',
    className,
  );
};

/**
 * 로딩 인디케이터를 반환합니다. 색은 버튼의 현재 텍스트 색을 그대로 따릅니다.
 */
export const getLoadingIndicator = (loading: boolean) => {
  if (!loading) return null;

  return (
    <span className={'koast-absolute koast-inset-0 koast-flex koast-items-center koast-justify-center'}>
      <svg className={'koast-size-5 koast-animate-spin'} viewBox={'0 0 24 24'}>
        <circle
          className={'koast-opacity-25'}
          cx={'12'}
          cy={'12'}
          r={'10'}
          stroke={'currentColor'}
          strokeWidth={'4'}
          fill={'transparent'}
        />
        <path
          className={'koast-opacity-75'}
          fill={'currentColor'}
          d={'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'}
        />
      </svg>
    </span>
  );
};
