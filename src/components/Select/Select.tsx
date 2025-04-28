import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { SelectProps, SelectItemProps, SelectObjectValue } from './Select.types';
import { getSizeStyles, getVariantStyles, getErrorStyles, getWidthStyles } from './Select.styles';
import clsx from 'clsx';

/**
 * Koast-ui Select(Dropdown) 컴포넌트입니다.
 * Select 컴포넌트의 옵션으로 사용됩니다.
 *
 * @param {string | number | SelectObjectValue} props.value - 항목의 값입니다. 객체인 경우 반드시 name 속성이 필요합니다.
 * @param {React.ReactNode} props.children - 항목에 표시될 내용 : React.ReactNode
 * @param {boolean} [props.disabled=false] - 비활성화 상태 : boolean
 * @param {string} [props.className] - 추가 CSS 클래스 : string
 *
 * @example
 * ```tsx
 * // 문자열 값 사용
 * <SelectItem value="option1">옵션 1</SelectItem>
 *
 * // 객체 값 사용 (반드시 name 속성 필요)
 * <SelectItem value={{ name: "옵션 1", id: 1 }}>옵션 1</SelectItem>
 * ```
 */
export const SelectItem = ({ value, children, disabled, className }: SelectItemProps) => {
  return (
    <div
      data-value={value}
      className={clsx(
        'cursor-pointer px-4 py-2 hover:bg-gray-100',
        disabled ? 'cursor-not-allowed opacity-50' : '',
        className,
      )}
    >
      {children}
    </div>
  );
};

/**
 * Koast/ui Select 컴포넌트입니다.
 * 사용자가 여러 옵션 중 하나를 선택할 수 있는 드롭다운 메뉴를 제공합니다.
 *
 * @param {string | number | SelectObjectValue} [props.value] - 선택된 값입니다. 객체인 경우 반드시 name 속성이 필요합니다.
 * @param {string | number | SelectObjectValue} [props.defaultValue] - 기본 선택 값입니다. 객체인 경우 반드시 name 속성이 필요합니다.
 * @param {Function} [props.onChange] - 값 변경 시 호출되는 콜백 함수 : Function
 * @param {string} [props.placeholder] - 선택되지 않았을 때 표시되는 텍스트 : string
 * @param {boolean} [props.disabled=false] - 비활성화 상태 : boolean
 * @param {boolean} [props.required=false] - 필수 입력 여부 : boolean
 * @param {boolean} [props.fullWidth=false] - 전체 너비 사용 여부 : boolean
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - 컴포넌트 크기 : 'sm' | 'md' | 'lg'
 * @param {'outlined' | 'filled' | 'standard'} [props.variant='outlined'] - 컴포넌트 스타일 변형 : 'outlined' | 'filled' | 'standard'
 * @param {boolean} [props.error=false] - 오류 상태 : boolean
 * @param {string} [props.errorText] - 오류 메시지 : string
 * @param {string} [props.className] - 추가 CSS 클래스 : string
 * @param {React.ReactNode} props.children - SelectItem 컴포넌트들 : React.ReactNode
 * @param {string} [props.id] - 컴포넌트 ID : string
 * @param {string} [props.name] - 폼 제출 시 사용되는 이름 : string
 *
 * @example
 * ```tsx
 * // 문자열 값 사용
 * <Select value="option1" onChange={(value) => setValue(value)}>
 *   <SelectItem value="option1">옵션 1</SelectItem>
 *   <SelectItem value="option2">옵션 2</SelectItem>
 * </Select>
 *
 * // 객체 값 사용 (반드시 name 속성 필요)
 * <Select value={{ name: "옵션 1", id: 1 }} onChange={(value) => setValue(value)}>
 *   <SelectItem value={{ name: "옵션 1", id: 1 }}>옵션 1</SelectItem>
 *   <SelectItem value={{ name: "옵션 2", id: 2 }}>옵션 2</SelectItem>
 * </Select>
 * ```
 */

