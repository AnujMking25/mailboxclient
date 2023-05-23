import React, { useState } from 'react'
import { Row,Col} from 'react-bootstrap'
import MessagePage from '../HomePage/MessagePage'
import { useDispatch } from 'react-redux'
import { MailItemsSliceAction } from '../../Store/MailItemsSlice'
const ItemsList = (props) => {
  const[read,setread]=useState(props.read)
   const [show,setshow]=useState(false);
   const dispatch=useDispatch();
   const url=`${props.url}/${props.id}.json`
   async function onReadUpdate(){
    
      const update=await fetch(url,{
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
        setread(false)
        dispatch(MailItemsSliceAction.updateCounter())
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
    }
    // overflowY:'hidden',  style={{maxHeight:'30px'}} style={{justifyContent:'space-around'}}
  return (
    <li id={props.id} style={{listStyle:'none'}} >
      {!show && <Row onClick={onShowMessagePage} >
        <Col sm={1}>{read ? '📩': '✔'}</Col>
          <Col style={{fontWeight:"bold"}}>{props.from}</Col>
          <Col sm={8}>{props.message}</Col>
          
        </Row>}
        {show && <MessagePage  onHide={onHideMessagePage} onDeleteMail={props.onDeleteMail} id={props.id} url={url} email={props.from} message={props.message}/>}
        <hr/>
   </li>
  )
}

export default ItemsList