import { twMerge } from 'tailwind-merge';
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
  e: React.MouseEvent<HTMLDivElement>,
  guageElem: HTMLDivElement | null,
  gaugeHoverGuideElem: HTMLDivElement | null,
  gaugeHoverGuideTextElem: HTMLDivElement | null,
  steps: Date[],
  stepUnit: TimeUnit,
  render?: DateToStringFunc
}

export const showGuageHoverMessage = ({ e, guageElem, gaugeHoverGuideElem, gaugeHoverGuideTextElem, steps, stepUnit, render }: ShowGuageHoverMessageProps) => {
  if (!guageElem || !gaugeHoverGuideElem || !gaugeHoverGuideTextElem) return;

  const { width } = getRectMetrics(guageElem);
  const pixel = calculateClickX(guageElem, e.clientX);

  if (pixel < 0 || pixel > width) return;

  const { width:guideWidth } = getRectMetrics(gaugeHoverGuideElem);
  gaugeHoverGuideElem.style.left = `${ pixel - (guideWidth / 2) }px`;
  gaugeHoverGuideElem.style.opacity = '1';

  const newIndex = calculateIndex(guageElem, e.clientX, steps.length);
  const date = steps[newIndex];
  gaugeHoverGuideTextElem.innerText = render ? render(date) : getDefaultMessage(date, stepUnit);
};

export const hideGuageHoverMessage = (elem: HTMLDivElement | null) => {
  if (!elem ) return;
  elem.style.opacity = '0';
};

interface ChangeSelectedGuideMessageProps {
  guageElem: HTMLDivElement | null,
  selectedGuideElem: HTMLDivElement | null,
  selectedGuideTextElem: HTMLDivElement | null,
  stepWidthPercentage: number,
  index: number,
  date: Date,
  stepUnit: TimeUnit,
  render?: DateToStringFunc
}

export const changeSelectedGuideMessage = ({ guageElem, selectedGuideElem, selectedGuideTextElem, stepWidthPercentage, index, date, stepUnit, render }: ChangeSelectedGuideMessageProps) => {
  if (!guageElem || !selectedGuideElem || !selectedGuideTextElem) return;
  const { width:gaugeWidth } = getRectMetrics(guageElem);
  const { width:selectedGuideWidth } = getRectMetrics(selectedGuideElem);

  const selectedGuideOffsetPercentage = (selectedGuideWidth / 2 / gaugeWidth) * 100;
  const leftPercentage = (stepWidthPercentage * index) + (stepWidthPercentage / 2) - selectedGuideOffsetPercentage;

  selectedGuideElem.style.left = `${ leftPercentage }%`;
  selectedGuideTextElem.innerText = render ? render(date) : getDefaultMessage(date, stepUnit);
};

export const returnDate = (date: Date | number) => date instanceof Date ? date : new Date(date);

const currentStopSizeClassName = (size: TimeSliderSize) => {
  switch (size) {
    case 'lg': {
      return 'before:left-[17px] before:top-[7.5px] before:border-y-[15px] before:border-l-[15px]';
    }
    case 'sm': {
      return 'before:left-[8.75px] before:top-[3.75px] before:border-y-[7.5px] before:border-l-[7.5px]';
    }
    case 'md': {
      return 'before:left-[11.5px] before:top-[5px] before:border-y-[10px] before:border-l-[10px]';
    }
  }
};

const currentPlaySizeClassName = (size: TimeSliderSize) => {
  switch (size) {
    case 'lg': {
      return 'before:top-[12px] before:left-[12px] before:w-[6px] before:h-[18px] after:top-[12px] after:right-[12px] after:w-[6px] after:h-[18px]';
    }
    case 'sm': {
      return 'before:top-[6px] before:left-[6px] before:w-[3px] before:h-[9px] after:top-[6px] after:right-[6px] after:w-[3px] after:h-[9px]';
    }
    case 'md': {
      return 'before:top-[8px] before:left-[8px] before:w-[4px] before:h-[12px] after:top-[8px] after:right-[8px] after:w-[4px] after:h-[12px]';
    }
  }
};

const currentStopStyle = (size: TimeSliderSize) => twMerge(
  'before:absolute',
  currentStopSizeClassName(size),
  'before:border-y-transparent before:content-[""]',
);

const currentPlayStyle = (size: TimeSliderSize) => twMerge(
  'before:absolute after:absolute',
  currentPlaySizeClassName(size),
);

export const playStyleStatus = (run: boolean, size: TimeSliderSize) =>
  !run ? currentStopStyle(size) : currentPlayStyle(size);

