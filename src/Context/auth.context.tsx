import React, {
  FC,
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { RequestUrl } from "../Consts/requestUrls";
import { IUser } from "./user.context";
import jwt_decode from "jwt-decode";

export type AuthContext = {
  login: ({ email, password }: any) => void;
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
    const token = await localStorage.getItem("token");
    if (token) {
      const needsToLogOut = await isExpired(token);
      if (needsToLogOut) {
        logout();
      } else {
        const localUser = JSON.parse(token as string);
        setState(localUser);
      }
    }
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> => {
    if (authError) {
      setAuthError(undefined);
    }
    try {
      const res = await fetch(`${RequestUrl.BASE_URL}/auth/login`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (res && !res.ok) {
        const data = await res.json();
        const message =
          data.length > 1
            ? data.reduce((acc: any, next: any) => {
              const msg = `${acc.message} ${next.message}`;
              return msg;
            })
            : data[0].message;

        throw Error(message);
      }
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", JSON.stringify(data));
        setState(data);
      }
    } catch (error) {
      setAuthError(error as Error);
    }
  };

  const isExpired = async (token: any): Promise<boolean> => {
    const decoded: { [key: string]: string | number } = jwt_decode(
      token as string
    );
    const currentDate = new Date();
    return (decoded!.exp as number) * 1000 < currentDate.getTime();
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setState(undefined);
    navigate("/login", { replace: true });
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
