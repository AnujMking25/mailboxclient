import React, { useState } from 'react'
import { Row,Col} from 'react-bootstrap'
import MessagePage from '../HomePage/MessagePage'
const ItemsList = (props) => {
  const read=props.read
    const itsYouremail=localStorage.getItem('email').replace("@",'').replace(".",'')
   const [show,setshow]=useState(false);
   async function onReadUpdate(){
      const update=await fetch(`https://reactmailbox-40456-default-rtdb.firebaseio.com/${itsYouremail}/inbox/${props.id}.json`,{
        method:'PATCH',
        body:JSON.stringify({
          read:false
        }),
        headers:{
          'Content-Type':'application/json'
        }
       
      })
      if(update.ok){
        console.log("update success");
      }
   } 
   function onShowMessagePage(){
      setshow(true)
      if(read===true){
        onReadUpdate()
      }
    }
    function onHideMessagePage(){
      setshow(false)
      console.log('Hii i am working');
    }
  return (
    <li id={props.id} style={{listStyle:'none'}} >
      {!show && <Row onClick={onShowMessagePage} style={{maxHeight:'30px',overflowY:'hidden'}}>
        <Col sm={1} >{read ? '📩': '✔'}</Col>
          <Col sm={3}> <b>{props.from}</b></Col>
          <Col sm={8}>{props.message}</Col>
        </Row>}
        {show && <MessagePage  onHide={onHideMessagePage} email={props.from} message={props.message}/>}
        <hr/>
   </li>
  )
}

export default ItemsList