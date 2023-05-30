import React, { useState } from 'react'
import { Row,Col, Container, Button } from 'react-bootstrap';
import ForwordMail from '../ForwordMail/ForwordMail';
import './MessagePage.css'
const MessagePage = (props) => {
 const [ShowForword,setShowForword]=useState(false)
function onHide(){
  props.onHide()
}
async function onDeleteHandler(){
  const deleteMail=await fetch(props.url,{
  method:'DELETE'
  })
  if(deleteMail.ok){
    props.onHide()
    props.onDeleteMail(props.id)
    alert("Mail Deleted")

  }
}
function onForwordHandler(){
  setShowForword(true);
}
function onForwordHide(){
  setShowForword(false);
}
  return (
    <>
    <Container id='messagediv' >
      <Row >
        <Col ><Button size='sm' onClick={onHide}>Back</Button></Col>
        <Col sm={1}><Button size='sm' onClick={onForwordHandler} id='Forwordbtn'>⪼</Button></Col>
        <Col sm={2} ><Button size='sm' onClick={onDeleteHandler}>Delete</Button></Col>
      </Row>
      <Row>
        <Col id='Toemail'>To:{props.email}</Col>
      </Row>
      <Row>
        <Col   id='message'><b>message:&nbsp; &nbsp;</b>{props.message}</Col>
      </Row>
    </Container>
    {ShowForword && <ForwordMail onHide={onForwordHide} message={props.message}/>}
    </>
  )
}

export default MessagePage