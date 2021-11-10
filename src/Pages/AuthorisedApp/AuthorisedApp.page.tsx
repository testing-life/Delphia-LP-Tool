// auth app vs unauth app here

import React, { FC } from "react";
import { useUser } from "../../Context/user.context";

const AuthorisedApp: FC = () => {
  const user = useUser();
  console.log(`user in auth app`, user);
  return <div>is authorisedApp</div>;
};

export default AuthorisedApp;
