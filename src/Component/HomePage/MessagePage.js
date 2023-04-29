import React from 'react'
import { Row,Col, Container, Button } from 'react-bootstrap';
const MessagePage = (props) => {
   
function onHide(){
  props.onHide()
  console.log("Message page is working");
}
  return (
    <Container className='p-4' style={{border:'1px solid black', minHeight:'13rem',borderRadius:'12px'}}>
      <Row>
        <Col ><Button onClick={onHide}>Back</Button></Col>
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