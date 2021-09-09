import React from "react";
import { Col, Row } from "rsuite";
import BookCard from "./BookCard";
import { useBooks } from "./BooksProvider";

const BookList = () => {
   const { books } = useBooks();
   return (
      <Row>
         {books &&
            books.map((book) => {
               return (
                  <Col md={6} sm={12} key={book.isbn}>
                     <BookCard data={book} />
                  </Col>
               );
            })}
      </Row>
   );
};

export default BookList;
