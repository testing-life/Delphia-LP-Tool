import React, { ChangeEvent, FC, useEffect, useState } from "react";
import Button from "../../Atoms/Button/Button";
import Input, { InputFieldProps } from "../../Atoms/Input/Input";
import isNumeric from "validator/lib/isNumeric";
import trim from "validator/lib/trim";
import "./MaxCurrencyInput.css";
import isEmail from "validator/lib/isEmail";

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
    console.log(`name, state useeffect`, name, state);
    onChange(state);
  }, [state]);

  useEffect(() => {
    console.log(`name, state value`, name, value);
    if (value && state !== value) {
      validateInput(value);
    }
  }, [value]);

  const validateInput = (val: string) => {
    if (isNaN(Number(val)) && !isNumeric(val) && val !== ".") {
      return false;
    }
    let newValue = trim(val);
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
