import { twMerge } from '../../utils/twMerge';

/**
 * 범례 컨테이너의 기본 스타일을 반환합니다.
 */
export const getLegendContainerStyles = (className: string = '') => {
  const baseStyle
    = 'koast-z-10 koast-mb-9 koast-flex koast-h-auto koast-w-auto koast-flex-col koast-justify-center koast-rounded-lg koast-px-3 koast-py-2 koast-shadow-lg';
  return twMerge(baseStyle, className);
};

/**
 * 범례 버튼의 스타일을 반환합니다.
 */
export const getLegendButtonStyles = (isSelected: boolean) => {
  return twMerge(
    'koast-flex koast-items-center koast-gap-1 koast-rounded-full koast-px-3 koast-py-1',
    isSelected
      ? 'koast-bg-orange-500 koast-text-white'
      : 'koast-bg-gray-200 koast-text-gray-700',
  );
};

/**
 * 범례 색상 항목의 스타일을 반환합니다.
 */
export const getLegendColorItemStyles = (isFirst: boolean, isLast: boolean) => {
  return twMerge(
    'koast-h-4 koast-w-full',
    isFirst && 'koast-rounded-l-full',
    isLast && 'koast-rounded-r-full',
  );
};
