import { twMerge } from '../../utils/twMerge';
import type { ModalFooterAlign } from './Modal.types';

/**
 * 배경 막입니다. Figma 에 overlay 노드가 없고 반투명 검정에 대응하는 시맨틱 토큰도 없어
 * `rgb(0 0 0 / 0.5)` 를 임시값으로 넣었습니다. docs/components/modal.md 의 "확인 필요" 1번 참고.
 */
export const OVERLAY
  = 'koast-fixed koast-inset-0 koast-z-50 koast-flex koast-items-center koast-justify-center koast-bg-[rgb(0_0_0_/_0.5)] koast-p-4';

/**
 * 떠 있는 면의 2겹 그림자입니다. Figma 의 `r8 (0,0) #0000001f` / `r16 (0,8) #00000029` 가
 * `--koast-shadow-core`(12%) / `--koast-shadow-cast`(16%) 와 정확히 대응합니다.
 * Select 드롭다운과 같은 문자열 형태를 유지하고 크기만 두 배로 키웠습니다.
 */
const PANEL_SHADOW
  = 'koast-shadow-[0_0_8px_var(--koast-shadow-core),0_8px_16px_var(--koast-shadow-cast)]';

const PANEL_BASE
  = 'koast-relative koast-flex koast-max-h-full koast-w-full koast-flex-col koast-gap-4 koast-rounded-xl koast-border koast-border-solid koast-border-secondary koast-bg-primary koast-px-6 koast-py-8 focus:koast-outline-none';

export const getPanelStyles = (className: string) =>
  twMerge(PANEL_BASE, PANEL_SHADOW, className);

export const HEADER
  = 'koast-flex koast-h-10 koast-shrink-0 koast-items-center koast-justify-between koast-gap-4';

/** preflight 가 꺼져 있어 h2 의 브라우저 기본 여백을 직접 지웁니다. */
export const TITLE
  = 'koast-m-0 koast-text-2xl koast-font-semibold koast-leading-7 koast-text-primary';

/** 40x40 안에 24px 아이콘 + 상하좌우 8px padding. Figma `Icon button/Medium` 과 같은 치수입니다. */
export const CLOSE_BUTTON
  = '[&_svg]:koast-size-6 koast-inline-flex koast-size-10 koast-shrink-0 koast-items-center koast-justify-center koast-rounded-lg koast-p-2 koast-text-interactive-secondary koast-transition-colors koast-duration-200 hover:koast-bg-interactive-secondary-hovered hover:koast-text-interactive-secondary-hovered active:koast-bg-interactive-secondary-pressed active:koast-text-interactive-secondary-pressed focus-visible:koast-outline-none focus-visible:koast-ring-2 focus-visible:koast-ring-focus-ring';

/**
 * 내용이 길면 본문만 스크롤되고 헤더·푸터는 남습니다.
 * 스크롤바 모양은 Select 드롭다운과 같은 규칙을 씁니다.
 */
export const BODY
  = 'koast-flex koast-min-h-0 koast-flex-col koast-gap-[26px] koast-overflow-y-auto [&::-webkit-scrollbar]:koast-w-2 [&::-webkit-scrollbar-button]:koast-hidden [&::-webkit-scrollbar-track]:koast-rounded-full [&::-webkit-scrollbar-track]:koast-bg-tertiary [&::-webkit-scrollbar-thumb]:koast-rounded-full [&::-webkit-scrollbar-thumb]:koast-bg-[rgb(var(--koast-content-secondary))]';

/** preflight 가 꺼져 있어 p 의 브라우저 기본 여백을 직접 지웁니다. */
export const DESCRIPTION
  = 'koast-m-0 koast-text-base koast-font-medium koast-leading-5 koast-text-secondary';

export const SLOT_GROUP = 'koast-flex koast-flex-col koast-gap-4';

export const FOOTER = 'koast-shrink-0 koast-pt-6';

const FOOTER_ALIGNS: Record<ModalFooterAlign, string> = {
  start: 'koast-justify-start',
  center: 'koast-justify-center',
  end: 'koast-justify-end',
};

export const getButtonStackStyles = (align: ModalFooterAlign) =>
  twMerge('koast-flex koast-items-center koast-gap-4', FOOTER_ALIGNS[align]);
