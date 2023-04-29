import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MailItemsSliceAction } from '../../Store/MailItemsSlice';
import ItemsList from './ItemsList';


const Inbox = () => {
    const dispatch=useDispatch()
    const inboxitemsData=useSelector(state=>state.mailboxitem.inboxItems)
    const itsYouremail=localStorage.getItem('email').replace('@','').replace('.','')
    const[inboxMailItem,setinboxMailitem]=useState('')

    useEffect(()=>{
        setinboxMailitem(
            <ul>{inboxitemsData.map((item)=><ItemsList key={item.id} id={item.id} read={item.read} from={item.from} message={item.message}/>)}</ul>
        )
    },[inboxitemsData])
 
    useEffect( ()=>{
        async function GetData(){
            try {
                const getInboxData=await fetch(`https://reactmailbox-40456-default-rtdb.firebaseio.com/${itsYouremail}/inbox.json`)
        
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
                alert(error)
            }
        }       
        GetData()
       
},[itsYouremail,dispatch])

  return (
   
    <div><h1 style={{textAlign:'center',marginTop:'1rem',marginBottom:'2rem'}}>Your Inbox</h1>
    {inboxMailItem}
    </div>
  )
}

export default Inbox