import React, { FC, ReactElement } from "react";
import { Route, Redirect } from "react-router";
import { useUser } from "../../Context/user.context";

const ProtectedRoute: FC<any> = ({ children, ...rest }): ReactElement => {
  const user = useUser();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    ></Route>
  );
};

export default ProtectedRoute;
