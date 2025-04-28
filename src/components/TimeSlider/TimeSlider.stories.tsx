import type { Meta, StoryObj } from '@storybook/react';
import { TimeSlider } from './TimeSlider';
import { StepTimeSliderProps } from './TimeSlider.types';

/**
 * TimeSlider 컴포넌트는 입력받은 시작시점과 종료시점, 그리고 스텝 간격과 유닛을 이용하여 타임스텝별 슬라이더 기능을 제공합니다.
 */
const meta = {
  title: 'Components/TimeSlider',
  component: TimeSlider,
  args: {
    stepUnit: 'minute',
    start: new Date('2025-03-10T07:00:00'),
    end: new Date('2025-03-10T08:00:00'),
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    start: {
      control: 'date',
      description: '타임슬라이더 시작 시간, steps가 배열인자로 들어올 경우 무시됨.',
    },
    end: {
      control: 'date',
      description: '타임슬라이더 종료 시간, steps가 배열인자로 들어올 경우 무시됨.',
    },
    initialDate: {
      control: 'date',
      description: '초기 슬라이더 시간. 미입력 시 가장 첫번째 위치에 위치.',
    },
    stepValue: {
      control: 'number',
      description: '타임슬라이더 간격, stepUnit에 따라 계산에 사용됨, steps가 배열인자로 들어올 경우 무시됨.',
    },
    stepUnit: {
      control: { type: 'select' },
      options: ['year', 'month', 'day', 'hour', 'minute', 'second'],
      description: 'TimeSlider 스텝의 단위. 기본값은 minute, steps가 배열인자로 들어올 경우 무시됨.',
      table: {
        defaultValue: { summary:'minute' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'TimeSlider 크기. 기본값은 md',
      table: {
        defaultValue: { summary:'md' },
      },
    },
    theme: {
      control: { type: 'select' },
      options: ['dark', 'light', 'cool', 'warm'],
      description: '타임슬라이더 색상 테마. 기본값은 dark',
      table: {
        defaultValue: { summary: 'dark' },
      },
    },
    steps: {
      control:  { disable: true },
      description: '타임슬라이더에 사용할 시간 목록 혹은 시작,종료,스텝간격, 스텝단위를 이용하여 시간 목록을 만드는 함수. 불규칙적인 경우 사용 (ex.해양기상정보포털). 입력 시 가장 우선적으로 적용.',
    },
    animationSpeed: {
      control: 'number',
      description: '타임슬라이더 재생 시간 간격, 기본값은 1000, 단위는 밀리세컨드',
    },
    onChange: {
      control: 'text',
      description: '타임슬라이더에 사용할 시간 목록 혹은 시작,종료,스텝간격, 스텝단위를 이용하여 시간 목록을 만드는 함수. 불규칙적인 경우 사용 (ex.해양기상정보포털). 입력 시 가장 우선적으로 적용.',
    },
    renderGuideMessage: {
      control:  { disable: true },
      description: '타임슬라이더 마우스 오버 시 표출되는 텍스트 처리 함수',
    },
    renderSelectedGuideMessage: {
      control:  { disable: true },
      description: '타임슬라이더 선택된 스텝에 대한 정보 표출 용 텍스트 처리 함수.',
    },
  },
} satisfies Meta<typeof TimeSlider>;

export default meta;

type TimeSliderStory = StoryObj<typeof TimeSlider>;

/**
 * 기본 TimeSlider 예시입니다.
 */
export const Default: TimeSliderStory = {
  render: (args) => (
    <TimeSlider {...args} />
  ),
  args: {
    start: new Date('2025-03-10 07:47'),
    end:  new Date('2025-03-10 09:47'),
    initialDate: new Date('2025-03-10 08:17'),
    stepValue: 30,
    stepUnit: 'minute',
    size: 'md',
    theme: 'dark',
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
  },
};

/**
 * Steps 배열을 이용한 예시입니다. <br>
 * 배열로 넘어올 경우 start, end, stepValue, stepUnit이 무시됨!
 */
export const Steps: TimeSliderStory = {
  render: () => {
    const args: StepTimeSliderProps = {
      stepValue: 30,
      stepUnit: 'day',
      start: new Date('2025-03-10 07:47'),
      end: new Date('2025-03-10 09:47'),
      size: 'md',
      onChange: undefined,
      steps: [
        new Date('2025-03-13 18:00'),
        new Date('2025-03-14 6:00'),
        new Date('2025-03-14 18:00'),
        new Date('2025-03-15 6:00'),
        new Date('2025-03-15 18:00'),
        new Date('2025-03-16 6:00'),
        new Date('2025-03-16 18:00'),
        new Date('2025-03-17 6:00'),
        new Date('2025-03-17 18:00'),
        new Date('2025-03-18 6:00'),
        new Date('2025-03-18 18:00'),
        new Date('2025-03-19 6:00'),
        new Date('2025-03-19 18:00'),
        new Date('2025-03-20 00:00'),
        new Date('2025-03-21 00:00'),
        new Date('2025-03-22 00:00'),
      ],
      renderGuideMessage: (date: Date) => {
        const format = (date: Date) => {
          const hour = date.getHours();
          return `${ hour === 18 ? '오후' : hour === 6 ? '오전' : '전일' }`;
        };
        return format(date);
      },
      renderSelectedGuideMessage: (date: Date) => {
        const format = (date: Date) => {
          const hour = date.getHours();
          return `${ hour === 18 ? '오후' : hour === 6 ? '오전' : '' }`;
        };
        return format(date);
      },
    };
    return (
      <TimeSlider {...args} />
    );
  },
};

/**
 * RenderRulerLabel 예시입니다.<br>
 * 슬라이더 눈금자에 커스텀 라벨 표시합니다. 스텝이 많으면 표출이 어려워져 기본이 아닌 옵션으로 해결합니다.
 */
export const RenderRulerLabel: TimeSliderStory = {
  render: () => {
    const args: StepTimeSliderProps = {
      start: new Date('2025-03-10 07:47'),
      end: new Date('2025-03-10 09:47'),
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
      <TimeSlider {...args} />
    );
  },
};

/**
 * Theme 예시입니다.<br>
 * 슬라이더 색상 테마를 변경합니다.
 */
export const Theme: TimeSliderStory = {
  render: () => {
    const args: StepTimeSliderProps = {
      start: new Date('2025-03-10 07:47'),
      end: new Date('2025-03-10 09:47'),
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
      <div className={'flex flex-col gap-20'}>
        <TimeSlider {...args} theme={'dark'} />
        <TimeSlider {...args} theme={'light'} />
        <TimeSlider {...args} theme={'cool'} />
        <TimeSlider {...args} theme={'warm'} />
      </div>
    );
  },
};
