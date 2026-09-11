import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { TimeLine } from './TimeLine';

const START = new Date('2026-08-31T00:00:00');
const END = new Date('2026-09-03T21:00:00');
const DAY_START = new Date('2026-09-01T00:00:00');
const DAY_END = new Date('2026-09-01T23:00:00');

const meta: Meta<typeof TimeLine> = {
  title: 'Components/TimeLine',
  component: TimeLine,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  args: {
    type: 'daily',
    start: START,
    end: END,
    stepValue: 3,
    stepUnit: 'hour',
    // TimeLine 도 마운트 직후 effect 에서 onChange 를 부릅니다.
    onChange: fn(),
    onSpeedChange: fn(),
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['daily', 'hourly'],
      description: 'Figma 의 **Type** 축입니다. daily=날짜 세그먼트, hourly=연속 트랙.',
    },
    interval: {
      control: 'radio',
      options: [1, 3, 6],
      description: 'Figma 의 **Interval** 축입니다. hourly 눈금 간격(시간).',
    },
    loading: { control: 'boolean', description: 'Figma State=Loading.' },
    disabled: { control: 'boolean', description: 'Figma State=Disabled.' },
    animationSpeed: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof TimeLine>;

/** 기본값입니다. Figma 의 `Type=Daily, Layout=Desktop, State=Paused, Data=Available` 에 해당합니다. */
export const Daily: Story = {};

/** **Type=Hourly** 입니다. 연속 트랙 위에 플레이헤드와 툴팁이 놓입니다. */
export const Hourly: Story = {
  args: { type: 'hourly', start: DAY_START, end: DAY_END, stepValue: 1, stepUnit: 'hour' },
};

/** **Interval** 축입니다. 눈금과 라벨 간격만 달라집니다. */
export const HourlyIntervals: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {([1, 3, 6] as const).map((interval) => (
        <div key={interval}>
          <span className={'story-label'}>{`Interval = ${ interval }h`}</span>
          <TimeLine {...args} type={'hourly'} interval={interval} />
        </div>
      ))}
    </div>
  ),
  args: { start: DAY_START, end: DAY_END, stepValue: 1, stepUnit: 'hour' },
};

/**
 * **Layout** 축입니다. 컨테이너 폭으로 자동 전환됩니다.
 * Figma 기준 Desktop 800 / Compact 540 / Mobile 360.
 */
export const Layouts: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {([['Desktop', 800], ['Compact', 540], ['Mobile', 360]] as const).map(([name, width]) => (
        <div key={name}>
          <span className={'story-label'}>{`${ name } · ${ width }px`}</span>
          <div style={{ width }}>
            <TimeLine {...args} />
          </div>
        </div>
      ))}
    </div>
  ),
};

/** **Day Count** 축입니다. start~end 가 걸친 날짜 수로 정해집니다. */
export const DayCounts: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      {([1, 2, 3, 4] as const).map((days) => (
        <div key={days}>
          <span className={'story-label'}>{`Day Count = ${ days }`}</span>
          <TimeLine
            {...args}
            start={START}
            end={new Date(START.getTime() + (days * 24 - 3) * 3600000)}
          />
        </div>
      ))}
    </div>
  ),
};

/**
 * **Data** 축입니다. `steps` 로 시각을 직접 넘기면 스텝이 하나도 없는 날이
 * 데이터 없음(회색 바)으로 표시됩니다. 별도 prop 이 필요 없습니다.
 */
export const DataAvailability: Story = {
  render: (args) => {
    const everyThreeHours = (from: Date) =>
      Array.from({ length: 8 }, (_, i) => new Date(from.getTime() + i * 3 * 3600000));

    const day = (offset: number) =>
      new Date(START.getTime() + offset * 24 * 3600000);

    return (
      <div className={'story-stack'}>
        <div>
          <span className={'story-label'}>{'Available · 전체'}</span>
          <TimeLine {...args} />
        </div>
        <div>
          <span className={'story-label'}>{'Partial · 3일차 데이터 없음'}</span>
          <TimeLine
            {...args}
            steps={[
              ...everyThreeHours(day(0)),
              ...everyThreeHours(day(1)),
              ...everyThreeHours(day(3)),
            ]}
          />
        </div>
        <div>
          <span className={'story-label'}>{'None · 전체 없음'}</span>
          <TimeLine {...args} steps={[]} />
        </div>
      </div>
    );
  },
};

/** **State** 축입니다. Playing / Ended 는 재생 버튼을 눌러 확인합니다. */
export const States: Story = {
  render: (args) => (
    <div className={'story-stack'}>
      <div>
        <span className={'story-label'}>{'Paused'}</span>
        <TimeLine {...args} />
      </div>
      <div>
        <span className={'story-label'}>{'Loading'}</span>
        <TimeLine {...args} loading />
      </div>
      <div>
        <span className={'story-label'}>{'Disabled'}</span>
        <TimeLine {...args} disabled />
      </div>
    </div>
  ),
};

/** 배속 선택지는 `speeds` 로 주입합니다. */
export const Speeds: Story = {
  args: { speeds: [1, 2, 4, 8], animationSpeed: 400 },
};
