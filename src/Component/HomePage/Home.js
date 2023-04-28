import React, { useState } from 'react'
import { Navbar,Container, Button ,Row,Col} from 'react-bootstrap'
import Inbox from '../Inbox/Inbox'
import Compose from '../Compose/Compose'
import SendEmail from '../SendEmail/SendEmail'
function Home() {
    const [isInbox,setIsInbox]=useState(false)
    const[isCompose,setIsCompose]=useState(false)
    const[isSend,setIsSend]=useState(false);

    function onInboxHandler(){
        setIsCompose(false)
        setIsSend(false)
        setIsInbox(true)
    }
    function onComposeHandler(){
        setIsSend(false)
        setIsInbox(false)
        setIsCompose(true)
    }
    function onSendHandler(){
        setIsCompose(false)
        setIsInbox(false)
        setIsSend(true)  
    }
  return (
    <>
    <Navbar bg="info">
        <Container>
          <Navbar.Brand href="#home">Mail Box</Navbar.Brand>
        </Container>
      </Navbar>
      <Row>
      <Col sm={2} className='p-3'>
        <Button size='lg' className='w-100 mb-1 mt-2' onClick={onComposeHandler} >Compose</Button>
        <Button size='lg' className='w-100 mb-1' onClick={onInboxHandler}>Inbox</Button>
        <Button size='lg' className='w-100 mb-1'onClick={onSendHandler}>Send</Button>
        </Col>
        <Col sm={9}>
        {isCompose && <Compose/>}
        {isInbox && <Inbox/>}
        {isSend &&<SendEmail/>}
        </Col>
     </Row>
    </>
  )
}

export default Home