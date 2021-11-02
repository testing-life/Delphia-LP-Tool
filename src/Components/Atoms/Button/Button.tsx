import React, { FC, ReactNode } from "react";
import "./Button.css";

export interface ButtonProps {
  clickHandler?: () => void;
  children: ReactNode | string;
  variant: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  disabled?: boolean;
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({
  clickHandler,
  type = "button",
  children,
  variant,
  size = "base",
  disabled = false,
  loading = false,
}) => (
  <button
    disabled={disabled}
    className={`${variant} ${size}`}
    type={type}
    onClick={clickHandler}
  >
    {!loading && children}
    {loading && "loading icon"}
  </button>
);

export default Button;
