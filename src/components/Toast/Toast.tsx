import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { ToastProps, ToastStatus } from './Toast.types';
import {
  getToastActionStyles,
  getToastButtonGroupStyles,
  getToastCloseStyles,
  getToastContentStyles,
  getToastDescriptionStyles,
  getToastStyles,
  getToastTitleStyles,
} from './Toast.styles';

/** 사용자의 작업을 막는 상태만 보조 기술이 즉시 읽습니다. 나머지는 읽던 내용을 끊지 않습니다. */
const ASSERTIVE_STATUSES: readonly ToastStatus[] = ['warning', 'error'];

/**
 * @koast/ui Toast(토스트) 컴포넌트입니다.
 * 작업 결과를 짧게 알리는 일시적 알림이며, `duration` 을 주면 스스로 사라집니다.
 * 화면 배치(하단 고정·스택·애니메이션)는 이 컴포넌트가 하지 않고 감싸는 쪽이 정합니다.
 *
 * @param {'brand' | 'neutral' | 'info' | 'success' | 'warning' | 'error' | 'inverse'} [props.status='neutral'] - 상태 색 : 'brand' | 'neutral' | 'info' | 'success' | 'warning' | 'error' | 'inverse'
 * @param {'text' | 'action' | 'longAction'} [props.type='text'] - 액션 행 배치. action 은 본문 오른쪽, longAction 은 본문 아래 : 'text' | 'action' | 'longAction'
 * @param {React.ReactNode} props.title - 굵은 제목 줄 : React.ReactNode
 * @param {React.ReactNode} [props.children] - 제목 아래 본문 : React.ReactNode
 * @param {React.ReactNode} [props.actionLabel] - 액션 버튼 라벨 : React.ReactNode
 * @param {() => void} [props.onAction] - 액션 버튼 클릭 핸들러 : () => void
 * @param {() => void} [props.onClose] - 닫기 버튼 클릭 · 자동 닫힘 핸들러. 없으면 닫기 버튼이 렌더링되지 않음 : () => void
 * @param {string} [props.closeLabel='알림 닫기'] - 닫기 버튼의 aria-label : string
 * @param {number} [props.duration] - 자동으로 닫히기까지의 시간(ms). hover / focus 중에는 멈춤 : number
 * @param {string} [props.className] - 레이아웃 조정용 CSS 클래스 (색상 지정 불가) : string
 *
 * @example
 * ```tsx
 * <Toast status="success" title="업로드 완료" onClose={dismiss} duration={4000}>
 *   파일이 성공적으로 업로드되었습니다.
 * </Toast>
 *
 * // 본문 오른쪽에 액션을 두는 형태
 * <Toast
 *   status="error"
 *   type="action"
 *   title="전송 실패"
 *   actionLabel="다시 시도"
 *   onAction={retry}
 *   onClose={dismiss}
 * >
 *   네트워크 연결을 확인해 주세요.
 * </Toast>
 *
 * // 액션 라벨이 길어 본문 아래로 내리는 형태
 * <Toast type="longAction" status="inverse" title="설정이 저장되었습니다" actionLabel="변경 내용 되돌리기" onAction={undo} onClose={dismiss} />
 * ```
 */
export const Toast = ({
  status = 'neutral',
  type = 'text',
  title,
  children,
  actionLabel,
  onAction,
  onClose,
  closeLabel = '알림 닫기',
  duration,
  className = '',
}: ToastProps) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  // 타이머를 다시 걸 때마다 onClose 가 바뀌어도 남은 시간이 초기화되지 않도록 ref 로 들고 있습니다.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const remainingRef = useRef(duration ?? 0);

  useEffect(() => {
    remainingRef.current = duration ?? 0;
  }, [duration]);

  const paused = hovered || focused;

  useEffect(() => {
    if (!duration || duration <= 0 || paused) return undefined;

    const startedAt = Date.now();
    const timer = window.setTimeout(() => {
      remainingRef.current = 0;
      onCloseRef.current?.();
    }, remainingRef.current);

    return () => {
      window.clearTimeout(timer);
      remainingRef.current = Math.max(
        0,
        remainingRef.current - (Date.now() - startedAt),
      );
    };
  }, [duration, paused]);

  const hasAction = type !== 'text' && actionLabel !== undefined && actionLabel !== null;
  const showButtonGroup = hasAction || Boolean(onClose);
  const assertive = ASSERTIVE_STATUSES.includes(status);

  return (
    <div
      className={getToastStyles(type, status, className)}
      role={assertive ? 'alert' : 'status'}
      aria-live={assertive ? 'assertive' : 'polite'}
      aria-atomic={'true'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div className={getToastContentStyles()}>
        <div className={getToastTitleStyles(status)}>{title}</div>
        {children !== undefined && children !== null && (
          <p className={getToastDescriptionStyles(status)}>{children}</p>
        )}
      </div>
      {showButtonGroup && (
        <div className={getToastButtonGroupStyles(type)}>
          {hasAction && (
            <button
              type={'button'}
              className={getToastActionStyles(status)}
              onClick={onAction}
            >
              {actionLabel}
            </button>
          )}
          {onClose && (
            <button
              type={'button'}
              className={getToastCloseStyles(status)}
              onClick={onClose}
              aria-label={closeLabel}
            >
              <X aria-hidden />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Toast;
