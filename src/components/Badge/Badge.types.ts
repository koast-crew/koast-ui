import React from 'react';

/** Figma 의 컴포넌트 셋 구분(`Badge/Dot` · `Badge/Number` · `Badge/Text`)입니다. */
export type BadgeType = 'dot' | 'number' | 'text';

/** Figma 의 Type 축입니다. primary=채운 면, secondary=연한 면 + 1px 테두리입니다. */
export type BadgeVariant = 'primary' | 'secondary';

/** Figma 의 Status 축입니다. */
export type BadgeStatus
  = 'neutral' | 'information' | 'success' | 'warning' | 'error';

export interface BadgeProps extends Pick<React.AriaAttributes, 'aria-label'> {
  /** 뱃지의 형태입니다. `dot` 은 내용 없이 4px 점만 그립니다. @default 'text' */
  type?: BadgeType;

  /** 면 채움 방식입니다. `dot` 은 항상 primary 색을 씁니다. @default 'primary' */
  variant?: BadgeVariant;

  /** 의미 색상입니다. @default 'neutral' */
  status?: BadgeStatus;

  /** `type='number'` 일 때 표시할 수입니다. `max` 를 넘으면 `+{max}` 로 잘립니다. */
  count?: number;

  /** `count` 의 상한입니다. @default 999 */
  max?: number;

  /** `type='text'` 일 때 표시할 라벨입니다. `count` 가 없으면 `number` 에서도 쓰입니다. */
  children?: React.ReactNode;

  /**
   * 레이아웃 조정용입니다. 색상은 지정할 수 없습니다.
   *
   * 스크린 리더용 설명은 `aria-label` 로 넘깁니다.
   * `dot` 은 이 값이 없으면 보조 기술에서 숨겨집니다.
   */
  className?: string;
}
