import React from 'react';

/**
 * 디자인 시스템의 Style 축입니다.
 * `standalone` 은 밑줄 없이 색으로만, `underline` 은 밑줄로 링크임을 표시합니다.
 */
export type LinkVariant = 'standalone' | 'underline';

/**
 * 디자인 시스템의 Type 축입니다. 임의의 색상 문자열은 받지 않습니다.
 */
export type LinkColor = 'primary' | 'secondary';

/**
 * 색을 지정할 통로(`style`, `color`)는 의도적으로 막혀 있습니다.
 * 그 외 `aria-*`, `data-*`, `id`, `title`, `target`, `rel`, 포커스·마우스 이벤트는 전부 그대로 전달됩니다.
 */
type NativeOmit = 'color' | 'style' | 'className' | 'children' | 'href';

/** Link 컴포넌트의 속성입니다. 항상 `<a>` 로 렌더링됩니다. */
export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, NativeOmit> {
  /** 이동할 URL 입니다. `disabled` 일 때는 `href` 속성을 내보내지 않습니다. */
  href: string;

  /** 링크의 표시 방식입니다. @default 'standalone' */
  variant?: LinkVariant;

  /** 링크의 의미(intent)입니다. 디자인 시스템에 정의된 값만 사용할 수 있습니다. @default 'primary' */
  color?: LinkColor;

  /** 링크에 표시될 내용입니다. */
  children?: React.ReactNode;

  /** 라벨 왼쪽에 표시될 16px 아이콘입니다. */
  startIcon?: React.ReactNode;

  /** 라벨 오른쪽에 표시될 24px 아이콘입니다. Figma 기본 구성은 `chevron-right` 입니다. */
  endIcon?: React.ReactNode;

  /** 비활성화 상태입니다. `href` 가 제거되고 포커스를 받지 않습니다. @default false */
  disabled?: boolean;

  /**
   * 방문 색을 강제로 적용합니다.
   * 지정하지 않아도 브라우저의 `:visited` 를 따라 방문 색이 적용됩니다.
   * @default false
   */
  visited?: boolean;

  /** 여백·정렬 같은 레이아웃 조정용입니다. 색상은 `color` / `variant` 로만 지정할 수 있습니다. */
  className?: string;
}
