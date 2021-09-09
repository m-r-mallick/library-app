import React from "react";
import { Redirect, Route } from "react-router";
import { useProfile } from "../context/profile.context";

const PrivateRoute = ({ children, ...routeProps }) => {
   const { isProfileLoaded } = useProfile();

   if (!isProfileLoaded) {
      return <Redirect to="/login" />;
   }

   return <Route {...routeProps}>{children}</Route>;
};

export default PrivateRoute;
