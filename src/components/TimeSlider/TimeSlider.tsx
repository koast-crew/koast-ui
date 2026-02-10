// import './TimeSlider.css';
import { twMerge } from 'tailwind-merge';
import { useEffect, useMemo, useRef, useState } from 'react';
import { calculateIndex, changeSelectedGuideMessage, generateSteps, hideGuageHoverMessage, playStyleStatus, returnDate, showGuageHoverMessage, sizeToTWClassName, themeToTWColorClassName } from './TimeSlider.func';
import { StepTimeSliderProps } from './TimeSlider.types';
/**
 * @koast/ui 타임슬라이더 컴포넌트입니다.
 * @param {'Date'} [props.start] - 타임슬라이더 시작 시간. required
 * @param {'Date'} [props.end] - 타임슬라이더 종료 시간. required
 * @param {'number'} [props.stepValue] - 타임슬라이더 간격, stepUnit에 따라 계산에 사용됨. required
 * @param {'Date'} [props.initialDate] - 초기 슬라이더 시간. 미입력 시 가장 첫번째 위치에 위치 optional
 * @param {'TimeUnit'} [props.stepUnit] - 타임슬라이더 간격 단위. 기본값은 minute, 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';
 * @param {'TimeSliderSize'} [props.size] - 타임슬라이더 크기. 기본값은 md, 'sm' | 'md' | 'lg';
 * @param {'TimeSliderTheme'} [props.theme] - 타임슬라이더 색상 테마. 기본값은 dark, 'dark' | 'light' | 'cool' | 'warm';
 * @param {'Date[] | ((start: Date, end: Date, stepValue: number, stepUnit?: TimeUnit)=> Date[]'} [props.steps] - 타임슬라이더 시간 목록. 불규칙적인 경우 사용 (ex.해양기상정보포털). 사용 시 가장 우선적으로 적용됨. optional
 * @param {'number'} [props.animationSpeed] - 타임슬라이더 재생 시간 간격, 기본값은 1000, 단위는 밀리세컨드
 * @param {'(StepTimeSliderOnChangeProps)=> void'} [props.onChange] - 타임 슬라이더 스텝 변경 시 콜백 함수. {step: number,date: Date} 형태의 인자를 넘겨주는 함수 형태
 * @param {'DateToStringFunc'} [props.renderGuideMessage] - 타임슬라이더 마우스 오버 시 표출되는 텍스트 처리 함수, (date: Date)=> string의 구조
 * @param {'DateToStringFunc'} [props.renderSelectedGuideMessage] - 타임슬라이더 선택된 스텝에 대한 정보 표출 용 텍스트 처리 함수, (date: Date)=> string의 구조
 * @param {'DateToStringFunc'} [props.renderRulerLabel] - 타임슬라이더 선택된 스텝에 대한 정보 표출 용 텍스트 처리 함수, (date: Date)=> string의 구조
 *
 */
