import React from 'react';
import { TimeLine } from '../../../src';

const START = new Date('2026-09-01T00:00:00');
const END = new Date('2026-09-04T21:00:00');

const TimeLineExam = () => {
  const [date, setDate] = React.useState<Date>(START);

  return (
    <div className={'flex flex-col gap-2'}>
      <TimeLine
        type={'daily'}
        start={START}
        end={END}
        stepValue={3}
        stepUnit={'hour'}
        onChange={({ date }) => setDate(date)}
      />
      <TimeLine
        type={'hourly'}
        start={START}
        end={new Date('2026-09-01T23:00:00')}
        stepValue={1}
        stepUnit={'hour'}
      />
      <span>{date.toISOString()}</span>
    </div>
  );
};

export default TimeLineExam;
