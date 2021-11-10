import React, { FC, ReactNode, MouseEvent } from "react";
import "./Button.css";

export interface ButtonProps {
  onClick?: () => void;
  children: ReactNode | string;
  variant: "primary" | "secondary" | "textOnly";
  type?: "button" | "submit" | "reset";
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

const Button: FC<ButtonProps> = ({
  onClick,
  type = "button",
  children,
  variant,
  size = "base",
  disabled = false,
  loading = false,
  fullWidth,
}) => (
  <button
    disabled={disabled}
    className={`btn ${variant} ${size} ${fullWidth ? "w-full" : ""}`}
    type={type}
    onClick={onClick}
  >
    {!loading && children}
    {loading && "loading icon"}
  </button>
);

export default Button;
