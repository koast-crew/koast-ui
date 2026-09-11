import { twMerge } from '../../utils/twMerge';
import {
  BORDER_WIDTHS,
  getButtonStyles,
  normalizeColor,
  normalizeSize,
} from '../Button/Button.styles';
import type {
  IconButtonColor,
  IconButtonColorProp,
  IconButtonSize,
  IconButtonSizeProp,
  IconButtonVariant,
} from './IconButton.types';

/**
 * Figma 실측 기하값입니다. 정사각형 28 / 32 / 40, radius 4 / 8 / 8, 아이콘 16 / 16 / 24.
 * 색·상태·포커스는 전부 Button 에서 가져오고 여기서는 기하만 덮어씁니다.
 * Button 의 `[&_[data-koast-spinner]]:koast-size-4` 는 md 에서 아이콘보다 작아지므로 함께 맞춥니다.
 */
const SIZES: Record<IconButtonSize, string> = {
  xs: 'koast-size-7 koast-rounded koast-p-1 [&_svg]:koast-size-4 [&_[data-koast-spinner]]:koast-size-4',
  sm: 'koast-size-8 koast-rounded-lg koast-p-2 [&_svg]:koast-size-4 [&_[data-koast-spinner]]:koast-size-4',
  md: 'koast-size-10 koast-rounded-lg koast-p-2 [&_svg]:koast-size-6 [&_[data-koast-spinner]]:koast-size-6',
};

/** Button 과 같은 규칙입니다. 28px 높이에서 2px 테두리가 여백을 잠식해 xs 만 1px 입니다. */

/**
 * Selected 축입니다. Figma 는 Filled 에만 정의했고 primary 는 면을, secondary 는 테두리를 바꿉니다.
 * danger 는 Figma 에 없어 primary 와 같은 "연한 면 + intent 색 아이콘" 패턴으로 파생했습니다.
 */
const SELECTED: Record<IconButtonColor, string> = {
  primary: 'koast-bg-interactive-selected koast-text-interactive-selected',
  secondary: 'koast-border-interactive-secondary',
  danger: 'koast-bg-danger-subtle koast-text-danger',
};

/**
 * Figma 의 Focus ring 은 버튼보다 4px 큰 사각형이므로(40→44, 32→36) 간격 없이 2px 링입니다.
 * Button 은 offset 2 를 쓰지만 Modal / Alert / Toast 의 닫기 버튼도 offset 없이 그리므로 그쪽에 맞춥니다.
 */
const FOCUS_RING_OFFSET = 'focus-visible:koast-ring-offset-0';

const getSelectedStyles = (color: IconButtonColor, size: IconButtonSize) =>
  color === 'secondary'
    ? `${ BORDER_WIDTHS[size] } ${ SELECTED[color] }`
    : SELECTED[color];

/**
 * 아이콘 버튼의 최종 클래스명을 계산합니다.
 * 색 테이블이 두 벌로 갈라지지 않도록 `getButtonStyles` 의 결과 위에 기하값만 덮어씁니다.
 */
export const getIconButtonStyles = (
  variant: IconButtonVariant,
  color: IconButtonColorProp,
  size: IconButtonSizeProp,
  disabled: boolean,
  loading: boolean,
  selected: boolean,
  className: string,
) => {
  const normalizedColor = normalizeColor(color);
  const normalizedSize = normalizeSize(size);

  return twMerge(
    getButtonStyles(variant, color, size, disabled, loading, false, false, ''),
    SIZES[normalizedSize],
    disabled ? '' : FOCUS_RING_OFFSET,
    selected && !disabled
      ? getSelectedStyles(normalizedColor, normalizedSize)
      : '',
    className,
  );
};

/** 아이콘은 장식이며 이름은 버튼의 `aria-label` 이 담당합니다. */
export const ICON_WRAPPER = 'koast-inline-flex koast-shrink-0';
