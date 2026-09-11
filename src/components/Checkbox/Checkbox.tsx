import React, { useEffect, useId, useRef, useState } from 'react';
import { Check, Minus } from 'lucide-react';
import { CheckboxProps, CheckboxChecked } from './Checkbox.types';
import { getCheckboxBoxStyles, getCheckboxMarkStyles } from './Checkbox.styles';
import { useControlGroup } from '../ControlGroup/ControlGroup.types';
import {
  CONTROL_INPUT,
  getControlRowStyles,
} from '../ControlGroup/ControlGroup.styles';
import { Label } from '../Label/Label';

/**
 * @koast/ui 체크박스 컴포넌트입니다.
 * 여러 옵션 중 하나 이상을 선택하거나, 동의 여부를 확인하는 데 씁니다.
 *
 * 네이티브 `<input type="checkbox">` 를 그대로 쓰고 화면에만 숨겨, 키보드 조작(Space)과
 * 스크린리더 동작을 브라우저에 맡깁니다. 라벨은 `Label` 컴포넌트가 그립니다.
 * `ControlGroup` 안에 넣으면 name · disabled · 선택 값을 그룹에서 물려받습니다.
 *
 * @param {boolean | 'partial'} [props.checked] - 선택 상태. 지정하면 제어 컴포넌트로 동작합니다 : boolean | 'partial'
 * @param {boolean | 'partial'} [props.defaultChecked=false] - 비제어로 쓸 때의 초기 상태 : boolean | 'partial'
 * @param {Function} [props.onChange] - 선택 상태가 바뀔 때 호출되는 콜백 : Function
 * @param {React.ReactNode} [props.label] - 체크박스 오른쪽에 표시되는 라벨 : React.ReactNode
 * @param {string | number} [props.value] - ControlGroup 안에서 이 항목을 구분하는 값 : string | number
 * @param {boolean} [props.required=false] - 필수 입력 여부. 라벨 뒤에 `*` 가 붙습니다 : boolean
 * @param {boolean} [props.disabled=false] - 비활성화 상태 : boolean
 * @param {string} [props.className] - 여백 조정용 CSS 클래스 (색상 지정 불가) : string
 *
 * @example
 * ```tsx
 * // 비제어
 * <Checkbox label="이용약관 동의" defaultChecked />
 *
 * // 제어
 * <Checkbox label="뉴스레터 수신" checked={agreed} onChange={setAgreed} />
 *
 * // 부분 선택
 * <Checkbox label="전체 선택" checked="partial" onChange={selectAll} />
 * ```
 */
export const Checkbox = (props: CheckboxProps) => {
  const {
    checked,
    defaultChecked = false,
    onChange,
    label,
    value,
    required = false,
    disabled,
    className = '',
    id,
    name,
    'aria-label': ariaLabel,
  } = props;

  const group = useControlGroup();
  const managed
    = group?.type === 'checkbox' && group.managed && value !== undefined;

  const isControlled = checked !== undefined;
  const [innerChecked, setInnerChecked] = useState<CheckboxChecked>(defaultChecked);

  const currentChecked: CheckboxChecked = managed
    ? group.isSelected(value)
    : isControlled
      ? checked
      : innerChecked;

  const isDisabled = disabled ?? group?.disabled ?? false;

  const reactId = useId();
  const inputId = id ?? `koast-checkbox-${ reactId }`;
  const inputRef = useRef<HTMLInputElement>(null);

  // indeterminate 는 HTML 속성이 아니라 DOM 프로퍼티라서 렌더 결과로 표현할 수 없습니다.
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = currentChecked === 'partial';
    }
  }, [currentChecked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = event.target.checked;
    if (managed) group.select(value, next);
    else if (!isControlled) setInnerChecked(next);
    onChange?.(next);
  };

  return (
    <label
      htmlFor={inputId}
      className={getControlRowStyles(isDisabled, className)}
    >
      <input
        ref={inputRef}
        id={inputId}
        type={'checkbox'}
        className={CONTROL_INPUT}
        name={name ?? group?.name}
        value={value}
        checked={currentChecked === true}
        disabled={isDisabled}
        required={required}
        aria-required={required || undefined}
        aria-label={ariaLabel}
        onChange={handleChange}
      />

      <span
        aria-hidden={'true'}
        className={getCheckboxBoxStyles(currentChecked, isDisabled)}
      >
        {currentChecked === 'partial' && (
          <Minus className={getCheckboxMarkStyles(isDisabled)} />
        )}
        {currentChecked === true && (
          <Check className={getCheckboxMarkStyles(isDisabled)} />
        )}
      </span>

      {label !== undefined && (
        <Label
          as={'span'}
          disabled={isDisabled}
          type={required ? 'required' : 'none'}
        >
          {label}
        </Label>
      )}
    </label>
  );
};

export default Checkbox;
