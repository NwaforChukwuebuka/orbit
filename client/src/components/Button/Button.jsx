import styles from "../../styles/Button.module.css";

const Button = ({ type, onClick, disabled, children, variant }) => {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${
        variant ? styles[variant] : styles.primary
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
