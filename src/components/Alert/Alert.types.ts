import React from 'react';

/**
 * Figma 의 **Style** 축입니다.
 * filled 는 진한 면 + 1px 테두리, outlined 는 옅은 면 + 2px 테두리, transparent 는 테두리 없는 옅은 면입니다.
 */
export type AlertVariant = 'filled' | 'outlined' | 'transparent';

/** Figma 의 **Status** 축입니다. Figma 표기 `Netural` / `Information` 은 각각 neutral / info 로 정리했습니다. */
export type AlertStatus
  = 'brand' | 'neutral' | 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  /** 상태 색을 정합니다. @default 'neutral' */
  status?: AlertStatus;

  /** 면 처리 방식입니다. @default 'filled' */
  variant?: AlertVariant;

  /** 굵은 제목 줄입니다. */
  title: React.ReactNode;

  /** 제목 아래 본문입니다. 없으면 제목만 한 줄로 표시됩니다. */
  children?: React.ReactNode;

  /**
   * 제목 앞 아이콘입니다.
   * 지정하지 않으면 status 별 기본 아이콘이 붙고(brand · neutral 은 기본 아이콘 없음),
   * `false` 를 주면 아이콘 없이 본문만 표시합니다.
   */
  icon?: React.ReactNode | false;

  /** 닫기 버튼의 클릭 핸들러입니다. 넘기지 않으면 닫기 버튼이 렌더링되지 않습니다. */
  onClose?: () => void;

  /** 닫기 버튼의 `aria-label` 입니다. @default '알림 닫기' */
  closeLabel?: string;

  /** 너비·여백 같은 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. */
  className?: string;
}
