import { useId, useState } from 'react';
import {
  ControlGroupContext,
  ControlGroupProps,
  ControlValue,
} from './ControlGroup.types';
import { GROUP_LABEL, getControlGroupStyles } from './ControlGroup.styles';
import { Label } from '../Label/Label';

/**
 * @koast/ui 컨트롤 그룹 컴포넌트입니다.
 * Checkbox 또는 Radio 를 묶어 시각적·의미적 연결을 만듭니다.
 *
 * `name` 과 `disabled` 를 자식 컨트롤에 전파하고, `value` 또는 `defaultValue` 를 주면
 * 선택 값까지 그룹이 직접 관리합니다(이때 자식은 각자의 `value` 로 식별됩니다).
 * `type="radio"` 면 `role="radiogroup"` 이 되어 방향키 이동이 그룹 단위로 동작합니다.
 *
 * @param {'checkbox' | 'radio'} [props.type='checkbox'] - 묶을 컨트롤 종류 : 'checkbox' | 'radio'
 * @param {React.ReactNode} [props.label] - 그룹 전체를 설명하는 라벨 : React.ReactNode
 * @param {string | number | Array} [props.value] - 선택된 값. radio 는 단일 값, checkbox 는 배열 : string | number | Array
 * @param {string | number | Array} [props.defaultValue] - 비제어로 쓸 때의 초기 값 : string | number | Array
 * @param {Function} [props.onChange] - 선택이 바뀔 때 호출되는 콜백 : Function
 * @param {'vertical' | 'horizontal'} [props.orientation='vertical'] - 나열 방향 : 'vertical' | 'horizontal'
 * @param {string} [props.name] - 자식 radio 가 공유할 name. 생략하면 자동 생성 : string
 * @param {boolean} [props.required=false] - 라벨 뒤에 `*` 를 붙입니다 : boolean
 * @param {boolean} [props.disabled=false] - 그룹 전체 비활성화. 자식으로 전파됩니다 : boolean
 * @param {string} [props.className] - 여백·너비 조정용 CSS 클래스 (색상 지정 불가) : string
 * @param {React.ReactNode} props.children - Checkbox 또는 Radio 목록 : React.ReactNode
 *
 * @example
 * ```tsx
 * // 체크박스 그룹 (값은 배열)
 * <ControlGroup label="관심 분야" value={topics} onChange={setTopics}>
 *   <Checkbox value="weather" label="기상" />
 *   <Checkbox value="ocean" label="해양" />
 * </ControlGroup>
 *
 * // 라디오 그룹 (값은 단일)
 * <ControlGroup type="radio" label="배송 옵션" required defaultValue="normal">
 *   <Radio value="normal" label="일반 배송" />
 *   <Radio value="fast" label="빠른 배송" />
 * </ControlGroup>
 * ```
 */
export const ControlGroup = (props: ControlGroupProps) => {
  const {
    type = 'checkbox',
    label,
    required = false,
    disabled = false,
    orientation = 'vertical',
    name,
    className = '',
    children,
    id,
  } = props;

  const reactId = useId();
  const baseId = id ?? `koast-control-group-${ reactId }`;
  const labelId = `${ baseId }-label`;
  const groupName = name ?? baseId;

  const [innerValue, setInnerValue]
    = useState<ControlValue | ControlValue[] | undefined>(props.defaultValue);

  const isControlled = props.value !== undefined;
  // 값을 하나도 안 받으면 그룹은 레이아웃만 맡고 선택 상태는 자식이 각자 관리합니다.
  const managed = isControlled || props.defaultValue !== undefined;
  const currentValue = isControlled ? props.value : innerValue;

  const selected = (currentValue as ControlValue[] | undefined) ?? [];

  const handleSelect = (value: ControlValue, checked: boolean) => {
    if (props.type === 'radio') {
      if (!isControlled) setInnerValue(value);
      props.onChange?.(value);
      return;
    }

    const next = checked
      ? [...selected, value]
      : selected.filter((item) => item !== value);
    if (!isControlled) setInnerValue(next);
    props.onChange?.(next);
  };

  const context = {
    type,
    name: groupName,
    disabled,
    managed,
    isSelected: (value: ControlValue) =>
      type === 'radio' ? currentValue === value : selected.includes(value),
    select: handleSelect,
  };

  return (
    <div className={className}>
      {label !== undefined && (
        <Label
          id={labelId}
          as={'span'}
          disabled={disabled}
          type={required ? 'required' : 'none'}
          className={GROUP_LABEL}
        >
          {label}
        </Label>
      )}

      <div
        id={baseId}
        role={type === 'radio' ? 'radiogroup' : 'group'}
        aria-labelledby={label !== undefined ? labelId : undefined}
        aria-required={required || undefined}
        aria-disabled={disabled || undefined}
        className={getControlGroupStyles(orientation, '')}
      >
        <ControlGroupContext.Provider value={context}>
          {children}
        </ControlGroupContext.Provider>
      </div>
    </div>
  );
};

export default ControlGroup;
