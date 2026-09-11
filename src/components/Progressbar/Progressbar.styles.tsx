import { twMerge } from '../../utils/twMerge';
import type { ProgressbarTone } from './Progressbar.types';

/** Figma 실측: 루트 세로 gap 12, 헤더~트랙 gap 6, 보조 문구 내부 gap 4 입니다. */
export const getRootStyles = (className: string) =>
  twMerge('koast-flex koast-w-full koast-flex-col koast-gap-3', className);

export const CONTAINER = 'koast-flex koast-w-full koast-flex-col koast-gap-1.5';

/** Figma 는 라벨과 값 사이를 gap 138 로 벌려 둡니다. 가변 폭에서는 양끝 정렬이 같은 결과입니다. */
export const getHeaderStyles = (hasLabel: boolean) =>
  twMerge(
    'koast-flex koast-w-full koast-items-center koast-gap-2',
    hasLabel ? 'koast-justify-between' : 'koast-justify-end',
  );

/** Figma 의 라벨·값·보조 문구는 모두 w500 16/20 입니다. Label · TextField 와 같은 타이포입니다. */
const TEXT = 'koast-text-base koast-font-medium koast-leading-5';

export const VALUE
  = `koast-shrink-0 koast-whitespace-nowrap ${ TEXT } koast-text-tertiary`;

export const LABEL = 'koast-min-w-0 koast-truncate';

/**
 * 트랙입니다. 높이 8 · r99999 · #f4f4f5 로 Slider 의 lg 트랙과 같은 표현입니다.
 * (Slider 는 Figma 가 #e4e4e7 이라 bg-tertiary 로 근사했고, 여기는 실측이 정확히 bg-tertiary 입니다.)
 */
export const TRACK
  = 'koast-relative koast-h-2 koast-w-full koast-overflow-hidden koast-rounded-full koast-bg-tertiary';

/** 지시자입니다. 진행 중 색은 Slider 채움과 같은 interactive-primary 입니다. */
export const getIndicatorStyles = (error: boolean, indeterminate: boolean) =>
  twMerge(
    'koast-h-full koast-rounded-full',
    error ? 'koast-bg-danger-bold' : 'koast-bg-interactive-primary',
    indeterminate
      // 진행률을 모르므로 트랙을 채운 뒤 밝기만 흔듭니다. WCAG 2.3.3 을 위해 축소 설정에서는 멈춥니다.
      ? 'koast-w-full koast-animate-pulse motion-reduce:koast-animate-none'
      : 'koast-transition-[width] koast-duration-300 koast-ease-out',
  );

/** 보조 문구입니다. Figma 는 아이콘 24x24, 아이콘과 문구 사이 4px 입니다. */
export const getHelperStyles = (tone: ProgressbarTone) =>
  twMerge(
    // preflight 가 꺼져 있어 p 의 브라우저 기본 여백을 직접 지웁니다.
    'koast-m-0 koast-flex koast-items-center koast-gap-1',
    TEXT,
    tone === 'error'
      ? 'koast-text-danger'
      : tone === 'success'
        ? 'koast-text-success'
        : 'koast-text-tertiary',
  );

export const HELPER_ICON = 'koast-size-6 koast-shrink-0';
