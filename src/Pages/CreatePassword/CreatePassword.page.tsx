import React, { FC, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../../Components/Atoms/Card/Card";
import CreatePasswordForm, {
  PasswordCreationStateProps,
} from "../../Components/CreatePasswordForm/CreatePasswordForm";
import "./CreatePasswordPage.css";

const CreatePasswordPage: FC = () => {
  const onSubmitHandler = (
    event: FormEvent,
    props: PasswordCreationStateProps
  ): void => {
    event.preventDefault();
    console.log(`event, props`, event, props);
    // const     fetch('https://jsonplaceholder.typicode.com/posts', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     title: 'foo',
    //     body: 'bar',
    //     userId: 1,
    //   }),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((json) => console.log(json));
  };
  return (
    <div className="createPasswordPage">
      <Card>
        <h1 className="text-3xl font-semibold mb-5 text-center">
          Create Password
        </h1>
        <p className="text-sm font-normal mb-10 text-center">
          You’ve been invited to Delphia’s Limited Partner’s portal.
        </p>
        <CreatePasswordForm onSubmit={onSubmitHandler} />
      </Card>
    </div>
  );
};

export default CreatePasswordPage;
