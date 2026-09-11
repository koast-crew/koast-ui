import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from 'react';
import type { SliderProps, SliderValue } from './Slider.types';
import type { SliderThumbState } from './Slider.styles';
import {
  HEADER,
  RANGE_LABELS,
  TICK,
  TOOLTIP,
  TOOLTIP_UNIT,
  TOOLTIP_VALUE,
  getFillStyles,
  getHelperStyles,
  getLabelStyles,
  getRangeLabelStyles,
  getRootStyles,
  getThumbHitStyles,
  getThumbStyles,
  getTrackAreaStyles,
  getTrackStyles,
  getValueStyles,
} from './Slider.styles';

const MAX_TICKS = 100;

const decimalsOf = (step: number) => (String(step).split('.')[1] ?? '').length;

const snap = (raw: number, min: number, max: number, step: number) => {
  const clamped = Math.min(max, Math.max(min, raw));
  if (!(step > 0)) return clamped;
  const decimals = Math.max(decimalsOf(step), decimalsOf(min));
  // 부동소수 누적 오차를 자릿수로 잘라낸 뒤 다시 범위 안으로 넣습니다.
  const snapped = Number(
    (min + Math.round((clamped - min) / step) * step).toFixed(decimals),
  );
  return Math.min(max, Math.max(min, snapped));
};

const toArray = (value: SliderValue): number[] =>
  Array.isArray(value) ? [value[0], value[1]] : [value];

const isSame = (a: number[], b: number[]) =>
  a.length === b.length && a.every((item, index) => item === b[index]);

/** 범위 슬라이더에서 두 썸이 서로를 넘어가지 않도록 자릅니다. */
const moveThumb = (
  prev: number[],
  index: number,
  raw: number,
  min: number,
  max: number,
  step: number,
): number[] => {
  const next = snap(raw, min, max, step);
  if (prev.length < 2) return [next];
  return index === 0
    ? [Math.min(next, prev[1]), prev[1]]
    : [prev[0], Math.max(next, prev[0])];
};

/**
 * @koast/ui Slider 컴포넌트입니다.
 * 정해진 범위 안에서 값을 드래그·키보드로 고르는 입력 컨트롤입니다.
 * `value` / `defaultValue` 에 배열을 넘기면 썸이 두 개인 범위 슬라이더로 동작합니다.
 *
 * @param {number} [props.min=0] - 최솟값 : number
 * @param {number} [props.max=100] - 최댓값 : number
 * @param {number} [props.step=1] - 값의 증분. 눈금 간격도 같습니다 : number
 * @param {number | [number, number]} [props.value] - 제어 값. 배열이면 범위 슬라이더 : number | [number, number]
 * @param {number | [number, number]} [props.defaultValue] - 비제어 초기값 : number | [number, number]
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Figma 의 Size 축 : 'sm' | 'md' | 'lg'
 * @param {'plain' | 'card'} [props.variant='plain'] - Figma Slider 셋의 Style 축 : 'plain' | 'card'
 * @param {boolean} [props.disabled=false] - 비활성화 상태 : boolean
 * @param {boolean} [props.error=false] - 오류 상태 : boolean
 * @param {React.ReactNode} [props.label] - 헤더 왼쪽 라벨 : React.ReactNode
 * @param {React.ReactNode} [props.valueText] - 헤더 오른쪽 값 텍스트 : React.ReactNode
 * @param {boolean} [props.showValue=true] - 헤더 값 텍스트 표시 여부 : boolean
 * @param {boolean} [props.showRangeLabels=true] - 트랙 아래 Min / Mid / Max 표시 여부 : boolean
 * @param {boolean} [props.showMidLabel=true] - Figma 의 Mid Value 축 : boolean
 * @param {boolean} [props.showTicks=false] - Figma 의 Show Ticks 축 : boolean
 * @param {React.ReactNode} [props.helperText] - Figma 의 Show Helper 축 : React.ReactNode
 * @param {boolean} [props.showTooltip=true] - hover / focus / 드래그 중 값 툴팁 : boolean
 * @param {string} [props.unit] - 값 뒤에 붙는 단위 : string
 * @param {Function} [props.formatValue] - 값 표시 형식 : (value: number) => string
 * @param {Function} [props.onChange] - 값이 바뀔 때마다 호출 : (value: number | [number, number]) => void
 * @param {Function} [props.onChangeEnd] - 조작이 끝났을 때 한 번 호출 : (value: number | [number, number]) => void
 * @param {string} [props.className] - 레이아웃 조정용 CSS 클래스 (색상 지정 불가) : string
 *
 * @example
 * ```tsx
 * // 단일 값
 * <Slider label="Opacity" defaultValue={75} unit="%" showTicks step={10} />
 *
 * // 범위
 * <Slider
 *   label="Wind Speed"
 *   min={0}
 *   max={60}
 *   defaultValue={[5, 25]}
 *   unit=" kts"
 *   onChange={(value) => setRange(value as [number, number])}
 * />
 * ```
 */
