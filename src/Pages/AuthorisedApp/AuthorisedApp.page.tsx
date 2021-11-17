// auth app vs unauth app here

import React, { FC, useEffect } from "react";
import { useAuth } from "../../Context/auth.context";
import { useUser } from "../../Context/user.context";
import { useEthProvider } from "../../Context/web3.context";

const AuthorisedApp: FC = () => {
  const user = useUser();
  const { logout } = useAuth();
  const { provider, signer, setProvider, accounts } = useEthProvider();
  console.dir(user);
  console.log(`accounts`, accounts);
  useEffect(() => {
    console.log(`object`, accounts);
    getAddress();
  }, [accounts]);
  const getAddress = async () => {
    const address = await signer.getAddress();
    console.log(`object`, address);
  };

  // provider.listAccounts().then((res: any) => console.log(`auth accounts`, res));
  // // Subscribe to accounts change
  // useEffect(() => {
  //   provider.on("accountschanged", (accounts: any) => {
  //     console.log(`accounts`, accounts);
  //   });
  //   // Subscribe to accounts change
  //   provider.on("disconnect", (e: any) => {
  //     console.log(`e`, e);
  //   });
  //   a();
  // }, []);
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
