import React, { useEffect, useState } from "react";
import { Button, Icon, Panel } from "rsuite";
import { useProfile } from "../../../context/profile.context";

const CopiesCard = ({ copy, index }) => {
   const { profile } = useProfile();

   const [isBorrowedByUser, setIsBorrowedByUser] = useState(false);
   const [isReservedByUser, setIsReservedByUser] = useState(false);
   const [cannotBorrow, setCannotBorrow] = useState(false);

   const {
      barcode,
      isReferenceOnly,
      borrowed,
      dueDate,
      price,
      format,
      status,
      dateOfPurchase,
   } = copy;

   const handleBorrow = async () => {
      const res = await fetch(
         `http://localhost:9000/api/v1/copies/issue/${barcode}/customer?id=${profile.user.id}`,
         {
            method: "GET",
            headers: {
               username: profile.user.username,
               password: profile.password,
            },
         }
      );
      const data = await res.json();
      console.log(`data`, data);
   };

   const handleReserve = async () => {
      const res = await fetch(
         `http://localhost:9000/api/v1/copies/reserve/${barcode}/customer?id=${profile.user.id}`,
         {
            method: "GET",
            headers: {
               username: profile.user.username,
               password: profile.password,
            },
         }
      );
      const data = await res.json();
      console.log(`data`, data);
   };

   const handleCancelReservation = async () => {
      const res = await fetch(
         `http://localhost:9000/api/v1/copies/cancelReservation/${barcode}/customer?id=${profile.user.id}`,
         {
            method: "GET",
            headers: {
               username: profile.user.username,
               password: profile.password,
            },
         }
      );
      const data = await res.json();
      console.log(`data`, data);
   };

   const handleReturn = async () => {
      console.log("copy barcode ", barcode, " clicked ");
      const res = await fetch(
         `http://localhost:9000/api/v1/copies/return/${barcode}`,
         {
            method: "POST",
            headers: {
               username: profile.user.username,
               password: profile.password,
            },
         }
      );
      const data = await res.json();
      console.log(`data`, data);
   };

   useEffect(() => {
      const issued =
         profile.user.issuedBooks &&
         profile.user.issuedBooks.map((bookItem) => bookItem.barcode);
      const reserved =
         profile.user.reservedBooks &&
         profile.user.reservedBooks.map((bookItem) => bookItem.barcode);
      if (issued && issued.includes(barcode)) {
         setIsBorrowedByUser(true);
      }
      if (reserved && reserved.includes(barcode)) {
         setIsReservedByUser(true);
      }
      if (status === "Available") {
         setCannotBorrow(false);
      } else {
         setCannotBorrow(true);
      }
   }, [barcode, status, profile]);

   return (
      <div className="m-1">
         <Panel
            header={<Icon icon="book2" />}
            eventKey={index}
            key={copy.barcode}
            bordered
         >
            <div className="float-end">
               {!isBorrowedByUser && (
                  <Button
                     color="blue"
                     className="m-2"
                     size="xs"
                     appearance="subtle"
                     onClick={handleBorrow}
                     disabled={cannotBorrow}
                  >
                     Borrow
                  </Button>
               )}
               {isBorrowedByUser && (
                  <Button
                     color="red"
                     className="m-2"
                     size="xs"
                     appearance="subtle"
                     onClick={handleReturn}
                  >
                     Return
                  </Button>
               )}
               {!isReservedByUser && !isBorrowedByUser && (
                  <Button
                     color="blue"
                     className="m-2"
                     size="xs"
                     appearance="subtle"
                     onClick={handleReserve}
                  >
                     Reserve
                  </Button>
               )}
               {isReservedByUser && (
                  <Button
                     color="red"
                     className="m-2"
                     size="xs"
                     appearance="subtle"
                     onClick={handleCancelReservation}
                  >
                     Cancel
                  </Button>
               )}
            </div>
            <small>
               <b>Barcode:</b>{" "}
               <span
                  style={{
                     color: "green",
                     fontFamily: "monospace",
                     fontWeight: "bold",
                  }}
               >
                  {barcode}
               </span>
            </small>
            <br />
            <small>
               <b>Reference Only?</b>{" "}
               {isReferenceOnly || (
                  <span
                     style={{
                        fontFamily: "monospace",
                        fontWeight: "bold",
                        color: "HighlightText",
                     }}
                  >
                     {isReferenceOnly ? "Yes" : "No"}
                  </span>
               )}
            </small>
            <br />
            <small>
               <b>Borrowed:</b> {borrowed}
            </small>
            <br />
            <small>
               <b>Due Date:</b> {dueDate}
            </small>

            <br />
            <small>
               <b>Price:</b> Rs. {price}
            </small>
            <br />
            <small>
               <b>Format:</b> {format}
            </small>
            <br />
            <small>
               <b>Status:</b>{" "}
               {status === "Available" ? (
                  <span
                     style={{
                        color: "green",
                        fontFamily: "monospace",
                        fontWeight: "bold",
                     }}
                  >
                     {status}
                  </span>
               ) : (
                  <span
                     style={{
                        color: "red",
                        fontFamily: "monospace",
                        fontWeight: "bold",
                     }}
                  >
                     {status}
                  </span>
               )}
            </small>
            <br />
            <small>
               <b>Purchased On:</b>{" "}
               {dateOfPurchase || (
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
         </Panel>
      </div>
   );
};

export default CopiesCard;