export const Slider = (props: SliderProps) => {
  const {
    className = '',
    min = 0,
    max = 100,
    step = 1,
    value,
    defaultValue,
    size = 'md',
    variant = 'plain',
    disabled = false,
    error = false,
    label,
    valueText,
    showValue = true,
    showRangeLabels = true,
    showMidLabel = true,
    minLabel,
    midLabel,
    maxLabel,
    showTicks = false,
    helperText,
    showTooltip = true,
    unit,
    formatValue,
    ariaLabel,
    onChange,
    onChangeEnd,
  } = props;

  const format = useMemo(
    () => formatValue ?? ((item: number) => String(item)),
    [formatValue],
  );
  const withUnit = (item: number) => `${ format(item) }${ unit ?? '' }`;

  const [values, setValues] = useState<number[]>(() =>
    toArray(defaultValue ?? value ?? min).map((item) => snap(item, min, max, step)));
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const isRange = values.length > 1;
  const trackRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef(values);
  const groupId = useId();

  const output = (next: number[]): SliderValue =>
    next.length > 1 ? [next[0], next[1]] : next[0];

  // 연속 이벤트가 한 렌더에 묶여도 값이 밀리지 않도록 ref 를 먼저 갱신합니다.
  const change = (next: number[]) => {
    if (isSame(valuesRef.current, next)) return;
    valuesRef.current = next;
    setValues(next);
    onChange?.(output(next));
  };

  const controlledKey = value === undefined ? '' : toArray(value).join('|');

  useEffect(() => {
    if (controlledKey === '') return;
    const next = controlledKey
      .split('|')
      .map((item) => snap(Number(item), min, max, step));
    if (isSame(valuesRef.current, next)) return;
    valuesRef.current = next;
    setValues(next);
  }, [controlledKey, min, max, step]);

  const ratioOf = (item: number) =>
    max > min ? (item - min) / (max - min) : 0;

  const valueFromClientX = (clientX: number) => {
    const node = trackRef.current;
    if (!node) return min;
    const rect = node.getBoundingClientRect();
    if (rect.width <= 0) return min;
    return min + ((clientX - rect.left) / rect.width) * (max - min);
  };

  const nearestIndex = (raw: number) => {
    const current = valuesRef.current;
    if (current.length < 2) return 0;
    return Math.abs(raw - current[0]) <= Math.abs(raw - current[1]) ? 0 : 1;
  };

  const dragRef = useRef({ move: (_clientX: number) => {}, end: () => {} });
  dragRef.current = {
    move: (clientX: number) => {
      if (dragIndex === null) return;
      change(
        moveThumb(
          valuesRef.current,
          dragIndex,
          valueFromClientX(clientX),
          min,
          max,
          step,
        ),
      );
    },
    end: () => {
      setDragIndex(null);
      onChangeEnd?.(output(valuesRef.current));
    },
  };

  useEffect(() => {
    if (dragIndex === null) return;
    const move = (event: PointerEvent) => dragRef.current.move(event.clientX);
    const end = () => dragRef.current.end();
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', end);
      window.removeEventListener('pointercancel', end);
    };
  }, [dragIndex]);

  const handleTrackPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    const raw = valueFromClientX(event.clientX);
    const index = nearestIndex(raw);
    setDragIndex(index);
    setFocusIndex(index);
    change(moveThumb(valuesRef.current, index, raw, min, max, step));
  };

  // 화살표 · Home · End · PageUp · PageDown 은 항상 직전 값을 기준으로 움직입니다.
  const handleKeyDown = (index: number) =>
    (event: ReactKeyboardEvent<HTMLSpanElement>) => {
      if (disabled) return;
      const page = Math.max(step, (max - min) / 10);
      const prev = valuesRef.current;
      const move = (raw: number) => {
        event.preventDefault();
        change(moveThumb(prev, index, raw, min, max, step));
        onChangeEnd?.(output(valuesRef.current));
      };
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          return move(prev[index] + step);
        case 'ArrowLeft':
        case 'ArrowDown':
          return move(prev[index] - step);
        case 'PageUp':
          return move(prev[index] + page);
        case 'PageDown':
          return move(prev[index] - page);
        case 'Home':
          return move(min);
        case 'End':
          return move(max);
        default:
      }
    };

  const ticks = useMemo(() => {
    if (!showTicks || !(step > 0) || max <= min) return [];
    const count = Math.round((max - min) / step);
    if (count < 1 || count > MAX_TICKS) return [];
    return Array.from({ length: count + 1 }, (_, index) => (index / count) * 100);
  }, [showTicks, step, min, max]);

  const thumbStateOf = (index: number): SliderThumbState =>
    disabled
      ? 'disabled'
      : error
        ? 'error'
        : dragIndex === index
          ? 'active'
          : focusIndex === index
            ? 'focus'
            : hoverIndex === index
              ? 'hover'
              : 'default';

  const fillLeft = isRange ? ratioOf(values[0]) * 100 : 0;
  const fillWidth
    = (isRange ? ratioOf(values[1]) - ratioOf(values[0]) : ratioOf(values[0])) * 100;

  const headerValue
    = valueText
      ?? (isRange
        ? `${ format(values[0]) } – ${ withUnit(values[1]) }`
        : withUnit(values[0]));

  const hasHeader = label !== undefined || valueText !== undefined;
  const labelId = `${ groupId }-label`;
  // 라벨이 없으면 role="slider" 에 접근성 이름이 비므로 기본 이름을 채웁니다.
  const fallbackName = label !== undefined ? undefined : (ariaLabel ?? '값 선택');

  return (
    <div
      className={getRootStyles(variant, disabled, className)}
      role={isRange ? 'group' : undefined}
      aria-label={isRange ? (ariaLabel ?? undefined) : undefined}
      aria-labelledby={isRange && !ariaLabel && label !== undefined ? labelId : undefined}
    >
      {hasHeader && (
        <div className={HEADER}>
          <span id={labelId} className={getLabelStyles(size, disabled, error)}>
            {label}
          </span>
          {showValue && (
            <span className={getValueStyles(size, disabled, error)}>
              {headerValue}
            </span>
          )}
        </div>
      )}

      <div
        ref={trackRef}
        className={getTrackAreaStyles(size, disabled)}
        onPointerDown={handleTrackPointerDown}
      >
        <span className={getTrackStyles(size, disabled)} />
        <span
          className={getFillStyles(size, disabled, error)}
          style={{ left: `${ fillLeft }%`, width: `${ fillWidth }%` }}
        />
        {ticks.map((ratio) => (
          <span key={ratio} className={TICK} style={{ left: `${ ratio }%` }} />
        ))}
        {values.map((item, index) => {
          const state = thumbStateOf(index);
          const tooltipOpen
            = showTooltip
              && !disabled
              && (dragIndex === index || focusIndex === index || hoverIndex === index);
          return (
            <span
              key={index}
              role={'slider'}
              tabIndex={disabled ? -1 : 0}
              aria-orientation={'horizontal'}
              aria-valuemin={isRange && index === 1 ? values[0] : min}
              aria-valuemax={isRange && index === 0 ? values[1] : max}
              aria-valuenow={item}
              aria-valuetext={withUnit(item)}
              aria-disabled={disabled || undefined}
              aria-label={isRange ? (index === 0 ? '최솟값' : '최댓값') : fallbackName}
              aria-labelledby={
                !isRange && fallbackName === undefined ? labelId : undefined
              }
              className={getThumbHitStyles(disabled)}
              style={{ left: `${ ratioOf(item) * 100 }%` }}
              onPointerEnter={() => !disabled && setHoverIndex(index)}
              onPointerLeave={() => setHoverIndex((prev) => (prev === index ? null : prev))}
              onFocus={() => setFocusIndex(index)}
              onBlur={() => setFocusIndex((prev) => (prev === index ? null : prev))}
              onKeyDown={handleKeyDown(index)}
            >
              <span className={getThumbStyles(size, state)} />
              {tooltipOpen && (
                <span className={TOOLTIP}>
                  <span className={TOOLTIP_VALUE}>{format(item)}</span>
                  {unit !== undefined && unit !== '' && (
                    <span className={TOOLTIP_UNIT}>{unit.trim()}</span>
                  )}
                </span>
              )}
            </span>
          );
        })}
      </div>

      {showRangeLabels && (
        <div className={RANGE_LABELS}>
          <span className={getRangeLabelStyles(size, disabled, error, 'left')}>
            {minLabel ?? format(min)}
          </span>
          {showMidLabel && (
            <span className={getRangeLabelStyles(size, disabled, error, 'center')}>
              {midLabel ?? format((min + max) / 2)}
            </span>
          )}
          <span className={getRangeLabelStyles(size, disabled, error, 'right')}>
            {maxLabel ?? format(max)}
          </span>
        </div>
      )}

      {helperText !== undefined && (
        <span className={getHelperStyles(size, error)}>{helperText}</span>
      )}
    </div>
  );
};

export default Slider;
