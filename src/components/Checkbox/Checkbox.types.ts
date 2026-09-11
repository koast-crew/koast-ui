import React from 'react';
import type { ControlValue } from '../ControlGroup/ControlGroup.types';

/** Figma `Part/Check` 의 Checked 축입니다. `'partial'` 은 부분 선택(indeterminate)입니다. */
export type CheckboxChecked = boolean | 'partial';

export interface CheckboxProps
  extends Pick<React.AriaAttributes, 'aria-label' | 'aria-labelledby'> {
  /** 선택 상태입니다. 지정하면 제어 컴포넌트로 동작합니다. */
  checked?: CheckboxChecked;

  /** 비제어로 쓸 때의 초기 상태입니다. @default false */
  defaultChecked?: CheckboxChecked;

  /** 선택 상태가 바뀔 때 호출됩니다. `'partial'` 에서는 항상 `true` 로 넘어갑니다. */
  onChange?: (checked: boolean) => void;

  /** 체크박스 오른쪽에 표시되는 라벨입니다. */
  label?: React.ReactNode;

  /** ControlGroup 안에서 이 항목을 구분하는 값입니다. */
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
