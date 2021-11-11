import React, { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../../Components/Atoms/Card/Card";
import CreatePasswordForm from "../../Components/CreatePasswordForm/CreatePasswordForm";
import "./CreatePasswordPage.css";

const CreatePasswordPage: FC = () => {
  return (
    <div className="createPasswordPage">
      <Card>
        <h1 className="text-3xl font-semibold mb-5 text-center">
          Create Password
        </h1>
        <p className="text-sm font-normal mb-10 text-center">
          You’ve been invited to Delphia’s Limited Partner’s portal.
        </p>
        <CreatePasswordForm />
      </Card>
    </div>
  );
};

export default CreatePasswordPage;
