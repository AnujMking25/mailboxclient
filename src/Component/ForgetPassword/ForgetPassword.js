import React,{useRef} from 'react'
import { Container,FloatingLabel,Form,Row,Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


const ForgetPassword = () => {
const InputForgetEamil=useRef()
const Navigate=useNavigate()
  async function onForgetPasswordHandler(e){
e.preventDefault()
    const Inputemail=InputForgetEamil.current.value
    
    if(Inputemail.trim().length<11){
      alert('Email is not Valid...')
      return
    }
   try {
    const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyATy68K7K1PknrbG44ePxzWg4LyUlR1TzU',{
      method:'POST',
        body:JSON.stringify({
            requestType:"PASSWORD_RESET",
            email:Inputemail
        }),
        headers:{
            'Content-Type': 'application/json' 
        }
    })
    if(response.ok){
      alert('Check your Email')
      Navigate('/')
    }
    
  } catch (error) {
    alert(error)
   }


  }
  return (
    <Container className='mt-5 '>
        <h3>Forget Password</h3>
        <Row className="g-2">
      <Col sm={4}>
        <FloatingLabel controlId="floatingInputGrid" label="Enter Email address">
          <Form.Control type="email" placeholder="name@gmail.com" ref={InputForgetEamil}/>
        </FloatingLabel>
      </Col>
      </Row>
      <Button className='mt-3' variant="danger" onClick={onForgetPasswordHandler}>Forget Password</Button>
    </Container>
  )
}

export default ForgetPassword