export const Select = <T extends string | number | SelectObjectValue = string | number>(
  props: SelectProps<T>,
) => {
  const {
    value,
    defaultValue,
    onChange,
    placeholder,
    disabled = false,
    required = false,
    fullWidth = false,
    size = 'md',
    variant = 'outlined',
    error = false,
    errorText,
    className,
    children,
    id,
    name,
  } = props;

  // 내부 상태 관리
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedValue, setSelectedValue] = useState<string | number | Record<string, any> | undefined>(
    value !== undefined ? value : defaultValue,
  );
  const selectRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지를 위한 이벤트 리스너
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 값이 변경될 때 선택된 라벨 업데이트
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  // 초기 선택된 라벨 설정
  useEffect(() => {
    if (selectedValue !== undefined) {
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && (child.props as SelectItemProps).value === selectedValue) {
          setSelectedValue(selectedValue);
        }
      });
    }
  }, [selectedValue, children]);

  // 옵션 선택 핸들러 수정
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelect = (value: string | number | Record<string, any>) => {
    setSelectedValue(value);
    setIsOpen(false);

    if (onChange) {
      onChange(value as T);
    }
  };

  // 선택된 값을 표시하는 함수
  const getDisplayValue = () => {
    if (!selectedValue) return '';

    // children을 배열로 변환
    const childrenArray = React.Children.toArray(children) as React.ReactElement<SelectItemProps>[];

    // 현재 선택된 값과 일치하는 SelectItem을 찾음
    const selectedItem = childrenArray.find((child) => {
      if (typeof selectedValue === 'object' && typeof child.props.value === 'object') {
        // name 속성으로 비교
        return selectedValue.name === child.props.value.name;
      }
      return child.props.value === selectedValue;
    });

    // 해당 SelectItem의 children(표시될 텍스트)을 반환
    return selectedItem ? selectedItem.props.children : '';
  };

  // 렌더링
  return (
    <div
      style={{ display: 'inline-block' }}
      className={clsx(fullWidth && getWidthStyles(fullWidth), className)}
      ref={selectRef}
    >
      <div className={'relative'}>
        <div
          className={clsx(
            'flex cursor-pointer items-center justify-between rounded',
            getVariantStyles(variant),
            getSizeStyles(size),
            getErrorStyles(error),
            disabled ? 'cursor-not-allowed bg-gray-50 opacity-50' : 'hover:border-gray-400',
            'transition-colors duration-200',
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          tabIndex={disabled ? -1 : 0}
          role={'combobox'}
          aria-expanded={isOpen}
          aria-haspopup={'listbox'}
          aria-labelledby={id}
          aria-required={required}
          id={id}
          data-name={name}
        >
          <div className={clsx(
            'flex grow items-center justify-between truncate',
            !selectedValue && placeholder ? 'text-gray-400' : '',
          )}
          >
            {getDisplayValue() || placeholder}
            {required && !selectedValue && <span className={'ml-1.5 text-xs text-red-500'}>{'필수*'}</span>}
          </div>
          <ChevronDown
            size={20}
            className={clsx(
              'ml-2 transition-transform duration-200',
              isOpen ? 'rotate-180' : '',
            )}
          />
        </div>

        {isOpen && (
          <div className={'absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded border border-gray-300 bg-white shadow-lg'}>
            {React.Children.map(children, (child) => {
              if (!React.isValidElement(child)) return null;

              const { value: itemValue, disabled: itemDisabled } = child.props as SelectItemProps;

              return (
                <div
                  onClick={() => !itemDisabled && handleSelect(itemValue)}
                  className={clsx(
                    selectedValue === itemValue ? 'bg-blue-50 text-blue-800' : '',
                    size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base',
                  )}
                >
                  {child}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {error && errorText && (
        <div className={'mt-1 text-sm text-red-500'}>
          {errorText}
        </div>
      )}
    </div>
  );
};

export default Select;
