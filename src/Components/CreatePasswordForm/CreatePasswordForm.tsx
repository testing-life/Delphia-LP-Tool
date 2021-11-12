import React, { FC, useEffect, useState } from "react";
import useUrlQuery from "../../Context/Hooks/useUrlQuery";
import Button from "../Atoms/Button/Button";
import Form from "../Atoms/Form/Form";
import InputField from "../Atoms/Input/Input";

interface FormStateProps {
  userName: string | undefined;
  password: string | undefined;
  invitationToken: string | undefined;
}

const CreatePasswordForm: FC = () => {
  let query = useUrlQuery();
  const [formState, setFormState] = useState<FormStateProps>({
    userName: undefined,
    password: undefined,
    invitationToken: undefined,
  });

  useEffect(() => {
    setStateFromUrlQuery();
  }, []);

  const setStateFromUrlQuery = (): void => {
    const userName = query.get("userName");
    const invitationToken = query.get("invitationToken");
    if (userName && invitationToken) {
      setFormState({ ...formState, userName, invitationToken });
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(`args`, e);
  };

  const onChange = (args: any) => {
    console.log(`args`, args);
  };

  return (
    <div className="max-w-lg mx-auto">
      <Form onSubmit={(e) => onSubmit(e)}>
        {console.log(`formState`, formState)}
        <ul>
          <li className="mb-5">
            <InputField
              name="password"
              onChange={(e) => onChange(e)}
              type="password"
            >
              Password
            </InputField>
          </li>
          <li className="mb-14">
            <InputField
              name="repeatPassword"
              onChange={(e) => onChange(e)}
              type="password"
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
