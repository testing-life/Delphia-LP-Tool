import React, { FC, useEffect, useState } from "react";
import Button from "../../Atoms/Button/Button";
import Input, { InputFieldProps } from "../../Atoms/Input/Input";
import "./MaxCurrencyInput.css";

export interface MaxCurrencyInputProps extends InputFieldProps {
  value?: any;
  name: string;
  maxValue: any;
  onChange: (e: any) => void;
}

const MaxCurrencyInput: FC<MaxCurrencyInputProps> = ({
  maxValue,
  value,
  name,
  type,
  onChange,
}) => {
  const [state, setState] = useState<any>(value);
  const maximiseValue = () => setState(maxValue);

  useEffect(() => {
    onChange(state);
  }, [state]);

  return (
    <div className="maxCurrencyInput">
      <Input
        value={parseFloat(state)}
        type={type}
        name={name}
        placeholder="0.0"
        onChange={(e) => setState(e)}
      />
      <Button variant="primary" size="sm" onClick={maximiseValue}>
        Max
      </Button>
    </div>
  );
};

export default MaxCurrencyInput;
