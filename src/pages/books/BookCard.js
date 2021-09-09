import React from "react";
import { Link } from "react-router-dom";
import { Panel } from "rsuite";

const BookCard = ({ data, ...props }) => {
   const {
      title,
      subject,
      publisher,
      language,
      numberOfPages,
      publicationDate,
      copies,
      isbn,
   } = data;
   return (
      <div>
         <Panel {...props} bordered header={title} className="m-2" collapsible>
            <small>
               <b>ISBN:</b>{" "}
               <span
                  style={{
                     color: "green",
                     fontFamily: "monospace",
                     fontWeight: "bold",
                  }}
               >
                  {isbn}
               </span>
            </small>
            <br />
            <small>
               <b>Subject:</b> {subject}
            </small>
            <br />
            <small>
               <b>Publisher:</b> {publisher}
            </small>
            <br />
            <small>
               <b>language:</b> {language}
            </small>

            <br />
            <small>
               <b>Pages:</b> {numberOfPages}
            </small>
            <br />
            <small>
               <b>Published On:</b>{" "}
               {publicationDate || (
                  <span
                     style={{
                        color: "red",
                        fontFamily: "monospace",
                        fontWeight: "bold",
                     }}
                  >
                     N/A
                  </span>
               )}
            </small>
            <br />
            <small>
               <b>Copies:</b>{" "}
               {<Link to={`/copies/${isbn}`}>{copies.length}</Link>}
            </small>
         </Panel>
      </div>
   );
};

export default BookCard;
