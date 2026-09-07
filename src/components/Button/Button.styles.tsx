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
  xs: 'text-xs px-2 py-1 gap-1',
  sm: 'text-sm px-3 py-1.5 gap-1.5',
  md: 'text-base px-4 py-2 gap-2',
  lg: 'text-lg px-5 py-2.5 gap-2',
  xl: 'text-xl px-6 py-3 gap-2.5',
};

/**
 * intent × variant 색상 표입니다.
 *
 * 모든 값이 시맨틱 토큰 클래스(`*-koast-*`)로만 이루어져 있습니다.
 * raw 팔레트(`bg-blue-600` 등)는 여기에 들어올 수 없습니다.
 */
const COLORS: Record<ButtonColor, Record<ButtonVariant, string>> = {
  primary: {
    contained: 'bg-koast-interactive-primary text-koast-interactive-inverse hover:bg-koast-interactive-primary-hovered active:bg-koast-interactive-primary-pressed',
    outlined: 'border border-koast-interactive-primary text-koast-interactive-primary hover:bg-koast-interactive-selected hover:border-koast-interactive-primary-hovered hover:text-koast-interactive-primary-hovered active:bg-koast-interactive-selected-pressed',
    text: 'text-koast-interactive-primary hover:bg-koast-interactive-selected hover:text-koast-interactive-primary-hovered active:bg-koast-interactive-selected-pressed',
  },
  secondary: {
    contained: 'bg-koast-interactive-secondary text-koast-interactive-secondary hover:bg-koast-interactive-secondary-hovered active:bg-koast-interactive-secondary-pressed',
    outlined: 'border border-koast-interactive-secondary text-koast-interactive-secondary hover:bg-koast-interactive-secondary hover:border-koast-interactive-secondary-hovered hover:text-koast-interactive-secondary-hovered active:bg-koast-interactive-secondary-hovered',
    text: 'text-koast-interactive-secondary hover:bg-koast-interactive-secondary hover:text-koast-interactive-secondary-hovered active:bg-koast-interactive-secondary-hovered',
  },
  neutral: {
    contained: 'bg-koast-inverse-bold text-koast-interactive-inverse hover:bg-koast-inverse-bolder active:opacity-90',
    outlined: 'border border-koast-primary text-koast-secondary hover:bg-koast-tertiary active:bg-koast-tertiary active:opacity-90',
    text: 'text-koast-secondary hover:bg-koast-tertiary active:bg-koast-tertiary active:opacity-90',
  },
  danger: {
    contained: 'bg-koast-interactive-danger text-koast-on-dark hover:bg-koast-interactive-danger-hovered active:bg-koast-interactive-danger-pressed',
    outlined: 'border border-koast-danger text-koast-danger hover:bg-koast-danger-subtle hover:border-koast-interactive-danger-hovered hover:text-koast-danger-bold active:bg-koast-danger-subtle active:opacity-90',
    text: 'text-koast-danger hover:bg-koast-danger-subtle hover:text-koast-danger-bold active:bg-koast-danger-subtle active:opacity-90',
  },
  info: {
    contained: 'bg-koast-info-bold text-koast-interactive-inverse hover:opacity-90 active:opacity-80',
    outlined: 'border border-koast-info text-koast-info hover:bg-koast-info-subtle hover:text-koast-info-bold active:opacity-90',
    text: 'text-koast-info hover:bg-koast-info-subtle hover:text-koast-info-bold active:opacity-90',
  },
  warning: {
    contained: 'bg-koast-warning-bold text-koast-on-light hover:opacity-90 active:opacity-80',
    outlined: 'border border-koast-warning text-koast-warning hover:bg-koast-warning-subtle hover:text-koast-warning-bold active:opacity-90',
    text: 'text-koast-warning hover:bg-koast-warning-subtle hover:text-koast-warning-bold active:opacity-90',
  },
  success: {
    contained: 'bg-koast-success-bold text-koast-on-light hover:opacity-90 active:opacity-80',
    outlined: 'border border-koast-success text-koast-success hover:bg-koast-success-subtle hover:text-koast-success-bold active:opacity-90',
    text: 'text-koast-success hover:bg-koast-success-subtle hover:text-koast-success-bold active:opacity-90',
  },
};

/**
 * 비활성 상태 스타일입니다. 시스템의 disabled 토큰을 사용하며,
 * 예전처럼 `opacity-50` 으로 뭉개지 않습니다.
 */
const DISABLED: Record<ButtonVariant, string> = {
  contained: 'bg-koast-disabled text-koast-disabled',
  outlined: 'border border-koast-disabled text-koast-disabled bg-transparent',
  text: 'text-koast-disabled bg-transparent',
};

/** 포커스 링. 이전 구현은 `focus:outline-none` 만 있고 대체 표시가 없었습니다. */
const FOCUS_RING = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-koast-focus-ring focus-visible:ring-offset-2';

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
    'inline-flex items-center justify-center rounded font-semibold transition-all duration-200',
    SIZES[size],
    isInactive ? DISABLED[variant] : COLORS[normalizeColor(color)][variant],
    isInactive ? 'cursor-not-allowed pointer-events-none' : FOCUS_RING,
    loading ? 'relative' : '',
    variant === 'contained' && shadow && !isInactive ? 'shadow-lg shadow-koast-cast' : '',
    fullWidth ? 'w-full' : '',
    className,
  );
};

/**
 * 로딩 인디케이터를 반환합니다. 색은 버튼의 현재 텍스트 색을 그대로 따릅니다.
 */
export const getLoadingIndicator = (loading: boolean) => {
  if (!loading) return null;

  return (
    <span className={'absolute inset-0 flex items-center justify-center'}>
      <svg className={'size-5 animate-spin'} viewBox={'0 0 24 24'}>
        <circle
          className={'opacity-25'}
          cx={'12'}
          cy={'12'}
          r={'10'}
          stroke={'currentColor'}
          strokeWidth={'4'}
          fill={'transparent'}
        />
        <path
          className={'opacity-75'}
          fill={'currentColor'}
          d={'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'}
        />
      </svg>
    </span>
  );
};
