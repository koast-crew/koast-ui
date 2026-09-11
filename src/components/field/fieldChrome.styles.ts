import { twMerge } from '../../utils/twMerge';

/** Figma 의 필드 타이포입니다. 라벨·입력값·보조 문구가 모두 w500 16/20 을 씁니다. */
export const FIELD_TEXT = 'koast-text-base koast-font-medium koast-leading-5';

/** Figma 의 입력 상자 공통 크롬입니다. r8 + 1.5px 테두리. 두께만 주면 선이 안 그려져 solid 를 같이 씁니다. */
export const FIELD_BOX
  = 'koast-w-full koast-rounded-lg koast-border-[1.5px] koast-border-solid koast-transition-colors koast-duration-200';

/** preflight 가 꺼져 있어 input 의 브라우저 기본 테두리·배경·여백을 직접 지웁니다. */
export const FIELD_CONTROL_RESET
  = 'koast-m-0 koast-w-full koast-min-w-0 koast-border-none koast-bg-transparent koast-p-0 koast-outline-none';

/**
 * Select 의 드롭다운과 같은 스크롤바 처리입니다. 트랙 8px, 썸은 pill 입니다.
 * scrollbar-width 를 함께 쓰면 Chrome 이 ::-webkit-scrollbar 를 무시하므로 쓰지 않습니다.
 */
export const FIELD_SCROLLBAR
  = '[&::-webkit-scrollbar]:koast-w-2 [&::-webkit-scrollbar-button]:koast-hidden [&::-webkit-scrollbar-track]:koast-rounded-full [&::-webkit-scrollbar-track]:koast-bg-tertiary [&::-webkit-scrollbar-thumb]:koast-rounded-full [&::-webkit-scrollbar-thumb]:koast-bg-[rgb(var(--koast-content-secondary))]';

/**
 * 포커스 링입니다. Button·Accordion 과 같은 ring-2 + offset-2 이며 링 색만 intent 를 따릅니다.
 * 상자가 div 라 focus-visible 변형을 못 쓰고 input 의 포커스 상태를 받아 정적으로 붙입니다.
 */
export const getFieldFocusRing = (error: boolean) =>
  twMerge(
    'koast-ring-2 koast-ring-offset-2',
    error ? 'koast-ring-interactive-danger' : 'koast-ring-focus-ring',
  );

/** 상자의 배경·테두리 색입니다. error > focused > 기본(hover/active) 순으로 우선합니다. */
export const getFieldBoxColors = (
  disabled: boolean,
  error: boolean,
  focused: boolean,
) => {
  if (disabled) {
    return 'koast-cursor-not-allowed koast-border-interactive-secondary koast-bg-disabled';
  }

  const border = error
    ? 'koast-border-interactive-danger'
    : focused
      ? 'koast-border-interactive-primary'
      : 'koast-border-interactive-secondary hover:koast-border-interactive-primary-hovered active:koast-border-interactive-primary-pressed';

  return twMerge('koast-bg-primary', border, focused ? getFieldFocusRing(error) : '');
};

/** 입력값은 본문 색, placeholder 는 한 단계 연한 색입니다. Select 트리거의 규칙과 같습니다. */
export const getFieldControlColors = (disabled: boolean) =>
  disabled
    ? 'koast-cursor-not-allowed koast-text-disabled placeholder:koast-text-disabled'
    : 'koast-text-primary placeholder:koast-text-tertiary';

/** 라벨입니다. Figma 는 라벨과 상자 사이 간격을 12px 로 둡니다. */
export const getFieldLabelStyles = (disabled: boolean, className: string) =>
  twMerge(
    'koast-mb-3 koast-block',
    disabled ? 'koast-text-disabled' : 'koast-text-primary',
    FIELD_TEXT,
    className,
  );

/** 보조 문구입니다. Figma 는 상자와의 간격 8px, 오류 아이콘과의 간격 4px 입니다. */
export const getFieldHelpTextStyles = (error: boolean) =>
  twMerge(
    // preflight 가 꺼져 있어 p 의 브라우저 기본 여백을 직접 지웁니다.
    'koast-mb-0 koast-mt-2 koast-flex koast-items-center koast-gap-1',
    FIELD_TEXT,
    error ? 'koast-text-danger' : 'koast-text-tertiary',
  );

/** 상자 안쪽 아이콘 자리입니다. Figma 의 아이콘은 24x24 입니다. */
export const getFieldIconStyles = (disabled: boolean) =>
  twMerge(
    'koast-flex koast-size-6 koast-shrink-0 koast-items-center koast-justify-center [&_svg]:koast-size-6',
    disabled ? 'koast-text-disabled' : 'koast-text-tertiary',
  );
