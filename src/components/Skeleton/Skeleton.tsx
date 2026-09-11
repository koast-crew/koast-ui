import type { CSSProperties } from 'react';
import type { SkeletonProps } from './Skeleton.types';
import {
  TEXT_LAST_LINE,
  TEXT_STACK,
  getSkeletonStyles,
} from './Skeleton.styles';

const toSize = (value?: number | string) =>
  typeof value === 'number' ? `${ value }px` : value;

/**
 * @koast/ui Skeleton 컴포넌트입니다.
 * 콘텐츠가 도착하기 전에 자리와 뼈대를 먼저 보여 주어 레이아웃이 튀는 것을 막습니다.
 *
 * 순수 장식이므로 항상 `aria-hidden` 입니다.
 * 스크린 리더에게 로딩을 알리려면 스켈레톤을 감싼 영역에 `aria-busy="true"` 를 두거나
 * Spinner 를 함께 두세요. `prefers-reduced-motion` 에서는 펄스가 멈춥니다.
 *
 * @param {'rect' | 'circle' | 'text'} [props.variant='rect'] - Figma 의 Type 축 : 'rect' | 'circle' | 'text'
 * @param {number | string} [props.width] - 가로 크기. 숫자는 px : number | string
 * @param {number | string} [props.height] - 세로 크기. 숫자는 px : number | string
 * @param {number} [props.lines=1] - `variant='text'` 일 때 쌓을 줄 수 : number
 * @param {boolean} [props.animated=true] - 펄스 애니메이션 사용 여부 : boolean
 * @param {string} [props.className] - 레이아웃 조정용 CSS 클래스 (색상 지정 불가) : string
 *
 * @example
 * ```tsx
 * // 아바타 + 두 줄 텍스트
 * <div className="flex gap-2" aria-busy="true">
 *   <Skeleton variant="circle" />
 *   <Skeleton variant="text" lines={2} height={16} />
 * </div>
 *
 * // 썸네일 자리
 * <Skeleton variant="rect" height={180} />
 *
 * // 애니메이션 없이
 * <Skeleton variant="rect" animated={false} />
 * ```
 */
export const Skeleton = ({
  variant = 'rect',
  width,
  height,
  lines = 1,
  animated = true,
  className = '',
}: SkeletonProps) => {
  const style: CSSProperties = {
    width: toSize(width),
    height: toSize(height),
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={TEXT_STACK} style={{ width: toSize(width) }} aria-hidden={'true'}>
        {Array.from({ length: lines }, (_, index) => (
          <span
            key={index}
            className={getSkeletonStyles(
              'text',
              animated,
              index === lines - 1 ? `${ TEXT_LAST_LINE } ${ className }` : className,
            )}
            style={{ height: toSize(height) }}
          />
        ))}
      </div>
    );
  }

  return (
    <span
      className={getSkeletonStyles(variant, animated, className)}
      style={style}
      aria-hidden={'true'}
    />
  );
};

export default Skeleton;
