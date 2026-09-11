import { twMerge } from '../../utils/twMerge';
import type { LinkColor, LinkVariant } from './Link.types';

/**
 * 높이 26px, 좌우 padding 4px, 상하 padding 2px, 항목 간격 8px, radius 4px 는 디자인 시스템 고정값입니다.
 * preflight 가 꺼져 있어 `<a>` 에 브라우저 기본 밑줄이 그대로 살아 있으므로
 * standalone 에서는 `no-underline` 으로 직접 지웁니다.
 */
const LINK_BASE
  = 'koast-inline-flex koast-h-[26px] koast-items-center koast-gap-2 koast-rounded koast-px-1 koast-py-0.5 koast-text-base koast-font-medium koast-leading-5 koast-transition-all koast-duration-200';

/** Figma 의 Style 축입니다. Underline 은 밑줄이 라벨에 붙습니다. */
const VARIANTS: Record<LinkVariant, string> = {
  standalone: 'koast-no-underline',
  underline: 'koast-underline koast-underline-offset-2',
};

/**
 * 정지 상태의 색입니다. Button 의 transparent 변형과 같은 램프를 씁니다.
 * `visited:` 는 브라우저가 방문 기록으로 판단할 때만 적용되며, hover / active 보다 먼저 선언되어 덮입니다.
 */
const COLOR_BASE: Record<LinkColor, string> = {
  primary:
    'koast-text-interactive-primary visited:koast-text-interactive-visited',
  secondary:
    'koast-text-interactive-secondary visited:koast-text-interactive-visited',
};

/** 포인터 상호작용 색입니다. 두 intent 모두 면이 회색으로 채워지고 라벨이 한 단계 진해집니다. */
const COLOR_INTERACTION: Record<LinkColor, string> = {
  primary:
    'hover:koast-bg-interactive-secondary-hovered hover:koast-text-interactive-primary-hovered active:koast-bg-interactive-secondary-pressed active:koast-text-interactive-primary-pressed',
  secondary:
    'hover:koast-bg-interactive-secondary-hovered hover:koast-text-interactive-secondary-hovered active:koast-bg-interactive-secondary-pressed active:koast-text-interactive-secondary-pressed',
};

/** 비활성 상태입니다. Button 과 같은 회색 면 + 회색 라벨입니다. */
const DISABLED
  = 'koast-bg-disabled koast-text-disabled koast-cursor-not-allowed';

/** Figma 의 Focused 변형은 링크 밖 2px 지점에 2px 링을 그립니다. Button 과 같은 처리입니다. */
const FOCUS_RING
  = 'focus-visible:koast-outline-none focus-visible:koast-ring-2 focus-visible:koast-ring-offset-2 focus-visible:koast-ring-focus-ring';

/** 라벨 왼쪽 아이콘은 16px, 오른쪽 아이콘은 24px 입니다. */
export const LINK_LEADING_ICON
  = 'koast-inline-flex koast-shrink-0 [&_svg]:koast-size-4';

export const LINK_TRAILING_ICON
  = 'koast-inline-flex koast-shrink-0 [&_svg]:koast-size-6';

/** 링크의 최종 클래스명을 계산합니다. */
export const getLinkStyles = (
  variant: LinkVariant,
  color: LinkColor,
  disabled: boolean,
  visited: boolean,
  className: string,
) =>
  twMerge(
    LINK_BASE,
    VARIANTS[variant],
    disabled ? DISABLED : COLOR_BASE[color],
    disabled ? '' : COLOR_INTERACTION[color],
    disabled || !visited ? '' : 'koast-text-interactive-visited',
    disabled ? '' : FOCUS_RING,
    className,
  );
