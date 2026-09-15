/**
 * 스크롤 영역 공통 스크롤바입니다. 트랙은 연한 회색, 썸은 한 단계 짙고 hover 에서 더 짙어집니다.
 * `scrollbar-width` 를 함께 쓰면 Chrome 이 `::-webkit-scrollbar` 를 무시하므로 쓰지 않습니다.
 *
 * hover 만 테두리 토큰을 배경으로 씁니다. bg 스케일이 disabled(#d4d4d8) 다음 inverse-bold(#3f3f46)로
 * 건너뛰어 중간 회색이 없기 때문입니다. 역할 분리의 유일한 예외입니다.
 */
export const SCROLLBAR = [
  '[&::-webkit-scrollbar]:koast-w-[0.2rem]',
  '[&::-webkit-scrollbar]:koast-h-[0.25rem]',
  '[&::-webkit-scrollbar-button]:koast-hidden',
  '[&::-webkit-scrollbar-track]:koast-bg-tertiary',
  '[&::-webkit-scrollbar-thumb]:koast-rounded-[3px]',
  '[&::-webkit-scrollbar-thumb]:koast-bg-disabled',
  '[&::-webkit-scrollbar-thumb:hover]:koast-bg-[rgb(var(--koast-border-primary))]',
].join(' ');
