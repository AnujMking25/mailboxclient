import React, { useEffect, useState } from 'react'
import { Row,Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { MailItemsSliceAction } from '../../Store/MailItemsSlice';
import ItemsList from '../Inbox/ItemsList';
const SendEmail = () => {
    const dispatch=useDispatch();
    const itsYouremail=localStorage.getItem('email').replace('@','').replace('.','');
    const [IsSendItem,setSendItem]=useState();
    const ShowitemData=useSelector(state=>state.mailboxitem.SendboxItems)
    const url=`https://mail-box-8c31a-default-rtdb.firebaseio.com/${itsYouremail}/send`

    function onDeleteSendBoxMail(id){
        dispatch(MailItemsSliceAction.deleteSendBoxmail(id))
    }
   useEffect(()=>{
setSendItem(<ul>{
        ShowitemData.map((item)=><ItemsList key={item.id} onDeleteMail={onDeleteSendBoxMail} url={url} id={item.id} from={item.to} message={item.message}/>)
    }</ul>)
   },[ShowitemData,url]) 
useEffect(()=>{
    async function GetData(){
        try {
            const GetSendData=await fetch(`${url}.json`)
            if(GetSendData.ok){
                const response=await GetSendData.json()
                let SendDataArr=[];
                for(const key in response){
                    SendDataArr.push({...response[key],id:key})
                }
                    dispatch(MailItemsSliceAction.sendboxItems(SendDataArr))
            }
        } catch (error) {
            
        }
    }
    GetData()
},[itsYouremail,dispatch,url])

  return (
    <Container className='mt-3'>
        <Row className='mt-4 mb-4'><Col sm={{span:3,offset:4}}><h2> SendEmail</h2></Col></Row>
        {IsSendItem}
    </Container>
    
  )
}

export default SendEmail