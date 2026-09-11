export type TimeUnit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';

/** Figma 의 Type 축입니다. daily=날짜 세그먼트, hourly=연속 트랙. */
export type TimeLineType = 'daily' | 'hourly';

/** Figma 의 Layout 축입니다. 컨테이너 폭으로 자동 결정됩니다. */
export type TimeLineLayout = 'desktop' | 'compact' | 'mobile';

/** hourly 눈금 간격(시간)입니다. */
export type TimeLineInterval = 1 | 3 | 6;

export type DateToStringFunc = (date: Date) => string;

export interface TimeLineOnChangeProps {
  step: number;
  date: Date;
}

export interface TimeLineProps {
  /** 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. */
  className?: string;

  /** 타임라인 시작 시각입니다. */
  start: Date;

  /** 타임라인 종료 시각입니다. */
  end: Date;

  /** 초기 위치입니다. 미입력 시 첫 스텝에 놓입니다. */
  initialDate?: Date;

  /** 스텝 간격입니다. `stepUnit` 과 함께 계산됩니다. */
  stepValue: number;

  /** 스텝 간격 단위입니다. @default 'minute' */
  stepUnit?: TimeUnit;

  /**
   * 시각 목록입니다. 불규칙한 경우 직접 넘깁니다. 넘기면 `stepValue` 계산보다 우선합니다.
   * 어떤 날에 스텝이 하나도 없으면 그 날은 데이터 없음으로 표시됩니다.
   */
  steps?: Date[] | ((start: Date, end: Date, stepValue: number, stepUnit?: TimeUnit) => Date[]);

  /** 표시 방식입니다. @default 'hourly' */
  type?: TimeLineType;

  /** hourly 눈금 간격(시간)입니다. @default 3 */
  interval?: TimeLineInterval;

  /** 한 스텝당 재생 간격(ms)입니다. 배속으로 나눠집니다. @default 1000 */
  animationSpeed?: number;

  /** 배속 선택지입니다. @default [0.5, 1, 2, 4] */
  speeds?: number[];

  /** 현재 배속입니다. 지정하면 제어 컴포넌트로 동작합니다. */
  speed?: number;

  /** 배속이 바뀔 때 호출됩니다. */
  onSpeedChange?: (speed: number) => void;

  /** 데이터를 불러오는 중임을 표시합니다. @default false */
  loading?: boolean;

  /** 비활성화 상태입니다. @default false */
  disabled?: boolean;

  /** 스텝이 바뀔 때 호출됩니다. */
  onChange?: (props: TimeLineOnChangeProps) => void;

  /** hourly 트랙에 마우스를 올렸을 때 표시할 텍스트입니다. */
  renderGuideMessage?: DateToStringFunc;

  /** 현재 선택된 시각의 툴팁 텍스트입니다. */
  renderSelectedGuideMessage?: DateToStringFunc;

  /** hourly 눈금 라벨 텍스트입니다. */
  renderRulerLabel?: DateToStringFunc;
}
