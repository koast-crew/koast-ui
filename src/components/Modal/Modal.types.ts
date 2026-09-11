import React from 'react';

/** Footer 버튼 스택의 가로 정렬입니다. Figma 에 정렬 값이 없어 열어 둔 축입니다. */
export type ModalFooterAlign = 'start' | 'center' | 'end';

/**
 * 주 버튼의 intent 입니다. Figma 의 Primary button 이 인스턴스에 따라
 * 파랑(`#2563eb`) 과 빨강(`#dc2626`) 두 가지로 나타납니다.
 */
export type ModalConfirmColor = 'primary' | 'danger';

export interface ModalProps {
  /** 열림 상태입니다. false 면 아무것도 렌더링하지 않습니다. */
  open: boolean;

  /** 닫기 요청 콜백입니다. 닫기 버튼·Escape·배경 클릭이 모두 이 콜백을 부릅니다. */
  onClose: () => void;

  /** Figma `Title` 슬롯입니다. 제목이며 `aria-labelledby` 로 대화 상자에 연결됩니다. */
  title: React.ReactNode;

  /** Figma `Description` 슬롯입니다. 주면 `aria-describedby` 로 연결됩니다. */
  description?: React.ReactNode;

  /** Figma `Slot group` 슬롯입니다. 자식들은 16px 세로 간격으로 쌓입니다. */
  children?: React.ReactNode;

  /**
   * Figma `Button Stack` 슬롯입니다. 직접 합성하려면 여기에 `Button` 을 넣으세요.
   * 주면 `confirmLabel` / `cancelLabel` 기반의 기본 스택을 대신합니다.
   */
  footer?: React.ReactNode;

  /** 기본 Button Stack 의 주 버튼 라벨입니다. `footer` 가 있으면 무시됩니다. */
  confirmLabel?: React.ReactNode;

  /** 기본 Button Stack 의 보조 버튼 라벨입니다. `footer` 가 있으면 무시됩니다. */
  cancelLabel?: React.ReactNode;

  /** 주 버튼 클릭 콜백입니다. */
  onConfirm?: () => void;

  /** 보조 버튼 클릭 콜백입니다. 생략하면 `onClose` 가 쓰입니다. */
  onCancel?: () => void;

  /** 주 버튼의 intent 입니다. @default 'primary' */
  confirmColor?: ModalConfirmColor;

  /** 주 버튼의 로딩 상태입니다. @default false */
  confirmLoading?: boolean;

  /** 주 버튼의 비활성화 상태입니다. @default false */
  confirmDisabled?: boolean;

  /** Button Stack 의 가로 정렬입니다. @default 'end' */
  footerAlign?: ModalFooterAlign;

  /** 헤더 오른쪽 닫기 버튼 표시 여부입니다. @default true */
  showCloseButton?: boolean;

  /** 닫기 버튼의 `aria-label` 입니다. @default '닫기' */
  closeLabel?: string;

  /** Escape 키로 닫을지 여부입니다. @default true */
  closeOnEscape?: boolean;

  /** 배경(overlay) 클릭으로 닫을지 여부입니다. @default true */
  closeOnOverlayClick?: boolean;

  /** 열렸을 때 포커스를 받을 요소입니다. 생략하면 대화 상자 안 첫 포커스 대상입니다. */
  initialFocusRef?: React.RefObject<HTMLElement | null>;

  /** 대화 상자의 최대 너비입니다. 숫자는 px 로 해석됩니다. @default 464 */
  width?: number | string;

  /** portal 이 붙을 대상입니다. @default document.body */
  container?: HTMLElement | null;

  /** 레이아웃 조정용 CSS 클래스입니다. 색상은 지정할 수 없습니다. */
  className?: string;

  /** 대화 상자 id 입니다. 생략하면 자동 생성됩니다. */
  id?: string;
}
