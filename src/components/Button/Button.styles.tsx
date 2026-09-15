import { twMerge } from '../../utils/twMerge';
import type {
  ButtonColor,
  ButtonColorProp,
  ButtonSize,
  ButtonSizeProp,
  ButtonVariant,
} from './Button.types';

/** 제거된 intent 를 현재 값으로 정규화합니다. 타입 밖에서 들어온 값은 'primary' 로 떨어집니다. */
const COLOR_ALIASES: Record<string, ButtonColor> = {
  error: 'danger',
  gray: 'secondary',
  neutral: 'secondary',
};

const KNOWN_COLORS: readonly ButtonColor[] = ['primary', 'secondary', 'danger'];

export const normalizeColor = (color: ButtonColorProp): ButtonColor => {
  const aliased = COLOR_ALIASES[color] ?? color;
  return KNOWN_COLORS.includes(aliased as ButtonColor)
    ? (aliased as ButtonColor)
    : 'primary';
};

/** danger 는 디자인 시스템에 filled 만 있어, outlined / text 로 들어와도 contained 로 떨어집니다. */
export const normalizeVariant = (
  variant: ButtonVariant,
  color: ButtonColor,
): ButtonVariant => (color === 'danger' ? 'contained' : variant);

const KNOWN_SIZES: readonly ButtonSize[] = ['xs', 'sm', 'md'];

/** 디자인 시스템에 없는 lg / xl 은 md 로 떨어집니다. */
export const normalizeSize = (size: ButtonSizeProp): ButtonSize =>
  KNOWN_SIZES.includes(size as ButtonSize) ? (size as ButtonSize) : 'md';

/**
 * 높이는 디자인 시스템이 고정값으로 정의합니다(28 / 40 / 48).
 * 세로 padding 이 아니라 높이 + 수직 중앙 정렬로 맞춥니다.
 * 아이콘 크기도 size 에 종속됩니다(16 / 16 / 24).
 */
const SIZES: Record<ButtonSize, string> = {
  xs: 'koast-h-7 koast-px-2 koast-gap-2 koast-rounded koast-text-xs koast-leading-4 [&_svg]:koast-size-4',
  sm: 'koast-h-10 koast-px-4 koast-gap-2 koast-rounded-lg koast-text-xs koast-leading-4 [&_svg]:koast-size-4',
  md: 'koast-h-12 koast-px-6 koast-gap-2 koast-rounded-lg koast-text-sm koast-leading-4 [&_svg]:koast-size-6',
};

/**
 * outlined 의 테두리입니다. xs 만 1px 이고, 색은 `koast-shadow-*` 가 정합니다.
 * border 대신 inset box-shadow 라 contained 와 바깥 너비가 같습니다(ring 은 포커스 링이 씁니다).
 */
export const OUTLINE_WIDTHS: Record<ButtonSize, string> = {
  xs: 'koast-shadow-[inset_0_0_0_1px]',
  sm: 'koast-shadow-[inset_0_0_0_2px]',
  md: 'koast-shadow-[inset_0_0_0_2px]',
};

/**
 * intent × variant 의 기본 면 색입니다. hover / active 가 없는 정지 상태이며,
 * 디자인 시스템의 Loading 도 이 색을 그대로 씁니다.
 */
const COLOR_BASE: Record<ButtonColor, Partial<Record<ButtonVariant, string>>> = {
  primary: {
    contained: 'koast-bg-interactive-primary koast-text-interactive-inverse',
    outlined:
      'koast-shadow-interactive-primary koast-text-interactive-primary',
    text: 'koast-text-interactive-primary',
  },
  secondary: {
    contained:
      'koast-bg-interactive-secondary koast-text-interactive-secondary',
    outlined:
      'koast-shadow-interactive-secondary koast-text-interactive-secondary',
    text: 'koast-text-interactive-secondary',
  },
  danger: {
    contained: 'koast-bg-interactive-danger koast-text-interactive-inverse',
  },
};

/**
 * 포인터 상호작용 색입니다. Loading 중에는 붙이지 않습니다.
 * 세 variant 모두 hover / active 에서 라벨이 한 단계씩 진해집니다.
 */
const COLOR_INTERACTION: Record<ButtonColor, Partial<Record<ButtonVariant, string>>> = {
  primary: {
    contained:
      'hover:koast-bg-interactive-primary-hovered active:koast-bg-interactive-primary-pressed',
    outlined:
      'hover:koast-bg-interactive-selected-hovered hover:koast-shadow-interactive-primary-hovered hover:koast-text-interactive-primary-hovered active:koast-bg-interactive-selected-pressed active:koast-shadow-interactive-primary-pressed active:koast-text-interactive-primary-pressed',
    text: 'hover:koast-bg-interactive-selected-hovered hover:koast-text-interactive-primary-hovered active:koast-bg-interactive-selected-pressed active:koast-text-interactive-primary-pressed',
  },
  secondary: {
    contained:
      'hover:koast-bg-interactive-secondary-hovered hover:koast-text-interactive-secondary-hovered active:koast-bg-interactive-secondary-pressed active:koast-text-interactive-secondary-pressed',
    outlined:
      'hover:koast-bg-interactive-secondary-hovered hover:koast-shadow-interactive-secondary-hovered hover:koast-text-interactive-secondary-hovered active:koast-bg-interactive-secondary-pressed active:koast-shadow-interactive-secondary-pressed active:koast-text-interactive-secondary-pressed',
    text: 'hover:koast-bg-interactive-secondary-hovered hover:koast-text-interactive-secondary-hovered active:koast-bg-interactive-secondary-pressed active:koast-text-interactive-secondary-pressed',
  },
  danger: {
    contained:
      'hover:koast-bg-interactive-danger-hovered active:koast-bg-interactive-danger-pressed',
  },
};

