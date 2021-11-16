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

export type UserContext = {
  user: IUser;
};

interface IUserProvider {
  children: ReactNode;
}

const UserContext = createContext<UserContext | undefined>(undefined);

const UserProvider: FC<IUserProvider> = (props) => {
  const [user, setUser] = useState<IUser | undefined>(useAuth().state);

  useEffect(() => {
    if (user) {
      setRoles();
    }
  }, [user]);

  const setRoles = async () => {
    const addresses = await getAddresses();
    if (user && addresses) {
      const newUser = { ...user, addresses };
      setUser(newUser);
      // console.log(`newUser`, newUser);
    }
  };

  const getAddresses = (): string[] => {
    console.log(`get addresses called`);
    try {
      return [
        "0xe0b609917c7387bd674b6F2a874097c4136502F9",
        "0xe0b609917c7387xxx74b6F2a874097c4136502F9",
      ];
    } catch (error) {
      throw new Error("get addresses error");
    }
  };
  return <UserContext.Provider value={user} {...props} />;
};

const useUser = () => useContext(UserContext);
export { UserProvider, useUser };
