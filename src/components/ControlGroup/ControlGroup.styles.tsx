import { twMerge } from '../../utils/twMerge';
import type { ControlGroupOrientation } from './ControlGroup.types';

/**
 * Checkbox / Radio / Switch 가 공유하는 "컨트롤 + 라벨" 한 줄 조립 규칙입니다.
 * Figma 의 Check label / Radio label / Switch label 이 모두 가로 스택 · gap 8px · 세로 가운데 정렬입니다.
 * hover / active 를 컨트롤 쪽으로 넘기려고 group 마커를 답니다.
 */
export const getControlRowStyles = (disabled: boolean, className: string) =>
  twMerge(
    'koast-group koast-inline-flex koast-items-center koast-gap-2',
    disabled ? 'koast-cursor-not-allowed' : 'koast-cursor-pointer',
    className,
  );

/** 네이티브 input 은 화면에서만 숨깁니다. 키보드 조작·포커스는 그대로 두고 peer 로 시각 요소에 상태를 전달합니다. */
export const CONTROL_INPUT = 'koast-peer koast-sr-only';

/** Figma Check group / Radio group 은 세로 스택 · 항목 간격 12px 입니다. 가로는 파생입니다. */
const ORIENTATIONS: Record<ControlGroupOrientation, string> = {
  vertical: 'koast-flex-col koast-gap-3',
  horizontal: 'koast-flex-row koast-flex-wrap koast-gap-x-6 koast-gap-y-3',
};

export const getControlGroupStyles = (
  orientation: ControlGroupOrientation,
  className: string,
) => twMerge('koast-flex', ORIENTATIONS[orientation], className);

/** 그룹 라벨과 첫 항목 사이 간격입니다. Select 의 라벨 규칙(12px)을 그대로 씁니다. */
export const GROUP_LABEL = 'koast-mb-3 koast-flex';
