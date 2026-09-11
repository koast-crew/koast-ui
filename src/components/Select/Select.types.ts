import React from 'react';

/** 디자인 시스템의 Size 축입니다. sm=40px, md=48px 트리거 높이에 대응합니다. */
export type SelectSize = 'sm' | 'md';

/** 드롭다운에 한 번에 보이는 옵션 수입니다. 이 값이 최대 높이를 정합니다. */
export type SelectVisibleOptions = 4 | 6 | 8;

export interface SelectProps<T extends string | number = string> {
  /** 선택된 값입니다. 지정하면 제어 컴포넌트로 동작합니다. */
  value?: T;

  /** 비제어로 쓸 때의 초기 값입니다. */
  defaultValue?: T;

  /** 값이 바뀔 때 호출됩니다. */
  onChange?: (value: T) => void;

  /** 트리거 위에 표시되는 라벨입니다. */
  label?: React.ReactNode;

  /** 값이 없을 때 트리거에 표시되는 문구입니다. */
  placeholder?: string;

  /** 트리거 아래에 표시되는 보조 문구입니다. `error` 면 빨간색과 경고 아이콘이 함께 표시됩니다. */
  helpText?: React.ReactNode;

  /** 오류 상태입니다. @default false */
  error?: boolean;

  /** 비활성화 상태입니다. @default false */
  disabled?: boolean;

  /** 필수 입력 여부입니다. 라벨 뒤에 `*` 가 붙습니다. @default false */
  required?: boolean;

  /** 트리거 높이입니다. @default 'md' */
  size?: SelectSize;

  /** 드롭다운에 한 번에 보이는 옵션 수입니다. @default 8 */
  visibleOptions?: SelectVisibleOptions;

  /** 너비·여백 같은 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. */
  className?: string;

  /** 옵션 목록입니다. `SelectItem` 만 넣습니다. */
  children: React.ReactNode;

  id?: string;
  name?: string;
}

export interface SelectItemProps {
  /** 항목의 값입니다. */
  value: string | number;

  /** 항목에 표시될 내용입니다. */
  children: React.ReactNode;

  /** 비활성화 상태입니다. @default false */
  disabled?: boolean;

  /** 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. */
  className?: string;
}
