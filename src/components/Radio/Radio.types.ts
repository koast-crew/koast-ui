import React from 'react';
import type { ControlValue } from '../ControlGroup/ControlGroup.types';

export interface RadioProps
  extends Pick<React.AriaAttributes, 'aria-label' | 'aria-labelledby'> {
  /** 선택 상태입니다. 지정하면 제어 컴포넌트로 동작합니다. */
  checked?: boolean;

  /** 비제어로 쓸 때의 초기 상태입니다. @default false */
  defaultChecked?: boolean;

  /** 선택될 때 호출됩니다. 라디오는 해제가 없어 항상 `true` 로 넘어갑니다. */
  onChange?: (checked: boolean) => void;

  /** 라디오 오른쪽에 표시되는 라벨입니다. */
  label?: React.ReactNode;

  /** ControlGroup 안에서 이 항목을 구분하는 값입니다. */
  value?: ControlValue;

  /** 같은 그룹으로 묶을 name 입니다. ControlGroup 안에서는 그룹의 name 을 물려받습니다. */
  name?: string;

  /** 필수 입력 여부입니다. 라벨 뒤에 `*` 가 붙습니다. @default false */
  required?: boolean;

  /** 비활성화 상태입니다. 상위 ControlGroup 의 disabled 도 그대로 받습니다. @default false */
  disabled?: boolean;

  /** 여백 조정용입니다. 색상은 지정할 수 없습니다. */
  className?: string;

  id?: string;
}
