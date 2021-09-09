import React from "react";
import AdminNavBar from "../../components/AdminNavBar";
import { useProfile } from "../../context/profile.context";

const AdminHomePage = () => {
   const { profile, dispatch } = useProfile();
   const onSignOut = () => {
      dispatch({ type: "LOGOUT_ATTEMPT" });
   };
   return (
      <div>
         <AdminNavBar profile={profile} onSignOut={onSignOut} />
         <h1 className="text-center">Admin Home Page</h1>
      </div>
   );
};

export default AdminHomePage;
