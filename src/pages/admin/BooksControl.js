import React, { useEffect, useRef, useState } from "react";
import {
   Alert,
   Button,
   ControlLabel,
   DatePicker,
   Form,
   FormControl,
   FormGroup,
   Icon,
   InputNumber,
   InputPicker,
   Loader,
   Modal,
   Schema,
} from "rsuite";
import AdminNavBar from "../../components/AdminNavBar";
import { useProfile } from "../../context/profile.context";
import { useModalState } from "../../misc/custom-hooks";
import { formatDate, getAllAuthors, getAllBooks } from "../../misc/helpers";

const { StringType, NumberType, DateType } = Schema.Types;

const DEFAULT_STATE = {
   title: "",
   subject: "",
   publisher: "",
   numberOfPages: null,
   language: "",
   publicationDate: null,
   author: {
      id: null,
   },
};

const model = Schema.Model({
   title: StringType().isRequired("Book title is required"),
   subject: StringType().isRequired("Book subject is required"),
   publisher: StringType().isRequired("Book publisher is required"),
   numberOfPages: NumberType()
      .isRequired("Number of pages cannot be empty")
      .isInteger("Input must be an integer")
      .min(1, "Input cannot be less than 1"),
   publicationDate: DateType().max(
      new Date(),
      `Date cannot exceed ${new Date()}`
   ),
});

const AddNewBook = () => {
   const { profile } = useProfile();
   const { isOpen, open, close } = useModalState();
   const formRef = useRef();
   const [formValue, setFormValue] = useState(DEFAULT_STATE);
   const [authors, setAuthors] = useState([]);
   const [loadedAuthors, setLoadedAuthors] = useState(false);

   useEffect(() => {
      if (loadedAuthors) {
         return;
      }
      if (!loadedAuthors) {
         getAllAuthors(profile.user.username, profile.password)
            .then((data) => setAuthors(data))
            .catch("fetching authors inside books control...");
         if (authors.length > 0) {
            setLoadedAuthors(true);
         }
      }
   }, [profile, loadedAuthors, authors]);

   const onFormChange = (value) => {
      setFormValue(value);
   };

   const onFormSubmit = async () => {
      if (
         formValue.title.trim() === "" ||
         formValue.subject.trim() === "" ||
         formValue.language.trim() === "" ||
         formValue.numberOfPages === null ||
         formValue.publisher.trim() === "" ||
         formValue.author === null
      ) {
         Alert.error("Empty Fields!", 2000);
         return;
      }

      const bookObj = {
         title: formValue.title.trim(),
         subject: formValue.subject.trim(),
         language: formValue.language.trim(),
         numberOfPages: formValue.numberOfPages,
         publisher: formValue.publisher.trim(),
         publicationDate: formValue.publicationDate
            ? formatDate(formValue.publicationDate)
            : null,
         author: {
            id: formValue.author,
         },
      };

      const res = await fetch(`http://localhost:9000/api/v1/books/addBook`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            username: profile.user.username,
            password: profile.password,
         },
         body: JSON.stringify(bookObj),
      });
      if (res.status === 200) {
         Alert.success("Bood Added!", 2000);
      } else {
         Alert.error(`Error ${res.status}!`, 2000);
      }
   };

   return (
      <React.Fragment>
         <div className="text-center">
            <Button
               appearance="subtle"
               onClick={open}
               color="green"
               className="text-center"
            >
               <Icon icon="plus" className="m-1" />
               Add New Book
            </Button>
         </div>
         <Modal show={isOpen} onHide={close}>
            <Modal.Header>
               <Modal.Title>Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form
                  model={model}
                  onChange={onFormChange}
                  ref={formRef}
                  formValue={formValue}
                  fluid
               >
                  <FormGroup>
                     <ControlLabel>Title</ControlLabel>
                     <FormControl id="title" name="title" />
                  </FormGroup>
                  <FormGroup>
                     <ControlLabel>Author</ControlLabel>
                     <FormControl
                        id="author"
                        name="author"
                        accepter={InputPicker}
                        data={authors}
                        labelKey="name"
                        valueKey="id"
                     />
                  </FormGroup>
                  <FormGroup>
                     <ControlLabel>Subject</ControlLabel>
                     <FormControl id="subject" name="subject" />
                  </FormGroup>
                  <FormGroup>
                     <ControlLabel>Language</ControlLabel>
                     <FormControl id="language" name="language" />
                  </FormGroup>
                  <FormGroup>
                     <ControlLabel>Number Of Pages</ControlLabel>
                     <FormControl
                        id="numberOfPages"
                        name="numberOfPages"
                        accepter={InputNumber}
                     />
                  </FormGroup>
                  <FormGroup>
                     <ControlLabel>Publisher</ControlLabel>
                     <FormControl id="publisher" name="publisher" />
                  </FormGroup>
                  <FormGroup>
                     <ControlLabel>Publication Date</ControlLabel>
                     <FormControl
                        id="publicationDate"
                        name="publicationDate"
                        accepter={DatePicker}
                     />
                  </FormGroup>
                  <Button
                     appearance="primary"
                     onClick={onFormSubmit}
                     style={{ float: "right" }}
                  >
                     Add
                  </Button>
               </Form>
            </Modal.Body>
            <Modal.Footer>
               <Button
                  appearance="primary"
                  block
                  ripple
                  color="red"
                  onClick={close}
                  className="m-1"
               >
                  Close
               </Button>
            </Modal.Footer>
         </Modal>
      </React.Fragment>
   );
};

