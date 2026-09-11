/**
 * Figma 의 Size 축입니다. 실측은 sm 16 · md 24 · xl 32 · lg 48 이지만
 * lg 와 xl 이 뒤집힌 실수로 보고 lg 32 · xl 48 로 바로잡았습니다.
 */
export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Figma 의 Type 축입니다. `inherit` 은 Figma 에 없으며
 * 버튼처럼 이미 색이 정해진 면 안에 넣을 때 쓰는 `currentColor` 모드입니다.
 */
export type SpinnerVariant = 'primary' | 'secondary' | 'inherit';

export interface SpinnerProps {
  /** Figma 의 Size 축입니다. 16 / 24 / 32 / 48px. @default 'md' */
  size?: SpinnerSize;

  /** Figma 의 Type 축입니다. @default 'primary' */
  variant?: SpinnerVariant;

  /** 스크린 리더가 읽을 이름입니다. @default '로딩 중' */
  label?: string;

  /**
   * 장식으로만 쓸 때 켭니다. `role="status"` 와 이름이 빠지고 `aria-hidden` 이 붙습니다.
   * 이미 "저장 중" 같은 문구를 가진 버튼 안에 넣을 때 씁니다. @default false
   */
  decorative?: boolean;

  /** 레이아웃 조정용입니다. 색상은 지정할 수 없습니다. */
  className?: string;
}
