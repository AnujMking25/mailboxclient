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
            console.log("Check counter...",state.inboxCounter);
            
        },
        sendboxItems(state,action){
            state.SendboxItems=action.payload
            
        }
    }
})
export const MailItemsSliceAction=MailItemsSlice.actions
export default MailItemsSlice.reducer