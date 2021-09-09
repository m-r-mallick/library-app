import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "rsuite";
import AuthorList from "./AuthorList";

const AuthorsContext = createContext();

const AuthorsProvider = ({ profile }) => {
   const [authors, setAuthors] = useState(null);

   useEffect(() => {
      const getAuthors = async () => {
         const res = await fetch("http://localhost:9000/api/v1/authors/", {
            method: "GET",
            headers: {
               username: profile.user.username,
               password: profile.password,
            },
         });
         try {
            const data = await res.json();
            setAuthors(data);
         } catch (error) {
            Alert.error(error.message, 1000);
         }
      };
      getAuthors();
   }, [profile]);
   return (
      <AuthorsContext.Provider value={{ authors }}>
         <AuthorList />
      </AuthorsContext.Provider>
   );
};

export const useAuthors = () => useContext(AuthorsContext);

export default AuthorsProvider;
