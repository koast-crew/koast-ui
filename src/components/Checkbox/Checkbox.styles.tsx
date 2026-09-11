import { twMerge } from '../../utils/twMerge';
import type { CheckboxChecked } from './Checkbox.types';

/**
 * Figma `Part/Check` 는 16x16 · radius 4 · 1px 테두리입니다.
 * preflight 가 꺼져 있어 border-width 만으로는 선이 안 그려지므로 border-solid 를 함께 붙입니다.
 */
const BOX_BASE
  = 'koast-flex koast-size-4 koast-shrink-0 koast-items-center koast-justify-center koast-rounded koast-border koast-border-solid koast-transition-colors koast-duration-200';

/** Figma 의 Focus ring 은 16px 상자 바깥 2px 지점(20x20)에 그려집니다. offset 없는 ring-2 가 그 위치입니다. */
const FOCUS_RING
  = 'peer-focus-visible:koast-ring-2 peer-focus-visible:koast-ring-focus-ring';

/** Checked / Partial 은 면이 채워지고 테두리가 사라집니다. 투명 테두리로 16px 상자 크기를 유지합니다. */
const CHECKED = {
  base: 'koast-border-transparent koast-bg-interactive-primary',
  interaction:
    'group-hover:koast-bg-interactive-primary-hovered group-active:koast-bg-interactive-primary-pressed',
  disabled: 'koast-border-transparent koast-bg-disabled',
};

/** Unchecked 는 흰 면에 테두리만 있고, 상호작용에서 테두리 색만 진해집니다. */
const UNCHECKED = {
  base: 'koast-border-interactive-secondary koast-bg-primary',
  interaction:
    'group-hover:koast-border-interactive-secondary-hovered group-active:koast-border-interactive-secondary-pressed',
  disabled: 'koast-border-disabled koast-bg-disabled',
};

export const getCheckboxBoxStyles = (
  checked: CheckboxChecked,
  disabled: boolean,
) => {
  const state = checked === false ? UNCHECKED : CHECKED;

  return twMerge(
    BOX_BASE,
    disabled ? state.disabled : `${ state.base } ${ state.interaction }`,
    disabled ? '' : FOCUS_RING,
  );
};

/** 체크·마이너스 표시입니다. 채워진 면 위라 반전색을 쓰고, 비활성에서는 회색 면 위 회색 글리프가 됩니다. */
export const getCheckboxMarkStyles = (disabled: boolean) =>
  twMerge(
    'koast-size-4 koast-shrink-0',
    disabled ? 'koast-text-disabled' : 'koast-text-interactive-inverse',
  );
