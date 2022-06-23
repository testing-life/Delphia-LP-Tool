import React, { ChangeEvent, FC, useEffect, useState } from "react";
import Button from "../../Atoms/Button/Button";
import Input, { InputFieldProps } from "../../Atoms/Input/Input";
import isNumeric from "validator/lib/isNumeric";
import trim from "validator/lib/trim";
import "./MaxCurrencyInput.css";

export interface MaxCurrencyInputProps extends InputFieldProps {
  value: string;
  name: string;
  maxValue?: string;
  onChange: (e: any) => void;
}

const MaxCurrencyInput: FC<MaxCurrencyInputProps> = ({
  maxValue = null,
  value,
  name,
  disabled = false,
  error = false,
  onChange,
}) => {
  const [state, setState] = useState<string>(value);
  const maximiseValue = () => maxValue && setState(maxValue);

  useEffect(() => {
    onChange(state);
  }, [state]);

  useEffect(() => {
    if ((value || value === '') && state !== value) {
      validateInput(value);
    }
  }, [value]);

  const validateInput = (val: string | ChangeEvent<HTMLInputElement>) => {
    let value = null;
    if (typeof val === "string") {
      value = val;
    } else if (Object.keys(val).includes("target")) {
      value = val.target.value;
    }
    if (isNaN(Number(value)) && !isNumeric(value as string) && value !== ".") {
      return false;
    }
    let newValue = trim(value as string);
    if (newValue === ".") {
      newValue = "0.";
    }
    setState(newValue);
  };

  return (
    <div className="maxCurrencyInput">
      <Input
        value={state}
        disabled={disabled}
        type="text"
        error={error}
        name={name}
        placeholder="0.0"
        onChange={validateInput}
      />
      {maxValue && (
        <Button
          disabled={disabled}
          variant="primary"
          size="sm"
          onClick={maximiseValue}
        >
          Max
        </Button>
      )}
    </div>
  );
};

export default MaxCurrencyInput;
