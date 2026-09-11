import React from 'react';

/** 디자인 시스템의 Type 축입니다. default=48px, compact=40px 헤더 높이에 대응합니다. */
export type AccordionSize = 'sm' | 'md';

/** 헤더를 감싸는 제목 태그의 단계입니다. 문서 구조에 맞춰 조정합니다. */
export type AccordionHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface AccordionProps {
  /** 헤더 높이·제목 크기입니다. md=48px, sm=40px. @default 'md' */
  size?: AccordionSize;

  /** 여러 항목을 동시에 펼칠 수 있게 합니다. @default false */
  multiple?: boolean;

  /** 펼쳐진 항목의 `value` 목록입니다. 지정하면 제어 컴포넌트로 동작합니다. */
  value?: string[];

  /** 비제어로 쓸 때의 초기 펼침 목록입니다. */
  defaultValue?: string[];

  /** 펼침 상태가 바뀔 때 호출됩니다. `multiple` 이 false 면 길이가 0 또는 1 입니다. */
  onChange?: (expanded: string[]) => void;

  /** 헤더를 감싸는 제목 태그의 단계입니다. @default 3 */
  headingLevel?: AccordionHeadingLevel;

  /** 너비·여백 같은 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. */
  className?: string;

  /** 항목 목록입니다. `AccordionItem` 만 넣습니다. */
  children: React.ReactNode;

  id?: string;
}

export interface AccordionItemProps {
  /** 항목을 구분하는 값입니다. 펼침 상태의 키로 쓰입니다. */
  value: string;

  /** 헤더에 표시되는 제목입니다. */
  title: React.ReactNode;

  /** 펼쳤을 때 표시되는 내용입니다. */
  children: React.ReactNode;

  /** 비활성화 상태입니다. 펼치거나 접을 수 없고 키보드 이동에서도 건너뜁니다. @default false */
  disabled?: boolean;

  /** 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. */
  className?: string;
}
