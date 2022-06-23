import React, {
  FC,
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useAuth } from "./auth.context";

export interface IUser {
  user: any;
  addresses: string[];
}

export type TUserContext = {
  user: IUser;
};

interface IUserProvider {
  children: ReactNode;
}

const UserContext = createContext<TUserContext | undefined>(undefined);

const UserProvider: FC<IUserProvider> = (props) => {
  const { state } = useAuth();
  const [user, setUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    setUser(state);
  }, [state]);

  return <UserContext.Provider value={user} {...props} />;
};

const useUser = () => useContext(UserContext);
export { UserProvider, useUser };
