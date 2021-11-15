import React, {
  FC,
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "./user.context";

export type AuthContext = {
  login: () => void;
  logout: () => void;
  state: IUser | undefined;
  authError: Error | undefined;
};

interface IAuthProvider {
  children: ReactNode;
}

const AuthContext = createContext<AuthContext>(null!);

const AuthProvider: FC<IAuthProvider> = (props) => {
  const [state, setState] = useState<IUser | undefined>();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<Error>();

  useEffect(() => {
    getLocalUser();
  }, []);

  const getLocalUser = async () => {
    const locallyStoredUser = await localStorage.getItem("user");
    if (locallyStoredUser) {
      const localUser = JSON.parse(locallyStoredUser);
      setState(localUser);
    }
  };

  const login = async (): Promise<void> => {
    if (authError) {
      setAuthError(undefined);
    }

    const testUserUrl = "https://jsonplaceholder.typicode.com/users";
    try {
      const res = await fetch(testUserUrl);
      const data = await res.json();
      if (res.ok && data) {
        setState(data[0]);
        localStorage.setItem("user", JSON.stringify(data[0]));
      }
    } catch (error) {
      setAuthError({ message: "Im an auth error" } as Error);
    }
  };

  const logout = () => {
    localStorage.clear();
    setState(undefined);
    navigate("/", { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{ authError, state, login, logout }}
      {...props}
    />
  );
};

const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
