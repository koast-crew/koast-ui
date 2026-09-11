import { twMerge } from '../../utils/twMerge';

/**
 * Figma `Part/Switch` 는 40x24 트랙 · pill · 안쪽 여백 4px · 손잡이 16x16 입니다.
 * border-box 라 1px 테두리가 여백을 잠식하므로 padding 을 3px 로 두어 바깥 가장자리에서 4px 이 되게 맞춥니다.
 * 손잡이 색은 트랙이 정한 currentColor 를 따라가므로 트랙에 반전색을 답니다.
 */
const TRACK_BASE
  = 'koast-flex koast-h-6 koast-w-10 koast-shrink-0 koast-items-center koast-rounded-full koast-border koast-border-solid koast-p-[3px] koast-text-interactive-inverse koast-transition-colors koast-duration-200';

/** Figma 의 Focus ring 은 트랙 바깥 2px 지점(44x28)에 그려집니다. offset 없는 ring-2 가 그 위치입니다. */
const FOCUS_RING
  = 'peer-focus-visible:koast-ring-2 peer-focus-visible:koast-ring-focus-ring';

const CHECKED = {
  base: 'koast-border-transparent koast-bg-interactive-primary',
  interaction:
    'group-hover:koast-bg-interactive-primary-hovered group-active:koast-bg-interactive-primary-pressed',
  disabled: 'koast-border-transparent koast-bg-disabled',
};

const UNCHECKED = {
  base: 'koast-border-interactive-secondary koast-bg-secondary',
  interaction:
    'group-hover:koast-border-interactive-secondary-hovered group-hover:koast-bg-interactive-secondary-hovered group-active:koast-border-interactive-secondary-pressed group-active:koast-bg-interactive-secondary-pressed',
  disabled: 'koast-border-disabled koast-bg-disabled',
};

export const getSwitchTrackStyles = (checked: boolean, disabled: boolean) => {
  const state = checked ? CHECKED : UNCHECKED;

  return twMerge(
    TRACK_BASE,
    disabled ? state.disabled : `${ state.base } ${ state.interaction }`,
    disabled ? '' : FOCUS_RING,
  );
};

const INDICATOR_BASE
  = 'koast-flex koast-size-4 koast-shrink-0 koast-items-center koast-justify-center koast-rounded-full koast-bg-current koast-transition-transform koast-duration-200';

/** Figma 는 꺼짐 상태에서만 손잡이에 그림자를 겁니다. 켜짐·비활성에는 없습니다. */
const INDICATOR_SHADOW
  = 'koast-shadow-[0_0_4px_var(--koast-shadow-core),0_4px_8px_var(--koast-shadow-cast)]';

export const getSwitchIndicatorStyles = (checked: boolean, disabled: boolean) =>
  twMerge(
    INDICATOR_BASE,
    // 트랙 안쪽 폭 32px 에서 손잡이 16px 을 빼면 이동 거리는 정확히 16px 입니다.
    checked ? 'koast-translate-x-4' : 'koast-translate-x-0',
    !checked && !disabled ? INDICATOR_SHADOW : '',
  );

/** 손잡이 안 아이콘입니다. 켜짐에서는 트랙 색, 꺼짐에서는 회색 계열을 씁니다. */
export const getSwitchIconStyles = (checked: boolean, disabled: boolean) => {
  if (disabled) return 'koast-size-4 koast-shrink-0 koast-text-disabled';

  return twMerge(
    'koast-size-4 koast-shrink-0',
    checked
      ? 'koast-text-interactive-primary group-hover:koast-text-interactive-primary-hovered group-active:koast-text-interactive-primary-pressed'
      : 'koast-text-tertiary group-hover:koast-text-secondary group-active:koast-text-secondary',
  );
};
