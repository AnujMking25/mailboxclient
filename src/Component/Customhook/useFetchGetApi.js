import { useState, useEffect } from 'react';

function useFetchGetApi(url) {
  const [data, setData] = useState(null);
 

  useEffect(() => {
    async function GetData(){
        console.log("I am calling every 2 sec");
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
                
                setData(itemArr);
                 
            }
            else{throw new Error('Something went wrong')} 
        } catch (error) {
            alert(error)
        }
    } 
    GetData()     

    
  }, [url]);

  return { data};
}
