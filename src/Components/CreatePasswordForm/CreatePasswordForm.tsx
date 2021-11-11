import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext, useAuth } from "../../Context/auth.context";
import Button from "../Atoms/Button/Button";
import Form from "../Atoms/Form/Form";
import InputField from "../Atoms/Input/Input";

interface FormStateProps {
  userName: string;
  password: string;
}

const CreatePasswordForm: FC = () => {
  let { userName } = useParams();
  const [formState, setFormState] = useState<FormStateProps | null>(null);
  console.log(`object`, userName);
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
              Password
            </InputField>
          </li>
          <li className="text-sm mt-10">
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
