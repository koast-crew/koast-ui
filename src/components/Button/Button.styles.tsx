import { ButtonColor, ButtonSize, ButtonVariant } from './Button.types';
import clsx from 'clsx';

/**
 * 기본 버튼 스타일을 정의합니다.
 */
export const getButtonStyles = (
  variant: ButtonVariant,
  color: ButtonColor,
  size: ButtonSize,
  disabled: boolean,
  loading: boolean,
  fullWidth: boolean,
  shadow: boolean,
  className: string,
) => {
  // 기본 스타일
  const baseStyle = 'koast-ui-font-semibold koast-ui-transition-all koast-ui-duration-200 koast-ui-rounded koast-ui-focus:outline-none koast-ui-inline-flex koast-ui-items-center koast-ui-justify-center';

  // 크기별 스타일
  const sizes: Record<ButtonSize, string> = {
    xs: 'koast-ui-text-xs koast-ui-px-2 koast-ui-py-1 koast-ui-gap-1',
    sm: 'koast-ui-text-sm koast-ui-px-3 koast-ui-py-1.5 koast-ui-gap-1.5',
    md: 'koast-ui-text-base koast-ui-px-4 koast-ui-py-2 koast-ui-gap-2',
    lg: 'koast-ui-text-lg koast-ui-px-5 koast-ui-py-2.5 koast-ui-gap-2',
    xl: 'koast-ui-text-xl koast-ui-px-6 koast-ui-py-3 koast-ui-gap-2.5',
  };

  // 색상 스타일
  const colorStyle = getColorStyles(variant, color);

  // 비활성화 스타일
  const disabledStyle = disabled || loading ? 'koast-ui-opacity-50 koast-ui-cursor-not-allowed koast-ui-pointer-events-none' : '';

  // 로딩 스타일
  const loadingStyle = loading ? 'koast-ui-relative' : '';

  // 그림자 효과 추가
  const elevationStyle = variant === 'contained' && shadow ? 'koast-ui-shadow-lg' : '';

  // 너비 스타일
  const widthStyle = fullWidth ? 'koast-ui-w-full' : '';

  return clsx(
    baseStyle,
    sizes[size],
    colorStyle,
    disabledStyle,
    loadingStyle,
    elevationStyle,
    widthStyle,
    className,
  );
};

/**
 * 버튼 색상 스타일을 가져옵니다.
 */
export const getColorStyles = (variant: ButtonVariant, color: ButtonColor): string => {
  const colorMap: Record<string, Record<ButtonVariant, string>> = {
    primary: {
      text: 'koast-ui-text-blue-600 koast-ui-hover:bg-blue-50 koast-ui-active:bg-blue-100',
      contained: 'koast-ui-bg-blue-600 koast-ui-text-white koast-ui-hover:bg-blue-700 koast-ui-active:bg-blue-800',
      outlined: 'koast-ui-text-blue-600 koast-ui-border koast-ui-border-blue-600 koast-ui-hover:bg-blue-50 koast-ui-active:bg-blue-100',
    },
    secondary: {
      text: 'koast-ui-text-purple-600 koast-ui-hover:bg-purple-50 koast-ui-active:bg-purple-100',
      contained: 'koast-ui-bg-purple-600 koast-ui-text-white koast-ui-hover:bg-purple-700 koast-ui-active:bg-purple-800',
      outlined: 'koast-ui-text-purple-600 koast-ui-border koast-ui-border-purple-600 koast-ui-hover:bg-purple-50 koast-ui-active:bg-purple-100',
    },
    success: {
      text: 'koast-ui-text-green-600 koast-ui-hover:bg-green-50 koast-ui-active:bg-green-100',
      contained: 'koast-ui-bg-green-600 koast-ui-text-white koast-ui-hover:bg-green-700 koast-ui-active:bg-green-800',
      outlined: 'koast-ui-text-green-600 koast-ui-border koast-ui-border-green-600 koast-ui-hover:bg-green-50 koast-ui-active:bg-green-100',
    },
    error: {
      text: 'koast-ui-text-red-600 koast-ui-hover:bg-red-50 koast-ui-active:bg-red-100',
      contained: 'koast-ui-bg-red-600 koast-ui-text-white koast-ui-hover:bg-red-700 koast-ui-active:bg-red-800',
      outlined: 'koast-ui-text-red-600 koast-ui-border koast-ui-border-red-600 koast-ui-hover:bg-red-50 koast-ui-active:bg-red-100',
    },
    warning: {
      text: 'koast-ui-text-amber-600 koast-ui-hover:bg-amber-50 koast-ui-active:bg-amber-100',
      contained: 'koast-ui-bg-amber-600 koast-ui-text-white koast-ui-hover:bg-amber-700 koast-ui-active:bg-amber-800',
      outlined: 'koast-ui-text-amber-600 koast-ui-border koast-ui-border-amber-600 koast-ui-hover:bg-amber-50 koast-ui-active:bg-amber-100',
    },
    info: {
      text: 'koast-ui-text-sky-600 koast-ui-hover:bg-sky-50 koast-ui-active:bg-sky-100',
      contained: 'koast-ui-bg-sky-600 koast-ui-text-white koast-ui-hover:bg-sky-700 koast-ui-active:bg-sky-800',
      outlined: 'koast-ui-text-sky-600 koast-ui-border koast-ui-border-sky-600 koast-ui-hover:bg-sky-50 koast-ui-active:bg-sky-100',
    },
    gray: {
      text: 'koast-ui-text-gray-600 koast-ui-hover:bg-gray-50 koast-ui-active:bg-gray-100',
      contained: 'koast-ui-bg-gray-600 koast-ui-text-white koast-ui-hover:bg-gray-700 koast-ui-active:bg-gray-800',
      outlined: 'koast-ui-text-gray-600 koast-ui-border koast-ui-border-gray-600 koast-ui-hover:bg-gray-50 koast-ui-active:bg-gray-100',
    },
  };

  return colorMap[color][variant];
};

/**
 * 로딩 인디케이터 컴포넌트를 반환합니다.
 */
export const getLoadingIndicator = (loading: boolean) => {
  if (!loading) return null;

  return (
    <span className={'koast-ui-absolute koast-ui-inset-0 koast-ui-flex koast-ui-items-center koast-ui-justify-center'}>
      <svg className={'koast-ui-size-5 koast-ui-animate-spin'} viewBox={'0 0 24 24'}>
        <circle
          className={'koast-ui-opacity-25'}
          cx={'12'}
          cy={'12'}
          r={'10'}
          stroke={'currentColor'}
          strokeWidth={'4'}
          fill={'transparent'}
        />
        <path
          className={'koast-ui-opacity-75'}
          fill={'currentColor'}
          d={'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'}
        />
      </svg>
    </span>
  );
};