import React, { forwardRef } from 'react';
import type {
  ButtonAsAnchorProps,
  ButtonAsButtonProps,
  ButtonProps,
} from './Button.types';
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
 * `aria-label`, `aria-describedby`, `id`, `title`, `data-*` 같은 네이티브 속성과 `ref` 를 그대로 전달합니다.
 * 색을 지정하는 `style` / `color` 속성만 막혀 있습니다.
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
const ButtonImpl = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>((props, ref) => {
  const {
    variant = 'outlined',
    color = 'primary',
    size = 'md',
    type = 'button',
    className = '',
    disabled = false,
    children,
    startIcon,
    endIcon,
    loading = false,
    fullWidth = false,
    shadow = false,
    href,
    ...rest
    // 두 형태의 href 타입이 배타적이라 교집합을 만들 수 없습니다. 구현 안에서만 합쳐 봅니다.
  } = props as Omit<ButtonAsButtonProps, 'href'> & { href?: string };

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
    // button 전용 속성은 a 에서 무효라 걸러냅니다.
    const {
      form: _form,
      formAction: _formAction,
      formEncType: _formEncType,
      formMethod: _formMethod,
      formNoValidate: _formNoValidate,
      formTarget: _formTarget,
      name: _name,
      value: _value,
      ...anchorRest
    } = rest;

    // 이벤트 핸들러 타입만 HTMLButtonElement 로 묶여 있어 앵커용으로 다시 붙입니다. 런타임 형태는 같습니다.
    const anchorProps = anchorRest as React.AnchorHTMLAttributes<HTMLAnchorElement>;

    return (
      <a
        {...anchorProps}
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={buttonClassName}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      {...rest}
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      className={buttonClassName}
      disabled={disabled || loading}
      aria-busy={loading || rest['aria-busy']}
    >
      {buttonContent}
    </button>
  );
});

ButtonImpl.displayName = 'Button';

/**
 * `href` 유무에 따라 `<button>` / `<a>` 로 갈리고 `ref` 타입도 함께 좁혀집니다.
 * forwardRef 는 판별 유니온의 ref 를 좁히지 못해 호출 시그니처를 직접 붙입니다.
 */
export const Button = ButtonImpl as {
  (props: ButtonAsButtonProps & React.RefAttributes<HTMLButtonElement>): React.ReactElement | null;
  (props: ButtonAsAnchorProps & React.RefAttributes<HTMLAnchorElement>): React.ReactElement | null;
  displayName?: string;
};

export default Button;
