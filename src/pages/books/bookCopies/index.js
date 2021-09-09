import React from "react";
import { useParams } from "react-router";
import Navs from "../../../components/Navs";
import { useProfile } from "../../../context/profile.context";
import CopiesProvider from "./CopiesProvider";

const BookCopies = () => {
   const { isbn } = useParams();
   const { profile, dispatch } = useProfile();

   const onSignOut = () => {
      dispatch({ type: "LOGOUT_ATTEMPT" });
   };

   return (
      <div>
         <Navs profile={profile} onSignOut={onSignOut} />
         <h1 className="text-center">Copies</h1>
         <CopiesProvider isbn={isbn} profile={profile} />
      </div>
   );
};

export default BookCopies;
