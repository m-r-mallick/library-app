import React, { useRef, useState } from "react";
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
   username: StringType().isRequired("Username is required!"),
   password: StringType().isRequired("Password is required!"),
});

const INITIAL_FORM = {
   username: "",
   password: "",
};

const Login = () => {
   const [formValue, setFormValue] = useState(INITIAL_FORM);
   const formRef = useRef();
   const { dispatch } = useProfile();

   const onFormChange = (value) => {
      setFormValue(value);
   };

   const onSubmit = async () => {
      try {
         const res = await fetch(
            "http://localhost:9000/management/api/v1/accounts/",
            {
               method: "GET",
               headers: {
                  username: formValue.username,
                  password: formValue.password,
               },
            }
         );
         const data = await res.json();
         const user = data.find((u) => u.username === formValue.username);
         dispatch({
            type: "LOGIN_ATTEMPT",
            payload: { user: user, password: formValue.password },
         });
      } catch (error) {
         console.log(`error here in login`, error);
      }
   };

   return (
      <div className="text-center">
         <div
            className="text-center "
            style={{
               position: "fixed",
               top: "50%",
               left: "50%",
               width: "24em",
               height: "22em",
               marginTop:
                  "-11em" /*set to a negative number 1/2 of your height*/,
               marginLeft:
                  "-12em" /*set to a negative number 1/2 of your width*/,
               border: "1px solid #ccc",
               backgroundColor: "#f3f3f3",
            }}
         >
            <h1>LOGIN</h1>
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
                  <ButtonToolbar style={{ fontFamily: "monospace" }}>
                     <Button
                        appearance="primary"
                        onClick={onSubmit}
                        className="m-1"
                     >
                        Log In
                     </Button>
                     <Button appearance="default" color="green" className="m-1">
                        Sign Up
                     </Button>
                  </ButtonToolbar>
               </FormGroup>
            </Form>
         </div>
      </div>
   );
};

export default Login;
