import { useState, useContext, createContext, FunctionComponent, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../interface/User";
import { Reminder } from "../interface/Reminder";
import { AuthApiDataSuccess } from "../interface/AuthApiDataSuccess";
import logoutUser from "../helpers/logoutUser";

interface IAuthContext {
  loggedInUser: User | null | undefined;
  updateLoginContext: (data: AuthApiDataSuccess) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  loggedInUser: undefined,
  updateLoginContext: () => null,
  logout: () => null,
});

export const AuthProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [loggedInUser, setLoggedInUser] = useState<User | null | undefined>();
  const history = useHistory();

  const updateLoginContext = useCallback(
    (user) => {
      setLoggedInUser(user);
      history.push("/dashboard");
    },
    [history],
  );

  const logout = useCallback(async () => {
    // removes token
    await logoutUser()
      .then(() => {
        history.push("/login");
        setLoggedInUser(null);
      })
      .catch((error: Error) => console.error(error));
  }, [history]);

  // use our cookies to check if we can login straight away
  // useEffect(() => {
  //   const checkLoginWithCookies = async () => {
  //     await loginWithCookies().then((data: AuthApiData) => {
  //       if (data.success) {
  //         updateLoginContext(data.success);
  //         history.push("/dashboard");
  //       } else {
  //         // don"t need to provide error feedback as this just means user doesn"t have saved cookies or the cookies have not been authenticated on the backend
  //         setLoggedInUser(null);
  //         history.push("/login");
  //       }
  //     });
  //   };
  //   checkLoginWithCookies();
  // }, [updateLoginContext, history]);

  return (
    <AuthContext.Provider value={{ loggedInUser, updateLoginContext, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContext {
  return useContext(AuthContext);
}