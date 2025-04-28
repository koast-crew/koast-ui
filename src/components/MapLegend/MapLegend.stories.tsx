import type { Meta, StoryObj } from '@storybook/react';
import { MapLegend } from './MapLegend';
import { Droplets, Thermometer, Waves, Fish } from 'lucide-react';
import { useState } from 'react';

/**
 * MapLegend 컴포넌트는 지도 위에 표시되는 범례를 제공합니다.
 * 다양한 레이어에 대한 색상 스케일과 값을 시각적으로 표현합니다.
 */
const meta: Meta<typeof MapLegend> = {
  title: 'Components/MapLegend',
  component: MapLegend,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '범례 제목입니다.',
      defaultValue: '범례',
      type: { name: 'string', required: false },
    },
    visible: {
      control: 'boolean',
      description: '범례의 표시 여부를 결정합니다.',
      defaultValue: true,
    },
    onClose: {
      control: { disable: true },
      description: '범례 닫기 버튼 클릭 시 호출될 함수입니다. 보통 `onClose={() => setVisible(false)}` 형태로 사용합니다.',
      type: { name: 'function' },
    },
    selectedLayerId: {
      control: 'select',
      options: ['fish', 'sst', 'chl', 'wave'],
      description: '현재 선택된 레이어 ID입니다.',
      defaultValue: 'fish',
    },
    onLayerSelect: {
      control: { disable: true },
      description: '레이어 선택 시 호출될 함수입니다. 보통 `onLayerSelect={(id) => setSelectedId(id)}` 형태로 사용합니다.',
      type: { name: 'function' },
    },
    toolbarButtons: {
      control: 'object',
      description: '범례에 표시될 레이어 버튼 그룹의 배열입니다. 각 버튼은 id, label, icon 속성을 가집니다.',
    },
    legendData: {
      control: 'object',
      description: '각 레이어 ID에 해당하는 범례 데이터 객체입니다. colors(색상 배열), values(값 배열), opacity(투명도) 속성을 포함합니다.',
    },
    excludeButtonIds: {
      control: 'object',
      description: '필터링할 버튼 ID 배열입니다. legendData의 키값으로 이루어진 배열입니다.',
    },
    legendType: {
      control: 'select',
      options: ['bar', 'circle'],
      description: '범례 표시 타입입니다.',
      defaultValue: 'bar',
      onChange: (value: string) => {
        if (value === 'circle') {
          return { legendData: sampleCircleLegendData };
        }
        return { legendData: sampleLegendData };
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MapLegend>;

// 샘플 툴바 버튼 데이터
const sampleToolbarButtons = [
  { id: 'fish', label: '어획량', icon: <Fish size={16} /> },
  { id: 'sst', label: '수온', icon: <Thermometer size={16} /> },
  { id: 'chl', label: '클로로필', icon: <Droplets size={16} /> },
  { id: 'wave', label: '파고', icon: <Waves size={16} /> },
];

// 샘플 범례 데이터
const sampleLegendData = {
  fish: {
    colors: ['#B3E5FC', '#81D4FA', '#4FC3F7', '#81C784', '#66BB6A', '#FFF176', '#FFD54F', '#FFB74D', '#FF8A65', '#F44336', '#C62828'],
    values: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '300~', ' '],
    opacity: 0.8,
  },
  chl: {
    colors: ['#F7FCF5', '#E5F5E0', '#C7E9C0', '#A1D99B', '#74C476', '#41AB5D', '#238B45', '#006D2C', '#00441B', '#002910'],
    values: ['0.1', '0.2', '0.3', '1', '2', '3', '4', '6', '8', '10', '12'],
    opacity: 0.7,
  },
  sst: {
    colors: ['#362B71', '#3465A0', '#68A8CE', '#86C993', '#C8DDA4', '#F7DF89', '#EB7F33', '#E05B30', '#BF363C', '#981D22'],
    values: ['0', '3', '6', '9', '12', '15', '18', '21', '24', '30', '35'],
    opacity: 0.7,
  },
  wave: {
    colors: ['#FFFFFF', '#E8E8E8', '#D1D1D1', '#BABABF', '#A3A3AD', '#8C8C9B', '#757589', '#5E5E77', '#474765', '#303053'],
    values: ['0.0', '0.3', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5.2'],
    opacity: 0.7,
  },
};

const sampleCircleLegendData = {
  fish: [
    { color: '#B3E5FC', value: '0-10', opacity: 0.8 },
    { color: '#81D4FA', value: '10-20', opacity: 0.8 },
    { color: '#4FC3F7', value: '20-30', opacity: 0.8 },
  ],
  chl: [
    { color: '#F7FCF5', value: '0.1-0.2', opacity: 0.8 },
    { color: '#E5F5E0', value: '0.2-0.3', opacity: 0.8 },
    { color: '#C7E9C0', value: '0.3-1', opacity: 0.8 },
  ],
  sst: [
    { color: '#362B71', value: '0-3', opacity: 0.8 },
    { color: '#3465A0', value: '3-6', opacity: 0.8 },
    { color: '#68A8CE', value: '6-9', opacity: 0.8 },
  ],
  wave: [
    { color: '#FFFFFF', value: '0.0-0.3', opacity: 0.8 },
    { color: '#E8E8E8', value: '0.3-1.0', opacity: 0.8 },
    { color: '#D1D1D1', value: '1.0-1.5', opacity: 0.8 },
    { color: '#BABABF', value: '1.5-2.0', opacity: 0.8 },
    { color: '#A3A3AD', value: '2.0-2.5', opacity: 0.8 },
    { color: '#8C8C9B', value: '2.5-3.0', opacity: 0.8 },
    { color: '#757589', value: '3.0-3.5', opacity: 0.8 },
    { color: '#5E5E77', value: '3.5-4.0', opacity: 0.8 },
    { color: '#474765', value: '4.0-4.5', opacity: 0.8 },
    { color: '#303053', value: '4.5-5.2', opacity: 0.8 },
  ],
};

export const BarLegend: Story = {
  args: {
    visible: true,
    selectedLayerId: 'fish',
    toolbarButtons: sampleToolbarButtons,
    legendData: sampleLegendData,
    excludeButtonIds: [''],
    legendType: 'bar',
  },
};

/**
 * 개별 범례 항목 표시 범례 예시입니다.
 */

export const CircleLegend: Story = {
  render: () => {
    // 'circle' 타입 범례 데이터 예시
    const circleLegendData = {
      fish: [
        { color: '#B3E5FC', value: '낮음', opacity: 0.8 },
        { color: '#81D4FA', value: '중간', opacity: 0.8 },
        { color: '#4FC3F7', value: '많음', opacity: 0.8 },
        { color: '#81C784', value: '매우많음', opacity: 0.8 },
      ],
      chl: [
        { color: '#362B71', value: '0~0.3', opacity: 0.8 },
        { color: '#3465A0', value: '0.3~1', opacity: 0.8 },
        { color: '#68A8CE', value: '1~6', opacity: 0.8 },
        { color: '#86C993', value: '6~9', opacity: 0.8 },
        { color: '#C8DDA4', value: '9~12', opacity: 0.8 },
      ],
      sst: [
        { color: '#F7FCF5', value: '낮음', opacity: 0.8 },
        { color: '#E5F5E0', value: '중간', opacity: 0.8 },
        { color: '#C7E9C0', value: '높음', opacity: 0.8 },
        { color: '#A1D99B', value: '매우높음', opacity: 0.8 },
      ],
      wave: [
        { color: '#FFFFFF', value: '낮음', opacity: 0.8 },
        { color: '#E8E8E8', value: '중간', opacity: 0.8 },
        { color: '#D1D1D1', value: '높음', opacity: 0.8 },
        { color: '#BABABF', value: '매우높음', opacity: 0.8 },
      ],
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedId, setSelectedId] = useState('fish');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [visible, setVisible] = useState(true);
    return (
      <div className={'flex flex-col gap-4'}>
        <MapLegend
          legendType={'circle'}
          visible={visible}
          onClose={() => setVisible(false)}
          selectedLayerId={selectedId}
          onLayerSelect={setSelectedId}
          toolbarButtons={sampleToolbarButtons}
          legendData={circleLegendData}
        />
      </div>
    );
  },
};

/**
 * 인터렉티브한 범례 예시입니다.
 */
export const Interactive: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedId, setSelectedId] = useState('fish');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [visible, setVisible] = useState(true);

    return (
      <div className={'flex w-[400px] flex-col gap-4'}>
        <div className={'flex justify-center gap-2'}>
          <button
            onClick={() => setVisible(!visible)}
            className={'rounded bg-blue-500 px-4 py-2 text-white'}
          >
            {visible ? '범례 숨김' : '범례 표시'}
          </button>
        </div>
        <MapLegend
          visible={visible}
          onClose={() => setVisible(false)}
          selectedLayerId={selectedId}
          onLayerSelect={setSelectedId}
          toolbarButtons={sampleToolbarButtons}
          legendData={sampleLegendData}
          excludeButtonIds={['grid', 'current']}
        />
      </div>
    );
  },
};

/**
 * 커스텀 스타일 범례 예시입니다.
 */
export const CustomStyled: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedId, setSelectedId] = useState('fish');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [visible, setVisible] = useState(true);
    return (
      <div className={'flex flex-col gap-4'}>
        <MapLegend
          visible={visible}
          onClose={() => setVisible(false)}
          selectedLayerId={selectedId}
          onLayerSelect={setSelectedId}
          toolbarButtons={sampleToolbarButtons}
          legendData={sampleLegendData}
          excludeButtonIds={['grid', 'current']}
          className={'w-[900px] border border-gray-300 bg-gray-700 text-white'}
        />
      </div>
    );
  },
};