import React, { FC, ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../../Context/user.context";
import { useEthProvider } from "../../Context/web3.context";

const ProtectedRoute: FC<any> = ({ children }): ReactElement => {
  const user = useUser();
  const { provider } = useEthProvider();
  const location = useLocation();
  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
