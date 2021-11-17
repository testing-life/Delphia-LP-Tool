// auth app vs unauth app here

import React, { FC, useEffect } from "react";
import { useAuth } from "../../Context/auth.context";
import { useUser } from "../../Context/user.context";
import { useEthProvider } from "../../Context/web3.context";

const AuthorisedApp: FC = () => {
  const user = useUser();
  const { logout } = useAuth();
  const { provider, signer, setProvider } = useEthProvider();
  console.log(`user in auth app`, user, provider);
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
  // const a = async () => {
  //   const x = await signer.getAddress();
  //   console.log(`signer.getAddress()`, x);
  // };
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
