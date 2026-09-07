import { Button } from '../../../src';
import type { ButtonColor, ButtonVariant } from '../../../src';
import { ChevronRight, Trash2 } from 'lucide-react';

const COLORS: ButtonColor[] = ['primary', 'secondary', 'neutral', 'danger', 'info', 'warning', 'success'];
const VARIANTS: ButtonVariant[] = ['contained', 'outlined', 'text'];

const Matrix = () => (
  <div className={'flex flex-col gap-3'}>
    {VARIANTS.map((variant) => (
      <div key={variant} className={'flex flex-col gap-1'}>
        <span className={'text-xs font-semibold uppercase text-koast-tertiary'}>{variant}</span>
        <div className={'flex flex-wrap items-center gap-2'}>
          {COLORS.map((color) => (
            <Button key={color} variant={variant} color={color}>{color}</Button>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const States = () => (
  <div className={'flex flex-col gap-1'}>
    <span className={'text-xs font-semibold uppercase text-koast-tertiary'}>{'states'}</span>
    <div className={'flex flex-wrap items-center gap-2'}>
      <Button variant={'contained'}>{'기본'}</Button>
      <Button variant={'contained'} disabled>{'비활성'}</Button>
      <Button variant={'contained'} loading>{'로딩'}</Button>
      <Button variant={'outlined'} disabled>{'비활성 outlined'}</Button>
      <Button variant={'contained'} shadow>{'그림자'}</Button>
      <Button variant={'contained'} color={'danger'} startIcon={<Trash2 size={16} />}>{'삭제'}</Button>
      <Button variant={'outlined'} endIcon={<ChevronRight size={16} />}>{'다음'}</Button>
      <Button href={'https://example.com'} variant={'text'}>{'링크'}</Button>
    </div>
    <div className={'mt-1 w-64'}>
      <Button variant={'contained'} fullWidth>{'fullWidth'}</Button>
    </div>
  </div>
);

const Panel = ({ theme }: { theme: 'light' | 'dark' }) => (
  <div
    data-koast-theme={theme}
    className={'flex flex-col gap-5 rounded-lg border border-koast-secondary bg-koast-primary p-4'}
  >
    <h2 className={'text-sm font-bold text-koast-primary'}>
      {theme === 'light' ? '라이트' : '다크'}
    </h2>
    <Matrix />
    <States />
  </div>
);

const ButtonExam = () => {
  return (
    <div className={'flex flex-col gap-4'}>
      <Panel theme={'light'} />
      <Panel theme={'dark'} />
    </div>
  );
};

export default ButtonExam;
