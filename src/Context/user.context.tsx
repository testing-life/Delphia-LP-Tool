import React, { FC, createContext, useContext, ReactNode } from "react";
import { useAuth } from "./auth.context";

export interface IUser {
  user: any;
}

export type UserContext = {
  user: IUser;
};

interface IUserProvider {
  children: ReactNode;
}

const UserContext = createContext<UserContext | undefined>(undefined);

const UserProvider: FC<IUserProvider> = (props) => {
  return <UserContext.Provider value={useAuth()!.state as IUser} {...props} />;
};

const useUser = () => useContext(UserContext);
export { UserProvider, useUser };
