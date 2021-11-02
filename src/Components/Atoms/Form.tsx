import React, { FC, ReactNode } from "react";

interface IForm {
  children: ReactNode;
  submitHandler: (e: any) => void;
}

const Form: FC<IForm> = ({ children, submitHandler }) => {
  return <form onSubmit={submitHandler}>{children}</form>;
};

export default Form;
