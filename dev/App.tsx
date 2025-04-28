import React, { useState } from 'react';

import ButtonExam from './src/components/ButtonExam';
// import CesiumExam from './src/components/CesiumExam';
import ButtonGroupExam from './src/components/ButtonGroupExam';
import FolderTreeExam from './src/components/FolderTreeExam';
import SelectExam from './src/components/SelectExam';
import TimeSliderExam from './src/components/TimeSliderExam';
import MapLegendExam from './src/components/MapLegendExam';

// 컴포넌트 매핑 객체
const components = {
  button: ButtonExam,
  // cesium: CesiumExam,
  folderTree: FolderTreeExam,
  select: SelectExam,
  buttonGroup: ButtonGroupExam,
  timeSlider: TimeSliderExam,
  mapLegend: MapLegendExam,
} as const;

type ComponentType = keyof typeof components | null;

const MainView = () => {
  const [selected, setSelected] = useState<ComponentType>('select');

  // 동적으로 선택된 컴포넌트 렌더링
  const SelectedComponent = selected ? components[selected] : null;

  return (
    <div className={'flex flex-col gap-2 p-2'}>
      <h1>{'Koast UI Components'}</h1>
      <section className={'mt-2'}>
        <div className={'mb-4 flex gap-2'}>
          {Object.keys(components).map((key) => (
            <button
              key={key}
              onClick={() => setSelected(key as ComponentType)}
              className={`rounded border px-4 py-2 hover:bg-gray-100 ${ selected === key ? 'bg-gray-100' : '' }`}
            >
              {`${ key.charAt(0).toUpperCase() + key.slice(1) } Docs`}
            </button>
          ))}
        </div>
        <div className={'mt-2'}>
          {SelectedComponent && <SelectedComponent />}
        </div>
      </section>
    </div>
  );
};

export default MainView;