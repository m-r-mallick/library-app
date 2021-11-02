import React from "react";
import { TagGroup, Tag, Icon } from "rsuite";
import { useProfile } from "../context/profile.context";

const AccountDetails = ({ profile }) => {
   return (
      <>
         <h4>Account</h4>
         <div>User ID: {profile.user.id}</div>
         <div>Username: {profile.user.username}</div>
         <div>
            Account Status:{" "}
            <span
               style={{
                  fontWeight: "bold",
                  color: profile.user.status === "Active" ? "green" : "red",
               }}
            >
               {profile.user.status}
            </span>
         </div>
         <div>Date Of Membership: {profile.user.dateOfMembership}</div>
         <div>Issued Books: {profile.user.issuedBooks}</div>
      </>
   );
};

const PaymentDetails = ({ profile }) => {
   return (
      <>
         <h4>Fine Payment Details</h4>
         <div>
            Fine Unpaid:{" "}
            <span
               style={{
                  fontWeight: "bold",
                  color: profile.user.fineUnPaid > 0 ? "red" : "",
               }}
            >
               {profile.user.fineUnPaid}
            </span>
         </div>
         <div>
            Fine Paid:{" "}
            <span
               style={{
                  fontWeight: "bold",
                  color: profile.user.finePaid > 0 ? "green" : "",
               }}
            >
               {profile.user.finePaid}
            </span>
         </div>
      </>
   );
};

const RolesDetails = ({ profile }) => {
   return (
      <div>
         <h4>Roles</h4>
         {profile.roles.length > 0 ? (
            <TagGroup>
               {profile.roles.map((role) => (
                  <Tag color="cyan">
                     <Icon icon="close-circle" className="m-1" />
                     {role.role}
                  </Tag>
               ))}
            </TagGroup>
         ) : (
            <b>N/A</b>
         )}
      </div>
   );
};

const ProfileDisplay = () => {
   const { profile } = useProfile();
   return (
      <>
         <AccountDetails profile={profile} />
         <PaymentDetails profile={profile} />
         <RolesDetails profile={profile} />
      </>
   );
};

export default ProfileDisplay;
