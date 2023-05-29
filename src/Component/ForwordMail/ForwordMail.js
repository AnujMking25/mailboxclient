import ReactDOM from "react-dom";
import classess from './ForwordMail.module.css'
import { Container,Row,Col, Button } from "react-bootstrap";
import { useRef } from "react";
import usePostapi from "../Customhook/usePostapi";

const ForwordMailData = (props) => {
    const email=localStorage.getItem('email');
    const InputrecipientEmail=useRef();
    const { onSendRequest}=usePostapi()

//******************** Hide Forword mail modal (start)***********************
    function onHide(){
        props.onHide();
    }
//******************** Hide Forword mail modal (end)***********************

// *********************** Custome Hook (start) ********************************

    function onForwordMessage(e){
        e.preventDefault();
        const recipientEmail=InputrecipientEmail.current.value;
        // console.log(recipientEmail);
        const message=props.message;
        onSendRequest(message,recipientEmail,email) 
    }
// *********************** Custome Hook (end) ********************************
  return (
    <div className={classess.maindiv}>
        <Container >
            <form onSubmit={onForwordMessage}>
            <Row >
                <Col><h4>From: {email}</h4></Col>
                <Col><Button variant='danger' onClick={onHide}>X</Button></Col>
            </Row>
            <Row>
                <Col sm={1}><h4>To:</h4></Col>
                <Col sm={1}><input type="email" ref={InputrecipientEmail}/></Col>
            </Row>
            <hr/>
            <Row>
                <h5>message:</h5><p>{props.message}</p>
            </Row>
            <Row>
                <Col ><Button onClick={onHide}>cancle</Button>
                <Button type="submit">forword</Button></Col>
            </Row>
            </form>
        </Container>
    </div>
  )
}

const ForwordMail =(props)=>{
const portalId=document.getElementById("forwordmail");
console.log("i am Forword mail");
    return ReactDOM.createPortal(<ForwordMailData onHide={props.onHide} message={props.message}/>,portalId)
} 

export default ForwordMail