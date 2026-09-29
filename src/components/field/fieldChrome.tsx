import React from 'react';
import { CircleX } from 'lucide-react';
import { getFieldHelperTextStyles, getFieldLabelStyles } from './fieldChrome.styles';

interface FieldLabelProps {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

/** TextField / TextArea 가 공유하는 라벨입니다. Select 의 라벨과 같은 규칙을 씁니다. */
export const FieldLabel = ({
  htmlFor,
  children,
  required = false,
  disabled = false,
  className = '',
}: FieldLabelProps) => (
  <label htmlFor={htmlFor} className={getFieldLabelStyles(disabled, className)}>
    {children}
    {required && <span className={'koast-ml-0.5 koast-text-danger'}>{'*'}</span>}
  </label>
);

interface FieldHelperTextProps {
  id: string;
  children: React.ReactNode;
  error?: boolean;
  className?: string;
}

/** TextField / TextArea 가 공유하는 보조 문구입니다. 오류면 빨간색과 아이콘이 함께 나옵니다. */
export const FieldHelperText = ({ id, children, error = false, className = '' }: FieldHelperTextProps) => (
  <p id={id} className={getFieldHelperTextStyles(error, className)}>
    {error && <CircleX className={'koast-size-6 koast-shrink-0'} aria-hidden />}
    {children}
  </p>
);
