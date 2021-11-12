import React, { FC, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../../Components/Atoms/Card/Card";
import LoginForm from "../../Components/Login/LoginForm";
import { useUser } from "../../Context/user.context";
import { useAuth } from "../../Context/auth.context";
import "./LoginPage.css";

const LoginPage: FC = () => {
  const user = useUser();
  const { authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { from: Location };
  useEffect(() => {
    const from = state ? state.from.pathname : "/";
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user]);

  return (
    <Card>
      <div className="loginPage">
        <h1 className="text-3xl font-semibold text-gray-900 mb-10 text-center">
          Log In
        </h1>
        {authError && (
          <p className="text-red-600 text-sm text-center mb-10">
            {authError.message}
          </p>
        )}
        <LoginForm />
      </div>
    </Card>
  );
};
export default LoginPage;
