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
  authError: Error | undefined;
};

interface IAuthProvider {
  children: ReactNode;
}

const AuthContext = createContext<AuthContext>(null!);

const AuthProvider: FC<IAuthProvider> = (props) => {
  // check if token exists in localstorage
  console.log(`props`, props);
  const [user, setUser] = useState<IUser>();
  const [authError, setAuthError] = useState<Error>();

  if (false) {
    return <p>still loading</p>;
  }

  const login = async (): Promise<void> => {
    if (authError) {
      setAuthError(undefined);
    }
    const testUserUrl = "httpsx://jsonplaceholder.typicode.com/users";
    try {
      const res = await fetch(testUserUrl);
      const data = await res.json();
      if (res.ok && data) {
        setUser(data[0]);
      }
    } catch (error) {
      setAuthError({ message: "Im an auth error" } as Error);
    }
  };

  const logout = () => {};

  return (
    <AuthContext.Provider
      value={{ authError, user, login, logout }}
      {...props}
    />
  );
};

const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
