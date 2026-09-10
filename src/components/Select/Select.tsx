import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Check, ChevronDown, ChevronUp, CircleX } from 'lucide-react';
import { SelectProps, SelectItemProps } from './Select.types';
import {
  getHelpTextStyles,
  getMenuStyles,
  getOptionStyles,
  getTriggerStyles,
  getTriggerTextStyles,
} from './Select.styles';
import { twMerge } from '../../utils/twMerge';

type ItemValue = string | number;

interface SelectContextValue {
  selectedValue?: ItemValue;
  activeValue?: ItemValue;
  optionId: (value: ItemValue) => string;
  onSelect: (value: ItemValue) => void;
  registerOption: (value: ItemValue, node: HTMLLIElement | null) => void;
}

const SelectContext = createContext<SelectContextValue | null>(null);

/**
 * @koast/ui Select(Dropdown) 컴포넌트의 옵션입니다.
 *
 * @param {string | number} props.value - 항목의 값입니다.
 * @param {React.ReactNode} props.children - 항목에 표시될 내용 : React.ReactNode
 * @param {boolean} [props.disabled=false] - 비활성화 상태 : boolean
 * @param {string} [props.className] - 레이아웃 조정용 CSS 클래스 (색상 지정 불가) : string
 *
 * @example
 * ```tsx
 * <SelectItem value="option1">옵션 1</SelectItem>
 * <SelectItem value={10}>10</SelectItem>
 * ```
 */
export const SelectItem = ({
  value,
  children,
  disabled = false,
  className = '',
}: SelectItemProps) => {
  const ctx = useContext(SelectContext);
  const selected = ctx?.selectedValue === value;
  const active = ctx?.activeValue === value;

  return (
    <li
      ref={(node) => ctx?.registerOption(value, node)}
      id={ctx?.optionId(value)}
      role={'option'}
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      onClick={() => !disabled && ctx?.onSelect(value)}
      className={getOptionStyles(selected, disabled, active, className)}
    >
      <span className={'koast-flex koast-size-4 koast-shrink-0 koast-items-center koast-justify-center'}>
        {selected && <Check className={'koast-size-4'} aria-hidden />}
      </span>
      <span className={'koast-truncate'}>{children}</span>
    </li>
  );
};

/**
 * @koast/ui Select(Dropdown) 컴포넌트입니다.
 * 여러 옵션 중 하나를 선택하는 입력 요소로, 라벨·보조 문구·오류 상태를 함께 표시합니다.
 *
 * @param {string | number} [props.value] - 선택된 값. 지정하면 제어 컴포넌트로 동작합니다 : string | number
 * @param {string | number} [props.defaultValue] - 비제어로 쓸 때의 초기 값 : string | number
 * @param {Function} [props.onChange] - 값 변경 시 호출되는 콜백 : Function
 * @param {React.ReactNode} [props.label] - 트리거 위에 표시되는 라벨 : React.ReactNode
 * @param {string} [props.placeholder] - 값이 없을 때 표시되는 문구 : string
 * @param {React.ReactNode} [props.helpText] - 트리거 아래 보조 문구. error 면 빨간색 : React.ReactNode
 * @param {boolean} [props.error=false] - 오류 상태 : boolean
 * @param {boolean} [props.disabled=false] - 비활성화 상태 : boolean
 * @param {boolean} [props.required=false] - 필수 입력 여부 : boolean
 * @param {'sm' | 'md'} [props.size='md'] - 트리거 높이 (40 / 48px) : 'sm' | 'md'
 * @param {4 | 6 | 8} [props.visibleOptions=8] - 드롭다운에 한 번에 보이는 옵션 수 : 4 | 6 | 8
 * @param {string} [props.className] - 레이아웃 조정용 CSS 클래스 (색상 지정 불가) : string
 * @param {React.ReactNode} props.children - SelectItem 컴포넌트들 : React.ReactNode
 *
 * @example
 * ```tsx
 * <Select label="국가" placeholder="선택하세요" value={country} onChange={setCountry}>
 *   <SelectItem value="kr">대한민국</SelectItem>
 *   <SelectItem value="jp">일본</SelectItem>
 * </Select>
 *
 * <Select error helpText="필수 항목입니다" size="sm" visibleOptions={4}>
 *   <SelectItem value={10}>10</SelectItem>
 * </Select>
 * ```
 */
