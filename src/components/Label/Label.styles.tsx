import { twMerge } from '../../utils/twMerge';

/**
 * Figma `Part/Label` 은 높이 20px 의 가로 스택이며 항목 간격은 4px 입니다.
 * 세 variant 모두 16/20 · w500 로 같고 보조 표기의 색만 달라집니다.
 */
const ROOT
  = 'koast-inline-flex koast-items-center koast-text-base koast-font-medium koast-leading-5';

export const getLabelStyles = (disabled: boolean, className: string) =>
  twMerge(
    ROOT,
    disabled ? 'koast-text-disabled' : 'koast-text-primary',
    className,
  );

/** `(Optional)` 은 본문보다 한 단계 연한 회색이며 Figma 실측 간격 4px 입니다. */
export const getOptionalStyles = (disabled: boolean) =>
  twMerge('koast-ml-1', disabled ? 'koast-text-disabled' : 'koast-text-tertiary');

/** 필수 표시 `*` 입니다. 간격은 Select 를 포함한 전 컴포넌트가 2px 로 통일되어 있습니다. */
export const getRequiredStyles = (disabled: boolean) =>
  twMerge('koast-ml-0.5', disabled ? 'koast-text-disabled' : 'koast-text-danger');
