import { useState } from "react";
import styles from "../../styles/FormInput.module.css";

const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  required,
  error,
  placeholder,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder || ""}
        className={`${styles.input} ${error ? styles.inputError : ""} ${
          focused ? styles.focused : ""
        }`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default FormInput;
