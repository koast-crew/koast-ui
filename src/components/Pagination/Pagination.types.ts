import React from 'react';

/** 페이지 목록의 한 칸입니다. `'ellipsis'` 는 생략 표시(…)입니다. */
export type PaginationItem = number | 'ellipsis';

export interface PaginationProps
  extends Pick<React.AriaAttributes, 'aria-label' | 'aria-labelledby'> {
  /** 전체 페이지 수입니다. 1 미만이면 아무것도 그리지 않습니다. */
  count: number;

  /** 현재 페이지(1부터 시작)입니다. 지정하면 제어 컴포넌트로 동작합니다. */
  page?: number;

  /** 비제어로 쓸 때의 초기 페이지입니다. @default 1 */
  defaultPage?: number;

  /** 페이지가 바뀔 때 호출됩니다. 범위를 벗어난 이동은 호출되지 않습니다. */
  onChange?: (page: number) => void;

  /** 현재 페이지 양옆에 항상 보이는 페이지 수입니다. 1 이면 번호 칸이 최대 7개입니다. @default 1 */
  siblingCount?: number;

  /** 전체를 비활성화합니다. 번호·이전·다음 모두 누를 수 없습니다. @default false */
  disabled?: boolean;

  /** 이전 버튼의 접근 가능한 이름입니다. @default '이전 페이지' */
  previousLabel?: string;

  /** 다음 버튼의 접근 가능한 이름입니다. @default '다음 페이지' */
  nextLabel?: string;

  /** 번호 버튼의 접근 가능한 이름을 만듭니다. @default (page) => `${page} 페이지` */
  pageLabel?: (page: number) => string;

  /** 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. */
  className?: string;

  /** 루트 요소의 id 입니다. 내부 요소 id 의 접두사로도 쓰입니다. */
  id?: string;
}
