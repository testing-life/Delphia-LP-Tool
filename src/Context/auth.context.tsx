import React, {
  FC,
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { IUser } from "./user.context";

export type AuthContext = {
  login: () => void;
  logout: () => void;
  user: any;
};

interface IAuthProvider {
  children: ReactNode;
}

const AuthContext = createContext<AuthContext>(null!);

const AuthProvider: FC<IAuthProvider> = (props) => {
  // check if token exists in localstorage
  const [user, setUser] = useState<IUser>();

  if (false) {
    return <p>still loading</p>;
  }

  const login = async () => {
    const testUserUrl = "https://jsonplaceholder.typicode.com/users";
    try {
      const res = await fetch(testUserUrl);
      const data = await res.json();
      if (data) setUser(data[0]);
    } catch (error) {
      throw new Error("login error");
    }
  };

  const logout = () => {};

  return <AuthContext.Provider value={{ user, login, logout }} {...props} />;
};

const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
