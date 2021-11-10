import React, { FC } from "react";
import { AuthProvider } from "./auth.context";
import { UserProvider } from "./user.context";

const AppProviders: FC<any> = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  );
};

export default AppProviders;
