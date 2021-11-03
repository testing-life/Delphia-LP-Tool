import React, { ChangeEvent, ChangeEventHandler, FC, ReactNode } from "react";
import "./Input.css";

export interface InputFieldProps {
  children: ReactNode | string;
  type: "text" | "number" | "password";
  value?: string | number;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange: (e: string | number) => void;
}

const InputField: FC<InputFieldProps> = ({
  children,
  type,
  value,
  error,
  disabled,
  placeholder,
  onChange,
}) => {
  return (
    <label className={`input ${error ? "input__validation--error" : ""}`}>
      <span className="input__label">{children}</span>
      <input
        type={type}
        value={value}
        disabled={disabled}
        inputMode={type === "number" ? "decimal" : "text"}
        placeholder={placeholder}
        className="input__field"
        onChange={(event) => onChange(event.target.value)}
      />
      {error && <span>{error}</span>}
    </label>
  );
};

export default InputField;
