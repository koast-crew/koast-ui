import { twMerge } from '../../utils/twMerge';
import {
  FIELD_BOX,
  FIELD_CONTROL_RESET,
  FIELD_TEXT,
  getFieldBoxColors,
  getFieldControlColors,
} from '../field/fieldChrome.styles';
import type { TextFieldSize } from './TextField.types';

/** 상자 높이는 디자인 시스템이 고정값으로 정의합니다(40 / 48). 글자·아이콘 크기는 size 와 무관합니다. */
const BOX_HEIGHTS: Record<TextFieldSize, string> = {
  sm: 'koast-h-10',
  md: 'koast-h-12',
};

export const getTextFieldBoxStyles = (
  size: TextFieldSize,
  disabled: boolean,
  error: boolean,
  focused: boolean,
) =>
  twMerge(
    FIELD_BOX,
    'koast-flex koast-items-center koast-gap-2.5 koast-px-4',
    BOX_HEIGHTS[size],
    getFieldBoxColors(disabled, error, focused),
  );

export const getTextFieldInputStyles = (disabled: boolean) =>
  twMerge(FIELD_CONTROL_RESET, FIELD_TEXT, 'koast-flex-1', getFieldControlColors(disabled));

export { getFieldIconStyles as getTextFieldIconStyles } from '../field/fieldChrome.styles';
