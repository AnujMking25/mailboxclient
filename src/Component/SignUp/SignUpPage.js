import React, { useRef, useState } from "react";
import {Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import classes from "./SignUpPage.module.css";
const SignUpPage = () => {
  const InputEmail = useRef();
  const InputPassword = useRef();
  const InputCPassword = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const Navaigate=useNavigate()
  async function onSubmitHandler(e) {
    e.preventDefault();
    const Email = InputEmail.current.value;
    const Password = InputPassword.current.value;
    const CPassword = InputCPassword.current.value;
    if (Email.trim().length < 12) {
      alert("This is not vaild Email");
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
          <Form.Text className="mb-3"> {isLoggedIn? 'LogIn' : 'SignUp'}</Form.Text>

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

          <Button variant="primary" type="submit">
          {isLoggedIn? 'Log In' : 'Sign Up'}
          </Button>
          {isLoggedIn ? <Link to='#'>forget password</Link>:''}
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
