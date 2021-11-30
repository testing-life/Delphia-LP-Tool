import React, { FC, FormEvent, FormEventHandler, ReactNode } from "react";

interface IForm {
  children: ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const Form: FC<IForm> = ({ children, onSubmit }) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};

export default Form;
