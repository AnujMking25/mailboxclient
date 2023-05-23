import React, { useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Container,Row,Col } from 'react-bootstrap';
import usePostapi from '../Customhook/usePostapi';
const Compose = (props) => {
  const [editorState,seteditorState]=useState(EditorState.createEmpty(''))
  const[recipientEmail,setRecipientEmail]=useState("")
  const {onSendRequest}=usePostapi();
  const email=localStorage.getItem('email');

function onRecipientEmailHandler(e){
setRecipientEmail(e.target.value);
}

  function onEditorStateChangeHandler(newEditorState){
    seteditorState(newEditorState)
    // console.log("editor state",editorState.getCurrentContent().getPlainText());
  }

//  ************************* Custome hook  (start)****************************

  async function onSubmitHandler(){
    const messageBody = editorState.getCurrentContent().getPlainText();
    const senderMailUrl =email.replace("@",'').replace(".",'');
    const recieverMailUrl = recipientEmail.replace("@", '').replace(".", '');
    await onSendRequest(messageBody,recieverMailUrl,senderMailUrl);
    props.onInbox();
  }

//  ************************* Custome hook  (end)****************************
  return (
    <>
     <Row className='mt-3'>
         <Col md={{span:4,offset:4}}>
         <h2>Compose mail</h2>
         </Col> 
      </Row>
     <Container className='mt-4' style={{borderLeft:'1px solid black',borderBottom:'1px solid black',minHeight:'70vh'}}>
        <Row>
          <Col sm={1}><h5>From</h5></Col>
          <Col sm={3}>{email}</Col>
        </Row>
        <hr/>
        <Row>
          <Col sm={1}><h5> To</h5></Col>
          <Col sm={4}><input  type='email' onChange={onRecipientEmailHandler}/></Col>
          <Col sm={{ span: 3, offset: 4} }>  <Button onClick={onSubmitHandler}>send</Button> </Col>
        </Row>
        <hr/>
     
    
     <Editor
  editorState={editorState}
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
  onEditorStateChange={onEditorStateChangeHandler}
/>
     

  </Container> 
    </>
   
  )
}

export default Compose