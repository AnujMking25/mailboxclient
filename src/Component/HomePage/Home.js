import React, { useState } from 'react'
import { Navbar,Container, Button ,Row,Col} from 'react-bootstrap'
import Inbox from '../Inbox/Inbox'
import Compose from '../Compose/Compose'
import SendEmail from '../SendEmail/SendEmail'
import { useDispatch, useSelector } from 'react-redux'
import { AuthSliceAction } from '../../Store/Authslice'
import { useNavigate } from 'react-router-dom'
import { MailItemsSliceAction } from '../../Store/MailItemsSlice'
function Home() {
    const [isInbox,setIsInbox]=useState(true)
    const[isCompose,setIsCompose]=useState(false)
    const[isSend,setIsSend]=useState(false);

 //*******************   Unread Message counter Value********************* 
    const inboxCounter=useSelector(state=>state.mailboxitem.inboxCounter)
 
    const dispatch=useDispatch();
    const Navigate=useNavigate()
//****************************    Show Inbox Message (code start here) ***********************
    function onInboxHandler(){
        setIsCompose(false)
        setIsSend(false)
        setIsInbox(true)
    }

//****************************    Show Compose (code start here) ***********************    
    function onComposeHandler(){
        setIsSend(false)
        setIsInbox(false)
        setIsCompose(true)
    }

//****************************    Show Send Message (code start here) *********************** 
    function onSendHandler(){
        setIsCompose(false)
        setIsInbox(false)
        setIsSend(true)  
    }
    function onLogoutHandler(){
      dispatch(AuthSliceAction.logout())
      dispatch(MailItemsSliceAction.LoggoutDataDelete());
      Navigate('/')
    }
  return (
    <>
    <Navbar bg="info">
        <Container>
          <Navbar.Brand href="#home">Mail Box</Navbar.Brand>
          <Button className="me-2" variant="outline-danger" onClick={onLogoutHandler}>Logout</Button>
        </Container>
      </Navbar>
      <Row>
      <Col md={2} className='p-3'>
        <Button size='lg' className='w-100 mb-1 mt-2' onClick={onComposeHandler} >Compose</Button>
        <Button size='lg' className='w-100 mb-1' onClick={onInboxHandler}>Inbox<sup>{inboxCounter}</sup></Button>
        <Button size='lg' className='w-100 mb-1'onClick={onSendHandler}>Send</Button>
        </Col>
        <Col md={9}>
        {isCompose && <Compose onInbox={onInboxHandler}/>}
        {isInbox && <Inbox/>}
        {isSend &&<SendEmail/>}
        </Col>
     </Row>
    </>
  )
}

export default Home