import React, { FC } from "react";
import { AuthContext, useAuth } from "../../Context/auth.context";
import Button from "../Atoms/Button/Button";
import Form from "../Atoms/Form/Form";
import InputField from "../Atoms/Input/Input";

const LoginForm: FC<any> = () => {
  const { login } = useAuth();

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(`args`, e);
    login();
  };

  const onChange = (args: any) => {
    console.log(`args`, args);
  };

  return (
    <div className="max-w-lg mx-auto">
      <Form onSubmit={(e) => onSubmit(e)}>
        <ul>
          <li className="mb-6">
            <InputField name="email" onChange={(e) => onChange(e)} type="text">
              Email
            </InputField>
          </li>
          <li className="mb-6">
            <InputField
              name="password"
              onChange={(e) => onChange(e)}
              type="text"
            >
              Password
            </InputField>
          </li>
          <li className="text-sm">
            <Button variant="primary" type="submit">
              Log in
            </Button>
          </li>
        </ul>
      </Form>
    </div>
  );
};

export default LoginForm;
