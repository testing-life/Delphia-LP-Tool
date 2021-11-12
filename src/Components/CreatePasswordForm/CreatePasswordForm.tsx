import React, { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import useUrlQuery from "../../Context/Hooks/useUrlQuery";
import debounce from "../../Utils/debounce";
import Button from "../Atoms/Button/Button";
import Form from "../Atoms/Form/Form";
import InputField from "../Atoms/Input/Input";

interface StateProps {
  userName: string | undefined;
  password: string | undefined;
  invitationToken: string | undefined;
  repeatPassword: string | undefined;
}

const CreatePasswordForm: FC = () => {
  let query = useUrlQuery();
  const [state, setState] = useState<StateProps>({
    userName: undefined,
    password: undefined,
    invitationToken: undefined,
    repeatPassword: undefined,
  });

  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    setStateFromUrlQuery();
  }, []);

  const setStateFromUrlQuery = (): void => {
    const userName = query.get("userName");
    const invitationToken = query.get("invitationToken");
    if (userName && invitationToken) {
      setState({ ...state, userName, invitationToken });
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(`args`, e);
  };

  const onPasswordChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
    if (state.repeatPassword && event.target.value !== state.repeatPassword) {
      setError("Passwords do not match");
    } else {
      setError(undefined);
    }
  }, 500);

  const onRepeatPasswordChange = debounce(
    (event: ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, [event.target.name]: event.target.value });
      if (state.password && event.target.value !== state.password) {
        setError("Passwords do not match");
      } else {
        setError(undefined);
      }
    },
    500
  );

  return (
    <div className="max-w-lg mx-auto">
      <Form onSubmit={(e) => onSubmit(e)}>
        {console.log(`state`, state)}
        <ul>
          <li className="mb-5">
            <InputField
              name="password"
              error={!!error}
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
