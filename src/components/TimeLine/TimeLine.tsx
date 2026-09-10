import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Loader2, Pause, Play, RotateCcw } from 'lucide-react';
import type { TimeLineLayout, TimeLineProps } from './TimeLine.types';
import {
  buildDaySegments,
  calculateIndex,
  formatDate,
  formatDayLabel,
  formatTime,
  generateSteps,
  getDefaultMessage,
  isSameDay,
  returnDate,
  widthToLayout,
} from './TimeLine.func';
import {
  AREA,
  CONTROLS,
  DIVIDER,
  PLAYHEAD_DOT,
  PLAYHEAD_LINE,
  RULER_LABEL,
  SPEED_MENU,
  TICK,
  TODAY_BADGE,
  TOOLTIP,
  TOOLTIP_DATE,
  TOOLTIP_TIME,
  TRACK_BG,
  getDataBarStyles,
  getDayDateStyles,
  getDayLabelStyles,
  getDayWeekdayStyles,
  getPlayButtonStyles,
  getProgressStyles,
  getRootStyles,
  getSegmentStyles,
  getSpeedButtonStyles,
  getSpeedItemStyles,
  getStepButtonStyles,
  tooltipTransform,
} from './TimeLine.styles';

const DEFAULT_SPEEDS = [0.5, 1, 2, 4];
const HOUR_MS = 3600000;

const LABEL_SLOTS: Record<TimeLineLayout, number> = {
  desktop: 13,
  compact: 7,
  mobile: 4,
};

/**
 * @koast/ui TimeLine 컴포넌트입니다.
 * 시간의 흐름에 따라 변화하는 데이터를 탐색하고 재생하는 컨트롤입니다.
 * `daily` 는 날짜 세그먼트로, `hourly` 는 연속 트랙으로 표시하며 레이아웃은 컨테이너 폭에 따라 자동 전환됩니다.
 *
 * @param {Date} props.start - 타임라인 시작 시각 : Date
 * @param {Date} props.end - 타임라인 종료 시각 : Date
 * @param {number} props.stepValue - 스텝 간격 : number
 * @param {TimeUnit} [props.stepUnit='minute'] - 스텝 간격 단위 : 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'
 * @param {Date} [props.initialDate] - 초기 위치. 미입력 시 첫 스텝 : Date
 * @param {Date[] | Function} [props.steps] - 불규칙한 시각 목록. 스텝이 없는 날은 데이터 없음으로 표시됩니다 : Date[] | Function
 * @param {'daily' | 'hourly'} [props.type='hourly'] - 표시 방식 : 'daily' | 'hourly'
 * @param {1 | 3 | 6} [props.interval=3] - hourly 눈금 간격(시간) : 1 | 3 | 6
 * @param {number} [props.animationSpeed=1000] - 한 스텝당 재생 간격(ms) : number
 * @param {number[]} [props.speeds=[0.5, 1, 2, 4]] - 배속 선택지 : number[]
 * @param {number} [props.speed] - 현재 배속. 지정하면 제어 컴포넌트로 동작합니다 : number
 * @param {Function} [props.onSpeedChange] - 배속 변경 콜백 : Function
 * @param {boolean} [props.loading=false] - 로딩 상태 : boolean
 * @param {boolean} [props.disabled=false] - 비활성화 상태 : boolean
 * @param {Function} [props.onChange] - 스텝 변경 콜백. { step, date } 를 받습니다 : Function
 * @param {Function} [props.renderGuideMessage] - hourly 트랙 hover 텍스트 : (date: Date) => string
 * @param {Function} [props.renderSelectedGuideMessage] - 현재 시각 툴팁 텍스트 : (date: Date) => string
 * @param {Function} [props.renderRulerLabel] - hourly 눈금 라벨 텍스트 : (date: Date) => string
 * @param {string} [props.className] - 레이아웃 조정용 CSS 클래스 (색상 지정 불가) : string
 *
 * @example
 * ```tsx
 * <TimeLine
 *   type="daily"
 *   start={new Date('2026-09-01')}
 *   end={new Date('2026-09-04')}
 *   stepValue={3}
 *   stepUnit="hour"
 *   onChange={({ date }) => setDate(date)}
 * />
 * ```
 */
