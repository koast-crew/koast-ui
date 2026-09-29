import React from 'react';
import { ArrowDownNarrowWide, ArrowDownWideNarrow } from 'lucide-react';
import type { TableProps, TableRowId, TableSort } from './Table.types';
import {
  CHECK_COLUMN_WIDTH,
  TABLE_CELL_CONTENT,
  TABLE_CELL_DESCRIPTION,
  TABLE_CELL_LABEL,
  TABLE_GRID,
  TABLE_HEADER_LABEL,
  TABLE_HEADER_ROW,
  getTableCellStyles,
  getTableHeaderCellStyles,
  getTableRootStyles,
  getTableRowStyles,
  getTableSortButtonStyles,
  getTableSortIconStyles,
  getTableStateStyles,
} from './Table.styles';
import Checkbox from '../Checkbox';
import Spinner from '../Spinner';

const ARIA_SORT = { asc: 'ascending', desc: 'descending' } as const;

const stopPropagation = (event: React.SyntheticEvent) => event.stopPropagation();

/**
 * @koast/ui Table 컴포넌트입니다.
 * 컬럼 정의(`columns`)와 행 데이터(`data`)로 표를 그립니다. 셀 내용은 `render` 가 자유롭게 렌더링하고,
 * 테이블은 레이아웃 · 구분선 · 정렬 · 선택 · 로딩/에러/빈 상태만 책임집니다.
 * CSS grid 로 그리므로 `gridTemplateColumns` 에 `fr` 단위를 쓸 수 있습니다.
 *
 * @param {T[]} props.data - 행 데이터 : T[]
 * @param {TableColumn<T>[]} props.columns - 컬럼 정의 : TableColumn<T>[]
 * @param {Function} props.getRowId - 행 id 를 뽑는 함수. 선택 상태도 이 값으로 관리합니다 : (item) => string | number
 * @param {string} [props.gridTemplateColumns] - 열 템플릿. `selectable` 이면 앞에 40px 체크 열이 자동으로 붙습니다 : string
 * @param {'sm' | 'md'} [props.size='md'] - 헤더 64/48px, 셀 48/40px : 'sm' | 'md'
 * @param {boolean} [props.loading=false] - 로딩 상태 : boolean
 * @param {boolean} [props.error=false] - 에러 상태 : boolean
 * @param {React.ReactNode} [props.loadingContent] - 로딩 중 본문 내용. 기본은 Spinner : React.ReactNode
 * @param {React.ReactNode} [props.errorContent] - 에러일 때 본문 내용 : React.ReactNode
 * @param {React.ReactNode} [props.emptyContent] - 데이터가 없을 때 본문 내용 : React.ReactNode
 * @param {TableSort} [props.sort] - 현재 정렬 상태 : { columnId, direction }
 * @param {Function} [props.onSortChange] - 정렬 변경 콜백 : (sort) => void
 * @param {boolean} [props.selectable=false] - 맨 앞에 체크 열을 붙입니다 : boolean
 * @param {(string | number)[]} [props.selectedIds] - 선택된 행 키 목록 : (string | number)[]
 * @param {Function} [props.onSelectionChange] - 선택 변경 콜백. 바뀐 뒤의 목록 전체를 받습니다 : (selectedIds) => void
 * @param {Function} [props.onRowClick] - 행 클릭 콜백 : (item, index) => void
 * @param {string} [props.className] - 레이아웃 조정용 CSS 클래스 (색상 지정 불가) : string
 *
 * @example
 * ```tsx
 * const columns: TableColumn<User>[] = [
 *   { id: 'name', label: '이름', render: (user) => user.name, description: (user) => user.email, sortable: true },
 *   { id: 'role', label: '권한', align: 'center', render: (user) => <Badge>{user.role}</Badge> },
 * ];
 *
 * <Table
 *   data={users}
 *   columns={columns}
 *   getRowId={(user) => user.id}
 *   gridTemplateColumns={'2fr 1fr'}
 *   sort={sort}
 *   onSortChange={setSort}
 *   selectable
 *   selectedIds={selectedIds}
 *   onSelectionChange={setSelectedIds}
 * />
 * ```
 */
