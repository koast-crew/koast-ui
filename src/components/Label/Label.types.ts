import React from 'react';

/** Figma `Part/Label` 의 Type 축입니다. 보조 표기 없음 / (Optional) / * 세 가지입니다. */
export type LabelType = 'none' | 'optional' | 'required';

/** 렌더링할 태그입니다. 컨트롤을 감싸는 `<label>` 안에서 쓸 때는 `span` 이어야 중첩이 생기지 않습니다. */
export type LabelAs = 'label' | 'span';

export interface LabelProps {
  /** 라벨 문구입니다. */
  children: React.ReactNode;

  /** 보조 표기입니다. @default 'none' */
  type?: LabelType;

  /** 연결할 입력 요소의 id 입니다. 지정하면 기본 태그가 `label` 이 됩니다. */
  htmlFor?: string;

  /** 비활성화 상태입니다. 연결된 컨트롤의 disabled 를 그대로 받습니다. @default false */
  disabled?: boolean;

  /** `(Optional)` 자리에 들어갈 문구입니다. @default '(Optional)' */
  optionalText?: string;

  /** 렌더링할 태그입니다. @default htmlFor 가 있으면 'label', 없으면 'span' */
  as?: LabelAs;

  /** 여백 조정용입니다. 색상은 지정할 수 없습니다. */
  className?: string;

  id?: string;
}
