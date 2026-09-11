import React from 'react';
import { Check, CircleX, Info, TriangleAlert } from 'lucide-react';
import { StatusChipProps, StatusChipStatus } from './StatusChip.types';
import { getStatusChipStyles } from './StatusChip.styles';

/** Figma 는 neutral 자리에 `Icon placeholder` 만 두어 기본 아이콘을 정하지 않았습니다. */
const DEFAULT_ICONS: Record<StatusChipStatus, React.ReactNode> = {
  neutral: null,
  info: <Info aria-hidden />,
  error: <CircleX aria-hidden />,
  success: <Check aria-hidden />,
  warning: <TriangleAlert aria-hidden />,
};

/**
 * @koast/ui StatusChip(상태칩) 컴포넌트입니다.
 * 항목의 상태나 진행 상황을 나타내는 작은 레이블이며, 클릭할 수 없는 표시 전용 요소입니다.
 *
 * @param {'neutral' | 'info' | 'error' | 'success' | 'warning'} [props.status='neutral'] - 상태 색 : 'neutral' | 'info' | 'error' | 'success' | 'warning'
 * @param {'filled' | 'outlined' | 'transparent'} [props.variant='filled'] - 면 처리 방식 : 'filled' | 'outlined' | 'transparent'
 * @param {'round' | 'square'} [props.shape='round'] - 모서리 모양 (pill / 4px) : 'round' | 'square'
 * @param {'sm' | 'md'} [props.size='md'] - 칩 최소 높이 (28 / 32px) : 'sm' | 'md'
 * @param {React.ReactNode | false} [props.icon] - 라벨 앞 아이콘. 생략하면 status 별 기본 아이콘, `false` 면 아이콘 없음 : React.ReactNode | false
 * @param {React.ReactNode} props.children - 칩에 표시될 라벨 : React.ReactNode
 * @param {string} [props.className] - 레이아웃 조정용 CSS 클래스 (색상 지정 불가) : string
 *
 * @example
 * ```tsx
 * <StatusChip status="success">완료됨</StatusChip>
 *
 * <StatusChip status="warning" variant="outlined" shape="square" size="sm">
 *   대기 중
 * </StatusChip>
 *
 * <StatusChip status="info" icon={false}>진행 중</StatusChip>
 * ```
 */
export const StatusChip = ({
  status = 'neutral',
  variant = 'filled',
  shape = 'round',
  size = 'md',
  icon,
  children,
  className = '',
}: StatusChipProps) => {
  const resolvedIcon = icon === undefined ? DEFAULT_ICONS[status] : icon;
  const hasIcon = resolvedIcon !== false && resolvedIcon !== null && resolvedIcon !== undefined;

  return (
    <span
      className={getStatusChipStyles(variant, status, shape, size, hasIcon, className)}
    >
      {hasIcon && resolvedIcon}
      <span className={'koast-truncate'}>{children}</span>
    </span>
  );
};

export default StatusChip;
