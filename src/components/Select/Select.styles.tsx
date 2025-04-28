import { SelectSize, SelectVariant } from './Select.types';

/**
 * Select 크기에 따른 스타일을 반환합니다.
 */
export const getSizeStyles = (size: SelectSize): string => {
  switch (size) {
    case 'sm':
      return 'text-sm py-1 px-2';
    case 'lg':
      return 'text-lg py-3 px-4';
    case 'md':
    default:
      return 'text-base py-2 px-3';
  }
};

/**
 * Select 변형에 따른 스타일을 반환합니다.
 */
export const getVariantStyles = (variant: SelectVariant): string => {
  switch (variant) {
    case 'underlined':
      return 'border-b border-gray-300 rounded-none px-0';
    case 'text':
      return 'bg-transparent border-none px-0';
    case 'outlined':
    default:
      return 'bg-white border border-gray-300';
  }
};

/**
 * Select 에러 상태에 따른 스타일을 반환합니다.
 */
export const getErrorStyles = (error: boolean): string => {
  return error ? '!border-red-500' : '';
};

/**
 * Select 너비에 따른 스타일을 반환합니다.
 */
export const getWidthStyles = (fullWidth: boolean): string => {
  return fullWidth ? 'w-full' : '';
};