import React, { useEffect, useRef, useState } from "react";
import {
   Alert,
   Button,
   ControlLabel,
   Form,
   FormControl,
   FormGroup,
   Icon,
   Loader,
   Modal,
   Schema,
} from "rsuite";
import AdminNavBar from "../../components/AdminNavBar";
import { useProfile } from "../../context/profile.context";
import { useModalState } from "../../misc/custom-hooks";
import { getAllAuthors } from "../../misc/helpers";

const DEFAULT_STATE = {
   name: "",
   description: "",
};
const { StringType } = Schema.Types;
const model = Schema.Model({
   name: StringType().isRequired("Name is required"),
   description: StringType().isRequired("Description is required"),
});

const AuthorsDisplay = ({ authors }) => {
   const tabularView = (
      <>
         <table className="table table-hover text-center mt-2">
            <thead>
               <tr key={"header"}>
                  {Object.keys(authors[0]).map((key, index) => (
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
               {authors.map((item) => (
                  <tr key={item.id}>
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
                              <td style={{ fontFamily: "monospace" }}>{val}</td>
                           );
                        }
                     })}
                     <td>
                        <div>
                           <UpdateAuthor id={item.id} author={item} />
                           <DeleteAuthor id={item.id} author={item} />
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </>
   );
   return tabularView;
};

const AddNewAuthor = ({ profile }) => {
   const { isOpen, open, close } = useModalState();
   const formRef = useRef();
   const [formValue, setFormValue] = useState(DEFAULT_STATE);

   const onFormChange = (value) => {
      setFormValue(value);
   };
   const onFormSubmit = async () => {
      if (formValue.name.trim() === "" || formValue.description.trim() === "") {
         Alert.error("Empty Fields!", 2000);
         return;
      }
      formValue["name"] = formValue.name.trim();
      formValue["description"] = formValue.description.trim();
      const res = await fetch(
         `http://localhost:9000/api/v1/authors/addAuthor`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               username: profile.user.username,
               password: profile.password,
            },
            body: JSON.stringify(formValue),
         }
      );
      if (res.status === 200) {
         Alert.success("Author Record Added!", 2000);
      } else {
         Alert.error(`Error ${res.status}`, 2000);
      }
   };
   return (
      <>
         <div className="text-center">
            <Button
               onClick={open}
               appearance="subtle"
               color="green"
               className="text-center"
            >
               <Icon icon="plus" className="m-1" />
               Add New Author
            </Button>
         </div>
         <Modal show={isOpen} onHide={close}>
            <Modal.Header>
               <Modal.Title>Author</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form
                  ref={formRef}
                  onChange={onFormChange}
                  formValue={formValue}
                  model={model}
               >
                  <FormGroup className="mb-3">
                     <ControlLabel>Name</ControlLabel>
                     <FormControl id="name" name="name" />
                  </FormGroup>
                  <FormGroup>
                     <ControlLabel>Description</ControlLabel>
                     <FormControl id="description" name="description" />
                  </FormGroup>

                  <Button appearance="primary" onClick={onFormSubmit}>
                     Add
                  </Button>
               </Form>
            </Modal.Body>
            <Modal.Footer>
               <Button
                  onClick={close}
                  appearance="block"
                  ripple
                  className="btn btn-danger m-1"
               >
                  Close
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

const UpdateAuthor = ({ id, author }) => {
   const { isOpen, open, close } = useModalState();
   const { profile } = useProfile();
   const formRef = useRef();
   const [updatedFormValue, setUpdatedFormValue] = useState({
      name: author.name,
      description: author.description,
   });

   const onFormChange = (value) => {
      setUpdatedFormValue(value);
   };

   const onClickUpdate = async () => {
      if (
         updatedFormValue.name.trim() === "" ||
         updatedFormValue.description.trim() === ""
      ) {
         Alert.error("Empty Fields!", 2000);
         return;
      }
      updatedFormValue["name"] = updatedFormValue.name.trim();
      updatedFormValue["description"] = updatedFormValue.description.trim();

      const res = await fetch(
         `http://localhost:9000/api/v1/authors/update/${id}`,
         {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               username: profile.user.username,
               password: profile.password,
            },
            body: JSON.stringify(updatedFormValue),
         }
      );
      if (res.status === 200) {
         Alert.success("Author Record Updated!", 2000);
      } else {
         Alert.error(`Error ${res.status}`, 2000);
      }
   };
   return (
      <>
         <Icon
            icon="pencil"
            className="btn btn-secondary btn-sm m-2 rs-btn-subtle"
            onClick={() => {
               open();
               onClickUpdate();
            }}
         />
         <Modal show={isOpen} onHide={close}>
            <Modal.Header>
               <Modal.Title>Author</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form
                  ref={formRef}
                  onChange={onFormChange}
                  formValue={updatedFormValue}
                  model={model}
               >
                  <FormGroup className="mb-3">
                     <ControlLabel>Name</ControlLabel>
                     <FormControl id="name" name="name" />
                  </FormGroup>
                  <FormGroup>
                     <ControlLabel>Description</ControlLabel>
                     <FormControl id="description" name="description" />
                  </FormGroup>

                  <Button appearance="primary" onClick={onClickUpdate}>
                     Update
                  </Button>
               </Form>
            </Modal.Body>
            <Modal.Footer>
               <Button
                  onClick={close}
                  appearance="block"
                  ripple
                  className="btn btn-danger m-1"
               >
                  Close
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

const DeleteAuthor = ({ id, author }) => {
   const { profile } = useProfile();
   const onClickDelete = async () => {
      const confirm = window.confirm("Confirm Delete?");

      if (!confirm) {
         return;
      }
      if (confirm) {
         const res = await fetch(
            `http://localhost:9000/api/v1/authors/delete/${id}`,
            {
               method: "DELETE",
               headers: {
                  username: profile.user.username,
                  password: profile.password,
               },
            }
         );
         if (res.status === 200) {
            Alert.success("Author Record Deleted!", 2000);
         } else {
            Alert.error(`Error ${res.status}!`, 2000);
         }
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

const AuthorsControl = () => {
   const { profile, dispatch } = useProfile();
   const [authors, setAuthors] = useState([]);
   const onSignOut = () => {
      dispatch({ type: "LOGOUT_ATTEMPT" });
   };
   useEffect(() => {
      getAllAuthors(profile.user.username, profile.password)
         .then((data) => setAuthors(data))
         .catch(console.log(`fetching authors list...`));
   }, [profile]);
   if (!profile.user) {
      return;
   }
   return (
      <div>
         <AdminNavBar profile={profile} onSignOut={onSignOut} />
         <h1 className="text-center">
            Authors Control{" "}
            <div style={{ float: "right" }}>
               {profile.user && <AddNewAuthor profile={profile} />}
            </div>
         </h1>
         {authors.length > 0 ? (
            <AuthorsDisplay authors={authors} />
         ) : (
            <>
               <h3 className="text-center">No Authors Present, Add One?</h3>
               <Loader speed="slow" vertical center />
            </>
         )}
      </div>
   );
};

export default AuthorsControl;
