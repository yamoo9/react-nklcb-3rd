import { string, number, bool, func, oneOfType } from 'prop-types';
import { Wrapper } from './checker.styled';

/* -------------------------------------------------------------------------- */

export const CheckerType = {
  /** Checker 컴포넌트 레이블 */
  label: string.isRequired,
  /** Checker 컴포넌트의 체크 상태 */
  checked: bool,
  /** Checker 컴포넌트의 로딩 상태 */
  loading: bool,
  /** Checker 컴포넌트의 크기(너버, 높이) */
  size: oneOfType([number, string]),
  /** Checker 컴포넌트의 체크 상태를 변경할 이벤트 핸들러 */
  onChange: func,
};

/* -------------------------------------------------------------------------- */

export const Checker = ({
  label,
  checked,
  loading,
  size,
  onChange,
  ...restProps
}) => {
  return (
    <Wrapper $size={size} checked={checked} $loading={loading} {...restProps}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label={label}
      />
    </Wrapper>
  );
};

Checker.defaultProps = {
  checked: false,
  loading: false,
  size: 16,
  onChange: () => {},
};

Checker.propTypes = CheckerType;