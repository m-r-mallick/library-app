import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import {
   Button,
   ButtonToolbar,
   ControlLabel,
   Form,
   FormControl,
   FormGroup,
   Schema,
} from "rsuite";
import { useProfile } from "../context/profile.context";

const { StringType } = Schema.Types;
const model = Schema.Model({
   username: StringType().isRequired("Username is required"),
   password: StringType().isRequired("Password is required"),
   confirmPassword: StringType().isRequired("Password is Required"),
});

const INITIAL_FORM = {
   username: "",
   password: "",
   confirmPassword: "",
};

const SignUp = () => {
   const [formValue, setFormValue] = useState(INITIAL_FORM);
   const formRef = useRef();
   const history = useHistory();
   const { dispatch } = useProfile();

   const onFormChange = (value) => {
      setFormValue(value);
   };

   const onSignUp = () => {
      console.log(`"Clicked "${JSON.stringify(formValue)}`);
   };

   const onLogin = () => {
      history.push("login");
   };

   return (
      <React.Fragment>
         <div className="text-center">
            <div
               className="text-center "
               style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  width: "24em",
                  height: "28em",
                  marginTop:
                     "-16.5em" /*set to a negative number 1/2 of your height*/,
                  marginLeft:
                     "-12em" /*set to a negative number 1/2 of your width*/,
                  border: "1px solid #ccc",
                  backgroundColor: "#f3f3f3",
               }}
            >
               <h1>SIGN UP</h1>
               <Form
                  layout="vertical"
                  model={model}
                  className="mt-2"
                  ref={formRef}
                  formValue={formValue}
                  onChange={onFormChange}
               >
                  <FormGroup>
                     <ControlLabel
                        style={{ fontFamily: "monospace", fontWeight: "bold" }}
                     >
                        Username
                     </ControlLabel>
                     <FormControl name="username" placeholder="Username" />
                  </FormGroup>
                  <FormGroup>
                     <ControlLabel
                        style={{ fontFamily: "monospace", fontWeight: "bold" }}
                     >
                        Password
                     </ControlLabel>
                     <FormControl
                        name="password"
                        type="password"
                        placeholder="Password"
                     />
                  </FormGroup>
                  <FormGroup>
                     <ControlLabel
                        style={{ fontFamily: "monospace", fontWeight: "bold" }}
                     >
                        Confirm Password
                     </ControlLabel>
                     <FormControl
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                     />
                  </FormGroup>
                  <FormGroup>
                     <ButtonToolbar style={{ fontFamily: "monospace" }}>
                        <Button
                           appearance="default"
                           color="green"
                           onClick={onSignUp}
                           className="m-1"
                        >
                           Sign Up
                        </Button>
                        <Button
                           appearance="primary"
                           onClick={onLogin}
                           className="m-1"
                        >
                           Login
                        </Button>
                     </ButtonToolbar>
                  </FormGroup>
               </Form>
            </div>
         </div>
      </React.Fragment>
   );
};

export default SignUp;
