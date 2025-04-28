// import './TimeSlider.css';
import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import { calculateIndex, changeSelectedGuideMessage, generateSteps, hideGuageHoverMessage, playStyleStatus, returnDate, showGuageHoverMessage, sizeToTWClassName, themeToTWColorClassName } from './TimeSlider.func';
import { StepTimeSliderProps } from './TimeSlider.types';
/**
 * koast-ui 타임슬라이더 컴포넌트입니다.
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
    playColor,
    sliderColor,
    textColor,
    selectedGuideColor,
    hoverGuideColor,
  } = themeToTWColorClassName(theme);

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
      <button onClick={handlePrev} className={`flex items-center justify-center px-px ${ prevnextSizeAndRounded } bg-gray-100 shadow-[0_0_4px_0_#000]`}>
        <svg viewBox={'0 0 16 16'} className={'size-4/5'}>
          <polyline points={'12,2 4,8 12,14'} fill={'none'} stroke={pnBtnColor} strokeWidth={'2'} />
        </svg>
      </button>
    );
  };

  const NextButton = () => {
    return (
      <button onClick={handleNext} className={`flex items-center justify-center pl-0.5 ${ prevnextSizeAndRounded } bg-gray-100 shadow-[0_0_4px_0_#000]`}>
        <svg viewBox={'0 0 16 16'} className={'size-4/5'}>
          <polyline points={'4,2 12,8 4,14'} fill={'none'} stroke={pnBtnColor} strokeWidth={'2'} />
        </svg>
      </button>
    );
  };

  return (
    <section className={clsx(`flex ${ mainSize } w-full gap-1`)}>
      <section className={clsx('timeslider-animation-box-wrapper flex h-full min-w-[40px] cursor-pointer flex-col items-center justify-center')}>
        <div
          onClick={() => {
            setIsRun(!isRun);
          }}
          className={clsx(
            'relative',
            playSizeAndRounded,
            'bg-gray-100 shadow-[0_0_4px_0_#000]',
            playStyleStatus(isRun, size),
            isRun ? stopBtnColor : playBtnColor,
          )}
        />
        <div className={'mt-[3px] flex gap-1'}>
          <PrevButton />
          <NextButton />
        </div>
      </section>

      <section className={'timeslider-wrapper flex-1'}>
        <section
          ref={gaugeRef}
          onClick={handleClick}
          onMouseMove={handleHover}
          onMouseOut={handleMouseOut}
          className={'timeslider-guage-wrapper relative h-1/5 w-full cursor-pointer bg-clip-padding after:absolute after:inset-[-5px] after:z-[1] after:content-[""]'}
        >
          <div className={'relative size-full'}>
            <div className={clsx('absolute size-full rounded-none rounded-t-md', sliderColor)} />
            <div className={clsx('absolute h-full rounded-none rounded-tl-md', playColor)} style={{ width: `${ stepWidthPercentage * (currentIndex + 1) }%` }} />
          </div>
          <div ref={gaugeHoverGuideRef} className={'pointer-events-none absolute top-[-2.4em] box-border text-sm opacity-0'}>
            <div ref={gaugeHoverGuideTextRef} className={clsx('relative box-border table-cell whitespace-nowrap rounded-[.5em] p-[0.2em] text-center align-middle shadow-none before:absolute before:left-[1.5em] before:top-full before:ml-[-0.5em] before:size-0 before:border-[0.5em] before:border-solid before:border-transparent before:content-[""]', hoverGuideColor)} />
          </div>
          <div ref={selectedGuideRef} className={'opacity-1 pointer-events-none absolute top-[-2.4em] box-border w-[100px] text-base'}>
            <div ref={selectedGuideTextRef} className={clsx('relative box-border table-cell min-w-[100px] whitespace-nowrap rounded-[.5em] p-[0.2em] text-center align-middle shadow-[0_0_4px_0_#000] before:absolute before:left-[42px] before:top-full before:size-0 before:border-[0.5em] before:border-solid before:border-transparent before:content-[""]', selectedGuideColor)} />
          </div>
        </section>
        <section className={clsx('timeslider-ruler-wrapper relative flex h-4/5 w-full flex-col', bgColor)}>
          <div className={'timeslider-graduations-wrapper flex size-full flex-row'}>
            {
              calculatedSteps.map((date, index) => {
                return (
                  <div
                    key={`${ index }-graduation2`}
                    className={clsx(
                      'relative flex h-full items-center justify-center text-gray-800',
                      calculatedStepsLength - 1 === index ? '' : 'before:absolute before:right-0 before:top-0 before:h-1/2 before:border-r-2 before:border-white before:content-[""]',
                    )}
                    style={{ width: `${ stepWidthPercentage }%` }}
                  >
                    {
                      renderRulerLabel
                        ? <span className={textColor}>{renderRulerLabel(date)}</span>
                        : null
                    }
                  </div>
                );
              })
            }
          </div>
        </section>
      </section>
    </section>
  );
};
export default TimeSlider;
