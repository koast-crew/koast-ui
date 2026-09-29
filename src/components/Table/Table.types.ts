import React from 'react';

/** 디자인 시스템의 Size 축입니다. md 는 헤더 64 · 셀 48px, sm 은 헤더 48 · 셀 40px 입니다. */
export type TableSize = 'sm' | 'md';

/** 헤더와 셀에 함께 적용되는 가로 정렬입니다. */
export type TableAlign = 'left' | 'center' | 'right';

export type TableSortDirection = 'asc' | 'desc';

export type TableRowId = string | number;

export interface TableSort {
  /** 정렬 중인 컬럼의 `id` 입니다. */
  columnId: string;
  direction: TableSortDirection;
}

export interface TableColumn<T> {
  /** 컬럼 식별자입니다. 정렬 콜백의 `columnId` 로 그대로 넘어갑니다. */
  id: string;

  /** 헤더에 표시되는 라벨입니다. */
  label: React.ReactNode;

  /** 셀 내용을 그립니다. */
  render: (item: T, index: number) => React.ReactNode;

  /** 라벨 아래 두 번째 줄을 그립니다. Figma `Part/Cell` 의 Description 입니다. */
  description?: (item: T, index: number) => React.ReactNode;

  /** 헤더와 셀의 가로 정렬입니다. @default 'left' */
  align?: TableAlign;

  /**
   * 컬럼 최소 폭입니다. `gridTemplateColumns` 가 없으면 `minmax(minWidth, 1fr)` 로 열 폭을 만들고,
   * 있으면 열 폭 계산에서 빠지고 셀의 `min-width` 로만 남습니다.
   */
  minWidth?: string;

  /** 헤더를 눌러 정렬할 수 있는지 여부입니다. @default false */
  sortable?: boolean;

  /** 셀 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. */
  className?: string;
}

export interface TableProps<T> {
  /** 행 데이터입니다. */
  'data': T[];

  /** 컬럼 정의입니다. */
  'columns': TableColumn<T>[];

  /** 행을 구분하는 id 를 뽑습니다. 선택 상태도 이 값으로 관리합니다. */
  'getRowId': (item: T) => TableRowId;

  /** CSS grid 의 열 템플릿입니다. `selectable` 이면 앞에 체크 열(40px)이 자동으로 붙습니다. */
  'gridTemplateColumns'?: string;

  /** 디자인 시스템의 Size 축입니다. @default 'md' */
  'size'?: TableSize;

  /** 로딩 상태입니다. 헤더는 남기고 본문 자리에 `loadingContent` 를 그립니다. @default false */
  'loading'?: boolean;

  /** 에러 상태입니다. @default false */
  'error'?: boolean;

  /** 로딩 중 본문 자리에 그릴 내용입니다. @default <Spinner /> */
  'loadingContent'?: React.ReactNode;

  /** 에러일 때 본문 자리에 그릴 내용입니다. */
  'errorContent'?: React.ReactNode;

  /** 데이터가 없을 때 본문 자리에 그릴 내용입니다. */
  'emptyContent'?: React.ReactNode;

  /** 현재 정렬 상태입니다. 정렬 중인 헤더는 Selected 면으로 그려집니다. */
  'sort'?: TableSort;

  /** 정렬 헤더를 누를 때 호출됩니다. 같은 컬럼을 다시 누르면 방향이 뒤집힙니다. */
  'onSortChange'?: (sort: TableSort) => void;

  /** 맨 앞에 체크 열을 붙입니다. @default false */
  'selectable'?: boolean;

  /** 선택된 행의 키 목록입니다. */
  'selectedIds'?: TableRowId[];

  /**
   * 행 또는 헤더 체크박스를 누를 때 바뀐 뒤의 선택 목록 전체로 호출됩니다.
   * 헤더 체크박스는 현재 `data` 의 행만 넣고 빼며, `data` 밖의 id 는 그대로 둡니다.
   */
  'onSelectionChange'?: (selectedIds: TableRowId[]) => void;

  /** 행을 누를 때 호출됩니다. 지정하면 행이 포커스를 받고 Enter 로도 호출됩니다. */
  'onRowClick'?: (item: T, index: number) => void;

  /** 스크린 리더가 읽을 표 이름입니다. */
  'aria-label'?: string;

  /** 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. */
  'className'?: string;
}