/**
 * 비활성 상태입니다. 디자인 시스템은 variant 와 무관하게 같은 회색 면을 씁니다.
 * transparent 변형도 배경이 채워집니다.
 */
const DISABLED: Record<ButtonVariant, string> = {
  contained: 'koast-bg-disabled koast-text-disabled',
  outlined: 'koast-shadow-disabled koast-bg-disabled koast-text-disabled',
  text: 'koast-bg-disabled koast-text-disabled',
};

/**
 * 포커스 링입니다. 디자인 시스템의 Focused 변형은 버튼 밖 2px 지점에 2px 링을 그리므로
 * outline-2 + outline-offset-2 로 대응합니다. 링 색은 intent 를 따라 danger 만 빨간색입니다.
 */
const FOCUS_RING
  = 'focus-visible:koast-outline focus-visible:koast-outline-2 focus-visible:koast-outline-offset-2 focus-visible:koast-outline-focus-ring';

const FOCUS_RING_COLORS: Record<ButtonColor, string> = {
  primary: 'focus-visible:koast-outline-focus-ring',
  secondary: 'focus-visible:koast-outline-focus-ring',
  danger: 'focus-visible:koast-outline-interactive-danger',
};

/**
 * 스피너는 아이콘이 아니라서 size 별 아이콘 규칙(md 는 24px)을 따르지 않고 항상 16px 입니다.
 * `[&_svg]` 보다 명시도가 높아야 md 에서 덮어쓸 수 있어 속성 선택자를 씁니다.
 */
const SPINNER_SIZE = '[&_[data-koast-spinner]]:koast-size-4';

/** 버튼의 최종 클래스명을 계산합니다. */
export const getButtonStyles = (
  variant: ButtonVariant,
  color: ButtonColorProp,
  size: ButtonSizeProp,
  disabled: boolean,
  loading: boolean,
  fullWidth: boolean,
  shadow: boolean,
  className: string,
) => {
  const normalizedColor = normalizeColor(color);
  const normalizedSize = normalizeSize(size);
  const normalizedVariant = normalizeVariant(variant, normalizedColor);

  return twMerge(
    'koast-inline-flex koast-items-center koast-justify-center koast-font-semibold koast-transition-[color,background-color,box-shadow] koast-duration-200',
    SPINNER_SIZE,
    SIZES[normalizedSize],
    normalizedVariant === 'outlined' ? OUTLINE_WIDTHS[normalizedSize] : '',
    disabled
      ? DISABLED[normalizedVariant]
      : COLOR_BASE[normalizedColor][normalizedVariant] ?? '',
    // Loading 은 면 색을 유지합니다. 포인터가 올라가도 Default 그대로여야 하므로 hover/active 를 붙이지 않습니다.
    disabled || loading
      ? ''
      : COLOR_INTERACTION[normalizedColor][normalizedVariant] ?? '',
    // pointer-events-none 을 쓰면 커서가 적용되지 않습니다. 클릭 차단은 네이티브 disabled 가 합니다.
    disabled ? 'koast-cursor-not-allowed' : '',
    loading && !disabled ? 'koast-cursor-wait' : '',
    disabled ? '' : `${ FOCUS_RING } ${ FOCUS_RING_COLORS[normalizedColor] }`,
    normalizedVariant === 'contained' && shadow && !disabled && !loading
      ? 'koast-shadow-lg koast-shadow-cast'
      : '',
    fullWidth ? 'koast-w-full' : '',
    className,
  );
};

/**
 * 로딩 인디케이터입니다. 디자인 시스템에서 스피너는 리딩 아이콘 자리를 대신 차지하고
 * 라벨은 그대로 옆에 남습니다. 색은 버튼의 현재 텍스트 색을 따릅니다.
 */
export const getLoadingIndicator = () => (
  <svg
    data-koast-spinner={''}
    className={'koast-shrink-0 koast-animate-spin'}
    viewBox={'0 0 24 24'}
    aria-hidden={'true'}
  >
    <circle
      className={'koast-opacity-25'}
      cx={'12'}
      cy={'12'}
      r={'10'}
      stroke={'currentColor'}
      strokeWidth={'4'}
      fill={'transparent'}
    />
    <path
      className={'koast-opacity-75'}
      fill={'currentColor'}
      d={
        'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      }
    />
  </svg>
);
