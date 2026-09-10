import { Button } from '../../../src';
import type { ButtonColor, ButtonVariant } from '../../../src';
import { ChevronRight, Trash2 } from 'lucide-react';

const COLORS: ButtonColor[] = ['primary', 'secondary', 'danger'];
const VARIANTS: ButtonVariant[] = ['contained', 'outlined', 'text'];

const Matrix = () => (
  <div className={'koast-flex koast-flex-col koast-gap-3'}>
    {VARIANTS.map((variant) => (
      <div key={variant} className={'koast-flex koast-flex-col koast-gap-1'}>
        <span className={'koast-text-xs koast-font-semibold koast-uppercase koast-text-tertiary'}>{variant}</span>
        <div className={'koast-flex koast-flex-wrap koast-items-center koast-gap-2'}>
          {COLORS.map((color) => (
            <Button key={color} variant={variant} color={color}>{color}</Button>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const States = () => (
  <div className={'koast-flex koast-flex-col koast-gap-1'}>
    <span className={'koast-text-xs koast-font-semibold koast-uppercase koast-text-tertiary'}>{'states'}</span>
    <div className={'koast-flex koast-flex-wrap koast-items-center koast-gap-2'}>
      <Button variant={'contained'}>{'기본'}</Button>
      <Button variant={'contained'} disabled>{'비활성'}</Button>
      <Button variant={'contained'} loading>{'로딩'}</Button>
      <Button variant={'outlined'} disabled>{'비활성 outlined'}</Button>
      <Button variant={'contained'} shadow>{'그림자'}</Button>
      <Button variant={'contained'} color={'danger'} startIcon={<Trash2 size={16} />}>{'삭제'}</Button>
      <Button variant={'outlined'} endIcon={<ChevronRight size={16} />}>{'다음'}</Button>
      <Button href={'https://example.com'} variant={'text'}>{'링크'}</Button>
    </div>
    <div className={'koast-mt-1 koast-w-64'}>
      <Button variant={'contained'} fullWidth>{'fullWidth'}</Button>
    </div>
  </div>
);

const Panel = ({ theme }: { theme: 'light' | 'dark' }) => (
  <div
    data-koast-theme={theme}
    className={'koast-flex koast-flex-col koast-gap-5 koast-rounded-lg koast-border koast-border-solid koast-border-secondary koast-bg-primary koast-p-4'}
  >
    <h2 className={'koast-text-sm koast-font-bold koast-text-primary'}>
      {theme === 'light' ? '라이트' : '다크'}
    </h2>
    <Matrix />
    <States />
  </div>
);

const ButtonExam = () => {
  return (
    <div className={'koast-flex koast-flex-col koast-gap-4'}>
      <Panel theme={'light'} />
      <Panel theme={'dark'} />
    </div>
  );
};

export default ButtonExam;