const UpdateBook = ({ isbn, book }) => {
   const { profile } = useProfile();
   const { isOpen, open, close } = useModalState();
   const [updatedFormValue, setUpdatedFormValue] = useState({
      language: book.language,
      numberOfPages: book.numberOfPages,
      publicationDate: null,
      publisher: book.publisher,
      subject: book.subject,
      title: book.title,
      author: null,
   });
   const updateFormRef = useRef();
   const [authors, setAuthors] = useState([]);
   const [loadedAuthors, setLoadedAuthors] = useState(false);

   useEffect(() => {
      if (loadedAuthors) {
         return;
      }
      if (!loadedAuthors) {
         getAllAuthors(profile.user.username, profile.password)
            .then((data) => setAuthors(data))
            .catch("fetching authors inside books control...");
         if (authors.length > 0) {
            setLoadedAuthors(true);
         }
      }
   }, [profile, loadedAuthors, authors]);

   const onUpdateFormChange = (value) => {
      setUpdatedFormValue(value);
   };

   const onUpdateFormSubmit = async () => {
      if (
         updatedFormValue.title.trim() === "" ||
         updatedFormValue.subject.trim() === "" ||
         updatedFormValue.language.trim() === "" ||
         updatedFormValue.numberOfPages === null ||
         updatedFormValue.publisher.trim() === "" ||
         updatedFormValue.author === null
      ) {
         Alert.error("Empty Fields!", 2000);
         return;
      }

      const updatedBookObj = {
         title: updatedFormValue.title.trim(),
         subject: updatedFormValue.subject.trim(),
         language: updatedFormValue.language.trim(),
         numberOfPages: updatedFormValue.numberOfPages,
         publisher: updatedFormValue.publisher.trim(),
         publicationDate: updatedFormValue.publicationDate
            ? formatDate(updatedFormValue.publicationDate)
            : null,
         author: {
            id: updatedFormValue.author,
         },
      };

      const res = await fetch(
         `http://localhost:9000/api/v1/books/edit/${isbn}`,
         {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               username: profile.user.username,
               password: profile.password,
            },
            body: JSON.stringify(updatedBookObj),
         }
      );
      if (res.status === 200) {
         Alert.success("Book Record Updated!", 2000);
      } else {
         Alert.error(`Error ${res.status}!`, 2000);
      }
   };

   return (
      <>
         <Icon
            icon="pencil"
            className="btn btn-secondary btn-sm m-2 rs-btn-subtle"
            onClick={open}
         />
         <Modal show={isOpen} onHide={close}>
            <Modal.Header>
               <Modal.Title>Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form
                  model={model}
                  onChange={onUpdateFormChange}
                  ref={updateFormRef}
                  formValue={updatedFormValue}
                  fluid
               >
                  <FormGroup>
                     <ControlLabel>Title</ControlLabel>
                     <FormControl id="title" name="title" />
                  </FormGroup>
                  <FormGroup>
                     <ControlLabel>Author</ControlLabel>
                     <FormControl
                        id="author"
                        name="author"
                        accepter={InputPicker}
                        data={authors}
                        labelKey="name"
                        valueKey="id"
                     />
                  </FormGroup>
                  <FormGroup>
                     <ControlLabel>Subject</ControlLabel>
                     <FormControl id="subject" name="subject" />
                  </FormGroup>
                  <FormGroup>
                     <ControlLabel>Language</ControlLabel>
                     <FormControl id="language" name="language" />
                  </FormGroup>
                  <FormGroup>
                     <ControlLabel>Number Of Pages</ControlLabel>
                     <FormControl
                        id="numberOfPages"
                        name="numberOfPages"
                        accepter={InputNumber}
                     />
                  </FormGroup>
                  <FormGroup>
                     <ControlLabel>Publisher</ControlLabel>
                     <FormControl id="publisher" name="publisher" />
                  </FormGroup>
                  <FormGroup>
                     <ControlLabel>Publication Date</ControlLabel>
                     <FormControl
                        id="publicationDate"
                        name="publicationDate"
                        accepter={DatePicker}
                     />
                  </FormGroup>
                  <Button
                     appearance="primary"
                     onClick={onUpdateFormSubmit}
                     style={{ float: "right" }}
                  >
                     Update
                  </Button>
               </Form>
            </Modal.Body>
            <Modal.Footer>
               <Button
                  appearance="primary"
                  block
                  ripple
                  color="red"
                  onClick={close}
                  className="m-1"
               >
                  Close
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

const DeleteBook = ({ isbn, book }) => {
   const { profile } = useProfile();

   const onClickDelete = async () => {
      const confirm = window.confirm(`Delete ${book.title}?`);

      if (!confirm) {
         return;
      }

      const res = await fetch(
         `http://localhost:9000/api/v1/books/delete/${isbn}`,
         {
            method: "DELETE",
            headers: {
               username: profile.user.username,
               password: profile.password,
            },
         }
      );
      if (res.status === 200) {
         Alert.success("Book Record Deleted!", 2000);
      } else {
         Alert.error(`Error ${res.status}!`, 2000);
      }
   };

   return (
      <Icon
         icon="trash2"
         className="btn btn-danger btn-sm m-2"
         onClick={onClickDelete}
      />
   );
};

const BooksDisplay = ({ books }) => {
   return (
      <>
         <table className="table table-hover text-center mt-2">
            <thead>
               <tr key={"header"}>
                  {Object.keys(books[0]).map((key, index) => (
                     <th
                        key={index}
                        scope="col"
                        style={{ fontFamily: "sans-serif", fontSize: "17px" }}
                     >
                        {key.toUpperCase()}
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody>
               {books.map((item) => (
                  <tr key={item.isbn}>
                     {Object.values(item).map((val) => {
                        if (Array.isArray(val)) {
                           return (
                              <td>
                                 <b
                                    style={{
                                       fontFamily: "monospace",
                                       fontWeight: "bold",
                                       color:
                                          val.length === 0 ? "red" : "black",
                                    }}
                                 >
                                    {val.length}
                                 </b>
                              </td>
                           );
                        } else {
                           return (
                              <td style={{ fontFamily: "monospace" }}>
                                 {val || "N/A"}
                              </td>
                           );
                        }
                     })}
                     <div>
                        <UpdateBook isbn={item.isbn} book={item} />
                        <DeleteBook isbn={item.isbn} book={item} />
                     </div>
                  </tr>
               ))}
            </tbody>
         </table>
      </>
   );
};

const BooksControl = () => {
   const { profile, dispatch } = useProfile();
   const [books, setBooks] = useState([]);
   const onSignOut = () => {
      dispatch({ type: "LOGOUT_ATTEMPT" });
   };

   useEffect(() => {
      getAllBooks(profile.user.username, profile.password)
         .then((data) => setBooks(data))
         .catch(console.log(`fetching books list...`));
   }, [profile]);

   return (
      <div>
         <AdminNavBar profile={profile} onSignOut={onSignOut} />
         <h1 className="text-center">
            Books Control
            <div style={{ float: "right" }} className="m-2">
               {profile.user && <AddNewBook />}
            </div>
         </h1>
         {books.length > 0 ? (
            <BooksDisplay books={books} />
         ) : (
            <>
               <h3 className="text-center">No Books Present, Add One?</h3>
               <Loader speed="slow" vertical center />
            </>
         )}
      </div>
   );
};

export default BooksControl;
