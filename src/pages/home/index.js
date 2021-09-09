import React from "react";
import Navs from "../../components/Navs";
import { useProfile } from "../../context/profile.context";

const Home = () => {
   const { profile, dispatch } = useProfile();
   const onSignOut = () => {
      dispatch({ type: "LOGOUT_ATTEMPT" });
   };

   return (
      <div>
         <Navs profile={profile} onSignOut={onSignOut} />
         <h1 className="text-center">WELCOME</h1>
      </div>
   );
};

export default Home;
