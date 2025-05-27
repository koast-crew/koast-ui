import React from 'react';
import { ButtonColor, ButtonSize, ButtonVariant } from './Button.types';
import { buttonRecipe, loadingSpinner, spinnerIcon } from './Button.styles.css';

/**
 * 버튼 스타일을 반환하는 함수
 */
export const getButtonStyles = (
  variant: ButtonVariant,
  color: ButtonColor,
  size: ButtonSize,
  disabled: boolean,
  loading: boolean,
  fullWidth: boolean,
  shadow: boolean,
  className?: string,
) => {
  // 미리 정의된 색상들
  const predefinedColors = ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'gray'];
  const colorKey = predefinedColors.includes(color) ? color : 'primary';

  const recipeClass = buttonRecipe({
    variant,
    color: colorKey as 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'gray',
    size,
    disabled: disabled || loading,
    loading,
    fullWidth,
    shadow: shadow && variant === 'contained',
  });

  return className ? `${ recipeClass } ${ className }` : recipeClass;
};

/**
 * 로딩 인디케이터 컴포넌트
 */
export const getLoadingIndicator = (loading: boolean) => {
  if (!loading) return null;

  return (
    <span className={loadingSpinner}>
      <svg className={spinnerIcon} viewBox={'0 0 24 24'}>
        <circle
          cx={'12'}
          cy={'12'}
          r={'10'}
          stroke={'currentColor'}
          strokeWidth={'4'}
          fill={'transparent'}
          opacity={'0.25'}
        />
        <path
          fill={'currentColor'}
          opacity={'0.75'}
          d={'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'}
        />
      </svg>
    </span>
  );
};