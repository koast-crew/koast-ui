import React from 'react';

export interface TextAreaProps {
  /** 입력 값입니다. 지정하면 제어 컴포넌트로 동작합니다. */
  value?: string;

  /** 비제어로 쓸 때의 초기 값입니다. */
  defaultValue?: string;

  /** 값이 바뀔 때 호출됩니다. 첫 인자가 문자열 값, 둘째 인자가 원본 이벤트입니다. */
  onChange?: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;

  /** 포커스를 얻을 때 호출됩니다. */
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;

  /** 포커스를 잃을 때 호출됩니다. */
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;

  /** 입력 상자 위에 표시되는 라벨입니다. */
  label?: React.ReactNode;

  /** 값이 없을 때 표시되는 문구입니다. */
  placeholder?: string;

  /** 입력 상자 아래에 표시되는 보조 문구입니다. `error` 면 빨간색과 경고 아이콘이 함께 표시됩니다. */
  helpText?: React.ReactNode;

  /** 오류 상태입니다. @default false */
  error?: boolean;

  /** 비활성화 상태입니다. @default false */
  disabled?: boolean;

  /** 읽기 전용 상태입니다. @default false */
  readOnly?: boolean;

  /** 필수 입력 여부입니다. 라벨 뒤에 `*` 가 붙습니다. @default false */
  required?: boolean;

  /** 입력 가능한 최대 글자 수입니다. 지정하면 라벨 오른쪽에 글자 수 카운터가 나옵니다. */
  maxLength?: number;

  /** 글자 수 카운터 표시 여부입니다. @default maxLength 가 있으면 true */
  showCount?: boolean;

  /** 내용에 맞춰 높이를 늘립니다. 고정 높이 180px 이 최소값이 됩니다. @default false */
  autoResize?: boolean;

  /** 사용자가 세로로 크기를 조절할 수 있게 합니다. `autoResize` 면 무시됩니다. @default true */
  resizable?: boolean;

  /** 너비·여백 같은 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. */
  className?: string;

  id?: string;
  name?: string;
}
