// auth app vs unauth app here

import React, { FC } from "react";
import { useAuth } from "../../Context/auth.context";
import { useUser } from "../../Context/user.context";

const AuthorisedApp: FC = () => {
  const user = useUser();
  const { logout } = useAuth();
  console.log(`user in auth app`, user);
  return (
    <div>
      is authorisedApp
      <div>
        <button onClick={logout}>logout</button>
      </div>
    </div>
  );
};

export default AuthorisedApp;
