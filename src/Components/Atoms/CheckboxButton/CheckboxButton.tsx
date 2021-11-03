import React, { FC } from "react";
import "./CheckboxButton.css";

export interface CheckboxButtonProps {
  name: string;
  checked?: boolean;
  value: string;
  children: string;
  disabled: boolean;
  onChange: (e: string) => void;
}

const CheckboxButton: FC<CheckboxButtonProps> = ({
  children,
  name,
  checked,
  value,
  disabled,
  onChange,
}) => {
  return (
    <label className="checkboxButton">
      <input
        className="checkboxButton__input"
        type="checkbox"
        disabled={disabled}
        name={name}
        value={value}
        checked={checked}
        onChange={(event) => onChange(event.target.value)}
      />
      <span className="checkboxButton__label">{children}</span>
    </label>
  );
};

export default CheckboxButton;
