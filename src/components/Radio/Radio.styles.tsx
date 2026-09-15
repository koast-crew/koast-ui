import { twMerge } from '../../utils/twMerge';

/**
 * Figma `Part/Radio` 는 16x16 원 · 1px 테두리입니다.
 * preflight 가 꺼져 있어 border-width 만으로는 선이 안 그려지므로 border-solid 를 함께 붙입니다.
 */
const CIRCLE_BASE
  = 'koast-flex koast-size-4 koast-shrink-0 koast-items-center koast-justify-center koast-rounded-full koast-border koast-border-solid koast-transition-colors koast-duration-200';

/** Figma 는 원에 붙은 20x20 이지만, Button 과 맞춰 2px 띄웁니다(24x24). */
const FOCUS_RING
  = 'peer-focus-visible:koast-outline peer-focus-visible:koast-outline-2 peer-focus-visible:koast-outline-offset-2 peer-focus-visible:koast-outline-focus-ring';

/** Checked 는 면이 채워지고 테두리가 사라집니다. 투명 테두리로 16px 크기를 유지합니다. */
const CHECKED = {
  base: 'koast-border-transparent koast-bg-interactive-primary koast-text-interactive-inverse',
  interaction:
    'group-hover:koast-bg-interactive-primary-hovered group-active:koast-bg-interactive-primary-pressed',
  disabled:
    'koast-border-transparent koast-bg-disabled koast-text-interactive-inverse',
};

/** Unchecked 는 체크박스와 달리 hover / pressed 에서 면 색까지 한 단계씩 진해집니다. */
const UNCHECKED = {
  base: 'koast-border-interactive-secondary koast-bg-primary',
  interaction:
    'group-hover:koast-border-interactive-secondary-hovered group-hover:koast-bg-interactive-secondary-hovered group-active:koast-border-interactive-secondary-pressed group-active:koast-bg-interactive-secondary-pressed',
  disabled: 'koast-border-disabled koast-bg-disabled',
};

export const getRadioCircleStyles = (checked: boolean, disabled: boolean) => {
  const state = checked ? CHECKED : UNCHECKED;

  return twMerge(
    CIRCLE_BASE,
    disabled ? state.disabled : `${ state.base } ${ state.interaction }`,
    disabled ? '' : FOCUS_RING,
  );
};

/** 안쪽 점은 8x8 입니다. 색은 바깥 원이 정한 currentColor 를 따라갑니다. */
export const DOT = 'koast-size-2 koast-shrink-0 koast-rounded-full koast-bg-current';
