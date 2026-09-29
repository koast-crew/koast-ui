import { twMerge } from '../../utils/twMerge';
import type { TableAlign, TableSize } from './Table.types';

/** 체크 열은 Figma 실측 40px 고정입니다. */
export const CHECK_COLUMN_WIDTH = '40px';

const JUSTIFY: Record<TableAlign, string> = {
  left: 'koast-justify-start koast-text-left',
  center: 'koast-justify-center koast-text-center',
  right: 'koast-justify-end koast-text-right',
};

/** 헤더 높이는 md 64 · sm 48, 셀은 md 48 · sm 40 입니다. 셀은 두 줄 내용이 넘칠 수 있어 최소 높이로 겁니다. */
const HEADER_SIZES: Record<TableSize, string> = {
  md: 'koast-h-16',
  sm: 'koast-h-12',
};

const CELL_SIZES: Record<TableSize, string> = {
  md: 'koast-min-h-12',
  sm: 'koast-min-h-10',
};

const CELL_BASE = 'koast-flex koast-min-w-0 koast-items-center koast-gap-3 koast-px-3 koast-py-1';

const FOCUS_RING_INSET
  = 'focus-visible:koast-outline focus-visible:koast-outline-2 focus-visible:-koast-outline-offset-2 focus-visible:koast-outline-focus-ring';

export const getTableRootStyles = (className: string) =>
  twMerge('koast-w-full koast-overflow-x-auto', className);

export const TABLE_GRID = 'koast-grid koast-min-w-full';

/** 행은 subgrid 로 부모 열을 물려받아, `display: contents` 없이도 row 역할과 행 단위 배경을 유지합니다. */
export const getTableRowStyles = (selected: boolean, clickable: boolean) =>
  twMerge(
    'koast-col-span-full koast-grid koast-grid-cols-subgrid koast-transition-colors koast-duration-200',
    selected
      ? 'koast-bg-interactive-selected hover:koast-bg-interactive-selected-hovered'
      : 'koast-bg-primary hover:koast-bg-secondary',
    clickable ? `koast-cursor-pointer ${ FOCUS_RING_INSET }` : '',
  );

export const TABLE_HEADER_ROW = 'koast-col-span-full koast-grid koast-grid-cols-subgrid';

/** 열 구분선은 1px 이며, 행의 마지막 셀은 바깥 가장자리라 선을 뺍니다. */
const COLUMN_DIVIDER = 'koast-border-r last:koast-border-r-0';

/** 헤더는 위 1px(primary) · 아래 2px, 셀 하단선은 1px 입니다. border-style 을 켜면 나머지 변이 medium 으로 그려지므로 0 으로 눌러둡니다. */
export const getTableHeaderCellStyles = (
  size: TableSize,
  align: TableAlign,
  selected: boolean,
) =>
  twMerge(
    CELL_BASE,
    HEADER_SIZES[size],
    JUSTIFY[align],
    'koast-border-0 koast-border-t koast-border-b-2 koast-border-solid koast-border-secondary koast-border-t-primary',
    COLUMN_DIVIDER,
    selected ? 'koast-bg-interactive-selected' : 'koast-bg-secondary',
  );

export const TABLE_HEADER_LABEL = 'koast-text-base koast-font-semibold koast-leading-6 koast-text-secondary';

export const getTableSortButtonStyles = (align: TableAlign) =>
  twMerge(
    'koast-flex koast-min-w-0 koast-items-center koast-gap-1 koast-rounded',
    JUSTIFY[align],
    'focus-visible:koast-outline focus-visible:koast-outline-2 focus-visible:koast-outline-offset-2 focus-visible:koast-outline-focus-ring',
  );

export const getTableSortIconStyles = (active: boolean) =>
  twMerge(
    'koast-size-4 koast-shrink-0',
    active ? 'koast-text-interactive-selected' : 'koast-text-disabled',
  );

export const getTableCellStyles = (
  size: TableSize,
  align: TableAlign,
  className = '',
) =>
  twMerge(
    CELL_BASE,
    CELL_SIZES[size],
    JUSTIFY[align],
    'koast-border-0 koast-border-b koast-border-solid koast-border-secondary',
    COLUMN_DIVIDER,
    className,
  );

export const TABLE_CELL_CONTENT = 'koast-flex koast-min-w-0 koast-flex-col koast-gap-0.5';

export const TABLE_CELL_LABEL = 'koast-text-sm koast-font-medium koast-leading-5 koast-text-secondary';

export const TABLE_CELL_DESCRIPTION = 'koast-text-xs koast-leading-[17px] koast-text-tertiary';

export const getTableStateStyles = (error: boolean) =>
  twMerge(
    'koast-col-span-full koast-flex koast-min-h-60 koast-items-center koast-justify-center koast-px-3 koast-py-10',
    'koast-border-0 koast-border-b koast-border-solid koast-border-secondary koast-text-sm koast-leading-5',
    error ? 'koast-text-danger' : 'koast-text-tertiary',
  );
