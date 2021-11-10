import React, { FC, FormEvent, ReactNode } from "react";

interface IForm {
  children: ReactNode;
  onSubmit: (event: FormEvent) => void;
}

const Form: FC<IForm> = ({ children, onSubmit }) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};

export default Form;
