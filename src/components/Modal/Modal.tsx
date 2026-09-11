import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { ModalProps } from './Modal.types';
import {
  BODY,
  CLOSE_BUTTON,
  DESCRIPTION,
  FOOTER,
  HEADER,
  OVERLAY,
  SLOT_GROUP,
  TITLE,
  getButtonStackStyles,
  getPanelStyles,
} from './Modal.styles';
import Button from '../Button/Button';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'audio[controls]',
  'video[controls]',
  'summary',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const getFocusable = (root: HTMLElement | null): HTMLElement[] => {
  if (!root) return [];
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (node) => node.getClientRects().length > 0 && node.getAttribute('aria-hidden') !== 'true',
  );
};

// 모달이 겹쳐 열릴 수 있어 잠금을 세어 둡니다. 마지막 하나가 닫힐 때만 원래 값으로 되돌립니다.
let scrollLockCount = 0;
let savedOverflow = '';
let savedPaddingRight = '';

const lockBodyScroll = () => {
  const { body } = document;
  if (scrollLockCount === 0) {
    savedOverflow = body.style.overflow;
    savedPaddingRight = body.style.paddingRight;
    // 스크롤바가 사라지면서 배경이 옆으로 튀는 것을 막습니다.
    const gap = window.innerWidth - document.documentElement.clientWidth;
    if (gap > 0) {
      const current = parseFloat(window.getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${ current + gap }px`;
    }
    body.style.overflow = 'hidden';
  }
  scrollLockCount += 1;
};

const unlockBodyScroll = () => {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) {
    document.body.style.overflow = savedOverflow;
    document.body.style.paddingRight = savedPaddingRight;
  }
};

/**
 * @koast/ui Modal(대화 상자) 컴포넌트입니다.
 * 화면 위에 떠서 사용자의 주의를 집중시키는 대화 상자로, 중요한 확인·입력 작업에 사용합니다.
 *
 * `createPortal` 로 `document.body` 에 붙어 `overflow: hidden` 조상 안에서도 잘리지 않습니다.
 * 열리면 대화 상자 안으로 포커스를 가두고(Tab / Shift+Tab), 닫히면 열기 전 요소로 포커스를 되돌립니다.
 * 열려 있는 동안 배경 스크롤은 잠깁니다.
 *
 * @param {boolean} props.open - 열림 상태 : boolean
 * @param {Function} props.onClose - 닫기 요청 콜백. 닫기 버튼·Escape·배경 클릭이 호출합니다 : Function
 * @param {React.ReactNode} props.title - 제목. `aria-labelledby` 로 연결됩니다 : React.ReactNode
 * @param {React.ReactNode} [props.description] - 보조 설명. 있으면 `aria-describedby` 로 연결됩니다 : React.ReactNode
 * @param {React.ReactNode} [props.children] - 본문 슬롯. 16px 세로 간격으로 쌓입니다 : React.ReactNode
 * @param {React.ReactNode} [props.footer] - 버튼 스택 슬롯. 주면 기본 스택을 대신합니다 : React.ReactNode
 * @param {React.ReactNode} [props.confirmLabel] - 기본 스택의 주 버튼 라벨 : React.ReactNode
 * @param {React.ReactNode} [props.cancelLabel] - 기본 스택의 보조 버튼 라벨 : React.ReactNode
 * @param {Function} [props.onConfirm] - 주 버튼 클릭 콜백 : Function
 * @param {Function} [props.onCancel] - 보조 버튼 클릭 콜백. 생략하면 `onClose` : Function
 * @param {'primary' | 'danger'} [props.confirmColor='primary'] - 주 버튼 intent : 'primary' | 'danger'
 * @param {boolean} [props.confirmLoading=false] - 주 버튼 로딩 상태 : boolean
 * @param {boolean} [props.confirmDisabled=false] - 주 버튼 비활성화 상태 : boolean
 * @param {'start' | 'center' | 'end'} [props.footerAlign='end'] - 버튼 스택 가로 정렬 : 'start' | 'center' | 'end'
 * @param {boolean} [props.showCloseButton=true] - 헤더 닫기 버튼 표시 여부 : boolean
 * @param {string} [props.closeLabel='닫기'] - 닫기 버튼의 aria-label : string
 * @param {boolean} [props.closeOnEscape=true] - Escape 로 닫기 : boolean
 * @param {boolean} [props.closeOnOverlayClick=true] - 배경 클릭으로 닫기 : boolean
 * @param {React.RefObject} [props.initialFocusRef] - 열렸을 때 포커스를 받을 요소 : React.RefObject
 * @param {number | string} [props.width=464] - 최대 너비 (숫자는 px) : number | string
 * @param {HTMLElement} [props.container] - portal 대상 : HTMLElement
 * @param {string} [props.className] - 레이아웃 조정용 CSS 클래스 (색상 지정 불가) : string
 *
 * @example
 * ```tsx
 * <Modal
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="Remove Access Group"
 *   description="Are you sure you want to remove this access group?"
 *   cancelLabel="Cancel"
 *   confirmLabel="Remove"
 *   confirmColor="danger"
 *   onConfirm={handleRemove}
 * />
 *
 * // 본문 슬롯과 버튼 스택을 직접 합성
 * <Modal
 *   open={open}
 *   onClose={close}
 *   title="Create Access Group"
 *   description="Enter an access group name."
 *   footer={<Button variant="contained" onClick={submit}>생성</Button>}
 * >
 *   <TextField label="이름" />
 * </Modal>
 * ```
 */
export const Modal = ({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  confirmColor = 'primary',
  confirmLoading = false,
  confirmDisabled = false,
  footerAlign = 'end',
  showCloseButton = true,
  closeLabel = '닫기',
  closeOnEscape = true,
  closeOnOverlayClick = true,
  initialFocusRef,
  width = 464,
  container,
  className = '',
  id,
}: ModalProps) => {
  // SSR 에서는 document 가 없습니다. 마운트 이후에만 portal 을 만듭니다.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const panelRef = useRef<HTMLDivElement>(null);
  const overlayMouseDown = useRef(false);

  const reactId = useId();
  const baseId = id ?? `koast-modal-${ reactId }`;
  const titleId = `${ baseId }-title`;
  const descriptionId = `${ baseId }-description`;

  useEffect(() => {
    if (!open || !mounted) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    lockBodyScroll();

    // ref 는 커밋 이후에 채워지므로 여기서 읽어야 초기 포커스 대상이 잡힙니다.
    const target = initialFocusRef?.current ?? getFocusable(panelRef.current)[0] ?? panelRef.current;
    target?.focus();

    return () => {
      unlockBodyScroll();
      // 열기 전 포커스로 되돌립니다. 그 사이 사라진 요소라면 아무것도 하지 않습니다.
      if (previouslyFocused?.isConnected) previouslyFocused.focus();
    };
  }, [open, mounted, initialFocusRef]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      // Select 드롭다운처럼 안쪽 레이어가 이미 Escape 를 소비했다면 모달은 닫지 않습니다.
      if (event.key === 'Escape' && closeOnEscape && !event.defaultPrevented) {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = getFocusable(panelRef.current);
      const panel = panelRef.current;
      if (!panel) return;

      // 포커스 대상이 없으면 대화 상자 밖으로 나가지 못하게 이동 자체를 막습니다.
      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (!active || !panel.contains(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
        return;
      }

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [closeOnEscape, onClose],
  );

  if (!open || !mounted) return null;

  const hasDefaultStack = confirmLabel !== undefined || cancelLabel !== undefined;

  const defaultStack = hasDefaultStack && (
    <>
      {cancelLabel !== undefined && (
        <Button
          variant={'outlined'}
          color={'secondary'}
          size={'md'}
          onClick={onCancel ?? onClose}
        >
          {cancelLabel}
        </Button>
      )}
      {confirmLabel !== undefined && (
        <Button
          variant={'contained'}
          color={confirmColor}
          size={'md'}
          loading={confirmLoading}
          disabled={confirmDisabled}
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      )}
    </>
  );

  const stack = footer ?? (defaultStack || null);

  const dialog = (
    <div
      className={OVERLAY}
      onMouseDown={(event) => {
        overlayMouseDown.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        // 대화 상자 안에서 시작한 드래그가 배경에서 끝난 경우는 닫지 않습니다.
        if (!closeOnOverlayClick) return;
        if (overlayMouseDown.current && event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role={'dialog'}
        aria-modal={'true'}
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        id={baseId}
        tabIndex={-1}
        style={{ maxWidth: width }}
        className={getPanelStyles(className)}
        onKeyDown={handleKeyDown}
      >
        <div className={HEADER}>
          <h2 id={titleId} className={TITLE}>{title}</h2>
          {showCloseButton && (
            <button
              type={'button'}
              aria-label={closeLabel}
              onClick={onClose}
              className={CLOSE_BUTTON}
            >
              <X aria-hidden />
            </button>
          )}
        </div>

        {(description || children) && (
          <div className={BODY}>
            {description && (
              <p id={descriptionId} className={DESCRIPTION}>{description}</p>
            )}
            {children && <div className={SLOT_GROUP}>{children}</div>}
          </div>
        )}

        {stack && (
          <div className={FOOTER}>
            <div className={getButtonStackStyles(footerAlign)}>{stack}</div>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(dialog, container ?? document.body);
};

export default Modal;
