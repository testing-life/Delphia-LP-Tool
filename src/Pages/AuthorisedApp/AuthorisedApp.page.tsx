// auth app vs unauth app here

import React, { FC } from "react";
import { useAuth } from "../../Context/auth.context";
import { useUser } from "../../Context/user.context";
import { useEthProvider } from "../../Context/web3.context";

const AuthorisedApp: FC = () => {
  const user = useUser();
  const { logout } = useAuth();
  const { provider } = useEthProvider();
  console.log(`user in auth app`, user, provider);
  provider.listAccounts().then((res: any) => console.log(`auth accounts`, res));
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
