import React, { useId, useState } from 'react';
import { TextFieldProps } from './TextField.types';
import {
  getTextFieldBoxStyles,
  getTextFieldIconStyles,
  getTextFieldInputStyles,
} from './TextField.styles';
import { FieldHelpText, FieldLabel } from '../field/fieldChrome';
import { twMerge } from '../../utils/twMerge';

/**
 * @koast/ui TextField 컴포넌트입니다.
 * 한 줄 텍스트를 입력받는 요소로, 라벨·보조 문구·오류 상태를 함께 표시합니다.
 *
 * @param {string} [props.value] - 입력 값. 지정하면 제어 컴포넌트로 동작합니다 : string
 * @param {string} [props.defaultValue] - 비제어로 쓸 때의 초기 값 : string
 * @param {Function} [props.onChange] - 값 변경 시 호출되는 콜백 (값, 이벤트) : Function
 * @param {Function} [props.onFocus] - 포커스를 얻을 때 호출되는 콜백 : Function
 * @param {Function} [props.onBlur] - 포커스를 잃을 때 호출되는 콜백 : Function
 * @param {React.ReactNode} [props.label] - 입력 상자 위에 표시되는 라벨 : React.ReactNode
 * @param {string} [props.placeholder] - 값이 없을 때 표시되는 문구 : string
 * @param {React.ReactNode} [props.helpText] - 입력 상자 아래 보조 문구. error 면 빨간색 : React.ReactNode
 * @param {React.ReactNode} [props.trailingIcon] - 상자 오른쪽 끝에 놓이는 24x24 아이콘 : React.ReactNode
 * @param {boolean} [props.error=false] - 오류 상태 : boolean
 * @param {boolean} [props.disabled=false] - 비활성화 상태 : boolean
 * @param {boolean} [props.readOnly=false] - 읽기 전용 상태 : boolean
 * @param {boolean} [props.required=false] - 필수 입력 여부 : boolean
 * @param {'sm' | 'md'} [props.size='md'] - 입력 상자 높이 (40 / 48px) : 'sm' | 'md'
 * @param {'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'} [props.type='text'] - input 의 type : string
 * @param {number} [props.maxLength] - 입력 가능한 최대 글자 수 : number
 * @param {string} [props.className] - 레이아웃 조정용 CSS 클래스 (색상 지정 불가) : string
 *
 * @example
 * ```tsx
 * <TextField label="이름" placeholder="이름을 입력하세요" value={name} onChange={setName} />
 *
 * <TextField label="이메일" size="sm" error helpText="이메일 형식이 아닙니다" required />
 *
 * <TextField label="검색" trailingIcon={<Search />} />
 * ```
 */
export const TextField = (props: TextFieldProps) => {
  const {
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    label,
    placeholder,
    helpText,
    trailingIcon,
    error = false,
    disabled = false,
    readOnly = false,
    required = false,
    size = 'md',
    type = 'text',
    maxLength,
    className = '',
    id,
    name,
    autoComplete,
  } = props;

  const [focused, setFocused] = useState(false);

  const reactId = useId();
  const baseId = id ?? `koast-textfield-${ reactId }`;
  const helpId = `${ baseId }-help`;

  return (
    <div className={twMerge('koast-w-full', className)}>
      {label && (
        <FieldLabel htmlFor={baseId} required={required} disabled={disabled}>
          {label}
        </FieldLabel>
      )}

      <div className={getTextFieldBoxStyles(size, disabled, error, focused)}>
        <input
          id={baseId}
          name={name}
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          maxLength={maxLength}
          autoComplete={autoComplete}
          aria-required={required || undefined}
          aria-invalid={error || undefined}
          aria-describedby={helpText ? helpId : undefined}
          onChange={(event) => onChange?.(event.target.value, event)}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          className={getTextFieldInputStyles(disabled)}
        />
        {trailingIcon && (
          <span aria-hidden className={getTextFieldIconStyles(disabled)}>
            {trailingIcon}
          </span>
        )}
      </div>

      {helpText && (
        <FieldHelpText id={helpId} error={error}>
          {helpText}
        </FieldHelpText>
      )}
    </div>
  );
};

export default TextField;
