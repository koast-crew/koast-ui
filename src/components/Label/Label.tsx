import { LabelProps } from './Label.types';
import {
  getLabelStyles,
  getOptionalStyles,
  getRequiredStyles,
} from './Label.styles';

/**
 * @koast/ui 라벨 컴포넌트입니다.
 * 입력 필드나 컨트롤과 연결되어 해당 요소의 목적을 설명합니다.
 *
 * Checkbox / Radio / Switch / ControlGroup 의 라벨도 모두 이 컴포넌트가 그립니다.
 * 컨트롤을 감싸는 `<label>` 안에서 쓰일 때는 `as="span"` 으로 렌더링해 태그 중첩을 피합니다.
 *
 * @param {React.ReactNode} props.children - 라벨 문구 : React.ReactNode
 * @param {'none' | 'optional' | 'required'} [props.type='none'] - 보조 표기. required 면 `*`, optional 이면 `(Optional)` : 'none' | 'optional' | 'required'
 * @param {string} [props.htmlFor] - 연결할 입력 요소의 id : string
 * @param {boolean} [props.disabled=false] - 비활성화 상태 : boolean
 * @param {string} [props.optionalText='(Optional)'] - `(Optional)` 자리에 들어갈 문구 : string
 * @param {'label' | 'span'} [props.as] - 렌더링할 태그. 기본값은 htmlFor 가 있으면 'label', 없으면 'span' : 'label' | 'span'
 * @param {string} [props.className] - 여백 조정용 CSS 클래스 (색상 지정 불가) : string
 *
 * @example
 * ```tsx
 * // 입력 필드와 연결
 * <Label htmlFor="email" type="required">이메일</Label>
 * <input id="email" />
 *
 * // 선택 입력 표기
 * <Label htmlFor="nickname" type="optional">닉네임</Label>
 *
 * // 컨트롤을 감싸는 label 안에서 문구만 그릴 때
 * <Label as="span" disabled>약관 동의</Label>
 * ```
 */
export const Label = (props: LabelProps) => {
  const {
    children,
    type = 'none',
    htmlFor,
    disabled = false,
    optionalText = '(Optional)',
    as = htmlFor ? 'label' : 'span',
    className = '',
    id,
  } = props;

  const content = (
    <>
      <span>{children}</span>
      {type === 'optional' && (
        <span className={getOptionalStyles(disabled)}>{optionalText}</span>
      )}
      {type === 'required' && (
        <span aria-hidden={'true'} className={getRequiredStyles(disabled)}>
          {'*'}
        </span>
      )}
    </>
  );

  if (as === 'label') {
    return (
      <label
        id={id}
        htmlFor={htmlFor}
        className={getLabelStyles(disabled, className)}
      >
        {content}
      </label>
    );
  }

  return (
    <span id={id} className={getLabelStyles(disabled, className)}>
      {content}
    </span>
  );
};

export default Label;
