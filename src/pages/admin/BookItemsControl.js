import React from "react";
import AdminNavBar from "../../components/AdminNavBar";
import { useProfile } from "../../context/profile.context";

const BookItemsControl = () => {
   const { profile, dispatch } = useProfile();
   const onSignOut = () => {
      dispatch({ type: "LOGOUT_ATTEMPT" });
   };
   return (
      <div>
         <AdminNavBar profile={profile} onSignOut={onSignOut} />
         <h1 className="text-center">Book Items Control</h1>
      </div>
   );
};

export default BookItemsControl;
