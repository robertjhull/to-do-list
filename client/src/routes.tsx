import React, { useEffect, useState } from "react";
import { Route, Switch, withRouter, RouteComponentProps } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { User } from "./interface/User";

// interface Props {
//   user: User;
// }

// type RouteProps = Props & RouteComponentProps;

const Routes = (props: RouteComponentProps) => {
// const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     if (user.error) {
//       // check to make sure error is what we expect, in case we get an unexpected server error object
//       if (typeof user.error === "string") {
//         setErrorMessage(user.error);
//       } else {
//         setErrorMessage("Internal Server Error. Please try again");
//       }
//     }
//   }, [user.error]);

//   if (props.user.isFetchingUser) {
//     return <div>Loading...</div>;
//   }

  return (
    <Switch>
      <Route
        exact
        path="/login"
        component={Login}
      />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  );
};

export default withRouter(Routes);