import { SelectSize, SelectVariant } from './Select.types';

/**
 * Select 크기에 따른 스타일을 반환합니다.
 */
export const getSizeStyles = (size: SelectSize): string => {
  switch (size) {
    case 'sm':
      return 'koast-text-sm koast-py-1 koast-px-2';
    case 'lg':
      return 'koast-text-lg koast-py-3 koast-px-4';
    case 'md':
    default:
      return 'koast-text-base koast-py-2 koast-px-3';
  }
};

/**
 * Select 변형에 따른 스타일을 반환합니다.
 */
export const getVariantStyles = (variant: SelectVariant): string => {
  switch (variant) {
    case 'underlined':
      return 'koast-border-b koast-border-gray-300 koast-rounded-none koast-px-0';
    case 'text':
      return 'koast-bg-transparent koast-border-none koast-px-0';
    case 'outlined':
    default:
      return 'koast-bg-white koast-border koast-border-gray-300';
  }
};

/**
 * Select 에러 상태에 따른 스타일을 반환합니다.
 */
export const getErrorStyles = (error: boolean): string => {
  return error ? '!koast-border-red-500' : '';
};
