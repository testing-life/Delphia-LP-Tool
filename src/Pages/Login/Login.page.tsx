import React, { FC, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "../../Components/Login/LoginForm";
import { useUser } from "../../Context/user.context";

const LoginPage: FC = () => {
  const user = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const state = location.state as { from: Location };
    const from = state ? state.from.pathname : "/";
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user]);

  return <>{<LoginForm />}</>;
};

export default LoginPage;
