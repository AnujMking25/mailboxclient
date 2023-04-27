import React, { useRef, useState } from "react";
import {Button,Form} from "react-bootstrap";

import {useNavigate } from "react-router-dom";
import classes from "./SignUpPage.module.css";
const SignUpPage = () => {
  const InputEmail = useRef();
  const InputPassword = useRef();
  const InputCPassword = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const Navaigate=useNavigate()
  async function onSubmitHandler(e){
    e.preventDefault();
    const Email = InputEmail.current.value;
    const Password = InputPassword.current.value;
    const CPassword = InputCPassword.current.value;
    if(Email.trim().length === 0 || Password.trim().length===0){
      alert("Please fill the form")
      return
    }
    if (Email.trim().length < 12) {
      alert("This is not valid Email");
      return;
    }
    if (Password.trim().length < 8) {
      alert("Make Strong Password");
      return;
    }
    if (Password !== CPassword) {
      alert("Password Missmatch");
      return;
    } else {
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBCaC8p6QYMaENP8262krDKP5sik_2ncwA";
      if(isLoggedIn){
        url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBCaC8p6QYMaENP8262krDKP5sik_2ncwA'
      }
        try {
        const signOrLogin = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: Email,
            password: Password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (signOrLogin.ok) {
          const response = await signOrLogin.json();
          if(isLoggedIn){
            localStorage.setItem("email", response.email);
            localStorage.setItem("token", response.idToken);
            alert('Login Successfull')
          Navaigate('/mailbox')
          }
          else{
            alert("SignUp Successfull")
          }
          
        }
      } catch (error) {}
    }
  }
  return (
    <div className={classes.maindiv}>
      <div className={classes.firstdiv}>
        <Form onSubmit={onSubmitHandler}>
          <h2> {isLoggedIn? 'LogIn' : 'SignUp'}</h2>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={InputEmail}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              ref={InputPassword}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              ref={InputCPassword}
            />
          </Form.Group>

          <Button className="w-100" variant="primary" type="submit">
          {isLoggedIn? 'Log In' : 'Sign Up'}
          </Button>
          {isLoggedIn ? <p>forget password</p>:''}
        </Form>
      </div>

      <Button
        className="mt-2 w-100"
        variant="primary"
        size="lg"
        style={{ border: "1px solid black" }}
        onClick={()=>setIsLoggedIn(!isLoggedIn)}
      >
        Have an account?Login
      </Button>
    </div>
  );
};

export default SignUpPage;
