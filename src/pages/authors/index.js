import React from "react";
import Navs from "../../components/Navs";
import { useProfile } from "../../context/profile.context";
import AuthorsProvider from "./AuthorsProvider";

const Authors = () => {
   const { profile, dispatch } = useProfile();
   const onSignOut = () => {
      dispatch({ type: "LOGOUT_ATTEMPT" });
   };
   return (
      <div>
         <Navs profile={profile} onSignOut={onSignOut} />
         <h1 className="text-center">Authors</h1>
         <AuthorsProvider profile={profile} onSignOut={onSignOut} />
      </div>
   );
};

export default Authors;
