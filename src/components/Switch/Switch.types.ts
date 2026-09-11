import React from 'react';
import type { ControlValue } from '../ControlGroup/ControlGroup.types';

/** Figma `Switch label` 의 Direction 축입니다. `'end'` 는 스위치가 왼쪽(Direction=Left)입니다. */
export type SwitchLabelPlacement = 'start' | 'end';

export interface SwitchProps
  extends Pick<React.AriaAttributes, 'aria-label' | 'aria-labelledby'> {
  /** 켜짐 상태입니다. 지정하면 제어 컴포넌트로 동작합니다. */
  checked?: boolean;

  /** 비제어로 쓸 때의 초기 상태입니다. @default false */
  defaultChecked?: boolean;

  /** 상태가 바뀔 때 호출됩니다. */
  onChange?: (checked: boolean) => void;

  /** 스위치 옆에 표시되는 라벨입니다. */
  label?: React.ReactNode;

  /** 라벨 위치입니다. @default 'end' */
  labelPlacement?: SwitchLabelPlacement;

  /** 손잡이 안에 상태 아이콘(체크 / X)을 표시합니다. Figma 의 Icon 축입니다. @default false */
  icon?: boolean;

  /** 폼 전송에 쓰이는 값입니다. */
  value?: ControlValue;

  /** 필수 입력 여부입니다. 라벨 뒤에 `*` 가 붙습니다. @default false */
  required?: boolean;

  /** 비활성화 상태입니다. 상위 ControlGroup 의 disabled 도 그대로 받습니다. @default false */
  disabled?: boolean;

  /** 여백 조정용입니다. 색상은 지정할 수 없습니다. */
  className?: string;

  id?: string;
  name?: string;
}
