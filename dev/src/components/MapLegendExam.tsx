import React from 'react';
import MapLegend from '../../../src/components/MapLegend';
import { Fish, Thermometer, Droplets, Waves } from 'lucide-react';
export default function MapLegendExam() {
  const [visible, setVisible] = React.useState(true);
  const [selectedId, setSelectedId] = React.useState('fish');

  return (
    <div className={'flex flex-col gap-4'}>
      <MapLegend
        visible={visible}
        onClose={() => setVisible(false)}
        selectedLayerId={selectedId}
        onLayerSelect={setSelectedId}
        toolbarButtons={[
          {
            icon: <Fish size={16} />,
            id: 'fish',
            label: '어획량',
          },
          {
            icon: <Thermometer size={16} />,
            id: 'sst',
            label: '수온',
          },
          {
            icon: <Droplets size={16} />,
            id: 'chl',
            label: '클로로필',
          },
          {
            icon: <Waves size={16} />,
            id: 'wave',
            label: '파고',
          },
        ]}
        legendData={{
          chl: {
            colors: [
              '#F7FCF5',
              '#E5F5E0',
              '#C7E9C0',
              '#A1D99B',
              '#74C476',
              '#41AB5D',
              '#238B45',
              '#006D2C',
              '#00441B',
              '#002910',
            ],
            opacity: 0.7,
            values: [
              '0.1',
              '0.2',
              '0.3',
              '1',
              '2',
              '3',
              '4',
              '6',
              '8',
              '10',
              '12',
            ],
          },
          fish: {
            colors: [
              '#B3E5FC',
              '#81D4FA',
              '#4FC3F7',
              '#81C784',
              '#66BB6A',
              '#FFF176',
              '#FFD54F',
              '#FFB74D',
              '#FF8A65',
              '#F44336',
              '#C62828',
            ],
            opacity: 0.8,
            values: [
              '0',
              '10',
              '20',
              '30',
              '40',
              '50',
              '60',
              '70',
              '80',
              '90',
              '300~',
              ' ',
            ],
          },
          sst: {
            colors: [
              '#362B71',
              '#3465A0',
              '#68A8CE',
              '#86C993',
              '#C8DDA4',
              '#F7DF89',
              '#EB7F33',
              '#E05B30',
              '#BF363C',
              '#981D22',
            ],
            opacity: 0.7,
            values: [
              '0',
              '3',
              '6',
              '9',
              '12',
              '15',
              '18',
              '21',
              '24',
              '30',
              '35',
            ],
          },
          wave: {
            colors: [
              '#FFFFFF',
              '#E8E8E8',
              '#D1D1D1',
              '#BABABF',
              '#A3A3AD',
              '#8C8C9B',
              '#757589',
              '#5E5E77',
              '#474765',
              '#303053',
            ],
            opacity: 0.7,
            values: [
              '0.0',
              '0.3',
              '1.0',
              '1.5',
              '2.0',
              '2.5',
              '3.0',
              '3.5',
              '4.0',
              '4.5',
              '5.2',
            ],
          },
        }}
      />
    </div>
  );
}
