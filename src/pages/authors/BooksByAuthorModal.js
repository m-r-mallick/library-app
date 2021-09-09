import React from "react";
import { Button, Modal } from "rsuite";
import BookCard from "../books/BookCard";

const BooksByAuthorModal = ({ isOpen, close, booksByAuthor }) => {
   return (
      <Modal show={isOpen} onHide={close}>
         <Modal.Header>
            <Modal.Title>Books</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {booksByAuthor.map((book) => (
               <BookCard data={book} key={book.isbn} />
            ))}
         </Modal.Body>
         <Modal.Footer>
            <div className="d-inline-block">
               <Button color="red" onClick={close} className="m-2">
                  Close
               </Button>
            </div>
         </Modal.Footer>
      </Modal>
   );
};

export default BooksByAuthorModal;
