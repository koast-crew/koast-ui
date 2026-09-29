import React from 'react';

/**
 * 액션 행의 배치입니다. inline 은 본문 오른쪽, stacked 는 본문 아래입니다.
 * (Figma 표기 `Text & Action` / `Text & Long Action`. `Text only` 는 `actionLabel` 을 생략한 경우입니다)
 */
export type ToastActionPlacement = 'inline' | 'stacked';

/** Figma 의 **Status** 축입니다. Figma 표기 `Netural` / `Information` 은 각각 neutral / info 로 정리했습니다. */
export type ToastStatus
  = 'brand'
    | 'neutral'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'inverse';

export interface ToastProps {
  /** 상태 색을 정합니다. @default 'neutral' */
  status?: ToastStatus;

  /** 액션 행의 배치입니다. `actionLabel` 이 있을 때만 쓰입니다. @default 'inline' */
  actionPlacement?: ToastActionPlacement;

  /** 굵은 제목 줄입니다. */
  title: React.ReactNode;

  /** 제목 아래 본문입니다. 없으면 제목만 한 줄로 표시됩니다. */
  children?: React.ReactNode;

  /** 액션 버튼의 라벨입니다. 주면 액션 버튼이 렌더링됩니다. */
  actionLabel?: React.ReactNode;

  /** 액션 버튼의 클릭 핸들러입니다. */
  onAction?: () => void;

  /** 닫기 버튼의 클릭 핸들러이자 `duration` 이 끝났을 때 호출되는 함수입니다. 없으면 닫기 버튼이 렌더링되지 않습니다. */
  onClose?: () => void;

  /** 닫기 버튼의 `aria-label` 입니다. @default '알림 닫기' */
  closeLabel?: string;

  /**
   * 자동으로 닫히기까지의 시간(ms)입니다. `onClose` 가 있어야 동작합니다.
   * 포인터가 올라가 있거나 내부에 포커스가 있는 동안에는 타이머가 멈춥니다(WCAG 2.2.1).
   * 생략하거나 0 이하면 자동으로 닫히지 않습니다.
   */
  duration?: number;

  /** 너비·여백 같은 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. */
  className?: string;
}
