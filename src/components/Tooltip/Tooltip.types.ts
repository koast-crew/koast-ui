import React from 'react';

/**
 * 트리거를 기준으로 툴팁 패널이 놓이는 변입니다.
 * Figma 의 **Direction** 축은 화살표가 붙는 변으로 이름이 지어져 있어 방향이 반대입니다
 * (Figma `Below` = 화살표가 아래 = 패널은 위 = `top`).
 */
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

/** 놓인 변 위에서의 정렬입니다. Figma 의 Left/Center/Right, Top/Middle/Bottom 에 대응합니다. */
export type TooltipAlign = 'start' | 'center' | 'end';

/** Figma 의 **Style** 축입니다. default 는 어두운 면, inverse 는 밝은 면입니다. */
export type TooltipVariant = 'default' | 'inverse';

export interface TooltipProps {
  /** 툴팁에 표시될 내용입니다. */
  content: React.ReactNode;

  /** 툴팁을 띄울 트리거입니다. `aria-describedby` 를 붙일 수 있는 단일 엘리먼트여야 합니다. */
  children: React.ReactElement;

  /** 트리거를 기준으로 패널이 놓이는 변입니다. @default 'top' */
  placement?: TooltipPlacement;

  /** 놓인 변 위에서의 정렬입니다. @default 'center' */
  align?: TooltipAlign;

  /** 면 색입니다. @default 'default' */
  variant?: TooltipVariant;

  /** 화살표 표시 여부입니다. Figma 의 `Direction=None` 이 `false` 에 해당합니다. @default true */
  arrow?: boolean;

  /** 열림 상태입니다. 지정하면 제어 컴포넌트로 동작합니다. */
  open?: boolean;

  /** 비제어로 쓸 때의 초기 열림 상태입니다. @default false */
  defaultOpen?: boolean;

  /** 열림 상태가 바뀔 때 호출됩니다. */
  onOpenChange?: (open: boolean) => void;

  /** 툴팁을 끕니다. 트리거만 그대로 렌더링됩니다. @default false */
  disabled?: boolean;

  /** 패널의 최대 너비입니다. 숫자는 px 로 해석됩니다. @default 240 */
  maxWidth?: number | string;

  /** 트리거를 감싸는 래퍼의 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. */
  className?: string;

  /** 패널의 id 입니다. 생략하면 자동 생성되며 트리거의 `aria-describedby` 와 연결됩니다. */
  id?: string;
}
