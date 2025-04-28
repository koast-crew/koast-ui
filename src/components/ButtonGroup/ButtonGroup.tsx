import React from 'react';
import { ButtonProps } from '../Button/Button.types';
import clsx from 'clsx';

/**
 * ButtonGroup 컴포넌트의 속성을 정의합니다.
 */
export interface ButtonGroupProps {
  /**
   * 그룹 내 버튼의 변형을 지정합니다.
   * @default 'outlined'
   */
  variant?: ButtonProps['variant'];

  /**
   * 그룹 내 버튼의 색상을 지정합니다.
   * @default 'primary'
   */
  color?: ButtonProps['color'];

  /**
   * 그룹 내 버튼의 크기를 지정합니다.
   * @default 'md'
   */
  size?: ButtonProps['size'];

  /**
   * 버튼 그룹이 전체 너비를 차지하도록 설정합니다.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * 그룹 내 모든 버튼을 비활성화합니다.
   * @default false
   */
  disabled?: boolean;

  /**
   * 버튼 그룹의 방향을 설정합니다.
   * @default 'horizontal'
   */
  orientation?: 'vertical' | 'horizontal';

  /**
   * 추가할 CSS 클래스명
   */
  className?: string;

  /**
   * 버튼 그룹 내부의 버튼들
   */
  children: React.ReactElement<ButtonProps>[] | React.ReactElement<ButtonProps>;
}

/**
 * Koast-ui ButtonGroup 컴포넌트
 * 여러 관련 버튼을 그룹화하는 컴포넌트입니다.
 *
 * @param {ButtonGroupProps} props - ButtonGroup 컴포넌트의 속성
 * @param {ButtonProps['variant']} [props.variant='outlined'] - 버튼 변형 : 'outlined' | 'filled' | 'standard'
 * @param {ButtonProps['color']} [props.color='primary'] - 버튼 색상 : 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
 * @param {ButtonProps['size']} [props.size='md'] - 버튼 크기 : 'sm' | 'md' | 'lg'
 * @param {boolean} [props.fullWidth=false] - 전체 너비 사용 여부 : boolean
 * @param {boolean} [props.disabled=false] - 비활성화 상태 : boolean
 * @param {boolean} [props.required=false] - 필수 입력 여부 : boolean
 *
 * @example
 * ```tsx
 * <ButtonGroup>
 *   <Button>One</Button>
 *   <Button>Two</Button>
 *   <Button>Three</Button>
 * </ButtonGroup>
 * ```
 */
export const ButtonGroup = (props: ButtonGroupProps) => {
  const {
    variant = 'outlined',
    color = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    orientation = 'horizontal',
    className = '',
    children,
  } = props;
  // 버튼들을 배열로 변환
  const buttons = React.Children.toArray(children) as React.ReactElement<ButtonProps>[];

  const isVertical = orientation === 'vertical';

  return (
    <div
      className={clsx(
        'inline-flex',
        isVertical ? 'flex-col' : 'flex-row',
        fullWidth ? 'w-full' : '',
        className,
      )}
    >
      {buttons.map((button, index) => (
        <div key={index} className={clsx(isVertical ? 'relative w-full' : 'flex items-center', fullWidth ? 'w-full' : '')}>
          {React.cloneElement(button, {
            variant,
            color,
            size,
            disabled: disabled || button.props.disabled,
            fullWidth: fullWidth || button.props.fullWidth || isVertical,
            className: clsx(
              // vertical 모드의 클래스네임
              (isVertical && index !== buttons.length - 1) ? 'border-b-0' : '',
              (isVertical && index === 0) ? 'rounded-b-none' : '',
              (isVertical && index === buttons.length - 1) ? 'rounded-t-none' : '',
              (isVertical && index > 0 && index < buttons.length - 1) ? 'rounded-none' : '',
              // horizontal 모드의 클래스네임
              (!isVertical && index !== buttons.length - 1) ? 'border-r-0' : '',
              (!isVertical && index === 0) ? 'rounded-r-none' : '',
              (!isVertical && index === buttons.length - 1) ? 'rounded-l-none' : '',
              (!isVertical && index > 0 && index < buttons.length - 1) ? 'rounded-none' : '',
              button.props.className || '',
            ),
          })}
          {variant === 'text' && index < buttons.length - 1 && (
            <div
              className={clsx(
                isVertical
                  ? 'h-px w-full bg-gray-300'
                  : 'h-2/3 w-px bg-gray-300',
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ButtonGroup;
