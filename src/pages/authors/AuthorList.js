import React from "react";
import { Col, Row } from "rsuite";
import AuthorCard from "./AuthorCard";
import { useAuthors } from "./AuthorsProvider";

const AuthorList = () => {
   const { authors } = useAuthors();
   return (
      <Row>
         {authors &&
            authors.map((author) => {
               return (
                  <Col md={6} sm={12} key={author.id}>
                     <AuthorCard data={author} />
                  </Col>
               );
            })}
      </Row>
   );
};

export default AuthorList;
