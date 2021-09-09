import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "rsuite";
import CopiesList from "./CopiesList";

const CopiesContext = createContext();

const CopiesProvider = ({ isbn, profile }) => {
   const [copies, setCopies] = useState(null);

   useEffect(() => {
      const getCopies = async () => {
         const res = await fetch(
            `http://localhost:9000/api/v1/copies/book/${isbn}`,
            {
               method: "GET",
               headers: {
                  username: profile.user.username,
                  password: profile.password,
               },
            }
         );
         try {
            const data = await res.json();
            setCopies(data);
         } catch (error) {
            Alert.error(error.message, 1000);
         }
      };
      getCopies();
   }, [isbn, profile]);
   return (
      <CopiesContext.Provider value={{ copies }}>
         <CopiesList />
      </CopiesContext.Provider>
   );
};

export const useCopies = () => useContext(CopiesContext);

export default CopiesProvider;
