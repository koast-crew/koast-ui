import { useId } from 'react';
import { Check, CircleX } from 'lucide-react';
import { Label } from '../Label/Label';
import type { ProgressbarProps, ProgressbarTone } from './Progressbar.types';
import {
  CONTAINER,
  HELPER_ICON,
  LABEL,
  TRACK,
  VALUE,
  getHeaderStyles,
  getHelperStyles,
  getIndicatorStyles,
  getRootStyles,
} from './Progressbar.styles';

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/**
 * @koast/ui Progressbar 컴포넌트입니다.
 * 파일 업로드·설치처럼 끝이 있는 작업의 진행 상태를 가로 막대로 보여 줍니다.
 * 진행률을 알 수 없는 구간에서는 `indeterminate` 로 두면 `aria-valuenow` 없이 대기 상태만 알립니다.
 *
 * @param {number} [props.value=0] - 현재 진행 값 : number
 * @param {number} [props.min=0] - 최솟값 : number
 * @param {number} [props.max=100] - 최댓값 : number
 * @param {boolean} [props.indeterminate=false] - 진행률을 알 수 없는 상태 : boolean
 * @param {boolean} [props.error=false] - Figma 의 Error 축. 지시자와 보조 문구가 danger 색이 됩니다 : boolean
 * @param {React.ReactNode} [props.label] - 헤더 왼쪽 라벨 : React.ReactNode
 * @param {React.ReactNode} [props.valueText] - 헤더 오른쪽 값 텍스트 : React.ReactNode
 * @param {boolean} [props.showValue=true] - 헤더 값 텍스트 표시 여부 : boolean
 * @param {React.ReactNode} [props.helperText] - 트랙 아래 보조 문구 : React.ReactNode
 * @param {(percent: number) => string} [props.formatValue] - 백분율 표기 형식 : function
 * @param {string} [props.ariaLabel] - `label` 이 없을 때의 접근성 이름 : string
 * @param {string} [props.className] - 레이아웃 조정용 CSS 클래스 (색상 지정 불가) : string
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <Progressbar label="업로드" value={60} helperText="파일을 올리는 중입니다" />
 *
 * // 완료 — 보조 문구에 체크 아이콘이 붙습니다
 * <Progressbar label="업로드" value={100} helperText="업로드를 마쳤습니다" />
 *
 * // 오류
 * <Progressbar label="업로드" value={40} error helperText="업로드에 실패했습니다" />
 *
 * // 진행률을 알 수 없을 때
 * <Progressbar indeterminate ariaLabel="데이터를 불러오는 중" />
 * ```
 */
export const Progressbar = ({
  value = 0,
  min = 0,
  max = 100,
  indeterminate = false,
  error = false,
  label,
  valueText,
  showValue = true,
  helperText,
  formatValue = (percent: number) => `${ Math.round(percent) }%`,
  ariaLabel,
  className = '',
}: ProgressbarProps) => {
  const reactId = useId();
  const labelId = `${ reactId }-label`;
  const helperId = `${ reactId }-helper`;

  const span = max - min;
  const current = clamp(value, min, max);
  const percent = span > 0 ? ((current - min) / span) * 100 : 0;
  const completed = !indeterminate && percent >= 100;

  const tone: ProgressbarTone = error
    ? 'error'
    : completed
      ? 'success'
      : 'neutral';

  const displayValue
    = valueText ?? (indeterminate ? '' : formatValue(percent));

  // 화면에 보이는 값과 보조기술이 읽는 값이 갈리지 않게 같은 문자열을 씁니다.
  const ariaValueText
    = typeof displayValue === 'string' && displayValue !== ''
      ? displayValue
      : formatValue(percent);

  return (
    <div className={getRootStyles(className)}>
      <div className={CONTAINER}>
        {(label || (showValue && displayValue)) && (
          <div className={getHeaderStyles(Boolean(label))}>
            {label
              ? (
                  <Label id={labelId} as={'span'} className={LABEL}>
                    {label}
                  </Label>
                )
              : null}
            {showValue && displayValue ? <span className={VALUE}>{displayValue}</span> : null}
          </div>
        )}
        <div
          className={TRACK}
          role={'progressbar'}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={indeterminate ? undefined : current}
          aria-valuetext={indeterminate ? undefined : ariaValueText}
          aria-labelledby={label ? labelId : undefined}
          aria-label={label ? undefined : ariaLabel}
          aria-describedby={helperText ? helperId : undefined}
        >
          <div
            className={getIndicatorStyles(error, indeterminate)}
            style={indeterminate ? undefined : { width: `${ percent }%` }}
          />
        </div>
      </div>
      {helperText
        ? (
            <p id={helperId} className={getHelperStyles(tone)}>
              {tone === 'error' && <CircleX className={HELPER_ICON} aria-hidden />}
              {tone === 'success' && <Check className={HELPER_ICON} aria-hidden />}
              {helperText}
            </p>
          )
        : null}
    </div>
  );
};

export default Progressbar;
