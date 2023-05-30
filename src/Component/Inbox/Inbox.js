import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MailItemsSliceAction } from '../../Store/MailItemsSlice';
import ItemsList from './ItemsList';

const Inbox = () => {
    const dispatch=useDispatch()
    const inboxitemsData=useSelector(state=>state.mailboxitem.inboxItems)
    const itsYouremail=localStorage.getItem('email').replace('@','').replace('.','')
    const[inboxMailItem,setinboxMailitem]=useState('')
    const url=`https://mail-box-94e45-default-rtdb.firebaseio.com/${itsYouremail}/inbox`
    function onDeleteInboxMail(id){
        dispatch(MailItemsSliceAction.deleteinboxmail(id))
    }
    useEffect(()=>{
        setinboxMailitem(
            <ul>{inboxitemsData.map((item)=><ItemsList key={item.id} onDeleteMail={onDeleteInboxMail} url={url} id={item.id} read={item.read} from={item.from} message={item.message}/>)}</ul>
        )
    },[inboxitemsData,url])
 
    useEffect( ()=>{

        const interval=setInterval(() => {
            async function GetData(){
                // console.log("I am calling every 2 sec");
                try {
                    const getInboxData=await fetch(`${url}.json`)
            
                    if(getInboxData.ok){
                        const response=await getInboxData.json()
                        let itemArr=[]
                        let counter=0;
                        for (const key in response) {
                                const element = response[key];
                                if(response[key].read===true){counter++}
                                itemArr.push({...element,id:key})
                        }
                        
                        dispatch(MailItemsSliceAction.inboxItems({itemArr,counter}))
                         
                    }
                    else{throw new Error('Something went wrong')} 
                } catch (error) {
                    alert(error.message)
                }
            } 
            GetData()      
        }, 2000);
       
        return ()=>clearInterval(interval);
       
},[itsYouremail,dispatch,url])

  return (
   
    <div><h1 style={{textAlign:'center',marginTop:'1rem',marginBottom:'2rem'}}>Your Inbox</h1>
    {inboxMailItem}
    </div>
  )
}

export default Inbox