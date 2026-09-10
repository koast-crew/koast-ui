import { ButtonProps } from './Button.types';
import { getButtonStyles, getLoadingIndicator } from './Button.styles';

/**
 * @koast/ui 버튼 컴포넌트입니다.
 *
 * 색상은 디자인 시스템의 시맨틱 토큰으로만 결정됩니다.
 * `color` 는 정해진 intent 값만 받고, 임의의 색상 문자열이나 인라인 스타일은 받지 않습니다.
 *
 * @param {'outlined' | 'contained' | 'text'} [props.variant='outlined'] - 버튼 스타일 변형
 * @param {'primary' | 'secondary' | 'danger'} [props.color='primary'] - 버튼 intent
 * @param {'xs' | 'sm' | 'md'} [props.size='md'] - 버튼 크기
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - 버튼 타입
 * @param {string} [props.className=''] - 레이아웃 조정용 CSS 클래스 (색상 지정 불가)
 * @param {Function} [props.onClick] - 클릭 이벤트 핸들러
 * @param {boolean} [props.disabled=false] - 비활성화 상태
 * @param {React.ReactNode} props.children - 버튼 내용
 * @param {React.ReactNode} [props.startIcon] - 버튼 텍스트 앞에 표시될 아이콘
 * @param {React.ReactNode} [props.endIcon] - 버튼 텍스트 뒤에 표시될 아이콘
 * @param {boolean} [props.loading=false] - 로딩 상태
 * @param {boolean} [props.fullWidth=false] - 전체 너비 사용 여부
 * @param {boolean} [props.shadow=false] - 그림자 효과 적용 여부 (contained 변형에만 적용)
 * @param {string} [props.href] - 링크 URL (제공 시 a 태그로 렌더링)
 *
 * @example
 * ```tsx
 * <Button variant="contained" color="primary" onClick={handleClick}>
 *   확인
 * </Button>
 *
 * <Button variant="outlined" color="danger" startIcon={<TrashIcon />}>
 *   삭제
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
    startIcon,
    endIcon,
    loading = false,
    fullWidth = false,
    shadow = false,
    href,
  } = props;

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

  // 로딩 중에는 스피너가 리딩 아이콘 자리를 대신하고 트레일링 아이콘은 표시하지 않습니다.
  const buttonContent = (
    <>
      {loading
        ? getLoadingIndicator()
        : startIcon && <span className={'koast-inline-flex'}>{startIcon}</span>}
      <span>{children}</span>
      {!loading && endIcon && (
        <span className={'koast-inline-flex'}>{endIcon}</span>
      )}
    </>
  );

  // href가 있고 활성 상태이면 <a> 태그로 렌더링합니다.
  // disabled 는 <a> 의 유효한 속성이 아니므로 전달하지 않습니다.
  if (href && !disabled && !loading) {
    return (
      <a
        href={href}
        className={buttonClassName}
        onClick={onClick}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={buttonClassName}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
