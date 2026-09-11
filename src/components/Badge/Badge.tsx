import { BadgeProps } from './Badge.types';
import { formatBadgeCount, getBadgeStyles } from './Badge.styles';

/**
 * @koast/ui Badge 컴포넌트입니다.
 * 숫자나 상태를 강조하는 작은 알림 레이블로, 알림 수나 처리 상태를 시각적으로 표시할 때 씁니다.
 * Figma 의 세 컴포넌트 셋(`Badge/Dot` · `Badge/Number` · `Badge/Text`)을 `type` 하나로 묶었습니다.
 *
 * @param {'dot' | 'number' | 'text'} [props.type='text'] - 뱃지 형태 (4 / 20 / 24px 높이) : 'dot' | 'number' | 'text'
 * @param {'primary' | 'secondary'} [props.variant='primary'] - 채운 면 / 연한 면 + 테두리 : 'primary' | 'secondary'
 * @param {'neutral' | 'information' | 'success' | 'warning' | 'error'} [props.status='neutral'] - 의미 색상 : string
 * @param {number} [props.count] - `type='number'` 일 때 표시할 수 : number
 * @param {number} [props.max=999] - `count` 의 상한. 넘으면 `+999` 처럼 잘립니다 : number
 * @param {React.ReactNode} [props.children] - `type='text'` 일 때 표시할 라벨 : React.ReactNode
 * @param {string} [props.className] - 레이아웃 조정용 CSS 클래스 (색상 지정 불가) : string
 * @param {string} [props['aria-label']] - 스크린 리더용 설명 : string
 *
 * @example
 * ```tsx
 * // 텍스트 뱃지
 * <Badge status="success">완료</Badge>
 *
 * // 숫자 뱃지 — 1000 은 +999 로 표시됩니다
 * <Badge type="number" status="error" count={1000} />
 *
 * // 점 뱃지 — variant 는 무시됩니다
 * <Badge type="dot" status="warning" aria-label="확인하지 않은 알림" />
 *
 * // 연한 면 + 1px 테두리
 * <Badge variant="secondary" status="information">진행 중</Badge>
 * ```
 */
export const Badge = ({
  type = 'text',
  variant = 'primary',
  status = 'neutral',
  count,
  max = 999,
  children,
  className = '',
  'aria-label': ariaLabel,
}: BadgeProps) => {
  const content
    = type === 'dot'
      ? null
      : type === 'number' && count !== undefined
        ? formatBadgeCount(count, max)
        : children;

  // role 없는 span 에 aria-label 만 붙이면 보조 기술이 무시하고 axe 도 위반으로 잡습니다.
  return (
    <span
      className={getBadgeStyles(type, variant, status, className)}
      aria-label={ariaLabel}
      aria-hidden={type === 'dot' && !ariaLabel ? true : undefined}
      role={ariaLabel ? 'img' : undefined}
    >
      {content}
    </span>
  );
};

export default Badge;
