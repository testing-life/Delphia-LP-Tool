import React, { FC, ReactNode, useEffect, useState } from "react";
import Button from "../../Atoms/Button/Button";
import Input, { InputFieldProps } from "../../Atoms/Input/Input";
import isNumeric from "validator/lib/isNumeric";
import trim from "validator/lib/trim";
import "./SwapInput.css";

export interface SwapInputProps extends InputFieldProps {
  children: ReactNode;
  label: string;
}

const SwapInput: FC<SwapInputProps> = ({ children, label }) => {
  return (
    <div className="swapInput">
      <span>{label}</span>
      <div className="swapInput__inputWrapper">{children}</div>
    </div>
  );
};

export default SwapInput;
