import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import useUrlQuery from "../../Hooks/useUrlQuery";
import debounce from "../../Utils/debounce";
import Button from "../Atoms/Button/Button";
import Form from "../Atoms/Form/Form";
import InputField from "../Atoms/Input/Input";
import isLength from "validator/lib/isLength";

export interface PasswordCreationStateProps {
  email: string | undefined;
  password: string | undefined;
  token: string | undefined;
  repeatPassword: string | undefined;
}

interface CreatePasswordFormProps {
  onSubmit: (event: FormEvent, props: PasswordCreationStateProps) => void;
}

const CreatePasswordForm: FC<CreatePasswordFormProps> = ({ onSubmit }) => {
  let query = useUrlQuery();
  const [state, setState] = useState<PasswordCreationStateProps>({
    email: undefined,
    password: undefined,
    token: undefined,
    repeatPassword: undefined,
  });

  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    setStateFromUrlQuery();
  }, []);

  const setStateFromUrlQuery = (): void => {
    const email = query.get("email");
    const token = query.get("token");
    if (email && token) {
      setState({ ...state, email, token });
    }
  };

  const onPasswordChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
    if (!isLength(event.target.value, { min: 8, max: undefined })) {
      setError("Password must have at least 8 characters");
      return;
    }
    setState({ ...state, [event.target.name]: event.target.value });
    if (state.repeatPassword && event.target.value !== state.repeatPassword) {
      setError("Passwords do not match");
    } else {
      setError(undefined);
    }
  }, 250);

  const onRepeatPasswordChange = debounce(
    (event: ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, [event.target.name]: event.target.value });
      if (state.password && event.target.value !== state.password) {
        setError("Passwords do not match");
      } else {
        setError(undefined);
      }
    },
    250
  );

  return (
    <div className="max-w-lg mx-auto">
      <Form onSubmit={(event) => onSubmit(event, state)}>
        <ul>
          <li className="mb-5">
            <InputField
              name="password"
              error={error}
              onChange={onPasswordChange}
              type="password"
            >
              Password
            </InputField>
          </li>
          <li className="mb-14">
            <InputField
              name="repeatPassword"
              onChange={onRepeatPasswordChange}
              type="password"
              error={error}
            >
              Confirm Password
            </InputField>
          </li>
          <li className="text-sm">
            <Button variant="primary" fullWidth type="submit">
              Create Password
            </Button>
          </li>
        </ul>
      </Form>
    </div>
  );
};

export default CreatePasswordForm;
