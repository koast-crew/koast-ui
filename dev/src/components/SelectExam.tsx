import React from 'react';
import { Select, SelectItem } from '../../../src';

export default function SelectExam() {
  const [age, setAge] = React.useState<number | undefined>(undefined);

  return (
    <div>
      <span />
      <Select required placeholder={'선택'} size={'sm'} className={'w-30'} value={age} onChange={(value) => setAge(value)}>
        <SelectItem value={10} className={'text-xs'}>{'Ten'}</SelectItem>
        <SelectItem value={20} className={'text-xs'}>{'Twenty'}</SelectItem>
        <SelectItem value={30} className={'text-xs'}>{'Thirty'}</SelectItem>
      </Select>
    </div>
  );
};
