import React from 'react';

/**
 * 버튼이 표현할 수 있는 의미(intent)입니다.
 *
 * 디자인 시스템의 시맨틱 토큰에 1:1로 대응하며, 임의의 색상 문자열은 받지 않습니다.
 * 색상을 직접 지정하고 싶다면 디자인 시스템에 토큰을 먼저 추가해야 합니다.
 *
 * - `primary` / `secondary` : brand 액션. hover/pressed 상태 토큰까지 갖춘 대화형 색입니다.
 * - `neutral` : 중립 액션.
 * - `danger` : 삭제처럼 되돌리기 어려운 액션.
 * - `info` / `warning` / `success` : 상태 표현용. 별도 hover 색이 정의되어 있지 않아 불투명도로 처리합니다.
 */
export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'danger'
  | 'info'
  | 'warning'
  | 'success';

/**
 * 1.0.x 호환용 별칭입니다. 다음 major 에서 제거됩니다.
 * @deprecated `error` 는 `danger` 를, `gray` 는 `neutral` 를 사용하세요.
 */
export type DeprecatedButtonColor = 'error' | 'gray';

/** `color` prop 이 실제로 허용하는 값입니다. */
export type ButtonColorProp = ButtonColor | DeprecatedButtonColor;

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonVariant = 'text' | 'contained' | 'outlined';

/**
 * Button 컴포넌트의 속성을 정의하는 인터페이스입니다.
 */
export interface ButtonProps {
  /**
   * 버튼의 변형을 지정합니다.
   * @default 'outlined'
   */
  variant?: ButtonVariant;

  /**
   * 버튼의 의미(intent)를 지정합니다. 디자인 시스템에 정의된 값만 사용할 수 있습니다.
   * @default 'primary'
   */
  color?: ButtonColorProp;

  /**
   * 버튼의 크기를 지정합니다.
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * 버튼의 HTML type 속성을 지정합니다.
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';

  /**
   * 버튼에 추가할 CSS 클래스명입니다.
   *
   * 여백·정렬·너비 같은 레이아웃 조정 용도입니다.
   * 색상은 `color` / `variant` 로만 지정할 수 있습니다.
   */
  className?: string;

  /**
   * 버튼의 비활성화 상태를 지정합니다.
   * @default false
   */
  disabled?: boolean;

  /**
   * 버튼 내부에 표시될 콘텐츠입니다.
   */
  children?: React.ReactNode;

  /**
   * 버튼 클릭 시 실행될 함수입니다.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>)=> void;

  /**
   * 버튼 왼쪽에 표시될 아이콘입니다.
   */
  startIcon?: React.ReactNode;

  /**
   * 버튼 오른쪽에 표시될 아이콘입니다.
   */
  endIcon?: React.ReactNode;

  /**
   * 로딩 상태를 표시합니다.
   * @default false
   */
  loading?: boolean;

  /**
   * 버튼의 너비를 부모 요소의 100%로 설정합니다.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * 버튼에 그림자 효과를 추가합니다. (contained 변형에만 적용)
   * @default false
   */
  shadow?: boolean;

  /**
   * 링크 URL을 지정합니다. 이 속성이 있으면 버튼은 <a> 태그로 렌더링됩니다.
   */
  href?: string;
}
