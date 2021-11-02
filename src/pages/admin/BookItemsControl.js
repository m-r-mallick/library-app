import React, { useEffect, useRef, useState } from "react";
import {
   Alert,
   Button,
   ControlLabel,
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
import { getAllBookItems, getAllBooks } from "../../misc/helpers";

const { NumberType } = Schema.Types;

const DEFAULT_STATE = {
   format: "Hardcover",
   isReferenceOnly: false,
   price: null,
   status: "Available",
   originalBook: {
      isbn: null,
   },
};

const model = Schema.Model({
   price: NumberType()
      .isRequired("Price is required")
      .min(1, "Cannot be less than INR 1"),
});

const FORMATS = [
   {
      type: "Hardcover",
   },
   {
      type: "Paperback",
   },
   {
      type: "Audiobook",
   },
   {
      type: "Ebook",
   },
   {
      type: "Newspaper",
   },
   {
      type: "Magazine",
   },
   {
      type: "Journal",
   },
];

const STATUS = [
   {
      type: "Available",
   },
   {
      type: "Reserved",
   },
   {
      type: "Loaned",
   },
   {
      type: "Lost",
   },
];

const REFERENCE_MODES = [
   {
      type: "false",
   },
   {
      type: "true",
   },
];
const AddNewBookItem = () => {
   const { isOpen, open, close } = useModalState();
   const { profile } = useProfile();
   const [books, setBooks] = useState([]);
   const [isBooksLoaded, setIsBooksLoaded] = useState(false);
   const [formValue, setFormValue] = useState(DEFAULT_STATE);
   const formRef = useRef();

   useEffect(() => {
      if (isBooksLoaded) {
         return;
      }
      if (!isBooksLoaded) {
         getAllBooks(profile.user.username, profile.password)
            .then((data) => setBooks(data))
            .catch(console.log(`Fetching original books...`));
         if (books.length > 0) {
            setIsBooksLoaded(true);
         }
      }
   }, [profile, isBooksLoaded, books]);

   const onFormChange = (value) => {
      setFormValue(value);
   };

   const onFormSubmit = async () => {
      if (formValue.price === null || formValue.originalBook === null) {
         Alert.error("Fields are void!", 2000);
         return;
      }

      const bookItemObj = {
         format: formValue.format,
         isReferenceOnly: formValue.isReferenceOnly,
         price: formValue.price,
         status: formValue.status,
         originalBook: {
            isbn: formValue.originalBook,
         },
      };

      const res = await fetch(`http://localhost:9000/api/v1/copies/addCopy`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            username: profile.user.username,
            password: profile.password,
         },
         body: JSON.stringify(bookItemObj),
      });
      console.log(`res`, res);
      if (res.status === 200) {
         Alert.success("Copy Added!", 2000);
      } else {
         Alert.error(`Error ${res.status}!`, 2000);
      }

      console.log(`bookItemObj`, bookItemObj);
   };
   return (
      <>
         <div className="text-center">
            <Button appearance="subtle" color="green" ripple onClick={open}>
               <Icon icon="plus" className="m-1" />
               Add New Copy
            </Button>
         </div>
         <Modal show={isOpen} onHide={close}>
            <Modal.Header>
               <Modal.Title>Copy</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form
                  ref={formRef}
                  formValue={formValue}
                  onChange={onFormChange}
                  fluid
                  model={model}
               >
                  <FormGroup>
                     <ControlLabel>Format</ControlLabel>
                     <FormControl
                        id="format"
                        name="format"
                        accepter={InputPicker}
                        data={FORMATS}
                        labelKey="type"
                        valueKey="type"
                     />
                  </FormGroup>
                  <FormGroup>
                     <ControlLabel>Is Reference Only?</ControlLabel>
                     <FormControl
                        id="isReferenceOnly"
                        name="isReferenceOnly"
                        accepter={InputPicker}
                        data={REFERENCE_MODES}
                        labelKey="type"
                        valueKey="type"
                     />
                  </FormGroup>
                  <FormGroup>
                     <ControlLabel>Price</ControlLabel>
                     <FormControl
                        id="price"
                        name="price"
                        accepter={InputNumber}
                     />
                  </FormGroup>
                  <FormGroup>
                     <ControlLabel>Status</ControlLabel>
                     <FormControl
                        id="status"
                        name="status"
                        accepter={InputPicker}
                        data={STATUS}
                        labelKey="type"
                        valueKey="type"
                     />
                  </FormGroup>
                  <FormGroup>
                     <ControlLabel>Original Book</ControlLabel>
                     <FormControl
                        id="originalBook"
                        name="originalBook"
                        accepter={InputPicker}
                        data={books}
                        labelKey="title"
                        valueKey="isbn"
                     />
                  </FormGroup>
                  <Button
                     appearance="primary"
                     ripple
                     style={{ float: "right" }}
                     className="m-2"
                     onClick={onFormSubmit}
                  >
                     Add
                  </Button>
               </Form>
            </Modal.Body>
            <Modal.Footer>
               <Button
                  block
                  appearance="subtle"
                  ripple
                  color="red"
                  onClick={close}
               >
                  Close
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

const UpdateBookItem = ({ barcode, bookItem }) => {
   const { isOpen, open, close } = useModalState();
   const { profile } = useProfile();
   const [updatedFormValue, setUpdatedFormValue] = useState({
      ...DEFAULT_STATE,
      price: bookItem.price,
   });
   const updateFormRef = useRef();
   const [books, setBooks] = useState([]);
   const [isBooksLoaded, setIsBooksLoaded] = useState(false);

   useEffect(() => {
      if (isBooksLoaded) {
         return;
      }
      if (!isBooksLoaded) {
         getAllBooks(profile.user.username, profile.password)
            .then((data) => setBooks(data))
            .catch(console.log(`Fetching original books...`));
         if (books.length > 0) {
            setIsBooksLoaded(true);
         }
      }
   }, [profile, isBooksLoaded, books]);

   const onUpdateFormChange = (value) => {
      setUpdatedFormValue(value);
   };

   const onUpdateFormSubmit = async () => {
      if (
         updatedFormValue.price === null ||
         updatedFormValue.originalBook === null
      ) {
         Alert.error("Fields are void!", 2000);
         return;
      }

      const updatedBookItemObj = {
         format: updatedFormValue.format,
         isReferenceOnly: updatedFormValue.isReferenceOnly,
         price: updatedFormValue.price,
         status: updatedFormValue.status,
         originalBook: {
            isbn: updatedFormValue.originalBook,
         },
      };

      const res = await fetch(
         `http://localhost:9000/api/v1/copies/edit/${barcode}`,
         {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               username: profile.user.username,
               password: profile.password,
            },
            body: JSON.stringify(updatedBookItemObj),
         }
      );
      console.log(`res`, res);
      if (res.status === 200) {
         Alert.success("Copy Updated!", 2000);
      } else {
         Alert.error(`Error ${res.status}!`, 2000);
      }
   };

   return (
      <React.Fragment>
         <Icon
            className="btn btn-secondary btn-sm m-2 rs-btn-subtle"
            icon="pencil"
            onClick={open}
         />
         <Modal show={isOpen} onHide={close}>
            <Modal.Header>
               <Modal.Title>Copy</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form
                  ref={updateFormRef}
                  formValue={updatedFormValue}
                  onChange={onUpdateFormChange}
                  fluid
                  model={model}
               >
                  <FormGroup>
                     <ControlLabel>Format</ControlLabel>
                     <FormControl
                        id="format"
                        name="format"
                        accepter={InputPicker}
                        data={FORMATS}
                        labelKey="type"
                        valueKey="type"
                     />
                  </FormGroup>
                  <FormGroup>
                     <ControlLabel>Is Reference Only?</ControlLabel>
                     <FormControl
                        id="isReferenceOnly"
                        name="isReferenceOnly"
                        accepter={InputPicker}
                        data={REFERENCE_MODES}
                        labelKey="type"
                        valueKey="type"
                     />
                  </FormGroup>
                  <FormGroup>
                     <ControlLabel>Price</ControlLabel>
                     <FormControl
                        id="price"
                        name="price"
                        accepter={InputNumber}
                     />
                  </FormGroup>
                  <FormGroup>
                     <ControlLabel>Status</ControlLabel>
                     <FormControl
                        id="status"
                        name="status"
                        accepter={InputPicker}
                        data={STATUS}
                        labelKey="type"
                        valueKey="type"
                     />
                  </FormGroup>
                  <FormGroup>
                     <ControlLabel>Original Book</ControlLabel>
                     <FormControl
                        id="originalBook"
                        name="originalBook"
                        accepter={InputPicker}
                        data={books}
                        labelKey="title"
                        valueKey="isbn"
                     />
                  </FormGroup>
                  <Button
                     appearance="primary"
                     ripple
                     style={{ float: "right" }}
                     className="m-2"
                     onClick={onUpdateFormSubmit}
                  >
                     Add
                  </Button>
               </Form>
            </Modal.Body>
            <Modal.Footer>
               <Button
                  block
                  appearance="subtle"
                  ripple
                  color="red"
                  onClick={close}
               >
                  Close
               </Button>
            </Modal.Footer>
         </Modal>
      </React.Fragment>
   );
};

