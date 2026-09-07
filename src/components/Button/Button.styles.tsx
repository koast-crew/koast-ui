import { twMerge } from 'tailwind-merge';
import type {
  ButtonColor,
  ButtonColorProp,
  ButtonSize,
  ButtonSizeProp,
  ButtonVariant,
} from './Button.types';

/** 제거된 intent 를 현재 값으로 정규화합니다. 타입 밖에서 들어온 값은 'primary' 로 떨어집니다. */
const COLOR_ALIASES: Record<string, ButtonColor> = {
  error: 'danger',
  gray: 'secondary',
  neutral: 'secondary',
};

const KNOWN_COLORS: readonly ButtonColor[] = ['primary', 'secondary', 'danger'];

export const normalizeColor = (color: ButtonColorProp): ButtonColor => {
  const aliased = COLOR_ALIASES[color] ?? color;
  return KNOWN_COLORS.includes(aliased as ButtonColor) ? aliased as ButtonColor : 'primary';
};

const KNOWN_SIZES: readonly ButtonSize[] = ['xs', 'sm', 'md'];

/** 디자인 시스템에 없는 lg / xl 은 md 로 떨어집니다. */
export const normalizeSize = (size: ButtonSizeProp): ButtonSize =>
  (KNOWN_SIZES.includes(size as ButtonSize) ? size as ButtonSize : 'md');

/**
 * 높이는 디자인 시스템이 고정값으로 정의합니다(28 / 40 / 48).
 * 세로 padding 이 아니라 높이 + 수직 중앙 정렬로 맞춥니다.
 * 아이콘 크기도 size 에 종속됩니다(16 / 16 / 24).
 */
const SIZES: Record<ButtonSize, string> = {
  xs: 'koast-h-7 koast-px-2 koast-gap-2 koast-rounded koast-text-xs koast-leading-4 [&_svg]:koast-size-4',
  sm: 'koast-h-10 koast-px-4 koast-gap-2 koast-rounded-lg koast-text-xs koast-leading-4 [&_svg]:koast-size-4',
  md: 'koast-h-12 koast-px-6 koast-gap-2 koast-rounded-lg koast-text-sm koast-leading-4 [&_svg]:koast-size-6',
};

/**
 * intent × variant 색상 표입니다. 모든 값이 시맨틱 토큰 클래스로만 이루어져 있습니다.
 * danger 의 outlined / text 는 디자인 시스템에 없어 primary 패턴을 따라 파생했습니다.
 */
const COLORS: Record<ButtonColor, Record<ButtonVariant, string>> = {
  primary: {
    contained: 'koast-bg-interactive-primary koast-text-interactive-inverse hover:koast-bg-interactive-primary-hovered active:koast-bg-interactive-primary-pressed',
    outlined: 'koast-border-2 koast-border-interactive-primary koast-text-interactive-primary hover:koast-bg-interactive-selected-hovered hover:koast-border-interactive-primary-hovered hover:koast-text-interactive-primary-hovered active:koast-bg-interactive-selected-pressed active:koast-border-interactive-primary-pressed active:koast-text-interactive-primary-pressed',
    text: 'koast-text-interactive-primary hover:koast-bg-interactive-selected-hovered hover:koast-text-interactive-primary-hovered active:koast-bg-interactive-selected-pressed active:koast-text-interactive-primary-pressed',
  },
  secondary: {
    contained: 'koast-bg-interactive-secondary koast-text-interactive-secondary hover:koast-bg-interactive-secondary-hovered active:koast-bg-interactive-secondary-pressed',
    outlined: 'koast-border-2 koast-border-interactive-secondary koast-text-interactive-secondary hover:koast-bg-interactive-secondary-hovered hover:koast-border-interactive-secondary-hovered hover:koast-text-interactive-secondary-hovered active:koast-bg-interactive-secondary-pressed active:koast-border-interactive-secondary-pressed active:koast-text-interactive-secondary-pressed',
    text: 'koast-text-interactive-secondary hover:koast-bg-interactive-secondary-hovered hover:koast-text-interactive-secondary-hovered active:koast-bg-interactive-secondary-pressed active:koast-text-interactive-secondary-pressed',
  },
  danger: {
    contained: 'koast-bg-interactive-danger koast-text-interactive-inverse hover:koast-bg-interactive-danger-hovered active:koast-bg-interactive-danger-pressed',
    outlined: 'koast-border-2 koast-border-interactive-danger koast-text-danger hover:koast-bg-danger-subtle hover:koast-border-interactive-danger-hovered hover:koast-text-danger-bold active:koast-bg-danger-subtle active:koast-border-interactive-danger-pressed active:koast-text-danger-bold',
    text: 'koast-text-danger hover:koast-bg-danger-subtle hover:koast-text-danger-bold active:koast-bg-danger-subtle active:koast-text-danger-bold',
  },
};

/**
 * 비활성 상태입니다. 디자인 시스템은 variant 와 무관하게 같은 회색 면을 씁니다.
 * transparent 변형도 배경이 채워집니다.
 */
const DISABLED: Record<ButtonVariant, string> = {
  contained: 'koast-bg-disabled koast-text-disabled',
  outlined: 'koast-border-2 koast-border-disabled koast-bg-disabled koast-text-disabled',
  text: 'koast-bg-disabled koast-text-disabled',
};

/**
 * 포커스 링입니다. 디자인 시스템의 Focused 변형에는 시각 표현이 없어,
 * 접근성을 위해 focusRing 토큰으로 라이브러리가 정의합니다.
 */
const FOCUS_RING = 'focus-visible:koast-outline-none focus-visible:koast-ring-2 focus-visible:koast-ring-focus-ring focus-visible:koast-ring-offset-2';

/** 버튼의 최종 클래스명을 계산합니다. */
export const getButtonStyles = (
  variant: ButtonVariant,
  color: ButtonColorProp,
  size: ButtonSizeProp,
  disabled: boolean,
  loading: boolean,
  fullWidth: boolean,
  shadow: boolean,
  className: string,
) => {
  const isInactive = disabled || loading;

  return twMerge(
    'koast-inline-flex koast-items-center koast-justify-center koast-font-semibold koast-transition-all koast-duration-200',
    SIZES[normalizeSize(size)],
    isInactive ? DISABLED[variant] : COLORS[normalizeColor(color)][variant],
    isInactive ? 'koast-cursor-not-allowed koast-pointer-events-none' : FOCUS_RING,
    loading ? 'koast-relative' : '',
    variant === 'contained' && shadow && !isInactive ? 'koast-shadow-lg koast-shadow-cast' : '',
    fullWidth ? 'koast-w-full' : '',
    className,
  );
};

/**
 * 로딩 인디케이터입니다. 색은 버튼의 현재 텍스트 색을 따르고,
 * 크기는 SIZES 의 `[&_svg]` 규칙을 그대로 상속합니다.
 */
export const getLoadingIndicator = (loading: boolean) => {
  if (!loading) return null;

  return (
    <span className={'koast-absolute koast-inset-0 koast-flex koast-items-center koast-justify-center'}>
      <svg className={'koast-animate-spin'} viewBox={'0 0 24 24'}>
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
