import React from 'react';
import { TimeSlider, StepTimeSliderProps } from '../../../src';

const TimeSliderExam = () => {
  const props: StepTimeSliderProps = {
    start: new Date('2025-03-10 07:47'),
    end:  new Date('2025-03-10 09:47'),
    initialDate: new Date('2025-03-10 08:17'),
    stepValue: 30,
    stepUnit: 'minute',
    size: 'md',
    onChange: undefined,
    renderRulerLabel: (date: Date) => {
      const format = (date: Date) => {
        const dateDate = date.getDate();
        const month = date.getMonth() + 1;

        const hour = date.getHours();
        const min = date.getMinutes();

        return `${ month }-${ dateDate } ${ hour }:${ min }`;
      };
      return format(date);
    },
  };
  return (
    <TimeSlider {...props} />
  );
};

export default TimeSliderExam;
