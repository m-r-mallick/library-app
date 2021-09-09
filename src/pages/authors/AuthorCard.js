import React from "react";
import { Button, Panel } from "rsuite";
import { useModalState } from "../../misc/custom-hooks";
import BooksByAuthorModal from "./BooksByAuthorModal";

const AuthorCard = ({ data, ...props }) => {
   const { isOpen, open, close } = useModalState();
   const { id, name, description, booksByAuthor } = data;
   return (
      <Panel {...props} bordered header={name} className="m-2" collapsible>
         <small>
            <b>ID:</b>{" "}
            <span
               style={{
                  color: "green",
                  fontFamily: "monospace",
                  fontWeight: "bold",
               }}
            >
               {id}
            </span>
         </small>
         <br />
         <small>
            <b>Description:</b> {description}
         </small>
         <br />
         <small>
            <b>Books By Author:</b>{" "}
            {
               <Button appearance="link" ripple size="xs" onClick={open}>
                  View
               </Button>
            }
         </small>
         <BooksByAuthorModal
            isOpen={isOpen}
            close={close}
            booksByAuthor={booksByAuthor}
         />
      </Panel>
   );
};

export default AuthorCard;
