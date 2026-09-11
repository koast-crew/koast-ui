/** Figma `Part/Skeleton Segments` 의 Type 축입니다. */
export type SkeletonVariant = 'rect' | 'circle' | 'text';

export interface SkeletonProps {
  /** Figma 의 Type 축입니다. @default 'rect' */
  variant?: SkeletonVariant;

  /** 가로 크기입니다. 숫자는 px 로 해석됩니다. 미입력 시 rect·text 는 부모 폭, circle 은 37px 입니다. */
  width?: number | string;

  /** 세로 크기입니다. 숫자는 px 로 해석됩니다. 미입력 시 Figma 실측값(rect 145 / text 37 / circle 37)입니다. */
  height?: number | string;

  /**
   * `variant='text'` 일 때 쌓을 줄 수입니다. 2줄 이상이면 마지막 줄이 60% 폭으로 짧아집니다.
   * Figma 에는 없는 축이며 기본값 1 이 Figma 와 같습니다. @default 1
   */
  lines?: number;

  /** 펄스 애니메이션을 끕니다. @default true */
  animated?: boolean;

  /** 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. */
  className?: string;
}
