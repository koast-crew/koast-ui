import React, { useState } from 'react';

import { Button } from '../src';
import ButtonExam from './src/components/ButtonExam';
import ButtonGroupExam from './src/components/ButtonGroupExam';
import FolderTreeExam from './src/components/FolderTreeExam';
import SelectExam from './src/components/SelectExam';
import TimeSliderExam from './src/components/TimeSliderExam';
import MapLegendExam from './src/components/MapLegendExam';

const components = {
  button: ButtonExam,
  folderTree: FolderTreeExam,
  select: SelectExam,
  buttonGroup: ButtonGroupExam,
  timeSlider: TimeSliderExam,
  mapLegend: MapLegendExam,
} as const;

type ComponentType = keyof typeof components | null;

const label = (key: string) => `${ key.charAt(0).toUpperCase() + key.slice(1) } Docs`;

const MainView = () => {
  const [selected, setSelected] = useState<ComponentType>('select');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const SelectedComponent = selected ? components[selected] : null;

  return (
    <div
      data-koast-theme={theme}
      className={'koast-min-h-screen koast-bg-primary koast-p-6 koast-text-primary'}
    >
      <header className={'koast-mb-6 koast-flex koast-items-center koast-justify-between koast-gap-4'}>
        <h1 className={'koast-text-xl koast-font-bold'}>{'Koast UI Components'}</h1>
        <Button
          size={'sm'}
          variant={'outlined'}
          color={'secondary'}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </Button>
      </header>

      <nav className={'koast-mb-6 koast-flex koast-flex-wrap koast-gap-2'}>
        {Object.keys(components).map((key) => {
          const isSelected = selected === key;
          return (
            <Button
              key={key}
              size={'sm'}
              variant={isSelected ? 'contained' : 'outlined'}
              color={isSelected ? 'primary' : 'secondary'}
              onClick={() => setSelected(key as ComponentType)}
            >
              {label(key)}
            </Button>
          );
        })}
      </nav>

      <section className={'koast-rounded-lg koast-border koast-border-secondary koast-bg-secondary koast-p-4'}>
        {SelectedComponent && <SelectedComponent />}
      </section>
    </div>
  );
};

export default MainView;
