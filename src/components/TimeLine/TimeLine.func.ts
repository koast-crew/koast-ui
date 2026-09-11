import type { TimeLineLayout, TimeUnit } from './TimeLine.types';

export const returnDate = (date: Date | number) =>
  date instanceof Date ? date : new Date(date);

/**
 * 한 번에 만들 수 있는 스텝 수 상한입니다.
 * 잘못된 범위·단위 조합(예: 10년 구간을 1초 단위로)이 브라우저를 멈추는 것을 막습니다.
 */
export const MAX_STEPS = 10000;

export const generateSteps = (
  start: Date,
  end: Date,
  stepValue: number,
  stepUnit: TimeUnit = 'minute',
): Date[] => {
  // stepValue 가 0 이거나 음수면 current 가 전진하지 않아 while 이 끝나지 않습니다.
  if (!Number.isFinite(stepValue) || stepValue <= 0) return [];
  if (!(start instanceof Date) || Number.isNaN(start.getTime())) return [];
  if (!(end instanceof Date) || Number.isNaN(end.getTime())) return [];

  const steps: Date[] = [];
  const current = new Date(start);
  while (current <= end && steps.length < MAX_STEPS) {
    steps.push(new Date(current));
    switch (stepUnit) {
      case 'year':
        current.setFullYear(current.getFullYear() + stepValue);
        break;
      case 'month':
        current.setMonth(current.getMonth() + stepValue);
        break;
      case 'day':
        current.setDate(current.getDate() + stepValue);
        break;
      case 'hour':
        current.setHours(current.getHours() + stepValue);
        break;
      case 'minute':
        current.setMinutes(current.getMinutes() + stepValue);
        break;
      case 'second':
        current.setSeconds(current.getSeconds() + stepValue);
        break;
      default:
        break;
    }
  }
  return steps;
};

const zeroPad = (num: number, length = 2): string =>
  String(num).padStart(length, '0');

export const getDefaultMessage = (date: Date, stepUnit: TimeUnit) => {
  switch (stepUnit) {
    case 'year':
      return String(date.getFullYear());
    case 'month':
      return `${ date.getFullYear() }-${ zeroPad(date.getMonth() + 1) }`;
    case 'day':
      return `${ zeroPad(date.getMonth() + 1) }-${ zeroPad(date.getDate()) }`;
    case 'second':
      return `${ zeroPad(date.getMinutes()) }:${ zeroPad(date.getSeconds()) }`;
    case 'hour':
    case 'minute':
    default:
      return `${ zeroPad(date.getHours()) }:${ zeroPad(date.getMinutes()) }`;
  }
};

export const formatDate = (date: Date) =>
  `${ date.getFullYear() }.${ zeroPad(date.getMonth() + 1) }.${ zeroPad(date.getDate()) }`;

export const formatTime = (date: Date) =>
  `${ zeroPad(date.getHours()) }:${ zeroPad(date.getMinutes()) }`;

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export const formatDayLabel = (date: Date) => ({
  date: `${ date.getMonth() + 1 }월 ${ date.getDate() }일`,
  weekday: WEEKDAYS[date.getDay()],
});

/** 트랙 위 클릭 위치를 스텝 인덱스로 바꿉니다. */
export const calculateIndex = (
  elem: HTMLElement,
  clientX: number,
  dataLength: number,
): number => {
  const { left, width } = elem.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (clientX - left) / width));
  return Math.min(Math.floor(ratio * dataLength), dataLength - 1);
};

export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear()
  && a.getMonth() === b.getMonth()
  && a.getDate() === b.getDate();

export interface DaySegment {
  /** 그 날의 자정 */
  day: Date;
  /** 그 날에 속한 스텝의 인덱스들. 비어 있으면 데이터 없음입니다. */
  stepIndexes: number[];
}

/**
 * start~end 가 걸친 모든 달력 날짜를 만들고 각 날에 속한 스텝을 모읍니다.
 * 스텝이 하나도 없는 날이 Figma 의 Data=Partial / None 에 해당합니다.
 */
export const buildDaySegments = (
  start: Date,
  end: Date,
  steps: Date[],
): DaySegment[] => {
  const segments: DaySegment[] = [];
  const cursor = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const last = new Date(end.getFullYear(), end.getMonth(), end.getDate());

  while (cursor <= last) {
    segments.push({ day: new Date(cursor), stepIndexes: [] });
    cursor.setDate(cursor.getDate() + 1);
  }

  steps.forEach((step, index) => {
    const segment = segments.find((s) => isSameDay(s.day, step));
    segment?.stepIndexes.push(index);
  });

  return segments;
};

/** Figma 의 Layout 축 경계입니다. Desktop 800 / Compact 540 / Mobile 360. */
export const widthToLayout = (width: number): TimeLineLayout => {
  if (width >= 700) return 'desktop';
  if (width >= 460) return 'compact';
  return 'mobile';
};
