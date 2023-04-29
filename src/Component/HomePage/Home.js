import React, { useState } from 'react'
import { Navbar,Container, Button ,Row,Col} from 'react-bootstrap'
import Inbox from '../Inbox/Inbox'
import Compose from '../Compose/Compose'
import SendEmail from '../SendEmail/SendEmail'
import { useDispatch, useSelector } from 'react-redux'
import { AuthSliceAction } from '../../Store/Authslice'
import { useNavigate } from 'react-router-dom'
function Home() {
    const [isInbox,setIsInbox]=useState(false)
    const[isCompose,setIsCompose]=useState(false)
    const[isSend,setIsSend]=useState(false);

    const inboxCounter=useSelector(state=>state.mailboxitem.inboxCounter)
    const dispatch=useDispatch();
    const Navigate=useNavigate()
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
    function onLogoutHandler(){
      dispatch(AuthSliceAction.logout())
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
      <Col sm={2} className='p-3'>
        <Button size='lg' className='w-100 mb-1 mt-2' onClick={onComposeHandler} >Compose</Button>
        <Button size='lg' className='w-100 mb-1' onClick={onInboxHandler}>Inbox<sup>{inboxCounter}</sup></Button>
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