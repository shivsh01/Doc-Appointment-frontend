import { InputHTMLAttributes, ReactNode } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  iconLeft?: ReactNode;
}

export function Input({
  label,
  error,
  iconLeft,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  const inputClasses = [
    styles.input,
    error ? styles.inputError : "",
    iconLeft ? styles.hasIconLeft : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputContainer}>
        {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
        <input id={inputId} className={inputClasses} {...props} />
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}
