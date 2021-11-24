import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { useAuth } from "../../Context/auth.context";
import debounce from "../../Utils/debounce";
import Button from "../Atoms/Button/Button";
import Form from "../Atoms/Form/Form";
import InputField from "../Atoms/Input/Input";
import isEmail from "validator/lib/isEmail";

const LoginForm: FC<any> = () => {
  const [credentials, setCredentials] = useState<{
    [key: string]: string;
  }>({});
  const { login } = useAuth();

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

  const onChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }, 250);

  return (
    <div className="max-w-lg mx-auto">
      {console.log(`object`, credentials)}
      <Form onSubmit={onSubmit}>
        <ul>
          <li className="mb-6">
            <InputField name="email" onChange={(e) => onChange(e)} type="text">
              Email
            </InputField>
          </li>
          <li className="mb-14">
            <InputField
              name="password"
              onChange={(e) => onChange(e)}
              type="text"
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
