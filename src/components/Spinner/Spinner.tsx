import type { SpinnerProps } from './Spinner.types';
import {
  ARC_OPACITY,
  TRACK_OPACITY,
  getIconStyles,
  getSpinnerStyles,
} from './Spinner.styles';

/**
 * @koast/ui Spinner 컴포넌트입니다.
 * 끝을 알 수 없는 대기(데이터 로딩, 응답 대기)를 회전하는 링으로 알립니다.
 * 진행률을 아는 작업에는 Progressbar 를 쓰세요.
 *
 * 기본은 `role="status"` 와 이름을 가진 독립 요소입니다.
 * 이미 "저장 중" 같은 문구가 있는 버튼 안에 넣을 때는 `decorative` 로 두어 중복 안내를 막습니다.
 * `prefers-reduced-motion` 에서는 회전을 끄고 제자리 밝기 펄스로 바꿉니다.
 *
 * @param {'sm' | 'md' | 'lg' | 'xl'} [props.size='md'] - 지름 16 / 24 / 32 / 48px : 'sm' | 'md' | 'lg' | 'xl'
 * @param {'primary' | 'secondary' | 'inherit'} [props.variant='primary'] - Figma 의 Type 축. inherit 는 currentColor : string
 * @param {string} [props.label='로딩 중'] - 스크린 리더가 읽을 이름 : string
 * @param {boolean} [props.decorative=false] - 장식으로만 쓸 때. aria-hidden 이 붙습니다 : boolean
 * @param {string} [props.className] - 레이아웃 조정용 CSS 클래스 (색상 지정 불가) : string
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <Spinner />
 *
 * // 큰 스피너 + 직접 지정한 이름
 * <Spinner size="xl" label="지도를 불러오는 중" />
 *
 * // 이미 문구가 있는 면 안에서 색을 물려받아 장식으로만 쓰기
 * <button>
 *   <Spinner size="sm" variant="inherit" decorative />
 *   {'저장 중'}
 * </button>
 * ```
 */
export const Spinner = ({
  size = 'md',
  variant = 'primary',
  label = '로딩 중',
  decorative = false,
  className = '',
}: SpinnerProps) => (
  <span
    className={getSpinnerStyles(size, variant, className)}
    role={decorative ? undefined : 'status'}
    aria-label={decorative ? undefined : label}
    aria-hidden={decorative ? true : undefined}
  >
    <svg
      data-koast-spinner={''}
      className={getIconStyles()}
      viewBox={'0 0 24 24'}
      aria-hidden={'true'}
      focusable={'false'}
    >
      <circle
        className={TRACK_OPACITY}
        cx={'12'}
        cy={'12'}
        r={'10'}
        stroke={'currentColor'}
        strokeWidth={'4'}
        fill={'transparent'}
      />
      <path
        className={ARC_OPACITY}
        fill={'currentColor'}
        d={
          'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        }
      />
    </svg>
  </span>
);

export default Spinner;
