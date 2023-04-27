import React from "react";
import { screen,render } from "@testing-library/react";
import SignUpPage from "./SignUpPage";


describe('Sign Up page Testing',()=>{

    test('SignUp Testing', () => { 
        //Arrange
        render(<SignUpPage/>)

        //Assert
    const firstText=screen.getByText("SignUp",{exact:false})
    expect(firstText).toBeInTheDocument()
     })
    test('Text Testing', () => { 
        //Arrange
        render(<SignUpPage/>)

        //Assert
    const secondText=screen.getByText("We'll never share your email with anyone else.")
    expect(secondText).toBeInTheDocument()
     })
    
     test('Sign Up button', () => { 
        render(<SignUpPage/>)

        const buttonText=screen.getByText('Sign Up')
        expect(buttonText).toBeInTheDocument()
     })
     test('Email PlaceHolder', () => { 
        render(<SignUpPage/>)

        const EmailInput=screen.getByPlaceholderText('Enter email')
        expect(EmailInput).toBeInTheDocument()
     })
     test('Password PlaceHolder', () => { 
        render(<SignUpPage/>)

        const PasswordInput=screen.getByPlaceholderText('Password')
        expect(PasswordInput).toBeInTheDocument()
     })
     
     test('Confirm Password PlaceHolder', () => { 
        render(<SignUpPage/>)

        const CPasswordInput=screen.getByPlaceholderText('Confirm Password')
        expect(CPasswordInput).toBeInTheDocument()
     })

})