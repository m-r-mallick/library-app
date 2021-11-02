import React, { useEffect, useRef, useState } from "react";
import {
   Alert,
   Button,
   ButtonGroup,
   ControlLabel,
   Form,
   FormControl,
   FormGroup,
   Icon,
   InputPicker,
   Modal,
   Schema,
   Tag,
} from "rsuite";
import AdminNavBar from "../../components/AdminNavBar";
import { useProfile } from "../../context/profile.context";
import { useModalState } from "../../misc/custom-hooks";
import {
   getAllRoles,
   getAllUsers,
   getRoleById,
   getRoles,
} from "../../misc/helpers";

const DEFAULT_STATE = {
   username: "",
   password: "",
   confirmPassword: "",
};

const { StringType } = Schema.Types;

const model = Schema.Model({
   username: StringType().isRequired("Username is required"),
   password: StringType().isRequired("Password is required"),
   confirmPassword: StringType().isRequired("Password is required"),
});

const CloseAccount = ({ userId }) => {
   const { profile } = useProfile();
   const onCloseAccount = async () => {
      const confirm = window.confirm(`Confirm Close Account?`);
      if (!confirm) {
         return;
      }
      const res = await fetch(
         `http://localhost:9000/management/api/v1/accounts/close/${userId}`,
         {
            method: "GET",
            headers: {
               username: profile.user.username,
               password: profile.password,
            },
         }
      );
      if (res.status === 200) {
         Alert.success("Account closed!", 2000);
         return;
      } else {
         Alert.error("Something went wrong!", 2000);
         return;
      }
   };

   return <Button onClick={onCloseAccount}>Close</Button>;
};

const CancelAccount = ({ userId }) => {
   const { profile } = useProfile();
   const onCancelAccount = async () => {
      const confirm = window.confirm(`Confirm Cancel Account?`);
      if (!confirm) {
         return;
      }
      const res = await fetch(
         `http://localhost:9000/management/api/v1/accounts/cancel/${userId}`,
         {
            method: "GET",
            headers: {
               username: profile.user.username,
               password: profile.password,
            },
         }
      );
      if (res.status === 200) {
         Alert.success("Account cancelled!", 2000);
         return;
      } else {
         Alert.error("Something went wrong!", 2000);
         return;
      }
   };
   return <Button onClick={onCancelAccount}>Cancel</Button>;
};

const BlacklistAccount = ({ userId }) => {
   const { profile } = useProfile();
   const onBlacklistAccount = async () => {
      const confirm = window.confirm(`Confirm Blacklist Account?`);
      if (!confirm) {
         return;
      }
      const res = await fetch(
         `http://localhost:9000/management/api/v1/accounts/blacklist/${userId}`,
         {
            method: "GET",
            headers: {
               username: profile.user.username,
               password: profile.password,
            },
         }
      );
      if (res.status === 200) {
         Alert.success("Account added to blacklist!", 2000);
         return;
      } else {
         Alert.error("Something went wrong!", 2000);
         return;
      }
   };
   return <Button onClick={onBlacklistAccount}>Blacklist</Button>;
};

const ReActivateAccount = ({ userId }) => {
   const { profile } = useProfile();
   const onReActivateAccount = async () => {
      const confirm = window.confirm(`Confirm Re-Activate Account?`);
      if (!confirm) {
         return;
      }
      const res = await fetch(
         `http://localhost:9000/management/api/v1/accounts/reActivate/${userId}`,
         {
            method: "GET",
            headers: {
               username: profile.user.username,
               password: profile.password,
            },
         }
      );
      if (res.status === 200) {
         Alert.success("Account re-activated!", 2000);
         return;
      } else {
         Alert.error("Something went wrong!", 2000);
         return;
      }
   };
   return <Button onClick={onReActivateAccount}>ReActivate</Button>;
};

