import React, { ChangeEvent, ChangeEventHandler, FC, ReactNode } from "react";
import "./Input.css";

export interface InputFieldProps {
  children: ReactNode | string;
  type: "text" | "number" | "password";
  value?: string | number;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  changeHandler: (e: string | number) => void;
}

const InputField: FC<InputFieldProps> = ({
  children,
  type,
  value,
  error,
  disabled,
  placeholder,
  changeHandler,
}) => {
  return (
    <label className="input">
      <span className="input__label">{children}</span>
      <input
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className="input__field"
        onChange={(event) => changeHandler(event.target.value)}
      />
      {error && <span>{error}</span>}
    </label>
  );
};

export default InputField;
