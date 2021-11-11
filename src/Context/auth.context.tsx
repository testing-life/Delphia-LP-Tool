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
};

interface IAuthProvider {
  children: ReactNode;
}

const AuthContext = createContext<AuthContext>(null!);

const AuthProvider: FC<IAuthProvider> = (props) => {
  const [state, setState] = useState<IUser | undefined>();
  const navigate = useNavigate();

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
  const login = async () => {
    const testUserUrl = "https://jsonplaceholder.typicode.com/users";
    try {
      const res = await fetch(testUserUrl);
      const data = await res.json();
      if (data) {
        setState(data[0]);
        localStorage.setItem("user", JSON.stringify(data[0]));
      }
    } catch (error) {
      throw new Error("login error");
    }
  };

  const logout = () => {
    localStorage.clear();
    setState(undefined);
    navigate("/", { replace: true });
  };

  return <AuthContext.Provider value={{ state, login, logout }} {...props} />;
};

const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
function useNAvigate() {
  throw new Error("Function not implemented.");
}
