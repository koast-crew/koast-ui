import React, {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type {
  AccordionHeadingLevel,
  AccordionItemProps,
  AccordionProps,
  AccordionSize,
} from './Accordion.types';
import {
  ACCORDION_HEADING_RESET,
  getAccordionHeaderStyles,
  getAccordionIconStyles,
  getAccordionItemStyles,
  getAccordionPanelStyles,
  getAccordionRootStyles,
  getAccordionTitleStyles,
} from './Accordion.styles';

interface AccordionContextValue {
  size: AccordionSize;
  headingLevel: AccordionHeadingLevel;
  baseId: string;
  isExpanded: (value: string) => boolean;
  toggle: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

const HEADINGS = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
} as const;

/** 화살표 키 이동 대상을 고르기 위한 표식입니다. 헤더 버튼에만 붙습니다. */
const HEADER_SELECTOR = '[data-koast-accordion-header]:not([disabled])';

/**
 * @koast/ui Accordion 컴포넌트의 항목입니다.
 * 헤더(제목 + 화살표)와 펼침 패널 한 쌍을 이룹니다.
 *
 * @param {string} props.value - 항목을 구분하는 값. 펼침 상태의 키입니다 : string
 * @param {React.ReactNode} props.title - 헤더에 표시되는 제목 : React.ReactNode
 * @param {React.ReactNode} props.children - 펼쳤을 때 표시되는 내용 : React.ReactNode
 * @param {boolean} [props.disabled=false] - 비활성화 상태 : boolean
 * @param {string} [props.className] - 레이아웃 조정용 CSS 클래스 (색상 지정 불가) : string
 *
 * @example
 * ```tsx
 * <AccordionItem value="faq-1" title="배송은 얼마나 걸리나요?">
 *   영업일 기준 2~3일 소요됩니다.
 * </AccordionItem>
 * ```
 */
export const AccordionItem = ({
  value,
  title,
  children,
  disabled = false,
  className = '',
}: AccordionItemProps) => {
  const ctx = useContext(AccordionContext);
  if (!ctx) return null;

  const expanded = ctx.isExpanded(value);
  const headerId = `${ ctx.baseId }-header-${ value }`;
  const panelId = `${ ctx.baseId }-panel-${ value }`;
  const Heading = HEADINGS[ctx.headingLevel];
  const Chevron = expanded ? ChevronUp : ChevronDown;

  return (
    <div className={getAccordionItemStyles(className)}>
      <Heading className={ACCORDION_HEADING_RESET}>
        <button
          type={'button'}
          id={headerId}
          data-koast-accordion-header={''}
          disabled={disabled}
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => ctx.toggle(value)}
          className={getAccordionHeaderStyles(ctx.size, expanded, disabled)}
        >
          <span className={getAccordionTitleStyles(ctx.size, disabled)}>{title}</span>
          <Chevron className={getAccordionIconStyles(expanded, disabled)} aria-hidden />
        </button>
      </Heading>

      <div
        id={panelId}
        role={'region'}
        aria-labelledby={headerId}
        hidden={!expanded}
        className={getAccordionPanelStyles('')}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * @koast/ui Accordion 컴포넌트입니다.
 * 여러 항목을 세로로 쌓아 제목만 보여주다가, 헤더를 누르면 해당 내용을 펼칩니다.
 * 기본은 한 번에 하나만 펼쳐지며 `multiple` 로 다중 펼침으로 바꿉니다.
 * 헤더 사이는 위/아래 방향키와 Home / End 로 이동하고, Enter / Space 로 펼치고 접습니다.
 *
 * @param {'sm' | 'md'} [props.size='md'] - 헤더 높이 (40 / 48px) : 'sm' | 'md'
 * @param {boolean} [props.multiple=false] - 여러 항목을 동시에 펼칠 수 있게 합니다 : boolean
 * @param {string[]} [props.value] - 펼쳐진 항목의 값 목록. 지정하면 제어 컴포넌트로 동작합니다 : string[]
 * @param {string[]} [props.defaultValue] - 비제어로 쓸 때의 초기 펼침 목록 : string[]
 * @param {Function} [props.onChange] - 펼침 상태가 바뀔 때 호출되는 콜백 : Function
 * @param {1 | 2 | 3 | 4 | 5 | 6} [props.headingLevel=3] - 헤더를 감싸는 제목 태그 단계 : number
 * @param {string} [props.className] - 레이아웃 조정용 CSS 클래스 (색상 지정 불가) : string
 * @param {React.ReactNode} props.children - AccordionItem 컴포넌트들 : React.ReactNode
 *
 * @example
 * ```tsx
 * <Accordion defaultValue={['faq-1']}>
 *   <AccordionItem value="faq-1" title="배송 문의">영업일 기준 2~3일 소요됩니다.</AccordionItem>
 *   <AccordionItem value="faq-2" title="교환 문의">수령 후 7일 이내 가능합니다.</AccordionItem>
 * </Accordion>
 *
 * // 다중 펼침 + 제어
 * <Accordion multiple size="sm" value={open} onChange={setOpen}>
 *   <AccordionItem value="a" title="A">내용 A</AccordionItem>
 *   <AccordionItem value="b" title="B">내용 B</AccordionItem>
 * </Accordion>
 * ```
 */
export const Accordion = ({
  size = 'md',
  multiple = false,
  value,
  defaultValue,
  onChange,
  headingLevel = 3,
  className = '',
  children,
  id,
}: AccordionProps) => {
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState<string[]>(defaultValue ?? []);
  const expanded = isControlled ? value : innerValue;

  const rootRef = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const baseId = id ?? `koast-accordion-${ reactId }`;

  const toggle = useCallback(
    (itemValue: string) => {
      const next = expanded.includes(itemValue)
        ? expanded.filter((item) => item !== itemValue)
        : multiple
          ? [...expanded, itemValue]
          : [itemValue];
      if (!isControlled) setInnerValue(next);
      onChange?.(next);
    },
    [expanded, multiple, isControlled, onChange],
  );

  const context = useMemo<AccordionContextValue>(
    () => ({
      size,
      headingLevel,
      baseId,
      isExpanded: (itemValue: string) => expanded.includes(itemValue),
      toggle,
    }),
    [size, headingLevel, baseId, expanded, toggle],
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;

    const target = event.target as HTMLElement;
    if (!target.matches?.(HEADER_SELECTOR)) return;

    const headers = Array.from(
      rootRef.current?.querySelectorAll<HTMLButtonElement>(HEADER_SELECTOR) ?? [],
    );
    if (!headers.length) return;

    event.preventDefault();
    const current = headers.indexOf(target as HTMLButtonElement);
    const last = headers.length - 1;
    const nextIndex
      = event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? last
          : (current + (event.key === 'ArrowDown' ? 1 : -1) + headers.length) % headers.length;
    headers[nextIndex]?.focus();
  };

  return (
    <div ref={rootRef} onKeyDown={handleKeyDown} className={getAccordionRootStyles(className)}>
      <AccordionContext.Provider value={context}>{children}</AccordionContext.Provider>
    </div>
  );
};

export default Accordion;
