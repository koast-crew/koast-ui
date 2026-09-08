import { DateToStringFunc, TimeSliderSize, TimeSliderTheme, TimeUnit } from './TimeSlider.types';

export const generateSteps = (
  start: Date,
  end: Date,
  stepValue: number,
  stepUnit: TimeUnit = 'minute',
): Date[] => {
  const steps: Date[] = [];
  const current = new Date(start);
  while (current <= end) {
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

const zeroPad = (num: number, length = 2): string => {
  return String(num).padStart(length, '0');
};

const getMonthOneBased = (date: Date): number => {
  return date.getMonth() + 1;
};

export const getDefaultMessage = (date: Date, stepUnit: TimeUnit) => {
  switch (stepUnit) {
    case 'year':
      return String(date.getFullYear());
    case 'month':
      return `${ date.getFullYear() }-${ zeroPad(getMonthOneBased(date)) }`;
    case 'day':
      return `${ zeroPad(getMonthOneBased(date)) }-${ zeroPad(date.getDate()) }`;
    case 'second':
      return `${ zeroPad(date.getMinutes()) }:${ zeroPad(date.getSeconds()) }`;
    case 'hour':
    case 'minute':
    default:
      return `${ zeroPad(date.getHours()) }:${ zeroPad(date.getMinutes()) }`;
  }
};

export const getRectMetrics = (elem: HTMLDivElement) => {
  const { left, width } = elem.getBoundingClientRect();
  return { left, width };
};

export const calculateClickX = (elem: HTMLDivElement, clientX: number): number => {
  const { left } = getRectMetrics(elem);
  return clientX - left;
};

export const calculateIndex = (elem: HTMLDivElement, clientX: number, dataLength: number): number => {
  const { left, width } = getRectMetrics(elem);
  const clickX = clientX - left;
  const percentage = Math.max(0, Math.min(1, clickX / width));
  return Math.min(Math.floor(percentage * dataLength), dataLength - 1);
};

interface ShowGuageHoverMessageProps {
  e: React.MouseEvent<HTMLDivElement>;
  guageElem: HTMLDivElement | null;
  gaugeHoverGuideElem: HTMLDivElement | null;
  gaugeHoverGuideTextElem: HTMLDivElement | null;
  steps: Date[];
  stepUnit: TimeUnit;
  render?: DateToStringFunc;
}

export const showGuageHoverMessage = ({ e, guageElem, gaugeHoverGuideElem, gaugeHoverGuideTextElem, steps, stepUnit, render }: ShowGuageHoverMessageProps) => {
  if (!guageElem || !gaugeHoverGuideElem || !gaugeHoverGuideTextElem) return;

  const { width } = getRectMetrics(guageElem);
  const pixel = calculateClickX(guageElem, e.clientX);

  if (pixel < 0 || pixel > width) return;

  const { width: guideWidth } = getRectMetrics(gaugeHoverGuideElem);
  gaugeHoverGuideElem.style.left = `${ pixel - (guideWidth / 2) }px`;
  gaugeHoverGuideElem.style.opacity = '1';

  const newIndex = calculateIndex(guageElem, e.clientX, steps.length);
  const date = steps[newIndex];
  gaugeHoverGuideTextElem.innerText = render ? render(date) : getDefaultMessage(date, stepUnit);
};

export const hideGuageHoverMessage = (elem: HTMLDivElement | null) => {
  if (!elem) return;
  elem.style.opacity = '0';
};

interface ChangeSelectedGuideMessageProps {
  guageElem: HTMLDivElement | null;
  selectedGuideElem: HTMLDivElement | null;
  selectedGuideTextElem: HTMLDivElement | null;
  stepWidthPercentage: number;
  index: number;
  date: Date;
  stepUnit: TimeUnit;
  render?: DateToStringFunc;
}

export const changeSelectedGuideMessage = ({ guageElem, selectedGuideElem, selectedGuideTextElem, stepWidthPercentage, index, date, stepUnit, render }: ChangeSelectedGuideMessageProps) => {
  if (!guageElem || !selectedGuideElem || !selectedGuideTextElem) return;

  // 텍스트를 먼저 설정해야 width가 정확하게 계산됨
  selectedGuideTextElem.innerText = render ? render(date) : getDefaultMessage(date, stepUnit);

  // requestAnimationFrame을 사용하여 다음 프레임에서 위치 계산 (텍스트 렌더링 후)
  requestAnimationFrame(() => {
    const { width: gaugeWidth } = getRectMetrics(guageElem);
    const { width: selectedGuideWidth } = getRectMetrics(selectedGuideElem);

    // 플레이바의 오른쪽 끝 (현재 진행된 위치)을 기준으로 툴팁 위치 계산
    const playbarRightPercentage = stepWidthPercentage * (index + 1);
    const selectedGuideOffsetPercentage = (selectedGuideWidth / gaugeWidth) * 100;
    const leftPercentage = playbarRightPercentage - selectedGuideOffsetPercentage;

    selectedGuideElem.style.left = `${ Math.max(0, leftPercentage) }%`;
  });
};

export const returnDate = (date: Date | number) => date instanceof Date ? date : new Date(date);

export const sizeToTWClassName = (size: TimeSliderSize) => {
  let mainSize = 'koast-h-[52px]';
  let playSizeAndRounded = 'koast-size-[36px] koast-rounded-full';
  let prevnextSizeAndRounded = 'koast-size-[28px] koast-rounded-full';

  switch (size) {
    case 'sm': {
      mainSize = 'koast-h-[40px]';
      playSizeAndRounded = 'koast-size-[28px] koast-rounded-full';
      prevnextSizeAndRounded = 'koast-size-[22px] koast-rounded-full';
      break;
    }
    case 'lg': {
      mainSize = 'koast-h-[64px]';
      playSizeAndRounded = 'koast-size-[44px] koast-rounded-full';
      prevnextSizeAndRounded = 'koast-size-[34px] koast-rounded-full';
      break;
    }
  }

  return { mainSize, playSizeAndRounded, prevnextSizeAndRounded };
};

type ThemeColorSet = {
  bgColor: string;
  sliderColor: string;
  playColor: string;
  playBtnColor: string;
  stopBtnColor: string;
  pnBtnColor: string;
  pnBtnBgColor: string;
  textColor: string;
  selectedGuideColor: string;
  hoverGuideColor: string;
  dividerColor: string;
  rulerHeight: string;
};

const getRulerHeight = (size: TimeSliderSize): string => {
  switch (size) {
    case 'sm': return 'koast-h-[32px]';
    case 'lg': return 'koast-h-[54px]';
    default: return 'koast-h-[42px]';
  }
};

export const themeToTWColorClassName = (theme: TimeSliderTheme, size: TimeSliderSize = 'md'): ThemeColorSet => {
  const rulerHeight = getRulerHeight(size);

  switch (theme) {
    case 'light': {
      return {
        bgColor: 'koast-bg-slate-50',
        sliderColor: 'koast-bg-slate-200',
        playColor: 'koast-bg-gradient-to-r koast-from-violet-500 koast-to-indigo-500',
        playBtnColor: 'koast-bg-gradient-to-br koast-from-violet-500 koast-to-indigo-600 koast-shadow-lg koast-shadow-violet-500/30',
        stopBtnColor: 'koast-bg-gradient-to-br koast-from-rose-500 koast-to-pink-600 koast-shadow-lg koast-shadow-rose-500/30',
        pnBtnColor: '#ffffff',
        pnBtnBgColor: 'koast-bg-gradient-to-br koast-from-slate-600 koast-to-slate-700 koast-shadow-md hover:koast-shadow-lg',
        textColor: 'koast-text-slate-600',
        selectedGuideColor: 'koast-bg-gradient-to-r koast-from-violet-500 koast-to-indigo-500 koast-text-white before:koast-border-t-indigo-500',
        hoverGuideColor: 'koast-bg-slate-700 koast-text-white before:koast-border-t-slate-700',
        dividerColor: 'before:koast-border-slate-300',
        rulerHeight,
      };
    }
    case 'cool': {
      return {
        bgColor: 'koast-bg-gradient-to-r koast-from-cyan-900 koast-to-blue-900',
        sliderColor: 'koast-bg-cyan-700/50',
        playColor: 'koast-bg-gradient-to-r koast-from-cyan-400 koast-to-teal-400',
        playBtnColor: 'koast-bg-gradient-to-br koast-from-cyan-400 koast-to-teal-500 koast-shadow-lg koast-shadow-cyan-500/40',
        stopBtnColor: 'koast-bg-gradient-to-br koast-from-rose-500 koast-to-pink-600 koast-shadow-lg koast-shadow-rose-500/30',
        pnBtnColor: '#ffffff',
        pnBtnBgColor: 'koast-bg-gradient-to-br koast-from-cyan-600 koast-to-teal-600 koast-shadow-md hover:koast-shadow-lg',
        textColor: 'koast-text-cyan-100',
        selectedGuideColor: 'koast-bg-gradient-to-r koast-from-cyan-400 koast-to-teal-400 koast-text-slate-900 koast-font-semibold before:koast-border-t-teal-400',
        hoverGuideColor: 'koast-bg-cyan-700 koast-text-white before:koast-border-t-cyan-700',
        dividerColor: 'before:koast-border-cyan-600/50',
        rulerHeight,
      };
    }
    case 'warm': {
      return {
        bgColor: 'koast-bg-gradient-to-r koast-from-amber-900 koast-to-orange-900',
        sliderColor: 'koast-bg-amber-700/50',
        playColor: 'koast-bg-gradient-to-r koast-from-amber-400 koast-to-orange-500',
        playBtnColor: 'koast-bg-gradient-to-br koast-from-amber-400 koast-to-orange-500 koast-shadow-lg koast-shadow-amber-500/40',
        stopBtnColor: 'koast-bg-gradient-to-br koast-from-rose-500 koast-to-red-600 koast-shadow-lg koast-shadow-rose-500/30',
        pnBtnColor: '#ffffff',
        pnBtnBgColor: 'koast-bg-gradient-to-br koast-from-amber-600 koast-to-orange-600 koast-shadow-md hover:koast-shadow-lg',
        textColor: 'koast-text-amber-100',
        selectedGuideColor: 'koast-bg-gradient-to-r koast-from-amber-400 koast-to-orange-500 koast-text-slate-900 koast-font-semibold before:koast-border-t-orange-500',
        hoverGuideColor: 'koast-bg-amber-700 koast-text-white before:koast-border-t-amber-700',
        dividerColor: 'before:koast-border-amber-600/50',
        rulerHeight,
      };
    }
    case 'dark':
    default: {
      return {
        bgColor: 'koast-bg-gradient-to-r koast-from-slate-800 koast-to-slate-900',
        sliderColor: 'koast-bg-slate-600/50',
        playColor: 'koast-bg-gradient-to-r koast-from-violet-500 koast-to-purple-500',
        playBtnColor: 'koast-bg-gradient-to-br koast-from-violet-500 koast-to-purple-600 koast-shadow-lg koast-shadow-violet-500/40',
        stopBtnColor: 'koast-bg-gradient-to-br koast-from-rose-500 koast-to-pink-600 koast-shadow-lg koast-shadow-rose-500/30',
        pnBtnColor: '#ffffff',
        pnBtnBgColor: 'koast-bg-gradient-to-br koast-from-slate-600 koast-to-slate-700 koast-shadow-md hover:koast-shadow-lg',
        textColor: 'koast-text-slate-200',
        selectedGuideColor: 'koast-bg-gradient-to-r koast-from-violet-500 koast-to-purple-500 koast-text-white before:koast-border-t-purple-500',
        hoverGuideColor: 'koast-bg-slate-600 koast-text-white before:koast-border-t-slate-600',
        dividerColor: 'before:koast-border-slate-600/50',
        rulerHeight,
      };
    }
  }
};
