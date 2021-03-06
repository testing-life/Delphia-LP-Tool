import React, { FC, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../../Components/Atoms/Card/Card";
import LoginForm from "../../Components/Login/LoginForm";
import { useUser } from "../../Context/user.context";
import { useAuth } from "../../Context/auth.context";
import "./LoginPage.css";
import { useEthProvider } from "../../Context/web3.context";

const LoginPage: FC = () => {
  const user = useUser();
  const { authError } = useAuth();
  const { provider } = useEthProvider();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { from: Location };
  useEffect(() => {
    const from = state ? state.from.pathname : "/";
    if (user && !provider) {
      navigate("/wallet-connect", { replace: true });
    } else if (user && provider) {
      navigate("/", { replace: true });
    }
  }, [user, provider]);

  return (
    <div className="loginPage">
      <Card>
        <h1 className="text-3xl font-semibold text-gray-900 mb-10 text-center">
          Log In
        </h1>
        {authError && (
          <p className="text-red-600 text-sm text-center mb-10">
            {authError.message}
          </p>
        )}
        <LoginForm />
      </Card>
    </div>
  );
};
export default LoginPage;
