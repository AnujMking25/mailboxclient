import React, { useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button } from 'react-bootstrap';

const MailBox = () => {
  const [editorState,seteditorState]=useState(EditorState.createEmpty())
  const[recipientEmail,setRecipientEmail]=useState("")
const email=localStorage.getItem('email')
function onRecipientEmailHandler(e){
setRecipientEmail(e.target.value);
}

  function onEditorStateChangeHandler(newEditorState){
    seteditorState(newEditorState)
    console.log("editor state",editorState.getCurrentContent().getPlainText());
  }

 async function onSubmitHandler(){
    const messageBody = editorState.getCurrentContent().getPlainText();
    const senderMailUrl =email.replace("@",'').replace(".",'');
    const recieverMailUrl = recipientEmail.replace("@", '').replace(".", '');
    try {
      //*** This data for sender************************
      const sendDataFrom = await fetch(
        `https://reactmailbox-40456-default-rtdb.firebaseio.com/${senderMailUrl}.json`,
        {
          method: "POST",
          body: JSON.stringify({
            from: email,
            to: recipientEmail,
            message: messageBody,
            read: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ); 

      // this data for reciver
      await fetch(`https://reactmailbox-40456-default-rtdb.firebaseio.com/${recieverMailUrl}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          from: email,
          to: recipientEmail,
          message: messageBody,
          read: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
      )
      if (sendDataFrom.ok) {
        alert('Email send successfully')
        const response =await sendDataFrom.json();
       console.log(response);
      } else {
        const response =await sendDataFrom.json();
        throw response.error;
      }
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <>
     <div>Welcome Mail Box</div>
     <label>To</label>
     <input  type='email' onChange={onRecipientEmailHandler}/>
     <div style={{border:'1px solid black'}}>
     <Editor
  editorState={editorState}
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
  onEditorStateChange={onEditorStateChangeHandler}
/>
     </div>
  <Button onClick={onSubmitHandler}>send</Button>  
    </>
   
  )
}

export default MailBox