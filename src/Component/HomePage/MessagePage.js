import React, { useState } from 'react'
import { Row,Col, Container, Button } from 'react-bootstrap';
import ForwordMail from '../ForwordMail/ForwordMail';
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
    <Container className='p-4' style={{border:'1px solid black', minHeight:'13rem',borderRadius:'12px'}}>
      <Row >
        <Col sm={1}><Button size='sm' onClick={onHide}>Back</Button></Col>
        <Col sm={1}><Button size='sm' onClick={onForwordHandler} style={{fontSize:'20px',color:'black',backgroundColor:'white',border:'none'}}>⪼</Button></Col>
        <Col sm={1}><Button size='sm' onClick={onDeleteHandler}>Delete</Button></Col>
      </Row>
      <Row>
        <Col style={{fontSize:'20px',fontWeight:'bold',textAlign:'justify'}}>To:{props.email}</Col>
      </Row>
      <Row>
        <Col className='p-3' sm={12}><b>message:&nbsp; &nbsp;</b>{props.message}</Col>
      </Row>
    </Container>
    {ShowForword && <ForwordMail onHide={onForwordHide} message={props.message}/>}
    </>
  )
}

export default MessagePage