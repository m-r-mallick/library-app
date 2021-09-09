import React from "react";
import { Redirect, Route } from "react-router";
import { useProfile } from "../context/profile.context";

const PrivateAdminRoute = ({ children, ...routeProps }) => {
   const { profile, isProfileLoaded } = useProfile();
   const isAdmin =
      profile.roles &&
      profile.roles.constructor === Array &&
      profile.roles.find((role) => role.role === "ADMIN");

   if (isProfileLoaded) {
      if (!isAdmin) {
         return (
            <div>
               <h1>Access Denied!</h1>
               <h3>Only users with admin privileges can access this page!</h3>
            </div>
         );
      }
   } else {
      return <Redirect to="/login" />;
   }
   return <Route {...routeProps}>{children}</Route>;
};

export default PrivateAdminRoute;
