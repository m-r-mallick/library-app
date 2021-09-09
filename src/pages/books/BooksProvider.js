import React, { createContext, useContext, useEffect, useState } from "react";
import BookList from "./BookList";

const BooksContext = createContext();
const BooksProvider = ({ profile }) => {
   const [books, setBooks] = useState(null);

   useEffect(() => {
      const getBooks = async () => {
         const res = await fetch("http://localhost:9000/api/v1/books/", {
            method: "GET",
            headers: {
               username: profile.user.username,
               password: profile.password,
            },
         });
         const jsonData = await res.json();
         setBooks(jsonData);
      };
      getBooks();
   }, [profile]);
   return (
      <BooksContext.Provider value={{ books }}>
         <BookList />
      </BooksContext.Provider>
   );
};

export const useBooks = () => useContext(BooksContext);

export default BooksProvider;
