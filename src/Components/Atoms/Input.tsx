import React, { ChangeEvent, ChangeEventHandler, FC, ReactNode } from "react";

interface IInputField {
  children: ReactNode | string;
  type: "text" | "number" | "password";
  value?: string | number;
  changeHandler: (e: string | number) => void;
}

const InputField: FC<IInputField> = ({
  children,
  type,
  value,
  changeHandler,
  ...args
}) => {
  return (
    <label className="text-sm font-medium text-gray-900 block mb-2">
      {children}
      <input
        type={type}
        value={value}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        onChange={(event) => changeHandler(event.target.value)}
      />
    </label>
  );
};

export default InputField;
