import React from 'react';

export interface TabsProps
  extends Pick<React.AriaAttributes, 'aria-label' | 'aria-labelledby'> {
  /** 선택된 탭의 `value` 입니다. 지정하면 제어 컴포넌트로 동작합니다. */
  value?: string;

  /** 비제어로 쓸 때의 초기 선택값입니다. 없으면 첫 번째 활성 탭이 선택됩니다. */
  defaultValue?: string;

  /** 선택된 탭이 바뀔 때 호출됩니다. */
  onChange?: (value: string) => void;

  /** 너비·여백 같은 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. */
  className?: string;

  /** 탭 목록입니다. `TabItem` 만 넣습니다. */
  children: React.ReactNode;

  /** 루트 요소의 id 입니다. 내부 요소 id 의 접두사로도 쓰입니다. */
  id?: string;
}

export interface TabItemProps {
  /** 탭을 구분하는 값입니다. 선택 상태의 키로 쓰입니다. */
  value: string;

  /** 탭 버튼에 표시되는 라벨입니다. */
  label: React.ReactNode;

  /** 라벨 앞에 놓이는 24px 아이콘입니다. Figma 의 `Leading icon` 슬롯입니다. */
  icon?: React.ReactNode;

  /** 비활성화 상태입니다. 선택할 수 없고 방향키 이동에서도 건너뜁니다. @default false */
  disabled?: boolean;

  /** 탭을 선택했을 때 표시되는 패널 내용입니다. */
  children: React.ReactNode;

  /** 패널의 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. */
  className?: string;
}
