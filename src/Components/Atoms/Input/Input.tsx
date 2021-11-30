import React, { ChangeEvent, FC, ReactNode } from "react";
import "./Input.css";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

export interface InputFieldProps {
  children?: ReactNode | string;
  type: "text" | "number" | "password";
  value?: string | number;
  error?: string | boolean;
  name: string;
  disabled?: boolean;
  placeholder?: string;
  onChange: (e: any) => void;
}

const InputField: FC<InputFieldProps> = ({
  children,
  type,
  value,
  error,
  disabled,
  placeholder,
  name,
  onChange,
}) => {
  return (
    <label className={`input ${error ? "input__validation--error" : ""}`}>
      {children && <span className="input__label">{children}</span>}
      <input
        type={type}
        value={value}
        disabled={disabled}
        name={name}
        inputMode={type === "number" ? "decimal" : "text"}
        placeholder={placeholder}
        className="input__field"
        onChange={(event) => onChange(event.target.value)}
      />
      {error && !!(error as string).length && (
        <div className="input__validation">
          <ExclamationCircleIcon className="h-4 w-4 mr-2 ml-3" />
          <span>{error}</span>
        </div>
      )}
    </label>
  );
};

export default InputField;
