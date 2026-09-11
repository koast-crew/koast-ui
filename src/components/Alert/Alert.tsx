import React from 'react';
import { Check, CircleX, Info, TriangleAlert, X } from 'lucide-react';
import { AlertProps, AlertStatus } from './Alert.types';
import {
  getAlertCloseStyles,
  getAlertContentStyles,
  getAlertDescriptionStyles,
  getAlertIconStyles,
  getAlertStyles,
  getAlertTitleStyles,
} from './Alert.styles';

/** Figma 는 brand / neutral 자리에 `Icon placeholder` 만 두어 기본 아이콘을 정하지 않았습니다. */
const DEFAULT_ICONS: Record<AlertStatus, React.ReactNode> = {
  brand: null,
  neutral: null,
  info: <Info aria-hidden />,
  success: <Check aria-hidden />,
  warning: <TriangleAlert aria-hidden />,
  error: <CircleX aria-hidden />,
};

/** 사용자의 작업을 막는 상태만 보조 기술이 즉시 읽습니다. 나머지는 읽던 내용을 끊지 않습니다. */
const ASSERTIVE_STATUSES: readonly AlertStatus[] = ['warning', 'error'];

/**
 * @koast/ui Alert(알림) 컴포넌트입니다.
 * 주의가 필요한 정보나 작업 결과를 화면 흐름 안에 그대로 붙여 보여주는 인라인 알림입니다.
 *
 * @param {'brand' | 'neutral' | 'info' | 'success' | 'warning' | 'error'} [props.status='neutral'] - 상태 색 : 'brand' | 'neutral' | 'info' | 'success' | 'warning' | 'error'
 * @param {'filled' | 'outlined' | 'transparent'} [props.variant='filled'] - 면 처리 방식 : 'filled' | 'outlined' | 'transparent'
 * @param {React.ReactNode} props.title - 굵은 제목 줄 : React.ReactNode
 * @param {React.ReactNode} [props.children] - 제목 아래 본문 : React.ReactNode
 * @param {React.ReactNode | false} [props.icon] - 제목 앞 아이콘. 생략하면 status 별 기본 아이콘, `false` 면 아이콘 없음 : React.ReactNode | false
 * @param {() => void} [props.onClose] - 닫기 버튼 클릭 핸들러. 없으면 닫기 버튼이 렌더링되지 않음 : () => void
 * @param {string} [props.closeLabel='알림 닫기'] - 닫기 버튼의 aria-label : string
 * @param {string} [props.className] - 레이아웃 조정용 CSS 클래스 (색상 지정 불가) : string
 *
 * @example
 * ```tsx
 * <Alert status="success" title="저장이 완료되었습니다" />
 *
 * <Alert status="error" variant="outlined" title="비밀번호가 잘못되었습니다" onClose={handleClose}>
 *   5회 이상 실패하면 계정이 잠깁니다.
 * </Alert>
 *
 * <Alert status="info" variant="transparent" title="점검 예정" icon={false}>
 *   3월 1일 02:00 ~ 04:00 사이 서비스가 중단됩니다.
 * </Alert>
 * ```
 */
export const Alert = ({
  status = 'neutral',
  variant = 'filled',
  title,
  children,
  icon,
  onClose,
  closeLabel = '알림 닫기',
  className = '',
}: AlertProps) => {
  const resolvedIcon = icon === undefined ? DEFAULT_ICONS[status] : icon;
  const hasIcon
    = resolvedIcon !== false && resolvedIcon !== null && resolvedIcon !== undefined;

  return (
    <div
      className={getAlertStyles(variant, status, className)}
      role={ASSERTIVE_STATUSES.includes(status) ? 'alert' : 'status'}
    >
      {hasIcon && (
        <span className={getAlertIconStyles(variant, status)}>{resolvedIcon}</span>
      )}
      <div className={getAlertContentStyles()}>
        <div className={getAlertTitleStyles(variant)}>{title}</div>
        {children !== undefined && children !== null && (
          <p className={getAlertDescriptionStyles(variant)}>{children}</p>
        )}
      </div>
      {onClose && (
        <button
          type={'button'}
          className={getAlertCloseStyles(variant)}
          onClick={onClose}
          aria-label={closeLabel}
        >
          <X aria-hidden />
        </button>
      )}
    </div>
  );
};

export default Alert;
