import type { ReactNode } from 'react';

/** Figma 의 Size 축입니다. Small / Medium / Large 에 대응합니다. */
export type SliderSize = 'sm' | 'md' | 'lg';

/** Figma Slider 셋의 Style 축입니다. card=테두리 카드, plain=테두리 없음. */
export type SliderVariant = 'plain' | 'card';

/** 범위 슬라이더의 값입니다. [작은 값, 큰 값] 순서로 유지됩니다. */
export type SliderRangeValue = [number, number];

export type SliderValue = number | SliderRangeValue;

export interface SliderProps {
  /** 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. */
  className?: string;

  /** 최솟값입니다. @default 0 */
  min?: number;

  /** 최댓값입니다. @default 100 */
  max?: number;

  /** 값의 증분입니다. 눈금(`showTicks`)도 이 값을 기준으로 그려집니다. @default 1 */
  step?: number;

  /** 제어 값입니다. 배열을 넘기면 범위 슬라이더로 동작합니다. */
  value?: SliderValue;

  /** 비제어 초기값입니다. 배열을 넘기면 범위 슬라이더로 동작합니다. @default min */
  defaultValue?: SliderValue;

  /** Figma 의 Size 축입니다. @default 'md' */
  size?: SliderSize;

  /** Figma Slider 셋의 Style 축입니다. @default 'plain' */
  variant?: SliderVariant;

  /** Figma State=Disabled 입니다. @default false */
  disabled?: boolean;

  /** Figma State=Error 입니다. @default false */
  error?: boolean;

  /** 헤더 왼쪽 라벨입니다. */
  label?: ReactNode;

  /** 헤더 오른쪽 값 텍스트입니다. 미입력 시 `formatValue` 로 만든 값이 들어갑니다. */
  valueText?: ReactNode;

  /** 헤더 값 텍스트 표시 여부입니다. @default true */
  showValue?: boolean;

  /** 트랙 아래 Min / Mid / Max 라벨 표시 여부입니다. @default true */
  showRangeLabels?: boolean;

  /** Figma 의 Mid Value 축입니다. 가운데 라벨을 표시합니다. @default true */
  showMidLabel?: boolean;

  /** Min 라벨 텍스트입니다. 미입력 시 `formatValue(min)`. */
  minLabel?: ReactNode;

  /** Mid 라벨 텍스트입니다. 미입력 시 `formatValue((min + max) / 2)`. */
  midLabel?: ReactNode;

  /** Max 라벨 텍스트입니다. 미입력 시 `formatValue(max)`. */
  maxLabel?: ReactNode;

  /** Figma 의 Show Ticks 축입니다. `step` 간격으로 눈금을 그립니다. @default false */
  showTicks?: boolean;

  /** Figma 의 Show Helper 축입니다. 아래쪽 보조 문구입니다. */
  helperText?: ReactNode;

  /** hover / focus / 드래그 중 썸 위에 값 툴팁을 띄웁니다. @default true */
  showTooltip?: boolean;

  /** 툴팁 값 뒤에 얇게 붙는 단위입니다. 예: `'%'`. */
  unit?: string;

  /** 값을 문자열로 바꿉니다. 헤더 · 툴팁 · 범위 라벨 · `aria-valuetext` 에 함께 쓰입니다. */
  formatValue?: (value: number) => string;

  /** 접근성 이름입니다. `label` 이 없을 때 사용하세요. */
  ariaLabel?: string;

  /** 값이 바뀔 때마다 호출됩니다. 범위면 `[min, max]` 배열이 넘어옵니다. */
  onChange?: (value: SliderValue) => void;

  /** 드래그가 끝나거나 키 조작이 끝났을 때 한 번 호출됩니다. */
  onChangeEnd?: (value: SliderValue) => void;
}
