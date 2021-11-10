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
  user: object | undefined;
}

export type UserContext = {
  user: IUser;
  state: any;
  getRoles: () => void;
};

interface IUserProvider {
  children: ReactNode;
}

type Roles = "AWO" | "RDO";

const UserContext = createContext<UserContext | undefined>(undefined);

const UserProvider: FC<IUserProvider> = (props) => {
  // const [roles, setRoles] = useState<Roles[]>([]);
  const state = useAuth();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    if (state?.user) {
      setRoles();
    }
  }, [state]);

  const setRoles = async () => {
    const user = state?.user;
    const roles = await getRoles();
    if (user && roles) {
      const newUser = { ...user, roles };
      setUser(newUser);
      // console.log(`newUser`, newUser);
    }
  };

  const getRoles = (): Roles[] => {
    console.log(`get roles called`);
    try {
      return ["AWO", "RDO"];
    } catch (error) {
      throw new Error("get roles error");
    }
  };
  return <UserContext.Provider value={user} {...props} />;
};

const useUser = () => useContext(UserContext);
export { UserProvider, useUser };
