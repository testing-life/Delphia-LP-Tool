import React, { FC, FormEvent, useState } from "react";
import Card from "../../Components/Atoms/Card/Card";
import CreatePasswordForm, {
  PasswordCreationStateProps,
} from "../../Components/CreatePasswordForm/CreatePasswordForm";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";

import "./CreatePasswordPage.css";

const CreatePasswordPage: FC = () => {
  const [error, setError] = useState<Error | null>(null);
  const [passCreated, setPassCreated] = useState<boolean>(false);

  const isPasswordCreationObjValid = (
    obj: PasswordCreationStateProps
  ): boolean => {
    const hasValues = Object.entries(obj).every((prop) => {
      const key = prop[0];
      const val = prop[1];
      if (isEmpty(val)) {
        return false;
      }

      if (key === "userName" && !isEmail(val)) {
        return false;
      }
      return true;
    });

    const hasMatchingPasswords = obj.password === obj.repeatPassword;
    return hasValues && hasMatchingPasswords;
  };

  const onSubmitHandler = async (
    event: FormEvent,
    props: PasswordCreationStateProps
  ): Promise<void> => {
    event.preventDefault();
    console.log(`event, props`, event, props);
    if (!isPasswordCreationObjValid(props)) {
      return;
    }
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: "foo",
          body: "bar",
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (res.ok) {
        setPassCreated(true);
      }
    } catch (error) {
      console.warn(error);
      setError(error as Error);
    }
  };
  return (
    <div className="createPasswordPage">
      {!passCreated && (
        <Card>
          <h1 className="text-3xl font-semibold mb-5 text-center">
            Create Password
          </h1>
          <p className="text-sm font-normal mb-10 text-center">
            You’ve been invited to Delphia’s Limited Partner’s portal.
          </p>
          {error && (
            <p className="text-red-600 text-sm text-center mb-10">
              {error.message}
            </p>
          )}
          <CreatePasswordForm onSubmit={onSubmitHandler} />
        </Card>
      )}
      {passCreated && <Card>is Success</Card>}
    </div>
  );
};

export default CreatePasswordPage;