const EditUserDetails = ({ user }) => {
   const { profile } = useProfile();
   const { open, close, isOpen } = useModalState();
   const [roles, setRoles] = useState([]);
   const [currentUserRoles, setCurrentUserRoles] = useState([]);
   const formRef = useRef();
   const [formValue, setFormValue] = useState({ roleId: null });
   const [newRole, setNewRole] = useState(null);
   const [deleteRole, setDeleteRole] = useState(null);

   const onFormSubmit = async () => {
      if (!newRole) {
         close();
         return;
      }

      const res = await fetch(
         `http://localhost:9000/management/api/v1/accounts/addRole/${user.id}`,
         {
            method: "PUT",
            headers: {
               username: profile.user.username,
               password: profile.password,
               "Content-Type": "application/json",
            },
            body: JSON.stringify(newRole),
         }
      );
      if (res.status === 200) {
         Alert.success(`${newRole.role} role assigned to user!`, 4000);
         setNewRole(null);
         close();
         return;
      } else if (res.status === 502) {
         Alert.error(`${newRole.role} role is already assigned to user!`, 4000);
         setNewRole(null);
         close();
         return;
      }
   };

   const onDeleteRole = async (roleId) => {
      getRoleById(profile.user.username, profile.password, roleId)
         .then((res) => setDeleteRole(res))
         .catch(() => console.log(`Error in getRoleById`));

      const res = await fetch(
         `http://localhost:9000/management/api/v1/accounts/deleteRole/${user.id}`,
         {
            method: "DELETE",
            headers: {
               username: profile.user.username,
               password: profile.password,
               "Content-Type": "application/json",
            },
            body: JSON.stringify(deleteRole),
         }
      );
      if (res.status === 200) {
         Alert.success(`${deleteRole.role} role removed from user!`, 4000);
         setDeleteRole(null);
         return;
      } else if (res.status === 502) {
         Alert.error(`Something went wrong!`, 4000);
         setDeleteRole(null);
         return;
      }
   };

   return (
      <>
         <Icon
            className="btn btn-secondary btn-sm m-2 rs-btn-subtle"
            icon="pencil"
            onClick={() => {
               getRoles(user.username, profile.password, user.id)
                  .then((res) => setCurrentUserRoles(res))
                  .catch(() => console.log(`error`));
               getAllRoles(profile.user.username, profile.password)
                  .then((res) => setRoles(res))
                  .catch(() => console.log(`Error!`));
               open();
            }}
         />
         <Modal show={isOpen} onHide={close}>
            <Modal.Header>
               <Modal.Title>Edit User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {currentUserRoles.length > 0 && (
                  <div>
                     Role(s) :
                     {currentUserRoles.map((role) => (
                        <Tag
                           key={role.id}
                           className="m-1"
                           size="lg"
                           color="cyan"
                           closable
                           onClose={() => {
                              console.log(`role`, role);
                              onDeleteRole(role.id);
                           }}
                        >
                           {role.role}
                        </Tag>
                     ))}
                  </div>
               )}
               <div>
                  {roles.length > 0 && (
                     <Form
                        fluid
                        ref={formRef}
                        formValue={formValue}
                        onChange={(val) => {
                           getRoleById(
                              profile.user.username,
                              profile.password,
                              val.roleId
                           )
                              .then((res) => setNewRole(res))
                              .catch(() =>
                                 console.log(`Error in fetching roleById...`)
                              );
                           setFormValue(val);
                        }}
                     >
                        <FormGroup>
                           <ControlLabel>Select/Update Role</ControlLabel>
                           <FormControl
                              id="role"
                              name="roleId"
                              accepter={InputPicker}
                              data={roles}
                              labelKey="role"
                              valueKey="id"
                              defaultValue={
                                 currentUserRoles.length > 0 &&
                                 currentUserRoles[0]
                              }
                           />
                        </FormGroup>
                     </Form>
                  )}
               </div>
            </Modal.Body>
            <Modal.Footer>
               <ButtonGroup justified className="mb-2">
                  <CloseAccount userId={user.id} />
                  <CancelAccount userId={user.id} />
                  <BlacklistAccount userId={user.id} />
                  <ReActivateAccount userId={user.id} />
               </ButtonGroup>
               <Button ripple appearance="primary" block onClick={onFormSubmit}>
                  Save
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

const AddNewUser = () => {
   const { isOpen, open, close } = useModalState();
   const formRef = useRef();
   const { profile } = useProfile();
   const [formValue, setFormValue] = useState(DEFAULT_STATE);

   const onFormChange = (value) => {
      setFormValue(value);
   };

   const onFormSubmit = async () => {
      console.log(`formValue`, formValue);
      if (
         formValue.username.trim() === "" ||
         formValue.password.trim() === "" ||
         formValue.confirmPassword.trim() === ""
      ) {
         Alert.error("Empty Fields!", 2000);
         return;
      }
      if (formValue.password.trim() !== formValue.confirmPassword.trim()) {
         Alert.error("Password doesn't match!", 2000);
         return;
      }
      const res = await fetch(
         `http://localhost:9000/management/api/v1/accounts/addAccount/`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               username: profile.user.username,
               password: profile.password,
            },
            body: JSON.stringify({
               username: formValue.username,
               password: formValue.password,
            }),
         }
      );
      if (res.status === 200) {
         Alert.success("User Added!", 4000);
         close();
      } else {
         Alert.error(`Error ${res.status}!`, 4000);
      }
   };

   return (
      <>
         <div className="text-center">
            <Button appearance="subtle" color="green" ripple onClick={open}>
               <Icon icon="plus" className="m-1" />
               Add New User
            </Button>
         </div>
         <Modal onHide={close} show={isOpen}>
            <Modal.Header>
               <Modal.Title>Add New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form
                  formValue={formValue}
                  ref={formRef}
                  onChange={onFormChange}
                  fluid
                  model={model}
               >
                  <FormGroup>
                     <ControlLabel>Username</ControlLabel>
                     <FormControl
                        id="username"
                        name="username"
                        placeholder="Enter Username"
                     />
                  </FormGroup>
                  <FormGroup>
                     <ControlLabel>Password</ControlLabel>
                     <FormControl
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        type="password"
                     />
                  </FormGroup>
                  <FormGroup>
                     <ControlLabel>Confirm Password</ControlLabel>
                     <FormControl
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        type="password"
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

const UsersDisplay = ({ users }) => {
   return (
      <React.Fragment>
         <table className="table table-hover table-bordered text-center mt-2">
            <thead>
               <tr key={"header"}>
                  {Object.keys(users[0]).map((key, index) => {
                     return (
                        <th
                           key={index}
                           scope="col"
                           style={{
                              fontFamily: "sans-serif",
                              fontSize: "17px",
                           }}
                        >
                           {key.toUpperCase()}
                        </th>
                     );
                  })}
               </tr>
            </thead>
            <tbody>
               {users.map((user) => (
                  <tr key={user.id}>
                     {Object.values(user).map((val) => {
                        if (Array.isArray(val)) {
                           return (
                              <td>
                                 <b
                                    style={{
                                       fontFamily: "monospace",
                                       fontWeight: "bold",
                                       color: val.length === 0 ? "gray" : "red",
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
                     <EditUserDetails user={user} />
                  </tr>
               ))}
            </tbody>
         </table>
      </React.Fragment>
   );
};

const UsersControl = () => {
   const { profile, dispatch } = useProfile();
   const [users, setUsers] = useState([]);

   const onSignOut = () => {
      dispatch({ type: "LOGOUT_ATTEMPT" });
   };

   useEffect(() => {
      getAllUsers(profile.user.username, profile.password)
         .then((res) => setUsers(res))
         .catch(() => console.log(`somethingwronginuserscontrol...`));
   }, [profile]);

   return (
      <div>
         <AdminNavBar profile={profile} onSignOut={onSignOut} />
         <h1 className="text-center">
            Users Control
            {profile.user && (
               <div className="m-2" style={{ float: "right" }}>
                  <AddNewUser />
               </div>
            )}
         </h1>
         {users.length !== 0 && <UsersDisplay users={users} />}
      </div>
   );
};

export default UsersControl;