export const Select = <T extends string | number = string>(
  props: SelectProps<T>,
) => {
  const {
    value,
    defaultValue,
    onChange,
    label,
    placeholder,
    helpText,
    error = false,
    disabled = false,
    required = false,
    size = 'md',
    visibleOptions = 8,
    className = '',
    children,
    id,
    name,
  } = props;

  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState<ItemValue | undefined>(defaultValue);
  const selectedValue = isControlled ? value : innerValue;

  const [open, setOpen] = useState(false);
  const [activeValue, setActiveValue] = useState<ItemValue | undefined>();

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef(new Map<ItemValue, HTMLLIElement>());

  const reactId = useId();
  const baseId = id ?? `koast-select-${ reactId }`;
  const listboxId = `${ baseId }-listbox`;
  const helpId = `${ baseId }-help`;
  const optionId = useCallback(
    (v: ItemValue) => `${ baseId }-option-${ String(v) }`,
    [baseId],
  );

  const items = useMemo(() => {
    const out: { value: ItemValue; disabled: boolean; label: React.ReactNode }[] = [];
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement<SelectItemProps>(child)) return;
      out.push({
        value: child.props.value,
        disabled: child.props.disabled ?? false,
        label: child.props.children,
      });
    });
    return out;
  }, [children]);

  const selectedItem = items.find((item) => item.value === selectedValue);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open]);

  useEffect(() => {
    if (open && activeValue !== undefined) {
      optionRefs.current.get(activeValue)?.scrollIntoView({ block: 'nearest' });
    }
  }, [open, activeValue]);

  const registerOption = useCallback((v: ItemValue, node: HTMLLIElement | null) => {
    if (node) optionRefs.current.set(v, node);
    else optionRefs.current.delete(v);
  }, []);

  const commit = (next: ItemValue) => {
    if (!isControlled) setInnerValue(next);
    onChange?.(next as T);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const openMenu = () => {
    setActiveValue(selectedValue ?? items.find((item) => !item.disabled)?.value);
    setOpen(true);
  };

  const step = (delta: number) => {
    const selectable = items.filter((item) => !item.disabled);
    if (!selectable.length) return;
    const current = selectable.findIndex((item) => item.value === activeValue);
    const nextIndex = current < 0
      ? (delta > 0 ? 0 : selectable.length - 1)
      : (current + delta + selectable.length) % selectable.length;
    setActiveValue(selectable[nextIndex].value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        if (!open) openMenu();
        else step(event.key === 'ArrowDown' ? 1 : -1);
        break;
      case 'Home':
      case 'End': {
        if (!open) break;
        event.preventDefault();
        const selectable = items.filter((item) => !item.disabled);
        if (selectable.length) {
          setActiveValue(selectable[event.key === 'Home' ? 0 : selectable.length - 1].value);
        }
        break;
      }
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!open) openMenu();
        else if (activeValue !== undefined) commit(activeValue);
        break;
      case 'Escape':
        if (open) {
          event.preventDefault();
          setOpen(false);
        }
        break;
      case 'Tab':
        setOpen(false);
        break;
    }
  };

  const context: SelectContextValue = {
    selectedValue,
    activeValue,
    optionId,
    onSelect: commit,
    registerOption,
  };

  const Chevron = open ? ChevronUp : ChevronDown;

  return (
    <div ref={rootRef} className={twMerge('koast-w-full', className)}>
      {label && (
        <label
          htmlFor={baseId}
          className={'koast-mb-3 koast-block koast-text-base koast-font-medium koast-leading-5 koast-text-primary'}
        >
          {label}
          {required && <span className={'koast-ml-0.5 koast-text-danger'}>{'*'}</span>}
        </label>
      )}

      <div className={'koast-relative'}>
        <button
          ref={triggerRef}
          type={'button'}
          id={baseId}
          name={name}
          disabled={disabled}
          role={'combobox'}
          aria-haspopup={'listbox'}
          aria-expanded={open}
          aria-controls={open ? listboxId : undefined}
          aria-activedescendant={open && activeValue !== undefined ? optionId(activeValue) : undefined}
          aria-required={required || undefined}
          aria-invalid={error || undefined}
          aria-describedby={helpText ? helpId : undefined}
          onClick={() => (open ? setOpen(false) : openMenu())}
          onKeyDown={handleKeyDown}
          className={getTriggerStyles(size, disabled, error, open, '')}
        >
          <span className={getTriggerTextStyles(disabled, selectedItem !== undefined)}>
            {selectedItem ? selectedItem.label : placeholder}
          </span>
          <Chevron className={'koast-size-6 koast-shrink-0'} aria-hidden />
        </button>

        {open && (
          <ul
            id={listboxId}
            role={'listbox'}
            aria-labelledby={baseId}
            className={getMenuStyles(visibleOptions)}
          >
            <SelectContext.Provider value={context}>
              {children}
            </SelectContext.Provider>
          </ul>
        )}
      </div>

      {helpText && (
        <p id={helpId} className={getHelpTextStyles(error)}>
          {error && <CircleX className={'koast-size-6 koast-shrink-0'} aria-hidden />}
          {helpText}
        </p>
      )}
    </div>
  );
};

export default Select;
