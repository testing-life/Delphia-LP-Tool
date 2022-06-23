import React, { FC } from "react";
import { AuthProvider } from "./auth.context";
import { UserProvider } from "./user.context";
import { Web3Provider } from "./web3.context";
import { DialogProvider } from "react-dialog-async";

const AppProviders: FC<any> = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <Web3Provider>
          <DialogProvider>{children}</DialogProvider>
        </Web3Provider>
      </UserProvider>
    </AuthProvider>
  );
};

export default AppProviders;
