import React from 'react';
import type {
  ButtonColor,
  ButtonColorProp,
  ButtonSize,
  ButtonSizeProp,
  ButtonVariant,
} from '../Button/Button.types';

/**
 * Figma 의 Type 축입니다. Button 과 같은 intent 집합을 그대로 씁니다.
 * Figma 의 Property table 에는 `Destructive` 가 선언돼 있지만 실제 variant 는 없습니다.
 */
export type IconButtonColor = ButtonColor;

/** `color` prop 이 실제로 허용하는 값입니다. Button 과 같은 deprecated 별칭을 받습니다. */
export type IconButtonColorProp = ButtonColorProp;

/** Figma 의 Size 축입니다. xs=28px, sm=32px, md=40px 정사각형에 대응합니다. */
export type IconButtonSize = ButtonSize;

/** `size` prop 이 실제로 허용하는 값입니다. */
export type IconButtonSizeProp = ButtonSizeProp;

/** Figma 의 Style 축입니다. Filled / Outlined / Transparent 에 대응합니다. */
export type IconButtonVariant = ButtonVariant;

/**
 * 색을 지정할 통로(`style`, `color`)는 의도적으로 막혀 있습니다.
 * `aria-label` 과 `aria-pressed` 는 컴포넌트가 직접 관리하므로 아래에서 다시 선언합니다.
 */
type NativeOmit =
  | 'color'
  | 'style'
  | 'className'
  | 'disabled'
  | 'children'
  | 'type'
  | 'aria-label'
  | 'aria-pressed';

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, NativeOmit> {
  /** 표시할 아이콘입니다. 크기는 `size` 에 따라 자동으로 맞춰지고 `aria-hidden` 으로 감싸집니다. */
  'icon': React.ReactNode;

  /**
   * 스크린 리더가 읽을 이름입니다. 아이콘만 있는 버튼이라 필수입니다.
   * `aria-labelledby` 를 함께 주면 그쪽이 우선합니다.
   */
  'aria-label': string;

  /** 버튼의 변형입니다. @default 'outlined' */
  'variant'?: IconButtonVariant;

  /** 버튼의 의미(intent)입니다. 디자인 시스템에 정의된 값만 사용할 수 있습니다. @default 'primary' */
  'color'?: IconButtonColorProp;

  /** 버튼의 크기입니다. 28 / 32 / 40px 정사각형입니다. @default 'md' */
  'size'?: IconButtonSizeProp;

  /** 버튼의 HTML type 속성입니다. @default 'button' */
  'type'?: 'button' | 'submit' | 'reset';

  /** 여백·정렬 같은 레이아웃 조정용입니다. 색상은 `color` / `variant` 로만 지정할 수 있습니다. */
  'className'?: string;

  /** 비활성화 상태입니다. @default false */
  'disabled'?: boolean;

  /** 로딩 상태입니다. 아이콘 자리에 스피너가 들어가고 버튼이 비활성화됩니다. @default false */
  'loading'?: boolean;

  /**
   * 토글 버튼의 선택 상태입니다. Figma 의 Selected 축에 대응합니다.
   * 값을 주면 `aria-pressed` 가 함께 붙어 토글 버튼으로 읽힙니다.
   * 생략하면 토글이 아닌 일반 버튼으로 읽힙니다.
   */
  'selected'?: boolean;
}
