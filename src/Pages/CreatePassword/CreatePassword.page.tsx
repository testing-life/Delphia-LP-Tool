import React, { FC, FormEvent, useState } from "react";
import Card from "../../Components/Atoms/Card/Card";
import CreatePasswordForm, {
  PasswordCreationStateProps,
} from "../../Components/CreatePasswordForm/CreatePasswordForm";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";

import "./CreatePasswordPage.css";
import Button from "../../Components/Atoms/Button/Button";
import { useNavigate } from "react-router";
import { RequestUrl } from "../../Consts/requestUrls";

const CreatePasswordPage: FC = () => {
  const [error, setError] = useState<Error | null>(null);
  const [passCreated, setPassCreated] = useState<boolean>(false);
  const navigate = useNavigate();

  const isPasswordCreationObjValid = (
    obj: PasswordCreationStateProps
  ): boolean => {
    const hasValues = Object.entries(obj).every((prop) => {
      const key = prop[0];
      const val = prop[1];
      if (!val || isEmpty(val)) {
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
    if (!isPasswordCreationObjValid(props)) {
      return;
    }
    if (error) {
      setError(null);
    }
    const { email, password, token } = props;
    try {
      const res = await fetch(`${RequestUrl.BASE_URL}/auth/confirm_email`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          email,
          password,
          token,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (res && !res.ok) {
        const data = await res.json();
        const message =
          data.length > 1
            ? data.reduce((acc: any, next: any) => {
                const msg = `${acc.message} ${next.message}`;
                return msg;
              })
            : data[0].message;

        throw Error(message);
      }
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
      <Card>
        <h1 className="text-3xl font-semibold mb-5 text-center">
          {passCreated ? "Account Created" : "Create Password"}
        </h1>
        <p
          className={`text-sm font-normal ${
            passCreated ? "mb-10" : "mb-14"
          } text-center`}
        >
          {passCreated
            ? "Please log in again to access portal"
            : "You’ve been invited to Delphia’s Limited Partner’s portal."}
        </p>
        {error && (
          <p className="text-red-600 text-sm text-center mb-10">
            {error.message}
          </p>
        )}
        {passCreated && (
          <Button
            variant="primary"
            fullWidth
            onClick={() => navigate("/login")}
          >
            Continue
          </Button>
        )}
        {!passCreated && <CreatePasswordForm onSubmit={onSubmitHandler} />}
      </Card>
      )
    </div>
  );
};

export default CreatePasswordPage;
