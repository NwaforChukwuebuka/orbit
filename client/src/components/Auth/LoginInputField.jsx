import { useState } from "react";
import styles from "../../styles/LoginInputField.module.css";

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={styles.inputGroup}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <div
        className={`${styles.inputWrapper} ${isFocused ? styles.focused : ""} ${
          error ? styles.error : ""
        }`}
      >
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={styles.input}
        />
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default InputField;
