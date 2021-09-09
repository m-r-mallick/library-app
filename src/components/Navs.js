import React, { useState } from "react";
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

const NavLink = (props) => <Nav.Item componentClass={MyLink} {...props} />;

const NavbarInstance = ({
   profile,
   onSelect,
   onSignOut,
   activeKey,
   open,
   isAdmin,
   ...props
}) => {
   return (
      <Navbar {...props}>
         <Navbar.Header>
            <b className="navbar-brand ">Library</b>
         </Navbar.Header>
         <Navbar.Body>
            <Nav onSelect={onSelect} activeKey={activeKey}>
               <NavLink to="/" eventKey="1" icon={<Icon icon="home" />}>
                  Home
               </NavLink>
               <NavLink to="/books" eventKey="2" icon={<Icon icon="book" />}>
                  Books
               </NavLink>
               <NavLink to="/authors" eventKey="3" icon={<Icon icon="group" />}>
                  Authors
               </NavLink>
            </Nav>
            <Nav pullRight>
               <Dropdown
                  icon={<Icon icon="user" />}
                  title={profile.user.username}
               >
                  <Dropdown.Item eventKey="4">
                     <Button appearance="subtle" onClick={open}>
                        Profile
                     </Button>
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="5">
                     <Button appearance="subtle">Payment</Button>
                  </Dropdown.Item>
                  {isAdmin && (
                     <Dropdown.Item eventKey="6">
                        <Icon icon="cog" />
                        <Link className="btn btn-sm" to="/admin">
                           Admin
                        </Link>
                     </Dropdown.Item>
                  )}
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

const Navs = ({ profile, onSignOut }) => {
   const { isOpen, open, close } = useModalState();
   const [current, setCurrent] = useState(null);
   const isAdmin =
      profile.roles.constructor === Array &&
      profile.roles.filter((role) => role.role === "ADMIN").length > 0;

   const handleSelect = (eventKey) => {
      setCurrent(eventKey);
   };

   return (
      <div className="nav-wrapper">
         <NavbarInstance
            profile={profile}
            activeKey={current}
            onSelect={handleSelect}
            onSignOut={onSignOut}
            open={open}
            isAdmin={isAdmin}
         />

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
      </div>
   );
};

export default Navs;