export function Table<T>({
  data,
  columns,
  getRowId,
  gridTemplateColumns,
  size = 'md',
  loading = false,
  error = false,
  loadingContent,
  errorContent = '데이터를 불러오는 중 오류가 발생했습니다.',
  emptyContent = '데이터가 없습니다.',
  sort,
  onSortChange,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  onRowClick,
  'aria-label': ariaLabel,
  className = '',
}: TableProps<T>) {
  const selectedSet = new Set<TableRowId>(selectedIds);
  const rowIds = data.map(getRowId);
  const selectedCount = rowIds.filter((id) => selectedSet.has(id)).length;
  const allChecked = data.length > 0 && selectedCount === data.length
    ? true
    : selectedCount > 0 ? 'partial' : false;

  const template = [
    selectable ? CHECK_COLUMN_WIDTH : '',
    gridTemplateColumns
    ?? columns.map((column) => `minmax(${ column.minWidth ?? '0px' }, 1fr)`).join(' '),
  ].join(' ').trim();

  const handleSort = (columnId: string) => {
    if (!onSortChange) return;
    const direction: TableSort['direction']
      = sort?.columnId === columnId && sort.direction === 'asc' ? 'desc' : 'asc';
    onSortChange({ columnId, direction });
  };

  const handleSelectRow = (id: TableRowId, checked: boolean) => {
    onSelectionChange?.(checked ? [...selectedIds, id] : selectedIds.filter((value) => value !== id));
  };

  const handleSelectAll = (checked: boolean) => {
    const rest = selectedIds.filter((id) => !rowIds.includes(id));
    onSelectionChange?.(checked ? [...rest, ...rowIds] : rest);
  };

  const handleRowKeyDown = (event: React.KeyboardEvent, item: T, index: number) => {
    if (event.key === 'Enter' && event.target === event.currentTarget) onRowClick?.(item, index);
  };

  const renderState = () => {
    if (loading) return loadingContent ?? <Spinner />;
    if (error) return errorContent;
    return emptyContent;
  };

  const showState = loading || error || data.length === 0;

  return (
    <div className={getTableRootStyles(className)}>
      <div
        role={'table'}
        aria-label={ariaLabel}
        aria-busy={loading || undefined}
        className={TABLE_GRID}
        style={{ gridTemplateColumns: template }}
      >
        <div role={'row'} className={TABLE_HEADER_ROW}>
          {selectable && (
            <div role={'columnheader'} className={getTableHeaderCellStyles(size, 'center', false)}>
              <Checkbox
                aria-label={'전체 선택'}
                checked={allChecked}
                disabled={data.length === 0 || loading}
                onChange={handleSelectAll}
              />
            </div>
          )}
          {columns.map((column) => {
            const align = column.align ?? 'left';
            const sorted = sort?.columnId === column.id;
            const label = <span className={TABLE_HEADER_LABEL}>{column.label}</span>;

            return (
              <div
                key={column.id}
                role={'columnheader'}
                aria-sort={column.sortable ? (sorted ? ARIA_SORT[sort.direction] : 'none') : undefined}
                className={getTableHeaderCellStyles(size, align, sorted)}
                style={{ minWidth: column.minWidth }}
              >
                {column.sortable ? (
                  <button
                    type={'button'}
                    className={getTableSortButtonStyles(align)}
                    onClick={() => handleSort(column.id)}
                  >
                    {label}
                    {sorted && sort.direction === 'asc'
                      ? <ArrowDownNarrowWide aria-hidden={'true'} className={getTableSortIconStyles(true)} />
                      : <ArrowDownWideNarrow aria-hidden={'true'} className={getTableSortIconStyles(sorted)} />}
                  </button>
                ) : label}
              </div>
            );
          })}
        </div>

        {showState ? (
          <div role={'row'} className={TABLE_HEADER_ROW}>
            <div role={'cell'} className={getTableStateStyles(!loading && error)}>
              {renderState()}
            </div>
          </div>
        ) : data.map((item, index) => {
          const id = rowIds[index];
          const selected = selectable && selectedSet.has(id);

          return (
            <div
              key={id}
              role={'row'}
              aria-selected={selectable ? selected : undefined}
              tabIndex={onRowClick ? 0 : undefined}
              className={getTableRowStyles(selected, Boolean(onRowClick))}
              onClick={onRowClick ? () => onRowClick(item, index) : undefined}
              onKeyDown={onRowClick ? (event) => handleRowKeyDown(event, item, index) : undefined}
            >
              {selectable && (
                <div
                  role={'cell'}
                  className={getTableCellStyles(size, 'center')}
                  onClick={stopPropagation}
                  onKeyDown={stopPropagation}
                >
                  <Checkbox
                    aria-label={'행 선택'}
                    checked={selected}
                    onChange={(checked) => handleSelectRow(id, checked)}
                  />
                </div>
              )}
              {columns.map((column) => {
                const description = column.description?.(item, index);

                return (
                  <div
                    key={column.id}
                    role={'cell'}
                    className={getTableCellStyles(size, column.align ?? 'left', column.className)}
                    style={{ minWidth: column.minWidth }}
                  >
                    {description === undefined ? (
                      <span className={TABLE_CELL_LABEL}>{column.render(item, index)}</span>
                    ) : (
                      <div className={TABLE_CELL_CONTENT}>
                        <span className={TABLE_CELL_LABEL}>{column.render(item, index)}</span>
                        <span className={TABLE_CELL_DESCRIPTION}>{description}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Table;