export const sizeToTWClassName = (size: TimeSliderSize) => {
  let mainSize = 'h-[52px]';
  let playSizeAndRounded = 'size-[36px] rounded-full';
  let prevnextSizeAndRounded = 'size-[28px] rounded-full';

  switch (size) {
    case 'sm': {
      mainSize = 'h-[40px]';
      playSizeAndRounded = 'size-[28px] rounded-full';
      prevnextSizeAndRounded = 'size-[22px] rounded-full';
      break;
    }
    case 'lg': {
      mainSize = 'h-[64px]';
      playSizeAndRounded = 'size-[44px] rounded-full';
      prevnextSizeAndRounded = 'size-[34px] rounded-full';
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
    case 'sm': return 'h-[32px]';
    case 'lg': return 'h-[54px]';
    default: return 'h-[42px]';
  }
};

export const themeToTWColorClassName = (theme: TimeSliderTheme, size: TimeSliderSize = 'md'): ThemeColorSet => {
  const rulerHeight = getRulerHeight(size);

  switch (theme) {
    case 'light': {
      return {
        bgColor: 'bg-slate-50',
        sliderColor: 'bg-slate-200',
        playColor: 'bg-gradient-to-r from-violet-500 to-indigo-500',
        playBtnColor: 'bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/30',
        stopBtnColor: 'bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg shadow-rose-500/30',
        pnBtnColor: '#ffffff',
        pnBtnBgColor: 'bg-gradient-to-br from-slate-600 to-slate-700 shadow-md hover:shadow-lg',
        textColor: 'text-slate-600',
        selectedGuideColor: 'bg-gradient-to-r from-violet-500 to-indigo-500 text-white before:border-t-indigo-500',
        hoverGuideColor: 'bg-slate-700 text-white before:border-t-slate-700',
        dividerColor: 'before:border-slate-300',
        rulerHeight,
      };
    }
    case 'cool': {
      return {
        bgColor: 'bg-gradient-to-r from-cyan-900 to-blue-900',
        sliderColor: 'bg-cyan-700/50',
        playColor: 'bg-gradient-to-r from-cyan-400 to-teal-400',
        playBtnColor: 'bg-gradient-to-br from-cyan-400 to-teal-500 shadow-lg shadow-cyan-500/40',
        stopBtnColor: 'bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg shadow-rose-500/30',
        pnBtnColor: '#ffffff',
        pnBtnBgColor: 'bg-gradient-to-br from-cyan-600 to-teal-600 shadow-md hover:shadow-lg',
        textColor: 'text-cyan-100',
        selectedGuideColor: 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-900 font-semibold before:border-t-teal-400',
        hoverGuideColor: 'bg-cyan-700 text-white before:border-t-cyan-700',
        dividerColor: 'before:border-cyan-600/50',
        rulerHeight,
      };
    }
    case 'warm': {
      return {
        bgColor: 'bg-gradient-to-r from-amber-900 to-orange-900',
        sliderColor: 'bg-amber-700/50',
        playColor: 'bg-gradient-to-r from-amber-400 to-orange-500',
        playBtnColor: 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/40',
        stopBtnColor: 'bg-gradient-to-br from-rose-500 to-red-600 shadow-lg shadow-rose-500/30',
        pnBtnColor: '#ffffff',
        pnBtnBgColor: 'bg-gradient-to-br from-amber-600 to-orange-600 shadow-md hover:shadow-lg',
        textColor: 'text-amber-100',
        selectedGuideColor: 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-semibold before:border-t-orange-500',
        hoverGuideColor: 'bg-amber-700 text-white before:border-t-amber-700',
        dividerColor: 'before:border-amber-600/50',
        rulerHeight,
      };
    }
    case 'dark':
    default: {
      return {
        bgColor: 'bg-gradient-to-r from-slate-800 to-slate-900',
        sliderColor: 'bg-slate-600/50',
        playColor: 'bg-gradient-to-r from-violet-500 to-purple-500',
        playBtnColor: 'bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/40',
        stopBtnColor: 'bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg shadow-rose-500/30',
        pnBtnColor: '#ffffff',
        pnBtnBgColor: 'bg-gradient-to-br from-slate-600 to-slate-700 shadow-md hover:shadow-lg',
        textColor: 'text-slate-200',
        selectedGuideColor: 'bg-gradient-to-r from-violet-500 to-purple-500 text-white before:border-t-purple-500',
        hoverGuideColor: 'bg-slate-600 text-white before:border-t-slate-600',
        dividerColor: 'before:border-slate-600/50',
        rulerHeight,
      };
    }
  }
};