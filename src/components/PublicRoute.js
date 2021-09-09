import React from "react";
import { Redirect, Route } from "react-router";
import { Alert } from "rsuite";
import { useProfile } from "../context/profile.context";

const PublicRoute = ({ children, ...routeProps }) => {
   const { isProfileLoaded } = useProfile();

   if (isProfileLoaded) {
      Alert.success("Login success", 1000);
      return <Redirect to="/" />;
   }
   return <Route {...routeProps}>{children}</Route>;
};

export default PublicRoute;
