import React from 'react';

/** 탐색 경로의 항목 하나입니다. */
export interface BreadcrumbItem {
  /** 항목에 표시될 라벨입니다. */
  label: React.ReactNode;

  /** 이동할 URL 입니다. 없으면 링크가 아닌 텍스트로 표시됩니다. */
  href?: string;

  /** 라벨 왼쪽에 표시될 16px 아이콘입니다. */
  icon?: React.ReactNode;

  /** 클릭 이벤트 핸들러입니다. 라우터 연동 시 `event.preventDefault()` 후 직접 이동시킵니다. */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

/** 색을 지정할 통로(`style`, `color`)는 의도적으로 막혀 있습니다. */
type NativeOmit = 'color' | 'style' | 'className' | 'children';

/** Breadcrumbs 컴포넌트의 속성입니다. */
export interface BreadcrumbsProps
  extends Omit<React.HTMLAttributes<HTMLElement>, NativeOmit> {
  /** 최상위부터 현재 위치까지 순서대로 나열한 항목 배열입니다. 마지막 항목이 현재 위치입니다. */
  items: BreadcrumbItem[];

  /** 항목 사이의 구분자입니다. 보조 기술에는 노출되지 않습니다. @default <ChevronRight /> */
  separator?: React.ReactNode;

  /** 여백·정렬 같은 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. */
  className?: string;
}
