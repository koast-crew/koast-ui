import clsx from 'clsx';

/**
 * 범례 컨테이너의 기본 스타일을 반환합니다.
 */
export const getLegendContainerStyles = (className: string = '') => {
  const baseStyle = 'z-10 mb-9 flex h-auto w-auto flex-col justify-center rounded-lg px-3 py-2 shadow-lg';
  return clsx(baseStyle, className);
};

/**
 * 범례 버튼의 스타일을 반환합니다.
 */
export const getLegendButtonStyles = (isSelected: boolean) => {
  return clsx(
    'flex items-center gap-1 rounded-full px-3 py-1',
    isSelected ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700',
  );
};

/**
 * 범례 색상 항목의 스타일을 반환합니다.
 */
export const getLegendColorItemStyles = (isFirst: boolean, isLast: boolean) => {
  return clsx(
    'h-4 w-full',
    isFirst && 'rounded-l-full',
    isLast && 'rounded-r-full',
  );
};
