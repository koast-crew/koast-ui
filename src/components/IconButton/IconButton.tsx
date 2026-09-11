import { forwardRef } from 'react';
import { normalizeSize } from '../Button/Button.styles';
import { Spinner } from '../Spinner/Spinner';
import type { IconButtonProps } from './IconButton.types';
import { ICON_WRAPPER, getIconButtonStyles } from './IconButton.styles';

/**
 * @koast/ui 아이콘 버튼 컴포넌트입니다.
 * 아이콘만 담는 정사각형 버튼으로 닫기·검색·설정 같은 보조 동작에 씁니다.
 *
 * 색상은 디자인 시스템의 시맨틱 토큰으로만 결정되며 Button 과 같은 색·상태 테이블을 공유합니다.
 * 라벨이 없는 버튼이라 `aria-label` 이 **필수**입니다. 아이콘 자체는 `aria-hidden` 으로 감춰집니다.
 * `selected` 를 주면 `aria-pressed` 가 함께 붙어 토글 버튼으로 읽힙니다.
 *
 * @param {React.ReactNode} props.icon - 표시할 아이콘. 크기는 `size` 가 결정합니다 : React.ReactNode
 * @param {string} props.aria-label - 스크린 리더가 읽을 이름 (필수) : string
 * @param {'outlined' | 'contained' | 'text'} [props.variant='outlined'] - Figma 의 Style 축 : string
 * @param {'primary' | 'secondary' | 'danger'} [props.color='primary'] - Figma 의 Type 축 : string
 * @param {'xs' | 'sm' | 'md'} [props.size='md'] - 28 / 32 / 40px 정사각형 : string
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - 버튼 타입 : string
 * @param {boolean} [props.disabled=false] - 비활성화 상태 : boolean
 * @param {boolean} [props.loading=false] - 로딩 상태. 아이콘 자리에 스피너가 들어갑니다 : boolean
 * @param {boolean} [props.selected] - 토글 선택 상태. 주면 `aria-pressed` 가 붙습니다 : boolean
 * @param {Function} [props.onClick] - 클릭 이벤트 핸들러 : Function
 * @param {string} [props.className] - 레이아웃 조정용 CSS 클래스 (색상 지정 불가) : string
 *
 * @example
 * ```tsx
 * // 닫기 버튼
 * <IconButton variant="text" color="secondary" aria-label="닫기" icon={<CloseIcon />} onClick={close} />
 *
 * // 강조된 기본 동작
 * <IconButton variant="contained" aria-label="검색" icon={<SearchIcon />} />
 *
 * // 토글 버튼 (aria-pressed 가 붙습니다)
 * <IconButton
 *   variant="contained"
 *   aria-label="즐겨찾기"
 *   icon={<StarIcon />}
 *   selected={bookmarked}
 *   onClick={() => setBookmarked((v) => !v)}
 * />
 * ```
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const {
      icon,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      type = 'button',
      className = '',
      disabled = false,
      loading = false,
      selected,
      ...rest
    } = props;

    const normalizedSize = normalizeSize(size);

    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        className={getIconButtonStyles(
          variant,
          color,
          size,
          disabled,
          loading,
          selected === true,
          className,
        )}
        disabled={disabled || loading}
        aria-pressed={selected}
        aria-busy={loading || rest['aria-busy']}
      >
        {loading
          ? (
              <Spinner
                variant={'inherit'}
                size={normalizedSize === 'md' ? 'md' : 'sm'}
                decorative
              />
            )
          : <span className={ICON_WRAPPER} aria-hidden={'true'}>{icon}</span>}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';

export default IconButton;
