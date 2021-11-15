import React, { FC, ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../../Context/user.context";

const ProtectedRoute: FC<any> = ({ children }): ReactElement => {
  const user = useUser();
  const location = useLocation();
  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
