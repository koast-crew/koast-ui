import React from 'react';

/**
 * 버튼이 표현할 수 있는 의미(intent)입니다. 디자인 시스템의 Type 축에 1:1로 대응합니다.
 * 임의의 색상 문자열은 받지 않습니다.
 */
export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'danger';

/**
 * @deprecated 디자인 시스템에서 제거된 intent 입니다. 다음 major 에서 삭제됩니다.
 * `error` 는 `danger`, `gray` / `neutral` 은 `secondary` 를 사용하세요.
 * `info` / `warning` / `success` 는 대응하는 intent 가 없어 `primary` 로 동작합니다.
 */
export type DeprecatedButtonColor = 'error' | 'gray' | 'neutral' | 'info' | 'warning' | 'success';

/** `color` prop 이 실제로 허용하는 값입니다. */
export type ButtonColorProp = ButtonColor | DeprecatedButtonColor;

/** 디자인 시스템의 Size 축입니다. xs=28px, sm=40px, md=48px 높이에 대응합니다. */
export type ButtonSize = 'xs' | 'sm' | 'md';

/** @deprecated 디자인 시스템에 없는 크기입니다. 다음 major 에서 삭제되며 `md` 로 동작합니다. */
export type DeprecatedButtonSize = 'lg' | 'xl';

/** `size` prop 이 실제로 허용하는 값입니다. */
export type ButtonSizeProp = ButtonSize | DeprecatedButtonSize;

/** 디자인 시스템의 Style 축입니다. Filled / Outlined / Transparent 에 대응합니다. */
export type ButtonVariant = 'contained' | 'outlined' | 'text';

export interface ButtonProps {
  /** 버튼의 변형입니다. @default 'outlined' */
  variant?: ButtonVariant;

  /** 버튼의 의미(intent)입니다. 디자인 시스템에 정의된 값만 사용할 수 있습니다. @default 'primary' */
  color?: ButtonColorProp;

  /** 버튼의 크기입니다. @default 'md' */
  size?: ButtonSizeProp;

  /** 버튼의 HTML type 속성입니다. @default 'button' */
  type?: 'button' | 'submit' | 'reset';

  /** 여백·정렬·너비 같은 레이아웃 조정용입니다. 색상은 `color` / `variant` 로만 지정할 수 있습니다. */
  className?: string;

  /** 비활성화 상태입니다. @default false */
  disabled?: boolean;

  /** 버튼 내부에 표시될 콘텐츠입니다. */
  children?: React.ReactNode;

  /** 클릭 시 실행될 함수입니다. */
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>)=> void;

  /** 버튼 왼쪽에 표시될 아이콘입니다. 크기는 버튼 size 에 따라 자동으로 맞춰집니다. */
  startIcon?: React.ReactNode;

  /** 버튼 오른쪽에 표시될 아이콘입니다. 크기는 버튼 size 에 따라 자동으로 맞춰집니다. */
  endIcon?: React.ReactNode;

  /** 로딩 상태입니다. @default false */
  loading?: boolean;

  /** 너비를 부모의 100%로 설정합니다. @default false */
  fullWidth?: boolean;

  /** 그림자 효과입니다. contained 변형에만 적용됩니다. @default false */
  shadow?: boolean;

  /** 링크 URL 입니다. 이 속성이 있으면 <a> 태그로 렌더링됩니다. */
  href?: string;
}
