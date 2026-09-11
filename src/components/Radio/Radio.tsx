import React, { useEffect, useId, useRef, useState } from 'react';
import { RadioProps } from './Radio.types';
import { DOT, getRadioCircleStyles } from './Radio.styles';
import { useControlGroup } from '../ControlGroup/ControlGroup.types';
import {
  CONTROL_INPUT,
  getControlRowStyles,
} from '../ControlGroup/ControlGroup.styles';
import { Label } from '../Label/Label';

/**
 * @koast/ui 라디오 컴포넌트입니다.
 * 상호 배타적인 옵션 중 하나만 고를 때 씁니다.
 *
 * 네이티브 `<input type="radio">` 를 그대로 쓰고 화면에만 숨겨, 같은 `name` 끼리의 방향키 이동과
 * 스크린리더 동작을 브라우저에 맡깁니다. 라벨은 `Label` 컴포넌트가 그립니다.
 * `ControlGroup type="radio"` 안에 넣으면 name · disabled · 선택 값을 그룹에서 물려받습니다.
 *
 * @param {boolean} [props.checked] - 선택 상태. 지정하면 제어 컴포넌트로 동작합니다 : boolean
 * @param {boolean} [props.defaultChecked=false] - 비제어로 쓸 때의 초기 상태 : boolean
 * @param {Function} [props.onChange] - 선택될 때 호출되는 콜백 : Function
 * @param {React.ReactNode} [props.label] - 라디오 오른쪽에 표시되는 라벨 : React.ReactNode
 * @param {string | number} [props.value] - ControlGroup 안에서 이 항목을 구분하는 값 : string | number
 * @param {string} [props.name] - 같은 그룹으로 묶을 name : string
 * @param {boolean} [props.required=false] - 필수 입력 여부. 라벨 뒤에 `*` 가 붙습니다 : boolean
 * @param {boolean} [props.disabled=false] - 비활성화 상태 : boolean
 * @param {string} [props.className] - 여백 조정용 CSS 클래스 (색상 지정 불가) : string
 *
 * @example
 * ```tsx
 * // 단독 사용 (name 으로 묶습니다)
 * <Radio name="gender" value="male" label="남성" defaultChecked />
 * <Radio name="gender" value="female" label="여성" />
 *
 * // ControlGroup 과 함께
 * <ControlGroup type="radio" label="배송 옵션" defaultValue="normal">
 *   <Radio value="normal" label="일반 배송" />
 *   <Radio value="fast" label="빠른 배송" />
 * </ControlGroup>
 * ```
 */
export const Radio = (props: RadioProps) => {
  const {
    checked,
    defaultChecked = false,
    onChange,
    label,
    value,
    name,
    required = false,
    disabled,
    className = '',
    id,
    'aria-label': ariaLabel,
  } = props;

  const group = useControlGroup();
  const managed
    = group?.type === 'radio' && group.managed && value !== undefined;

  const isControlled = checked !== undefined;
  const [innerChecked, setInnerChecked] = useState(defaultChecked);

  const currentChecked = managed
    ? group.isSelected(value)
    : isControlled
      ? checked
      : innerChecked;

  const isDisabled = disabled ?? group?.disabled ?? false;

  const reactId = useId();
  const inputId = id ?? `koast-radio-${ reactId }`;
  const groupName = name ?? group?.name;

  /** 그룹이 값을 관리하지도, 제어 컴포넌트도 아니면 배타 선택은 DOM 이 맡습니다. */
  const domOwned = !managed && !isControlled;
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * 네이티브 라디오는 같은 name 의 형제를 DOM 에서 직접 해제하지만 그 형제에게 change 를 보내지 않습니다.
   * 그래서 형제가 제 상태를 모른 채 checked 를 유지해 체크박스처럼 보입니다.
   * 그룹의 change 를 구독해 표시를 DOM 의 실제 값으로 되맞춥니다.
   */
  useEffect(() => {
    if (!domOwned || !groupName) return;

    const sync = () => setInnerChecked(Boolean(inputRef.current?.checked));
    sync();

    const onGroupChange = (event: Event) => {
      const target = event.target as HTMLInputElement | null;
      if (target?.type !== 'radio' || target.name !== groupName) return;
      sync();
    };

    document.addEventListener('change', onGroupChange, true);
    return () => document.removeEventListener('change', onGroupChange, true);
  }, [domOwned, groupName]);

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
        type={'radio'}
        className={CONTROL_INPUT}
        name={groupName}
        value={value}
        {...(domOwned ? { defaultChecked } : { checked: currentChecked })}
        disabled={isDisabled}
        required={required}
        aria-required={required || undefined}
        aria-label={ariaLabel}
        onChange={handleChange}
      />

      <span
        aria-hidden={'true'}
        className={getRadioCircleStyles(currentChecked, isDisabled)}
      >
        {currentChecked && <span className={DOT} />}
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

export default Radio;
