import React from 'react';
// import { Button } from '@koast/ui';
import { Button } from '../../../src';
import { ChevronRight } from 'lucide-react';

const ButtonExam = () => {
  return (
    <Button
      onClick={() => alert('Primary clicked')}
      fullWidth={true}
      endIcon={<ChevronRight />}
    >
      {'button\r'}
    </Button>
  );
};

export default ButtonExam;
