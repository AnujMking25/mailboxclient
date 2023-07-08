import { useCallback } from "react";

const usePostapi = () => {

  const onSendRequest=useCallback(async(message,recipientEmail,email)=>{
    const messageBody = message;
    // console.log("PostApiHook",message ,"*****",email);
    const senderMailUrl =email.replace("@",'').replace(".",'');
    const recieverMailUrl = recipientEmail.replace("@", '').replace(".", '');
    try {
      //*** This data for sender************************
      const sendDataFrom = await fetch(
        `https://mail-box-8c31a-default-rtdb.firebaseio.com/${senderMailUrl}/send.json`,
        {
          method: "POST",
          body: JSON.stringify({
            from: email,
            to: recipientEmail,
            message: messageBody,
          
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ); 

      // this data for reciver
      await fetch(`https://mail-box-8c31a-default-rtdb.firebaseio.com/${recieverMailUrl}/inbox.json`,
      {
        method: "POST",
        body: JSON.stringify({
          from: email,
          to: recipientEmail,
          message: messageBody,
          read:true
        
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
      )
      if (sendDataFrom.ok) {
        alert('Email send successfully')
      } else {
        const response =await sendDataFrom.json();
        throw response.error;
      }
    } catch (error) {
      alert(error.message);
    }
  },[]);
  
  return {onSendRequest:onSendRequest};
}

export default usePostapi