import React, { useId, useState } from 'react';
import { Check, X } from 'lucide-react';
import { SwitchProps } from './Switch.types';
import {
  getSwitchIconStyles,
  getSwitchIndicatorStyles,
  getSwitchTrackStyles,
} from './Switch.styles';
import { useControlGroup } from '../ControlGroup/ControlGroup.types';
import {
  CONTROL_INPUT,
  getControlRowStyles,
} from '../ControlGroup/ControlGroup.styles';
import { Label } from '../Label/Label';

/**
 * @koast/ui 스위치 컴포넌트입니다.
 * 설정을 즉시 켜고 끄는 두 가지 상태를 전환할 때 씁니다.
 *
 * 네이티브 `<input type="checkbox" role="switch">` 를 그대로 쓰고 화면에만 숨겨,
 * 키보드 조작(Space)과 스크린리더 동작을 브라우저에 맡깁니다.
 * 라벨은 Checkbox / Radio 와 같은 규칙(gap 8px · 세로 가운데 정렬)으로 `Label` 이 그립니다.
 *
 * @param {boolean} [props.checked] - 켜짐 상태. 지정하면 제어 컴포넌트로 동작합니다 : boolean
 * @param {boolean} [props.defaultChecked=false] - 비제어로 쓸 때의 초기 상태 : boolean
 * @param {Function} [props.onChange] - 상태가 바뀔 때 호출되는 콜백 : Function
 * @param {React.ReactNode} [props.label] - 스위치 옆에 표시되는 라벨 : React.ReactNode
 * @param {'start' | 'end'} [props.labelPlacement='end'] - 라벨 위치. Figma 의 Direction 축 : 'start' | 'end'
 * @param {boolean} [props.icon=false] - 손잡이 안에 상태 아이콘(체크 / X) 표시 : boolean
 * @param {boolean} [props.required=false] - 필수 입력 여부. 라벨 뒤에 `*` 가 붙습니다 : boolean
 * @param {boolean} [props.disabled=false] - 비활성화 상태 : boolean
 * @param {string} [props.className] - 여백 조정용 CSS 클래스 (색상 지정 불가) : string
 *
 * @example
 * ```tsx
 * // 비제어
 * <Switch label="다크 모드" defaultChecked />
 *
 * // 제어 + 상태 아이콘
 * <Switch label="알림 설정" icon checked={on} onChange={setOn} />
 *
 * // 라벨을 왼쪽에
 * <Switch label="자동 저장" labelPlacement="start" />
 * ```
 */
export const Switch = (props: SwitchProps) => {
  const {
    checked,
    defaultChecked = false,
    onChange,
    label,
    labelPlacement = 'end',
    icon = false,
    value,
    required = false,
    disabled,
    className = '',
    id,
    name,
    'aria-label': ariaLabel,
  } = props;

  const group = useControlGroup();

  const isControlled = checked !== undefined;
  const [innerChecked, setInnerChecked] = useState(defaultChecked);
  const currentChecked = isControlled ? checked : innerChecked;

  const isDisabled = disabled ?? group?.disabled ?? false;

  const reactId = useId();
  const inputId = id ?? `koast-switch-${ reactId }`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = event.target.checked;
    if (!isControlled) setInnerChecked(next);
    onChange?.(next);
  };

  const labelNode = label !== undefined && (
    <Label
      as={'span'}
      disabled={isDisabled}
      type={required ? 'required' : 'none'}
    >
      {label}
    </Label>
  );

  const IconGlyph = currentChecked ? Check : X;

  return (
    <label
      htmlFor={inputId}
      className={getControlRowStyles(isDisabled, className)}
    >
      <input
        id={inputId}
        type={'checkbox'}
        role={'switch'}
        className={CONTROL_INPUT}
        name={name ?? group?.name}
        value={value}
        checked={currentChecked}
        disabled={isDisabled}
        required={required}
        aria-required={required || undefined}
        aria-label={ariaLabel}
        onChange={handleChange}
      />

      {labelPlacement === 'start' && labelNode}

      <span
        aria-hidden={'true'}
        className={getSwitchTrackStyles(currentChecked, isDisabled)}
      >
        <span className={getSwitchIndicatorStyles(currentChecked, isDisabled)}>
          {icon && (
            <IconGlyph className={getSwitchIconStyles(currentChecked, isDisabled)} />
          )}
        </span>
      </span>

      {labelPlacement === 'end' && labelNode}
    </label>
  );
};

export default Switch;
