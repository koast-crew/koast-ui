import React, { useEffect, useId, useRef, useState } from 'react';
import { TextAreaProps } from './TextArea.types';
import {
  TEXTAREA_HEADER,
  getTextAreaCounterStyles,
  getTextAreaStyles,
} from './TextArea.styles';
import { FieldHelpText, FieldLabel } from '../field/fieldChrome';
import { twMerge } from '../../utils/twMerge';

/**
 * @koast/ui TextArea 컴포넌트입니다.
 * 여러 줄 텍스트를 입력받는 요소로, 라벨·글자 수 카운터·보조 문구·오류 상태를 함께 표시합니다.
 *
 * @param {string} [props.value] - 입력 값. 지정하면 제어 컴포넌트로 동작합니다 : string
 * @param {string} [props.defaultValue] - 비제어로 쓸 때의 초기 값 : string
 * @param {Function} [props.onChange] - 값 변경 시 호출되는 콜백 (값, 이벤트) : Function
 * @param {Function} [props.onFocus] - 포커스를 얻을 때 호출되는 콜백 : Function
 * @param {Function} [props.onBlur] - 포커스를 잃을 때 호출되는 콜백 : Function
 * @param {React.ReactNode} [props.label] - 입력 상자 위에 표시되는 라벨 : React.ReactNode
 * @param {string} [props.placeholder] - 값이 없을 때 표시되는 문구 : string
 * @param {React.ReactNode} [props.helpText] - 입력 상자 아래 보조 문구. error 면 빨간색 : React.ReactNode
 * @param {boolean} [props.error=false] - 오류 상태 : boolean
 * @param {boolean} [props.disabled=false] - 비활성화 상태 : boolean
 * @param {boolean} [props.readOnly=false] - 읽기 전용 상태 : boolean
 * @param {boolean} [props.required=false] - 필수 입력 여부 : boolean
 * @param {number} [props.maxLength] - 입력 가능한 최대 글자 수 : number
 * @param {boolean} [props.showCount] - 글자 수 카운터 표시 여부 (기본값은 maxLength 유무) : boolean
 * @param {boolean} [props.autoResize=false] - 내용에 맞춰 높이를 늘림 (최소 180px) : boolean
 * @param {boolean} [props.resizable=true] - 사용자가 세로 크기를 조절할 수 있는지 : boolean
 * @param {string} [props.className] - 레이아웃 조정용 CSS 클래스 (색상 지정 불가) : string
 *
 * @example
 * ```tsx
 * <TextArea label="의견" placeholder="의견을 입력하세요" value={memo} onChange={setMemo} />
 *
 * <TextArea label="자기소개" maxLength={500} helpText="500자 이내로 작성하세요" />
 *
 * <TextArea label="메모" autoResize error helpText="필수 항목입니다" required />
 * ```
 */
export const TextArea = (props: TextAreaProps) => {
  const {
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    label,
    placeholder,
    helpText,
    error = false,
    disabled = false,
    readOnly = false,
    required = false,
    maxLength,
    showCount = maxLength !== undefined,
    autoResize = false,
    resizable = true,
    className = '',
    id,
    name,
  } = props;

  const [focused, setFocused] = useState(false);
  const [count, setCount] = useState(String(value ?? defaultValue ?? '').length);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const reactId = useId();
  const baseId = id ?? `koast-textarea-${ reactId }`;
  const helpId = `${ baseId }-help`;
  const countId = `${ baseId }-count`;

  useEffect(() => {
    if (value !== undefined) setCount(value.length);
  }, [value]);

  // 높이를 먼저 0 으로 되돌려야 줄어드는 방향도 scrollHeight 로 잡힙니다.
  useEffect(() => {
    const node = textareaRef.current;
    if (!node) return;
    if (!autoResize) {
      node.style.height = '';
      return;
    }
    node.style.height = 'auto';
    node.style.height = `${ node.scrollHeight }px`;
  }, [autoResize, count, value]);

  const describedBy = [helpText ? helpId : null, showCount ? countId : null]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={twMerge('koast-w-full', className)}>
      {(label || showCount) && (
        <div className={TEXTAREA_HEADER}>
          {label && (
            <FieldLabel htmlFor={baseId} required={required} disabled={disabled} className={'koast-mb-0'}>
              {label}
            </FieldLabel>
          )}
          {showCount && (
            <span id={countId} className={getTextAreaCounterStyles(disabled)}>
              {maxLength === undefined ? `${ count }` : `${ count } / ${ maxLength }`}
            </span>
          )}
        </div>
      )}

      <textarea
        ref={textareaRef}
        id={baseId}
        name={name}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        maxLength={maxLength}
        aria-required={required || undefined}
        aria-invalid={error || undefined}
        aria-describedby={describedBy || undefined}
        onChange={(event) => {
          setCount(event.target.value.length);
          onChange?.(event.target.value, event);
        }}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
        className={getTextAreaStyles(disabled, error, focused, autoResize, resizable)}
      />

      {helpText && (
        <FieldHelpText id={helpId} error={error}>
          {helpText}
        </FieldHelpText>
      )}
    </div>
  );
};

export default TextArea;
