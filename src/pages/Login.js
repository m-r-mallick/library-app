import React, { useEffect, useRef, useState } from "react";
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
   const rememberMeRef = useRef();
   const { dispatch } = useProfile();

   //eslint-disable-next-line
   const onSubmit = async () => {
      try {
         const res = await fetch(
            "http://localhost:9000/management/api/v1/accounts/",
            {
               method: "GET",
               headers: {
                  username,
                  password,
               },
            }
         );
         const data = await res.json();
         const user = data.find((u) => u.username === username);

         if (rememberMeRef.current.checked) {
            dispatch({
               type: "LOGIN_AND_REMEMBER_ATTEMPT",
               payload: { user: user, password: password },
            });
         } else {
            dispatch({
               type: "LOGIN_ATTEMPT",
               payload: { user: user, password: password },
            });
         }
      } catch (error) {
         console.log(`error here in login`, error);
      }
   };

   useEffect(() => {
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");

      if (username && password) {
         formValue.username = username;
         formValue.password = password;
         rememberMeRef.current.checked = true;
         onSubmit().then();
      }
   }, [formValue, onSubmit]);

   const onFormChange = (value) => {
      setFormValue(value);
   };

   const { username, password } = formValue;

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
                  <label>
                     <b className="m-1">Remember Me</b>
                     <input
                        name="rememberMe"
                        checked="true"
                        ref={rememberMeRef}
                        type="checkbox"
                     />
                  </label>
                  <ButtonToolbar style={{ fontFamily: "monospace" }}>
                     <Button
                        appearance="primary"
                        onClick={onSubmit}
                        className="m-1"
                     >
                        Log In
                     </Button>
                  </ButtonToolbar>
               </FormGroup>
            </Form>
         </div>
      </div>
   );
};

export default Login;
