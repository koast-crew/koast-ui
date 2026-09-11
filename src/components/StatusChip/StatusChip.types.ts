import React from 'react';

/** Figma 의 **Style** 축입니다. filled 는 진한 면, outlined 는 옅은 면 + 1px 테두리, transparent 는 테두리 없는 옅은 면입니다. */
export type StatusChipVariant = 'filled' | 'outlined' | 'transparent';

/** Figma 의 **Status** 축입니다. Figma 표기 `Netural` / `Information` 은 각각 neutral / info 로 정리했습니다. */
export type StatusChipStatus = 'neutral' | 'info' | 'error' | 'success' | 'warning';

/** Figma 의 **Type** 축입니다. round 는 pill, square 는 4px 라운드입니다. */
export type StatusChipShape = 'round' | 'square';

/** Figma 의 컴포넌트 셋 구분입니다. md=32px, sm=28px 최소 높이에 대응합니다. */
export type StatusChipSize = 'sm' | 'md';

export interface StatusChipProps {
  /** 상태 색을 정합니다. @default 'neutral' */
  status?: StatusChipStatus;

  /** 면 처리 방식입니다. @default 'filled' */
  variant?: StatusChipVariant;

  /** 모서리 모양입니다. @default 'round' */
  shape?: StatusChipShape;

  /** 칩 크기입니다. @default 'md' */
  size?: StatusChipSize;

  /**
   * 라벨 앞 아이콘입니다.
   * 지정하지 않으면 status 별 기본 아이콘이 붙고(neutral 은 기본 아이콘 없음),
   * `false` 를 주면 아이콘 없이 라벨만 표시합니다.
   */
  icon?: React.ReactNode | false;

  /** 칩에 표시될 라벨입니다. */
  children: React.ReactNode;

  /** 너비·여백 같은 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. */
  className?: string;
}
