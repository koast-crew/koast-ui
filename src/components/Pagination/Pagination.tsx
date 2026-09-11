import { useCallback, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import type { PaginationItem, PaginationProps } from './Pagination.types';
import {
  getPaginationControlStyles,
  getPaginationEllipsisStyles,
  getPaginationListStyles,
  getPaginationPageStyles,
  getPaginationRootStyles,
} from './Pagination.styles';

const range = (start: number, end: number) =>
  Array.from({ length: Math.max(end - start + 1, 0) }, (_, index) => start + index);

const clampPage = (target: number, count: number) =>
  Math.min(Math.max(Math.floor(target), 1), Math.max(Math.floor(count), 1));

/**
 * 보이는 페이지 칸을 계산합니다. 첫 페이지와 마지막 페이지는 항상 남고,
 * 현재 페이지 양옆으로 `siblingCount` 개를 붙인 뒤 끊기는 자리에 생략 표시를 넣습니다.
 * 한쪽에 생략이 없으면 그만큼 반대쪽을 늘려 칸 수를 `siblingCount * 2 + 5` 로 고정합니다.
 */
const getPaginationItems = (
  count: number,
  page: number,
  siblingCount: number,
): PaginationItem[] => {
  const slots = siblingCount * 2 + 5;
  if (count <= slots) return range(1, count);

  const left = Math.max(page - siblingCount, 1);
  const right = Math.min(page + siblingCount, count);
  // 양 끝 페이지와 맞붙어 있으면 감출 페이지가 없으므로 생략 표시를 넣지 않습니다.
  const showLeftEllipsis = left > 2;
  const showRightEllipsis = right < count - 1;
  const edgeLength = siblingCount * 2 + 3;

  if (!showLeftEllipsis) return [...range(1, edgeLength), 'ellipsis', count];
  if (!showRightEllipsis) {
    return [1, 'ellipsis', ...range(count - edgeLength + 1, count)];
  }
  return [1, 'ellipsis', ...range(left, right), 'ellipsis', count];
};

/**
 * @koast/ui Pagination 컴포넌트입니다.
 * 여러 페이지로 나뉜 목록을 번호와 이전/다음 버튼으로 옮겨 다닙니다.
 * 번호 칸은 `siblingCount * 2 + 5` 개로 고정되고 넘치는 구간은 생략 표시(…)로 접힙니다.
 *
 * @param {number} props.count - 전체 페이지 수 : number
 * @param {number} [props.page] - 현재 페이지. 지정하면 제어 컴포넌트로 동작합니다 : number
 * @param {number} [props.defaultPage=1] - 비제어로 쓸 때의 초기 페이지 : number
 * @param {Function} [props.onChange] - 페이지 변경 콜백 : Function
 * @param {number} [props.siblingCount=1] - 현재 페이지 양옆에 항상 보이는 페이지 수 : number
 * @param {boolean} [props.disabled=false] - 전체 비활성화 : boolean
 * @param {string} [props.previousLabel='이전 페이지'] - 이전 버튼의 접근 가능한 이름 : string
 * @param {string} [props.nextLabel='다음 페이지'] - 다음 버튼의 접근 가능한 이름 : string
 * @param {Function} [props.pageLabel] - 번호 버튼의 접근 가능한 이름을 만드는 함수 : Function
 * @param {string} [props.className] - 레이아웃 조정용 CSS 클래스 (색상 지정 불가) : string
 *
 * @example
 * ```tsx
 * // 비제어
 * <Pagination count={20} onChange={(page) => load(page)} />
 *
 * // 제어 + 양옆 2개씩 노출
 * <Pagination count={50} page={page} onChange={setPage} siblingCount={2} />
 * ```
 */
export const Pagination = ({
  count,
  page,
  defaultPage = 1,
  onChange,
  siblingCount = 1,
  disabled = false,
  previousLabel = '이전 페이지',
  nextLabel = '다음 페이지',
  pageLabel = (target: number) => `${ target } 페이지`,
  className = '',
  id,
  'aria-label': ariaLabel = '페이지네이션',
  'aria-labelledby': ariaLabelledBy,
}: PaginationProps) => {
  const isControlled = page !== undefined;
  const [innerPage, setInnerPage] = useState(defaultPage);

  const total = Math.floor(count);
  const currentPage = clampPage(isControlled ? page : innerPage, total);

  // 같은 틱에 두 번 눌러도 값이 밀리지 않도록 최신 페이지를 ref 로 들고 다닙니다.
  const pageRef = useRef(currentPage);
  pageRef.current = currentPage;

  const commit = useCallback(
    (resolve: (current: number) => number) => {
      const next = clampPage(resolve(pageRef.current), count);
      if (next === pageRef.current) return;
      pageRef.current = next;
      if (!isControlled) setInnerPage((prev) => (prev === next ? prev : next));
      onChange?.(next);
    },
    [count, isControlled, onChange],
  );

  if (!Number.isFinite(total) || total < 1) return null;

  const items = getPaginationItems(total, currentPage, Math.max(Math.floor(siblingCount), 0));
  const atFirst = currentPage <= 1;
  const atLast = currentPage >= total;

  const renderControl = (direction: 'previous' | 'next') => {
    const isPrevious = direction === 'previous';
    const Chevron = isPrevious ? ChevronLeft : ChevronRight;
    const controlDisabled = disabled || (isPrevious ? atFirst : atLast);

    return (
      <li>
        <button
          type={'button'}
          disabled={controlDisabled}
          aria-label={isPrevious ? previousLabel : nextLabel}
          onClick={() => commit((current) => current + (isPrevious ? -1 : 1))}
          className={getPaginationControlStyles(controlDisabled)}
        >
          <Chevron aria-hidden />
        </button>
      </li>
    );
  };

  return (
    <nav
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={getPaginationRootStyles(className)}
    >
      {/* list-style 를 지우면 Safari 가 목록 의미를 버려서 role 을 명시합니다. */}
      <ul role={'list'} className={getPaginationListStyles()}>
        {renderControl('previous')}

        {items.map((item, index) => {
          if (item === 'ellipsis') {
            return (
              // 생략 표시는 누를 수 없는 장식이라 보조 기술에서 감춥니다.
              <li key={`ellipsis-${ index }`} aria-hidden>
                <span className={getPaginationEllipsisStyles(disabled)}>
                  <MoreHorizontal />
                </span>
              </li>
            );
          }

          const selected = item === currentPage;
          return (
            <li key={item}>
              <button
                type={'button'}
                disabled={disabled}
                aria-label={pageLabel(item)}
                aria-current={selected ? 'page' : undefined}
                onClick={() => commit(() => item)}
                className={getPaginationPageStyles(selected, disabled)}
              >
                {item}
              </button>
            </li>
          );
        })}

        {renderControl('next')}
      </ul>
    </nav>
  );
};

export default Pagination;
