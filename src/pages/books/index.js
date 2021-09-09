import React from "react";
import Navs from "../../components/Navs";
import { useProfile } from "../../context/profile.context";
import BooksProvider from "./BooksProvider";

const Books = () => {
   const { profile, dispatch } = useProfile();
   const onSignOut = () => {
      dispatch({ type: "LOGOUT_ATTEMPT" });
   };
   return (
      <div>
         <Navs profile={profile} onSignOut={onSignOut} />
         <h1 className="text-center">Books</h1>
         <BooksProvider profile={profile} />
      </div>
   );
};

export default Books;
