import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from '../Link/Link';
import type { BreadcrumbsProps } from './Breadcrumbs.types';
import {
  BREADCRUMBS_ITEM,
  BREADCRUMBS_ITEM_ICON,
  BREADCRUMBS_LIST,
  BREADCRUMBS_SEPARATOR,
  getBreadcrumbsStyles,
  getBreadcrumbsTextStyles,
} from './Breadcrumbs.styles';

/**
 * @koast/ui 탐색 경로(Breadcrumbs) 컴포넌트입니다.
 *
 * 계층 구조에서 사용자의 현재 위치를 보여주고 상위 경로로 바로 이동하게 합니다.
 * `<nav>` + `<ol>` 구조로 렌더링되며 마지막 항목이 현재 위치로 간주되어
 * `aria-current="page"` 가 붙고 링크가 아닌 텍스트가 됩니다. 구분자는 보조 기술에서 숨겨집니다.
 *
 * @param {BreadcrumbItem[]} props.items - 최상위부터 현재 위치까지 순서대로 나열한 항목 배열
 * @param {string} [props.aria-label='탐색 경로'] - `<nav>` 의 접근 가능한 이름
 * @param {React.ReactNode} [props.separator] - 항목 사이 구분자. 기본값은 chevron-right 아이콘
 * @param {string} [props.className=''] - 레이아웃 조정용 CSS 클래스 (색상 지정 불가)
 *
 * @example
 * ```tsx
 * <Breadcrumbs
 *   items={[
 *     { label: '홈', href: '/' },
 *     { label: '카테고리', href: '/category' },
 *     { label: '제품', href: '/category/product' },
 *     { label: '상세 페이지' },
 *   ]}
 * />
 *
 * // 라우터 연동
 * <Breadcrumbs
 *   items={[
 *     { label: '홈', href: '/', onClick: (e) => { e.preventDefault(); navigate('/'); } },
 *     { label: '관측소' },
 *   ]}
 * />
 * ```
 */
export const Breadcrumbs = ({
  items,
  'aria-label': ariaLabel = '탐색 경로',
  separator,
  className = '',
  ...rest
}: BreadcrumbsProps) => {
  const separatorNode = separator ?? <ChevronRight />;
  const lastIndex = items.length - 1;

  return (
    <nav
      {...rest}
      aria-label={ariaLabel}
      className={getBreadcrumbsStyles(className)}
    >
      <ol className={BREADCRUMBS_LIST}>
        {items.map((item, index) => {
          const isCurrent = index === lastIndex;
          // 현재 위치는 이동할 곳이 없으므로 href 가 있어도 링크로 만들지 않습니다.
          const isLink = !isCurrent && Boolean(item.href);

          return (
            <li key={index} className={BREADCRUMBS_ITEM}>
              {index > 0 && (
                <span className={BREADCRUMBS_SEPARATOR} aria-hidden={'true'}>
                  {separatorNode}
                </span>
              )}
              {isLink
                ? (
                    <Link
                      href={item.href as string}
                      color={'secondary'}
                      startIcon={item.icon}
                      onClick={item.onClick}
                    >
                      {item.label}
                    </Link>
                  )
                : (
                    <span
                      aria-current={isCurrent ? 'page' : undefined}
                      className={getBreadcrumbsTextStyles(isCurrent)}
                    >
                      {item.icon && (
                        <span className={BREADCRUMBS_ITEM_ICON}>{item.icon}</span>
                      )}
                      <span>{item.label}</span>
                    </span>
                  )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