export const TimeSlider = (props: StepTimeSliderProps) => {
  const { start, end, stepValue, initialDate, stepUnit = 'minute', size = 'md', theme = 'dark', steps, animationSpeed = 1000, onChange, renderGuideMessage, renderSelectedGuideMessage, renderRulerLabel } = props;

  const startDate = returnDate(start);
  const endDate = returnDate(end);

  const [isRun, setIsRun] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  const gaugeRef = useRef<HTMLDivElement>(null);
  const gaugeHoverGuideRef = useRef<HTMLDivElement>(null);
  const gaugeHoverGuideTextRef = useRef<HTMLDivElement>(null);
  const selectedGuideRef = useRef<HTMLDivElement>(null);
  const selectedGuideTextRef = useRef<HTMLDivElement>(null);

  const calculatedSteps = useMemo(() => {
    if (steps) {
      return typeof steps === 'function'
        ? steps(startDate, endDate, stepValue, stepUnit)
        : steps;
    }
    return generateSteps(startDate, endDate, stepValue, stepUnit);
  }, [startDate, endDate, stepValue, stepUnit, steps]);

  const {
    mainSize,
    playSizeAndRounded,
    prevnextSizeAndRounded,
  } = sizeToTWClassName(size);

  const {
    bgColor,
    playBtnColor,
    stopBtnColor,
    pnBtnColor,
    pnBtnBgColor,
    playColor,
    sliderColor,
    textColor,
    selectedGuideColor,
    hoverGuideColor,
    dividerColor,
    rulerHeight,
  } = themeToTWColorClassName(theme, size);

  const calculatedStepsLength = calculatedSteps.length;
  const stepWidthPercentage = 100 / calculatedStepsLength;

  const initialTimestamp = (initialDate && calculatedSteps.map((step) => step.getTime()).includes(initialDate.getTime())) ? initialDate.getTime() : startDate.getTime();
  const initialStepIndex = useMemo(() => {
    return calculatedSteps.reduce((prevIndex, step, idx) => {
      return Math.abs(step.getTime() - initialTimestamp)
        < Math.abs(calculatedSteps[prevIndex].getTime() - initialTimestamp)
        ? idx
        : prevIndex;
    }, 0);
  }, [calculatedSteps, initialTimestamp]);

  const [currentIndex, setCurrentIndex] = useState<number>(initialStepIndex);

  useEffect(() => {
    changeSelectedGuideMessage({
      guageElem: gaugeRef.current,
      selectedGuideElem: selectedGuideRef.current,
      selectedGuideTextElem: selectedGuideTextRef.current,
      stepWidthPercentage,
      index: currentIndex,
      date: calculatedSteps[currentIndex],
      stepUnit,
      render: renderSelectedGuideMessage,
    });

    if (onChange) onChange({ step: currentIndex, date: calculatedSteps[currentIndex] });
  }, [
    currentIndex,
    calculatedSteps,
    stepWidthPercentage,
    stepUnit,
    renderSelectedGuideMessage,
    onChange,
  ]);

  useEffect(() => {
    const removeInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    if (isRun) {
      if (intervalRef.current) return;
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex < calculatedStepsLength) {
            return nextIndex;
          } else {
            setIsRun(false);
            removeInterval();
            return prevIndex;
          }
        });
      }, animationSpeed);
    } else {
      removeInterval();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRun, calculatedStepsLength, animationSpeed]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gaugeRef.current) return;
    const newIndex = calculateIndex(gaugeRef.current, e.clientX, calculatedStepsLength);
    if (currentIndex === newIndex) return;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < calculatedStepsLength) setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  };

  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => showGuageHoverMessage(
    { e,
      guageElem: gaugeRef.current,
      gaugeHoverGuideElem: gaugeHoverGuideRef.current,
      gaugeHoverGuideTextElem: gaugeHoverGuideTextRef.current,
      steps: calculatedSteps,
      stepUnit: stepUnit,
      render: renderGuideMessage,
    },
  );

  const handleMouseOut = () => hideGuageHoverMessage(gaugeHoverGuideRef.current);

  const PrevButton = () => {
    return (
      <button
        onClick={handlePrev}
        className={twMerge(
          'flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95',
          prevnextSizeAndRounded,
          pnBtnBgColor,
        )}
      >
        <svg viewBox={'0 0 16 16'} className={twMerge('size-3/5')}>
          <polyline points={'10,3 5,8 10,13'} fill={'none'} stroke={pnBtnColor} strokeWidth={'2.5'} strokeLinecap={'round'} strokeLinejoin={'round'} />
        </svg>
      </button>
    );
  };

  const NextButton = () => {
    return (
      <button
        onClick={handleNext}
        className={twMerge(
          'flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95',
          prevnextSizeAndRounded,
          pnBtnBgColor,
        )}
      >
        <svg viewBox={'0 0 16 16'} className={twMerge('size-3/5')}>
          <polyline points={'6,3 11,8 6,13'} fill={'none'} stroke={pnBtnColor} strokeWidth={'2.5'} strokeLinecap={'round'} strokeLinejoin={'round'} />
        </svg>
      </button>
    );
  };

  return (
    <section className={twMerge(`flex items-center ${ mainSize } w-full gap-3`)}>
      {/* Play/Stop Button */}
      <div
        onClick={() => {
          setIsRun(!isRun);
        }}
        className={twMerge(
          'relative cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95',
          playSizeAndRounded,
          playStyleStatus(isRun, size),
          isRun ? stopBtnColor : playBtnColor,
        )}
      />

      {/* Timeline Section */}
      <section className={twMerge('timeslider-wrapper flex-1 min-w-0')}>
        <section
          ref={gaugeRef}
          onClick={handleClick}
          onMouseMove={handleHover}
          onMouseOut={handleMouseOut}
          className={twMerge('timeslider-guage-wrapper relative h-2 w-full cursor-pointer rounded-t-md after:absolute after:inset-[-5px] after:z-[1] after:content-[""]')}
        >
          <div className={twMerge('relative size-full overflow-hidden rounded-t-md')}>
            <div className={twMerge('absolute size-full', sliderColor)} />
            <div className={twMerge('absolute h-full transition-all duration-150 ease-out', playColor)} style={{ width: `${ stepWidthPercentage * (currentIndex + 1) }%` }} />
          </div>
          <div ref={gaugeHoverGuideRef} className={twMerge('pointer-events-none absolute top-[-2.4em] box-border text-sm opacity-0 transition-opacity duration-150')}>
            <div ref={gaugeHoverGuideTextRef} className={twMerge('relative box-border table-cell whitespace-nowrap rounded-md px-2 py-1 text-center align-middle text-xs font-medium before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:size-0 before:border-[0.4em] before:border-solid before:border-transparent before:content-[""]', hoverGuideColor)} />
          </div>
          <div ref={selectedGuideRef} className={twMerge('opacity-1 pointer-events-none absolute top-[-2.6em] box-border text-sm transition-all duration-150')}>
            <div ref={selectedGuideTextRef} className={twMerge('relative box-border table-cell whitespace-nowrap rounded-md px-3 py-1.5 text-center align-middle font-semibold shadow-lg before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:size-0 before:border-[0.4em] before:border-solid before:border-transparent before:content-[""]', selectedGuideColor)} />
          </div>
        </section>
        <section className={twMerge('timeslider-ruler-wrapper relative flex w-full rounded-b-md', rulerHeight, bgColor)}>
          <div className={twMerge('timeslider-graduations-wrapper flex size-full flex-row')}>
            {
              calculatedSteps.map((date, index) => {
                return (
                  <div
                    key={`${ index }-graduation2`}
                    className={twMerge(
                      'relative flex h-full items-center justify-center overflow-hidden',
                      calculatedStepsLength - 1 === index ? '' : `before:absolute before:right-0 before:top-0 before:h-1/2 before:border-r before:content-[""] ${ dividerColor }`,
                    )}
                    style={{ width: `${ stepWidthPercentage }%` }}
                  >
                    {
                      renderRulerLabel
                        ? <span className={twMerge('truncate px-0.5 text-xs', textColor)}>{renderRulerLabel(date)}</span>
                        : null
                    }
                  </div>
                );
              })
            }
          </div>
        </section>
      </section>

      {/* Prev/Next Buttons */}
      <div className={twMerge('flex items-center gap-1.5')}>
        <PrevButton />
        <NextButton />
      </div>
    </section>
  );
};
export default TimeSlider;
