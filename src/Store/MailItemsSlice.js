import { createSlice } from "@reduxjs/toolkit";

const inboxInitialState={
    inboxItems:[],
    inboxCounter:0,
    SendboxItems:[]
}
const MailItemsSlice=createSlice({
    name:'MailBoxItemsData',
    initialState:inboxInitialState,
    reducers:{
        inboxItems(state,action){
            state.inboxItems=action.payload.itemArr;
            state.inboxCounter=action.payload.counter;
        },
        sendboxItems(state,action){
            state.SendboxItems=action.payload
            
        },
        updateCounter(state){
            state.inboxCounter=state.inboxCounter-1;
            console.log("current Counter",state.inboxCounter);
        },
        deleteinboxmail(state,action){
            state.inboxItems=state.inboxItems.filter(item=>item.id !== action.payload)
            console.log("delete working inbox",action.payload);
            
        },
        deleteSendBoxmail(state,action){
            state.SendboxItems=state.SendboxItems.filter(item=>item.id !== action.payload)
            console.log("delete working sendbox",action.payload);
            
        }
    }
})
export const MailItemsSliceAction=MailItemsSlice.actions
export default MailItemsSlice.reducer