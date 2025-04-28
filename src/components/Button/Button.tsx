import { ButtonProps } from './Button.types';
import { getButtonStyles, getLoadingIndicator } from './Button.styles';

/**
 * koast-ui 버튼 컴포넌트입니다.
 *
 * @param {'outlined' | 'contained' | 'text'} [props.variant='outlined'] - 버튼 스타일 변형 : 'outlined' | 'contained' | 'text'
 * @param {'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'} [props.color='primary'] - 버튼 색상 : 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - 버튼 크기 : 'sm' | 'md' | 'lg'
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - 버튼 타입 : 'button' | 'submit' | 'reset'
 * @param {string} [props.className=''] - 추가 CSS 클래스 : string
 * @param {Function} [props.onClick] - 클릭 이벤트 핸들러 : Function
 * @param {boolean} [props.disabled=false] - 비활성화 상태 : boolean
 * @param {React.ReactNode} props.children - 버튼 내용 : React.ReactNode
 * @param {Object} [props.customStyle] - 인라인 스타일 객체 : Object
 * @param {React.ReactNode} [props.startIcon] - 버튼 텍스트 앞에 표시될 아이콘 : React.ReactNode
 * @param {React.ReactNode} [props.endIcon] - 버튼 텍스트 뒤에 표시될 아이콘 : React.ReactNode
 * @param {boolean} [props.loading=false] - 로딩 상태 : boolean
 * @param {boolean} [props.fullWidth=false] - 전체 너비 사용 여부 : boolean
 * @param {boolean} [props.shadow=false] - 그림자 효과 적용 여부 : boolean
 * @param {string} [props.href] - 링크 URL (제공 시 a 태그로 렌더링) : string
 *
 * @example
 * ```tsx
 * <Button variant="contained" color="primary" onClick={() => console.log('clicked')}>
 *   버튼 텍스트
 * </Button>
 *
 * <Button variant="outlined" startIcon={<Icon />} endIcon={<Icon />}>
 *   아이콘이 있는 버튼
 * </Button>
 *
 * <Button href="https://example.com">
 *   링크 버튼
 * </Button>
 * ```
 */
export const Button = (props: ButtonProps) => {
  const {
    variant = 'outlined',
    color = 'primary',
    size = 'md',
    type = 'button',
    className = '',
    onClick,
    disabled = false,
    children,
    customStyle,
    startIcon,
    endIcon,
    loading = false,
    fullWidth = false,
    shadow = false,
    href,
  } = props;

  // 스타일 계산
  const buttonClassName = getButtonStyles(
    variant,
    color,
    size,
    disabled,
    loading,
    fullWidth,
    shadow,
    className,
  );

  // 로딩 인디케이터
  const loadingIndicator = getLoadingIndicator(loading);

  // 공통 속성
  const commonProps = {
    className: buttonClassName,
    style: customStyle,
    onClick,
    disabled: disabled || loading,
  };

  // 버튼 내용
  const buttonContent = (
    <>
      {startIcon && <span className={'inline-flex'}>{startIcon}</span>}
      <span>{children}</span>
      {endIcon && <span className={'inline-flex'}>{endIcon}</span>}
      {loadingIndicator}
    </>
  );

  // href가 있으면 <a> 태그로 렌더링
  if (href && !disabled) {
    return (
      <a
        href={href}
        {...commonProps}
      >
        {buttonContent}
      </a>
    );
  }

  // href가 없거나 disabled이면 <button> 태그로 렌더링
  return (
    <button
      {...commonProps}
      type={type}
    >
      {buttonContent}
    </button>
  );
};

export default Button;