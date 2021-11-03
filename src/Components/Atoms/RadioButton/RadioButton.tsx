import React, { FC } from "react";
import "./RadioButton.css";

export interface RadioButtonProps {
  name: string;
  checked?: boolean;
  value: string;
  children: string;
  disabled: boolean;
  onChange: (e: string) => void;
}

const RadioButton: FC<RadioButtonProps> = ({
  children,
  name,
  checked,
  value,
  disabled,
  onChange,
}) => {
  return (
    <label className="radioButton">
      <input
        className="radioButton__input"
        type="radio"
        disabled={disabled}
        name={name}
        value={value}
        checked={checked}
        onChange={(event) => onChange(event.target.value)}
      />
      <span className="radioButton__label">{children}</span>
    </label>
  );
};

export default RadioButton;
