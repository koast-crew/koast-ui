import type { ReactNode } from 'react';

/** 보조 문구의 의미 색상입니다. 값이 모두 찼으면 success, `error` 면 danger 입니다. */
export type ProgressbarTone = 'neutral' | 'success' | 'error';

export interface ProgressbarProps {
  /** 현재 진행 값입니다. `indeterminate` 면 무시됩니다. @default 0 */
  value?: number;

  /** 최솟값입니다. @default 0 */
  min?: number;

  /** 최댓값입니다. @default 100 */
  max?: number;

  /**
   * 진행률을 알 수 없는 상태입니다.
   * 지시자가 트랙 전체를 덮고 `aria-valuenow` 가 빠집니다. @default false
   */
  indeterminate?: boolean;

  /** Figma 의 `Errpr`(오타) 축입니다. 지시자와 보조 문구가 danger 색으로 바뀝니다. @default false */
  error?: boolean;

  /** 헤더 왼쪽 라벨입니다. */
  label?: ReactNode;

  /** 헤더 오른쪽 값 텍스트입니다. 미입력 시 `formatValue` 결과가 들어갑니다. */
  valueText?: ReactNode;

  /** 헤더 값 텍스트 표시 여부입니다. @default true */
  showValue?: boolean;

  /** 트랙 아래 보조 문구입니다. Figma 의 `Part/Help message` 입니다. */
  helperText?: ReactNode;

  /**
   * 백분율을 문자열로 바꿉니다. 헤더 값 텍스트와 `aria-valuetext` 에 함께 쓰입니다.
   * @default (percent) => `${ Math.round(percent) }%`
   */
  formatValue?: (percent: number) => string;

  /** 접근성 이름입니다. `label` 이 없을 때 사용하세요. */
  ariaLabel?: string;

  /** 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. */
  className?: string;
}
