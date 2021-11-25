import React, { FC, ReactNode, MouseEvent } from "react";
import Spinner from "../Spinner/Spinner";
import "./Button.css";

export interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode | string;
  variant: "primary" | "secondary" | "textOnly";
  type?: "button" | "submit" | "reset";
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  classes?: string;
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
  classes,
}) => (
  <button
    disabled={disabled}
    className={`btn ${classes} ${variant} ${size} ${fullWidth ? "w-full" : ""}`}
    type={type}
    onClick={onClick}
  >
    {!loading && children}
    {loading && <Spinner />}
  </button>
);

export default Button;
