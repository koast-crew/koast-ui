import React, { createContext, useContext } from 'react';

/** 그룹 안에서 각 컨트롤을 구분하는 값입니다. */
export type ControlValue = string | number;

/** 묶는 컨트롤의 종류입니다. radio 는 하나만, checkbox 는 여러 개를 고를 수 있습니다. */
export type ControlGroupType = 'checkbox' | 'radio';

/** 나열 방향입니다. Figma 는 세로만 정의합니다. */
export type ControlGroupOrientation = 'vertical' | 'horizontal';

interface ControlGroupContextValue {
  type: ControlGroupType;
  name?: string;
  disabled: boolean;
  /** 그룹이 값을 직접 관리하는지 여부입니다. false 면 자식이 각자 상태를 갖습니다. */
  managed: boolean;
  isSelected: (value: ControlValue) => boolean;
  select: (value: ControlValue, checked: boolean) => void;
}

export const ControlGroupContext = createContext<ControlGroupContextValue | null>(null);

/** Checkbox / Radio 가 상위 ControlGroup 의 name·disabled·값을 물려받기 위해 씁니다. */
export const useControlGroup = () => useContext(ControlGroupContext);

interface ControlGroupBaseProps {
  /** 그룹 전체를 설명하는 라벨입니다. */
  label?: React.ReactNode;

  /** 라벨 뒤에 `*` 를 붙입니다. @default false */
  required?: boolean;

  /** 그룹 전체를 비활성화합니다. 자식 컨트롤로 그대로 전파됩니다. @default false */
  disabled?: boolean;

  /** 나열 방향입니다. @default 'vertical' */
  orientation?: ControlGroupOrientation;

  /** 자식 radio 가 공유할 name 입니다. 생략하면 자동 생성됩니다. */
  name?: string;

  /** 여백·너비 조정용입니다. 색상은 지정할 수 없습니다. */
  className?: string;

  /** Checkbox 또는 Radio 목록입니다. */
  children: React.ReactNode;

  id?: string;
}

export interface CheckboxControlGroupProps extends ControlGroupBaseProps {
  /** @default 'checkbox' */
  type?: 'checkbox';

  /** 선택된 값 목록입니다. 지정하면 제어 컴포넌트로 동작합니다. */
  value?: ControlValue[];

  /** 비제어로 쓸 때의 초기 값 목록입니다. */
  defaultValue?: ControlValue[];

  /** 선택이 바뀔 때 호출됩니다. */
  onChange?: (value: ControlValue[]) => void;
}

export interface RadioControlGroupProps extends ControlGroupBaseProps {
  type: 'radio';

  /** 선택된 값입니다. 지정하면 제어 컴포넌트로 동작합니다. */
  value?: ControlValue;

  /** 비제어로 쓸 때의 초기 값입니다. */
  defaultValue?: ControlValue;

  /** 선택이 바뀔 때 호출됩니다. */
  onChange?: (value: ControlValue) => void;
}

export type ControlGroupProps = CheckboxControlGroupProps | RadioControlGroupProps;
