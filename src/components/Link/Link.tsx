import React, { forwardRef } from 'react';
import type { LinkProps } from './Link.types';
import {
  LINK_LEADING_ICON,
  LINK_TRAILING_ICON,
  getLinkStyles,
} from './Link.styles';

/** 새 창으로 열리는 링크는 그 사실이 접근 가능한 이름에 포함되어야 합니다. */
const NEW_WINDOW_HINT = ' (새 창에서 열림)';

/**
 * @koast/ui 링크 컴포넌트입니다.
 *
 * 항상 `<a>` 로 렌더링되며, 색상은 디자인 시스템의 시맨틱 토큰으로만 결정됩니다.
 * `color` 는 정해진 intent 값만 받고, 임의의 색상 문자열이나 인라인 스타일은 받지 않습니다.
 *
 * @param {string} props.href - 이동할 URL
 * @param {'standalone' | 'underline'} [props.variant='standalone'] - 링크 표시 방식 (밑줄 유무)
 * @param {'primary' | 'secondary'} [props.color='primary'] - 링크 intent
 * @param {React.ReactNode} props.children - 링크에 표시될 내용
 * @param {React.ReactNode} [props.startIcon] - 라벨 앞에 표시될 16px 아이콘
 * @param {React.ReactNode} [props.endIcon] - 라벨 뒤에 표시될 24px 아이콘
 * @param {boolean} [props.disabled=false] - 비활성화 상태. `href` 가 제거되고 포커스를 받지 않습니다
 * @param {boolean} [props.visited=false] - 방문 색 강제 적용 (지정하지 않아도 브라우저 `:visited` 를 따릅니다)
 * @param {string} [props.className=''] - 레이아웃 조정용 CSS 클래스 (색상 지정 불가)
 *
 * `target="_blank"` 를 주면 `rel="noopener noreferrer"` 가 자동으로 붙고,
 * 접근 가능한 이름 끝에 "(새 창에서 열림)" 이 화면에는 보이지 않는 형태로 추가됩니다.
 *
 * `aria-label`, `aria-current`, `id`, `title`, `data-*` 같은 네이티브 속성과 `ref` 를 그대로 전달합니다.
 * 색을 지정하는 `style` / `color` 속성만 막혀 있습니다.
 *
 * @example
 * ```tsx
 * <Link href="/notices">공지사항</Link>
 *
 * // 본문 안에 섞이는 링크는 밑줄로 표시합니다
 * <Link href="/terms" variant="underline" color="secondary">이용약관</Link>
 *
 * // 새 창으로 열리는 외부 링크
 * <Link href="https://www.kma.go.kr" target="_blank" endIcon={<ExternalLink />}>
 *   기상청
 * </Link>
 * ```
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const {
    href,
    variant = 'standalone',
    color = 'primary',
    children,
    startIcon,
    endIcon,
    disabled = false,
    visited = false,
    className = '',
    target,
    rel,
    onClick,
    ...rest
  } = props;

  const opensNewWindow = target === '_blank';

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <a
      {...rest}
      ref={ref}
      href={disabled ? undefined : href}
      target={disabled ? undefined : target}
      rel={opensNewWindow ? (rel ?? 'noopener noreferrer') : rel}
      // href 가 없으면 링크로 노출되지 않으므로 역할과 비활성 상태를 명시합니다.
      role={disabled ? 'link' : undefined}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : rest.tabIndex}
      onClick={handleClick}
      className={getLinkStyles(variant, color, disabled, visited, className)}
    >
      {startIcon && <span className={LINK_LEADING_ICON}>{startIcon}</span>}
      <span>{children}</span>
      {opensNewWindow && (
        <span className={'koast-sr-only'}>{NEW_WINDOW_HINT}</span>
      )}
      {endIcon && <span className={LINK_TRAILING_ICON}>{endIcon}</span>}
    </a>
  );
});

Link.displayName = 'Link';

export default Link;
