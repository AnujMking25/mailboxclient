import React from 'react'
import { Row,Col, Container, Button } from 'react-bootstrap';
const MessagePage = (props) => {

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
  return (
    <Container className='p-4' style={{border:'1px solid black', minHeight:'13rem',borderRadius:'12px'}}>
      <Row>
        <Col ><Button onClick={onHide}>Back</Button></Col>
        <Col sm={1}><Button size='sm' onClick={onDeleteHandler}>Delete</Button></Col>
      </Row>
      <Row>
        <Col style={{fontSize:'20px',fontWeight:'bold'}}>To:{props.email}</Col>
      </Row>
      <Row>
        <Col className='p-3' sm={12}><b>message:&nbsp; &nbsp;</b>{props.message}</Col>
      </Row>
    </Container>
  )
}

export default MessagePage