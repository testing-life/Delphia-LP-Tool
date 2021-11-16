import React, { FC } from "react";
import { AuthProvider } from "./auth.context";
import { UserProvider } from "./user.context";
import { Web3Provider } from "./web3.context";

const AppProviders: FC<any> = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <Web3Provider>{children}</Web3Provider>
      </UserProvider>
    </AuthProvider>
  );
};

export default AppProviders;
