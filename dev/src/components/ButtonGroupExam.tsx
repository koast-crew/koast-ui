import React from 'react';
import { ButtonGroup } from '../../../src';
import { Button } from '../../../src';

const ButtonGroupExam = () => {
  return (
    <ButtonGroup variant={'contained'} color={'primary'}>
      <Button>{'이전'}</Button>
      <Button>{'다음'}</Button>
    </ButtonGroup>
  );
};

export default ButtonGroupExam;