export const TimeLine = (props: TimeLineProps) => {
  const {
    className = '',
    start,
    end,
    initialDate,
    stepValue,
    stepUnit = 'minute',
    steps,
    type = 'hourly',
    interval = 3,
    animationSpeed = 1000,
    speeds = DEFAULT_SPEEDS,
    speed,
    onSpeedChange,
    loading = false,
    disabled = false,
    onChange,
    renderGuideMessage,
    renderSelectedGuideMessage,
    renderRulerLabel,
  } = props;

  const startTime = returnDate(start).getTime();
  const endTime = returnDate(end).getTime();

  const calculatedSteps = useMemo(() => {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    if (steps) {
      return typeof steps === 'function'
        ? steps(startDate, endDate, stepValue, stepUnit)
        : steps;
    }
    return generateSteps(startDate, endDate, stepValue, stepUnit);
  }, [startTime, endTime, stepValue, stepUnit, steps]);

  const stepCount = calculatedSteps.length;
  const lastIndex = Math.max(0, stepCount - 1);

  const initialStepIndex = useMemo(() => {
    if (!initialDate || !stepCount) return 0;
    const target = returnDate(initialDate).getTime();
    return calculatedSteps.reduce(
      (best, step, index) =>
        Math.abs(step.getTime() - target)
        < Math.abs(calculatedSteps[best].getTime() - target)
          ? index
          : best,
      0,
    );
  }, [calculatedSteps, initialDate, stepCount]);

  const [currentIndex, setCurrentIndex] = useState(initialStepIndex);
  const [playing, setPlaying] = useState(false);
  const [innerSpeed, setInnerSpeed] = useState(() =>
    speeds.includes(1) ? 1 : (speeds[0] ?? 1));
  const [speedOpen, setSpeedOpen] = useState(false);
  const [layout, setLayout] = useState<TimeLineLayout>('desktop');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const currentSpeed = speed ?? innerSpeed;
  const inactive = disabled || loading || stepCount === 0;
  const ended = !playing && stepCount > 0 && currentIndex >= lastIndex;

  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef<HTMLDivElement>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useLayoutEffect(() => {
    const node = rootRef.current;
    if (!node || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(([entry]) => {
      setLayout(widthToLayout(entry.contentRect.width));
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || inactive) return;
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev + 1 > lastIndex) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, Math.max(16, animationSpeed / currentSpeed));
    return () => window.clearInterval(timer);
  }, [playing, inactive, lastIndex, animationSpeed, currentSpeed]);

  useEffect(() => {
    if (stepCount === 0) return;
    onChangeRef.current?.({ step: currentIndex, date: calculatedSteps[currentIndex] });
  }, [currentIndex, calculatedSteps, stepCount]);

  useEffect(() => {
    if (!speedOpen) return;
    const close = (event: MouseEvent) => {
      if (!speedRef.current?.contains(event.target as Node)) setSpeedOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [speedOpen]);

  const seek = (index: number) => {
    if (inactive) return;
    setCurrentIndex(Math.max(0, Math.min(lastIndex, index)));
  };

  // 연속 클릭이 한 렌더에 묶여도 밀리지 않도록 이전 값을 기준으로 옮깁니다.
  const stepBy = (delta: number) => {
    if (inactive) return;
    setCurrentIndex((prev) => Math.max(0, Math.min(lastIndex, prev + delta)));
  };

  const togglePlay = () => {
    if (inactive) return;
    if (ended) {
      setCurrentIndex(0);
      setPlaying(true);
      return;
    }
    setPlaying((prev) => !prev);
  };

  const pickSpeed = (next: number) => {
    if (speed === undefined) setInnerSpeed(next);
    onSpeedChange?.(next);
    setSpeedOpen(false);
  };

  const currentDate = calculatedSteps[currentIndex];
  const ratioOf = (index: number) => (stepCount > 1 ? index / lastIndex : 0);
  const progressRatio = ratioOf(currentIndex);

  const daySegments = useMemo(
    () => buildDaySegments(new Date(startTime), new Date(endTime), calculatedSteps),
    [startTime, endTime, calculatedSteps],
  );

  const ticks = useMemo(() => {
    if (type !== 'hourly' || stepCount === 0) return [];
    const first = calculatedSteps[0].getTime();
    const span = calculatedSteps[lastIndex].getTime() - first;
    if (span <= 0) return [];
    const out: { ratio: number; date: Date }[] = [];
    const cursor = new Date(first);
    cursor.setMinutes(0, 0, 0);
    while (cursor.getTime() <= first + span) {
      if (cursor.getTime() >= first) {
        out.push({ ratio: (cursor.getTime() - first) / span, date: new Date(cursor) });
      }
      cursor.setTime(cursor.getTime() + interval * HOUR_MS);
    }
    return out;
  }, [type, calculatedSteps, interval, lastIndex, stepCount]);

  const labelStride = Math.max(1, Math.ceil(ticks.length / LABEL_SLOTS[layout]));

  const PlayIcon = loading ? Loader2 : ended ? RotateCcw : playing ? Pause : Play;
  const playLabel = ended ? '처음부터 재생' : playing ? '일시정지' : '재생';

  const atStart = inactive || currentIndex === 0;
  const atEnd = inactive || currentIndex >= lastIndex;

  return (
    <div ref={rootRef} className={getRootStyles(layout, className)}>
      <div className={CONTROLS}>
        <button
          type={'button'}
          aria-label={'이전 시각'}
          disabled={atStart}
          onClick={() => stepBy(-1)}
          className={getStepButtonStyles(atStart)}
        >
          <ChevronLeft className={'koast-size-4'} aria-hidden />
        </button>
        <button
          type={'button'}
          aria-label={playLabel}
          disabled={inactive}
          onClick={togglePlay}
          className={getPlayButtonStyles(inactive)}
        >
          <PlayIcon
            className={loading ? 'koast-size-6 koast-animate-spin' : 'koast-size-6'}
            aria-hidden
          />
        </button>
        <button
          type={'button'}
          aria-label={'다음 시각'}
          disabled={atEnd}
          onClick={() => stepBy(1)}
          className={getStepButtonStyles(atEnd)}
        >
          <ChevronRight className={'koast-size-4'} aria-hidden />
        </button>
      </div>

      {type === 'daily'
        ? (
            <div className={AREA} role={'group'} aria-label={'날짜 선택'}>
              {daySegments.map((segment, index) => {
                const hasData = segment.stepIndexes.length > 0;
                const active = hasData && segment.stepIndexes.includes(currentIndex);
                const label = formatDayLabel(segment.day);
                const off = inactive || !hasData;
                return (
                  <div key={segment.day.getTime()} className={'koast-flex koast-min-w-0 koast-grow koast-basis-0'}>
                    {index > 0 && <div className={DIVIDER} />}
                    <button
                      type={'button'}
                      disabled={off}
                      aria-current={active || undefined}
                      onClick={() => hasData && seek(segment.stepIndexes[0])}
                      className={getSegmentStyles(layout, active, off)}
                    >
                      <span className={getDayLabelStyles(layout)}>
                        <span className={getDayDateStyles(layout, active, off)}>{label.date}</span>
                        <span className={getDayWeekdayStyles(active, off)}>{label.weekday}</span>
                      </span>
                      <span className={getDataBarStyles(hasData, active, inactive)} />
                      {isSameDay(segment.day, new Date()) && (
                        <span className={TODAY_BADGE}>{'오늘'}</span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )
        : (
            <div className={AREA}>
              <div className={'koast-flex koast-w-full koast-flex-col koast-gap-1'}>
                <div
                  ref={trackRef}
                  role={'slider'}
                  tabIndex={inactive ? -1 : 0}
                  aria-label={'시각 선택'}
                  aria-valuemin={0}
                  aria-valuemax={lastIndex}
                  aria-valuenow={currentIndex}
                  aria-valuetext={currentDate ? formatTime(currentDate) : undefined}
                  onClick={(event) => {
                    if (inactive || !trackRef.current) return;
                    seek(calculateIndex(trackRef.current, event.clientX, stepCount));
                  }}
                  onMouseMove={(event) => {
                    if (inactive || !trackRef.current) return;
                    setHoverIndex(calculateIndex(trackRef.current, event.clientX, stepCount));
                  }}
                  onMouseLeave={() => setHoverIndex(null)}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowLeft') {
                      event.preventDefault();
                      stepBy(-1);
                    }
                    if (event.key === 'ArrowRight') {
                      event.preventDefault();
                      stepBy(1);
                    }
                  }}
                  className={'koast-relative koast-flex koast-h-5 koast-cursor-pointer koast-items-center focus-visible:koast-outline-none'}
                >
                  <span className={TRACK_BG} />
                  <span className={getProgressStyles(inactive)} style={{ width: `${ progressRatio * 100 }%` }} />
                  {ticks.map((tick) => (
                    <span
                      key={tick.date.getTime()}
                      className={TICK}
                      style={{ left: `${ tick.ratio * 100 }%` }}
                    />
                  ))}
                  <span className={PLAYHEAD_LINE} style={{ left: `${ progressRatio * 100 }%` }} />
                  <span className={PLAYHEAD_DOT} style={{ left: `${ progressRatio * 100 }%` }} />
                  {currentDate && (
                    <span className={TOOLTIP} style={{ left: `${ progressRatio * 100 }%`, transform: tooltipTransform(progressRatio) }}>
                      {renderSelectedGuideMessage
                        ? <span className={TOOLTIP_TIME}>{renderSelectedGuideMessage(currentDate)}</span>
                        : (
                            <>
                              <span className={TOOLTIP_DATE}>{formatDate(currentDate)}</span>
                              <span className={TOOLTIP_TIME}>{formatTime(currentDate)}</span>
                            </>
                          )}
                    </span>
                  )}
                  {hoverIndex !== null
                  && hoverIndex !== currentIndex
                  && calculatedSteps[hoverIndex] && (
                    <span className={TOOLTIP} style={{ left: `${ ratioOf(hoverIndex) * 100 }%`, transform: tooltipTransform(ratioOf(hoverIndex)) }}>
                      <span className={TOOLTIP_DATE}>
                        {renderGuideMessage
                          ? renderGuideMessage(calculatedSteps[hoverIndex])
                          : getDefaultMessage(calculatedSteps[hoverIndex], stepUnit)}
                      </span>
                    </span>
                  )}
                </div>
                <div className={'koast-relative koast-h-3.5 koast-w-full'}>
                  {ticks.map((tick, index) =>
                    index % labelStride === 0
                      ? (
                          <span
                            key={tick.date.getTime()}
                            className={RULER_LABEL}
                            style={{ left: `${ tick.ratio * 100 }%` }}
                          >
                            {renderRulerLabel ? renderRulerLabel(tick.date) : formatTime(tick.date)}
                          </span>
                        )
                      : null,
                  )}
                </div>
              </div>
            </div>
          )}

      <div ref={speedRef} className={'koast-relative koast-shrink-0'}>
        <button
          type={'button'}
          disabled={inactive}
          aria-haspopup={'listbox'}
          aria-expanded={speedOpen}
          aria-label={'재생 속도'}
          onClick={() => setSpeedOpen((prev) => !prev)}
          className={getSpeedButtonStyles(inactive)}
        >
          {`${ currentSpeed }x`}
          <ChevronDown className={'koast-size-3'} aria-hidden />
        </button>
        {speedOpen && (
          <ul role={'listbox'} aria-label={'재생 속도'} className={SPEED_MENU}>
            {speeds.map((option) => (
              <li
                key={option}
                role={'option'}
                aria-selected={option === currentSpeed}
                onClick={() => pickSpeed(option)}
                className={getSpeedItemStyles(option === currentSpeed)}
              >
                {`${ option }x`}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TimeLine;