const DeleteBookItem = ({ barcode }) => {
   const { profile } = useProfile();

   const onClickDelete = async () => {
      const confirm = window.confirm(`Delete copy ${barcode}?`);

      if (!confirm) {
         return;
      }

      const res = await fetch(
         `http://localhost:9000/api/v1/copies/delete/${barcode}`,
         {
            method: "DELETE",
            headers: {
               username: profile.user.username,
               password: profile.password,
            },
         }
      );
      if (res.status === 200) {
         Alert.success("Book Item Deleted!", 2000);
      } else {
         Alert.error(`Error ${res.status}!`);
      }
   };
   return (
      <React.Fragment>
         <Icon
            className="btn btn-danger btn-sm m-2"
            icon="trash2"
            onClick={onClickDelete}
         />
      </React.Fragment>
   );
};

const BookItemsDisplay = ({ bookItems }) => {
   return (
      <React.Fragment>
         <table className="table table-hover tbale-bordered text-center mt-2">
            <thead>
               <tr key={"header"}>
                  {Object.keys(bookItems[0]).map((key, index) => (
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
               {bookItems.map((item) => (
                  <tr key={item.barcode}>
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
                                 {val === false ? (
                                    <span style={{ color: "green" }}>No</span>
                                 ) : val === "Available" ? (
                                    <span
                                       style={{
                                          color: "green",
                                          fontWeight: "bold",
                                       }}
                                    >
                                       {val}
                                    </span>
                                 ) : val === "Reserved" ||
                                   val === "Loaned" ||
                                   val === "Lost" ? (
                                    <span
                                       style={{
                                          color: "red",
                                          fontWeight: "bold",
                                       }}
                                    >
                                       {val}
                                    </span>
                                 ) : (
                                    val || "N/A"
                                 )}
                                 {val === true && (
                                    <span style={{ color: "red" }}>Yes</span>
                                 )}
                              </td>
                           );
                        }
                     })}
                     <div>
                        <UpdateBookItem
                           barcode={item.barcode}
                           bookItem={item}
                        />
                        <DeleteBookItem
                           barcode={item.barcode}
                           bookItem={item}
                        />
                     </div>
                  </tr>
               ))}
            </tbody>
         </table>
      </React.Fragment>
   );
};

const BookItemsControl = () => {
   const { profile, dispatch } = useProfile();
   const [bookItems, setBookItems] = useState([]);

   useEffect(() => {
      getAllBookItems(profile.user.username, profile.password)
         .then((data) => setBookItems(data))
         .catch("fetching book items...");
   }, [profile]);

   const onSignOut = () => {
      dispatch({ type: "LOGOUT_ATTEMPT" });
   };

   return (
      <div>
         <AdminNavBar profile={profile} onSignOut={onSignOut} />
         <h1 className="text-center">
            Book Items Control
            {profile.user && (
               <div className="m-2" style={{ float: "right" }}>
                  <AddNewBookItem />
               </div>
            )}
         </h1>
         {bookItems.length > 0 ? (
            <BookItemsDisplay bookItems={bookItems} />
         ) : (
            <>
               <h3 className="text-center">No Books Present, Add One?</h3>
               <Loader speed="slow" vertical center />
            </>
         )}
      </div>
   );
};

export default BookItemsControl;
