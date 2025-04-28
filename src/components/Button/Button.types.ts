import React from 'react';

/**
 * Button 컴포넌트의 속성을 정의하는 인터페이스입니다.
 */
export interface ButtonProps {
  /**
   * 버튼의 변형을 지정합니다.
   * @default 'text'
   */
  variant?: 'text' | 'contained' | 'outlined';

  /**
   * 버튼의 색상을 지정합니다.
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | string;

  /**
   * 버튼의 크기를 지정합니다.
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * 버튼의 HTML type 속성을 지정합니다.
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';

  /**
   * 버튼에 추가할 CSS 클래스명입니다.
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
   * 인라인 스타일을 직접 적용할 수 있는 객체입니다.
   */
  customStyle?: React.CSSProperties;

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

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonVariant = 'text' | 'contained' | 'outlined';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'gray' | string;