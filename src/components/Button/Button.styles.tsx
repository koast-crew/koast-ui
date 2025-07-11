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
  const baseStyle = 'font-semibold transition-all duration-200 rounded focus:outline-none inline-flex items-center justify-center';

  // 크기별 스타일
  const sizes: Record<ButtonSize, string> = {
    xs: 'text-xs px-2 py-1 gap-1',
    sm: 'text-sm px-3 py-1.5 gap-1.5',
    md: 'text-base px-4 py-2 gap-2',
    lg: 'text-lg px-5 py-2.5 gap-2',
    xl: 'text-xl px-6 py-3 gap-2.5',
  };

  // 색상 스타일
  const colorStyle = getColorStyles(variant, color);

  // 비활성화 스타일
  const disabledStyle = disabled || loading ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

  // 로딩 스타일
  const loadingStyle = loading ? 'relative' : '';

  // 그림자 효과 추가
  const elevationStyle = variant === 'contained' && shadow ? 'shadow-lg' : '';

  // 너비 스타일
  const widthStyle = fullWidth ? 'w-full' : '';

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
      text: 'text-blue-600 hover:bg-blue-50 active:bg-blue-100',
      contained: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
      outlined: 'text-blue-600 border border-blue-600 hover:bg-blue-50 active:bg-blue-100',
    },
    secondary: {
      text: 'text-purple-600 hover:bg-purple-50 active:bg-purple-100',
      contained: 'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800',
      outlined: 'text-purple-600 border border-purple-600 hover:bg-purple-50 active:bg-purple-100',
    },
    success: {
      text: 'text-green-600 hover:bg-green-50 active:bg-green-100',
      contained: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800',
      outlined: 'text-green-600 border border-green-600 hover:bg-green-50 active:bg-green-100',
    },
    error: {
      text: 'text-red-600 hover:bg-red-50 active:bg-red-100',
      contained: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
      outlined: 'text-red-600 border border-red-600 hover:bg-red-50 active:bg-red-100',
    },
    warning: {
      text: 'text-amber-600 hover:bg-amber-50 active:bg-amber-100',
      contained: 'bg-amber-600 text-white hover:bg-amber-700 active:bg-amber-800',
      outlined: 'text-amber-600 border border-amber-600 hover:bg-amber-50 active:bg-amber-100',
    },
    info: {
      text: 'text-sky-600 hover:bg-sky-50 active:bg-sky-100',
      contained: 'bg-sky-600 text-white hover:bg-sky-700 active:bg-sky-800',
      outlined: 'text-sky-600 border border-sky-600 hover:bg-sky-50 active:bg-sky-100',
    },
    gray: {
      text: 'text-gray-600 hover:bg-gray-50 active:bg-gray-100',
      contained: 'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800',
      outlined: 'text-gray-600 border border-gray-600 hover:bg-gray-50 active:bg-gray-100',
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