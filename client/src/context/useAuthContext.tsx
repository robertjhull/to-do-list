import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { User } from '../interface/User';
import { Reminder } from '../interface/Reminder';

interface IAuthContext {
  user: User;
  reminders: Reminder[];
}

export const AuthContext = createContext<IAuthContext>({
  user: {} as User,
  reminders: [{} as Reminder],
});

export const AuthProvider: FunctionComponent = ({ children }): JSX.Element => {
  // default undefined before loading, once loaded provide user or null if logged out
  const [loggedInUser, setLoggedInUser] = useState<User | null | undefined>();
  const history = useHistory();

  const reminders = [
    { id: "id1", title: "Do laundry", date: new Date(), completed: false, priority: 1 },
    { id: "id2", title: "Buy groceries", date: new Date(), completed: false, priority: 2 },
    { id: "id4", title: "Finish programming project", date: new Date(), completed: false, priority: 3 },
    { id: "id3", title: "Pay rent", date: new Date(), completed: true, priority: 0 }
  ];

  const user = { id: "01", username: "Robert" };


  // const logout = useCallback(async () => {
  //   // needed to remove token cookie
  //   await logoutAPI()
  //     .then(() => {
  //       history.push('/login');
  //       setLoggedInUser(null);
  //     })
  //     .catch((error) => console.error(error));
  // }, [history]);

  // use our cookies to check if we can login straight away
  // useEffect(() => {
  //   const checkLoginWithCookies = async () => {
  //     await loginWithCookies().then((data: AuthApiData) => {
  //       if (data.success) {
  //         updateLoginContext(data.success);
  //         history.push('/dashboard');
  //       } else {
  //         // don't need to provide error feedback as this just means user doesn't have saved cookies or the cookies have not been authenticated on the backend
  //         setLoggedInUser(null);
  //         history.push('/login');
  //       }
  //     });
  //   };
  //   checkLoginWithCookies();
  // }, [updateLoginContext, history]);

  return (
    <AuthContext.Provider value={{ user, reminders }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContext {
  return useContext(AuthContext);
}