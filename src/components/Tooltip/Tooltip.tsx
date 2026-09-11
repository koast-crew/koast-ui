import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { TooltipProps } from './Tooltip.types';
import {
  getArrowBoxStyles,
  getArrowStyles,
  getPanelStyles,
  getRootStyles,
} from './Tooltip.styles';

interface TriggerProps {
  'aria-describedby'?: string;
}

/**
 * @koast/ui Tooltip(툴팁) 컴포넌트입니다.
 * 트리거에 마우스를 올리거나 키보드 포커스를 주면 보조 설명을 띄웁니다.
 * 포커스로도 열리고 Escape 로 닫히므로 키보드만으로도 내용을 읽을 수 있습니다.
 *
 * @param {React.ReactNode} props.content - 툴팁에 표시될 내용 : React.ReactNode
 * @param {React.ReactElement} props.children - 툴팁을 띄울 단일 트리거 엘리먼트 : React.ReactElement
 * @param {'top' | 'bottom' | 'left' | 'right'} [props.placement='top'] - 트리거를 기준으로 패널이 놓이는 변 : 'top' | 'bottom' | 'left' | 'right'
 * @param {'start' | 'center' | 'end'} [props.align='center'] - 놓인 변 위에서의 정렬 : 'start' | 'center' | 'end'
 * @param {'default' | 'inverse'} [props.variant='default'] - 면 색 (어두운 면 / 밝은 면) : 'default' | 'inverse'
 * @param {boolean} [props.arrow=true] - 화살표 표시 여부 : boolean
 * @param {boolean} [props.open] - 열림 상태. 지정하면 제어 컴포넌트로 동작합니다 : boolean
 * @param {boolean} [props.defaultOpen=false] - 비제어로 쓸 때의 초기 열림 상태 : boolean
 * @param {Function} [props.onOpenChange] - 열림 상태가 바뀔 때 호출되는 콜백 : Function
 * @param {boolean} [props.disabled=false] - 툴팁을 끄고 트리거만 렌더링 : boolean
 * @param {number | string} [props.maxWidth=240] - 패널 최대 너비 (숫자는 px) : number | string
 * @param {string} [props.className] - 래퍼 레이아웃 조정용 CSS 클래스 (색상 지정 불가) : string
 *
 * @example
 * ```tsx
 * <Tooltip content="현재 문서를 저장합니다">
 *   <Button>저장</Button>
 * </Tooltip>
 *
 * <Tooltip content="설명" placement="right" align="start" variant="inverse">
 *   <Button variant="text">도움말</Button>
 * </Tooltip>
 *
 * // 화살표 없이 (Figma Direction=None)
 * <Tooltip content="설명" arrow={false}>
 *   <span>항목</span>
 * </Tooltip>
 * ```
 */
export const Tooltip = ({
  content,
  children,
  placement = 'top',
  align = 'center',
  variant = 'default',
  arrow = true,
  open,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  maxWidth = 240,
  className = '',
  id,
}: TooltipProps) => {
  const isControlled = open !== undefined;
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const isOpen = !disabled && (isControlled ? open : innerOpen);

  const rootRef = useRef<HTMLSpanElement>(null);
  const reactId = useId();
  const tooltipId = id ?? `koast-tooltip-${ reactId }`;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInnerOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  // 포인터로만 연 경우에도 Escape 로 닫혀야 하므로 문서 전체에서 받습니다.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, setOpen]);

  const trigger = children as React.ReactElement<TriggerProps>;
  const describedBy = [trigger.props?.['aria-describedby'], isOpen ? tooltipId : undefined]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      ref={rootRef}
      className={getRootStyles(className)}
      onMouseEnter={() => setOpen(true)}
      // 포커스로 열린 툴팁이 포인터가 지나갔다는 이유로 닫히면 안 됩니다.
      onMouseLeave={() => {
        if (!rootRef.current?.contains(document.activeElement)) setOpen(false);
      }}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {React.isValidElement(trigger)
        ? React.cloneElement(trigger, { 'aria-describedby': describedBy || undefined })
        : children}

      {isOpen && (
        <span
          id={tooltipId}
          role={'tooltip'}
          style={{ maxWidth }}
          className={getPanelStyles(placement, align, variant)}
        >
          {content}
          {arrow && (
            <span className={getArrowBoxStyles(placement, align)} aria-hidden>
              <span className={getArrowStyles(placement, variant)} />
            </span>
          )}
        </span>
      )}
    </span>
  );
};

export default Tooltip;
