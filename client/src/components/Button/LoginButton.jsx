// Button.jsx
import styles from "../../styles/Button.module.css";

const Button = ({
  children,
  type = "button",
  onClick,
  isLoading,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`${styles.button} ${className} ${
        isLoading ? styles.loading : ""
      }`}
    >
      {isLoading ? <div className={styles.spinner}></div> : children}
    </button>
  );
};

export default Button;
