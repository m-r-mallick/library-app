import React from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Icon, Modal, Nav, Navbar } from "rsuite";
import { useModalState } from "../misc/custom-hooks";

const MyLink = ({ to, children, ...restProps }) => {
   return (
      <Link to={to} {...restProps}>
         {children}
      </Link>
   );
};

const NavLink = (props) => {
   return <Nav.Item componentClass={MyLink} {...props} />;
};

const AdminNavBarInstance = ({ username, onSignOut, open }) => {
   return (
      <Navbar>
         <Navbar.Header>
            <b className="navbar-brand ">Admin Panel</b>
         </Navbar.Header>
         <Navbar.Body>
            <Nav>
               <NavLink to="/admin/authors" icon={<Icon icon="pencil" />}>
                  Authors
               </NavLink>
            </Nav>
            <Nav>
               <NavLink to="/admin/books" icon={<Icon icon="book" />}>
                  Books
               </NavLink>
            </Nav>

            <Nav>
               <NavLink
                  to="/admin/bookItems"
                  icon={<Icon icon="address-book-o" />}
               >
                  Copies
               </NavLink>
            </Nav>
            <Nav>
               <NavLink to="/admin/users" icon={<Icon icon="peoples" />}>
                  Users
               </NavLink>
            </Nav>
            <Nav>
               <NavLink
                  to="/"
                  icon={<Icon icon="reply" />}
                  appearance="primary"
                  style={{ backgroundColor: "#ADD8E6", fontWeight: "bold" }}
               >
                  Exit Admin Panel
               </NavLink>
            </Nav>
            <Nav pullRight>
               <Dropdown icon={<Icon icon="user" />} title={username}>
                  <Dropdown.Item>
                     <Button appearance="subtle" onClick={open}>
                        Profile
                     </Button>
                  </Dropdown.Item>
                  <Dropdown.Item>
                     <Button
                        color="red"
                        onClick={onSignOut}
                        style={{ fontWeight: "bold" }}
                     >
                        Sign Out
                     </Button>
                  </Dropdown.Item>
               </Dropdown>
            </Nav>
         </Navbar.Body>
      </Navbar>
   );
};

const ProfileModal = ({ profile, isOpen, close }) => {
   return (
      <Modal show={isOpen} onHide={close}>
         <Modal.Header>
            <Modal.Title>{profile.user.username}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <pre>{JSON.stringify(profile, undefined, 2)}</pre>
         </Modal.Body>
         <Modal.Footer>
            <Button appearance="primary" onClick={close}>
               Close
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

const AdminNavBar = ({ profile, onSignOut }) => {
   const { isOpen, open, close } = useModalState();
   const username = profile.user.username;
   return (
      <div className="nav-wrapper">
         <AdminNavBarInstance
            username={username}
            onSignOut={onSignOut}
            open={open}
         />
         <ProfileModal profile={profile} isOpen={isOpen} close={close} />
      </div>
   );
};

export default AdminNavBar;
