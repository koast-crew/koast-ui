
interface CommonTimeSliderProps {
  /**
   * 버튼에 추가할 CSS 클래스명입니다.
   * @ignore
   */
  className?: string,

  /**
   * 타임슬라이더 시작 시간.
   * @required
   */
  start: Date,

  /**
   * 타임슬라이더 종료 시간.
   * @required
   */
  end: Date,

  /**
   * 초기 슬라이더 시간. 미입력 시 가장 첫번째 위치에 위치. optional
   */
  initialDate?: Date,
}

export interface StepTimeSliderProps extends CommonTimeSliderProps {
  /**
   * 타임슬라이더 간격, stepUnit에 따라 계산에 사용됨
   * @required
   */
  stepValue: number

  /**
   * 타임슬라이더 간격 단위. 기본값은 minute, 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';
   */
  stepUnit?: TimeUnit

  /**
   * 타임슬라이더에 사용할 시간 목록 혹은 시작,종료,스텝간격, 스텝단위를 이용하여 시간 목록을 만드는 함수. 불규칙적인 경우 사용 (ex.해양기상정보포털). 입력 시 가장 우선적으로 적용. optional
   */
  steps?: Date[] | ((start: Date, end: Date, stepValue: number, stepUnit?: TimeUnit)=> Date[]);

  /**
   * 타임슬라이더 크기. 기본값은 md
   */
  size?: TimeSliderSize;

  /**
   * 타임슬라이더 색상 테마. 기본값은 dark
   */
  theme?: TimeSliderTheme;

  /**
   * 타임슬라이더 재생 시간 간격, 기본값은 1000, 단위는 밀리세컨드
   */
  animationSpeed?: number

  /**
   * 타임 슬라이더 스텝 변경 시 콜백 함수.
   */
  onChange?: ({ step, date }: StepTimeSliderOnChangeProps)=> void;

  /**
   * 타임슬라이더 마우스 오버 시 표출되는 텍스트 처리 함수
   */
  renderGuideMessage?: DateToStringFunc

  /**
   * 타임슬라이더 선택된 스텝에 대한 정보 표출 용 텍스트 처리 함수
   */
  renderSelectedGuideMessage?: DateToStringFunc
  /**
   * 타임슬라이더 날짜라벨 표기 처리 함수
   */
  renderRulerLabel?: DateToStringFunc
}

export type TimeUnit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';
export type TimeSliderSize = 'sm' | 'md' | 'lg';
export type TimeSliderTheme = 'dark' | 'light' | 'cool' | 'warm';

export interface StepTimeSliderOnChangeProps {
  step: number,
  date: Date
}
export type DateToStringFunc = (date: Date)=> string;
