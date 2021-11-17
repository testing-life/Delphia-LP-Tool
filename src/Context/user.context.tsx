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
  const { state } = useAuth();
  const [user, setUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    if (state) {
      setRoles();
    }
    if (!state) {
      setUser(state);
    }
  }, [state]);

  const setRoles = async () => {
    const addresses = await getAddresses();
    if (state && addresses) {
      const newUser = { ...state, addresses };
      setUser(newUser);
    }
  };

  const getAddresses = (): string[] => {
    console.log(`get addresses called`);
    try {
      return [
        "0xe0b609917c7387bd674b6F2a874097c4136502F9",
        "0xe0b609917c7387xxx74b6F2a874097c4136502F9",
        "0xC1BDf6C0D1f4ED95CdefD1c2B849baB5B373dC6b",
        "0xC1BDf6C0D1f4EDxxxdefD1c2B849baB5B373dC6b",
      ];
    } catch (error) {
      throw new Error("get addresses error");
    }
  };

  return <UserContext.Provider value={user} {...props} />;
};

const useUser = () => useContext(UserContext);
export { UserProvider, useUser };
