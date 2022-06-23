import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { useAuth } from "../../Context/auth.context";
import Button from "../Atoms/Button/Button";
import Form from "../Atoms/Form/Form";
import InputField from "../Atoms/Input/Input";
import isEmail from "validator/lib/isEmail";

const LoginForm: FC<any> = () => {
  const [credentials, setCredentials] = useState<{
    [key: string]: string;
  }>({});
  const { login } = useAuth();
  const [emailError, setEmailError] = useState<string | undefined>(undefined)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid =
      Object.keys(credentials).includes("email") &&
      Object.keys(credentials).includes("password") &&
      credentials.email.length &&
      credentials.password.length &&
      isEmail(credentials.email);
    if (isValid) {
      login(credentials);
    }
  };

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailError(undefined);
    if (event.target.value && !isEmail(event.target.value)) {
      setEmailError('Please enter a valid email address')
    }
    setCredentials({ ...credentials, email: event.target.value });
  };


  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, password: event.target.value });
  };

  return (
    <div className="max-w-lg mx-auto">
      <Form onSubmit={onSubmit}>
        <ul>
          <li className="mb-6">
            <InputField name="email" onChange={onEmailChange} type="text" error={emailError}>
              Email
            </InputField>
          </li>
          <li className="mb-14">
            <InputField
              name="password"
              onChange={onPasswordChange}
              type="password"
            >
              Password
            </InputField>
          </li>
          <li className="text-sm">
            <Button variant="primary" fullWidth type="submit">
              Log in
            </Button>
          </li>
        </ul>
      </Form>
    </div>
  );
};

export default LoginForm;
