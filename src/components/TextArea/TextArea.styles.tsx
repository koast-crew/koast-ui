import { twMerge } from '../../utils/twMerge';
import {
  FIELD_BOX,
  FIELD_SCROLLBAR,
  FIELD_TEXT,
  getFieldBoxColors,
  getFieldControlColors,
} from '../field/fieldChrome.styles';

/** Figma 가 높이를 180px 로 고정하고 안쪽 여백을 상하좌우 16px 로 둡니다. */
const TEXTAREA_BASE = 'koast-block koast-h-[180px] koast-m-0 koast-p-4 koast-align-top koast-outline-none';

export const getTextAreaStyles = (
  disabled: boolean,
  error: boolean,
  focused: boolean,
  autoResize: boolean,
  resizable: boolean,
) =>
  twMerge(
    FIELD_BOX,
    FIELD_TEXT,
    TEXTAREA_BASE,
    FIELD_SCROLLBAR,
    getFieldBoxColors(disabled, error, focused),
    getFieldControlColors(disabled),
    autoResize
      ? 'koast-h-auto koast-min-h-[180px] koast-resize-none koast-overflow-hidden'
      : resizable && !disabled
        ? 'koast-resize-y'
        : 'koast-resize-none',
  );

/** 라벨과 글자 수 카운터를 한 줄에 놓습니다. 이 줄이 상자와의 12px 간격을 담당합니다. */
export const TEXTAREA_HEADER = 'koast-mb-3 koast-flex koast-items-center koast-gap-2';

/** Figma 의 Counter 프레임은 높이 16px 이고 줄의 오른쪽 끝에 붙습니다. */
export const getTextAreaCounterStyles = (disabled: boolean) =>
  twMerge(
    'koast-ml-auto koast-shrink-0 koast-text-sm koast-font-medium koast-leading-4',
    disabled ? 'koast-text-disabled' : 'koast-text-tertiary',
  );
