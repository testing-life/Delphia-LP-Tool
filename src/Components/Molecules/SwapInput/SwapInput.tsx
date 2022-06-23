import React, { FC, ReactNode } from "react";
import "./SwapInput.css";

export interface SwapInputProps {
  children: ReactNode;
  label: string;
}

const SwapInput: FC<SwapInputProps> = ({ children, label }) => {
  return (
    <div className="swapInput">
      <span className="swapInput__label">{label}</span>
      <div className="swapInput__inputWrapper">{children}</div>
    </div>
  );
};

export default SwapInput;
