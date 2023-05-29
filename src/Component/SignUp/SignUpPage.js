import React, { useRef, useState ,useEffect} from "react";
import {Button,Form,Navbar,Container} from "react-bootstrap";
import {useNavigate } from "react-router-dom";
import classes from "./SignUpPage.module.css";
import { AuthSliceAction } from "../../Store/Authslice";
import { useDispatch, useSelector } from "react-redux";
const SignUpPage = () => {
  const InputEmail = useRef();
  const InputPassword = useRef();
  const InputCPassword = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch=useDispatch();
  const Navigate=useNavigate()
 const isAuth= useSelector(state=>state.auth.isAuth)
  useEffect(()=> {if(isAuth){ Navigate('/Home')}})

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
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAwCFu5dJJylVdcHESllDZOFgMkVQ3jHW8";
      if(isLoggedIn){
        url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAwCFu5dJJylVdcHESllDZOFgMkVQ3jHW8'
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
            dispatch(AuthSliceAction.login({email:response.email,token:response.idToken}))
          Navigate('/Home')
          }
          else{
            alert("SignUp Successfull")
            setIsLoggedIn(true)
          }
          
        }else{
           throw new Error('Something went wrong')
          }
       
      } catch (error) {
        alert(error)
      }
    }
  }
  return (
    <>
    <Navbar bg="info">
    <Container>
      <Navbar.Brand>MB MailBox</Navbar.Brand>
      </Container>
  </Navbar>
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
          {isLoggedIn ? <Button variant="link" onClick={()=>Navigate('/forgatePassword')}>forget password</Button>:''}
        </Form>
      </div>

      <Button
        className="mt-2 w-100"
        variant="primary"
        size="lg"
        style={{ border: "1px solid black" }}
        onClick={()=>setIsLoggedIn(!isLoggedIn)}
      >
       {isLoggedIn ? 'Create new account?SignUp':'Have an account?Login'} 
      </Button>
    </div>
    </>
  );
};

export default SignUpPage;
