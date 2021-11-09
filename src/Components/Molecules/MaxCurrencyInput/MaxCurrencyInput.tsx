import React, { FC, useEffect, useState } from "react";
import Button from "../../Atoms/Button/Button";
import Input, { InputFieldProps } from "../../Atoms/Input/Input";
import isNumeric from "validator/lib/isNumeric";
import trim from "validator/lib/trim";
import "./MaxCurrencyInput.css";

export interface MaxCurrencyInputProps extends InputFieldProps {
  value: string;
  name: string;
  maxValue: string;
  onChange: (e: any) => void;
}

const MaxCurrencyInput: FC<MaxCurrencyInputProps> = ({
  maxValue,
  value,
  name,
  onChange,
}) => {
  const [state, setState] = useState<string>(value);
  const maximiseValue = () => setState(maxValue);

  useEffect(() => {
    onChange(state);
  }, [state]);

  const validateInput = (value: any) => {
    if (isNaN(Number(value)) && !isNumeric(value) && value !== ".") {
      return false;
    }
    let newValue = trim(value);
    if (newValue === ".") {
      newValue = "0.";
    }
    setState(newValue);
  };

  return (
    <div className="maxCurrencyInput">
      <Input
        value={state}
        type="text"
        name={name}
        placeholder="0.0"
        onChange={validateInput}
      />
      <Button variant="primary" size="sm" onClick={maximiseValue}>
        Max
      </Button>
    </div>
  );
};

export default MaxCurrencyInput;
