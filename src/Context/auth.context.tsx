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
    const locallyStoredUser = await localStorage.getItem("user");
    if (locallyStoredUser) {
      const localUser = JSON.parse(locallyStoredUser);
      setState(localUser);
    }
  };

  // try {
  //   const res = await fetch(`${RequestUrl.BASE_URL}/auth/confirm_email`, {
  //     method: "POST",
  //     mode: "cors",
  //     body: JSON.stringify({
  //       email,
  //       password,
  //       token,
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   });
  //   if (res && !res.ok) {
  //     const data = await res.json();
  //     const message =
  //       data.length > 1
  //         ? data.reduce((acc: any, next: any) => {
  //             const msg = `${acc.message} ${next.message}`;
  //             return msg;
  //           })
  //         : data[0].message;

  //     throw Error(message);
  //   }
  //   if (res.ok) {
  //     setPassCreated(true);
  //   }
  // } catch (error) {
  //   console.warn(error);
  //   setError(error as Error);
  // }

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
        // localStorage.setItem("user", JSON.stringify(data[0]));
        // setState(data[0]);
      }
    } catch (error) {
      setAuthError(error as Error);
    }
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
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
