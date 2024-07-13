import styles from "./Button.module.css";
import PropTypes from "prop-types";
Button.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
function Button({ children, type, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${styles[type]}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
