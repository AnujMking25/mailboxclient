import { createSlice } from "@reduxjs/toolkit";

const inboxInitialState={
    inboxItems:[],
    SendboxItems:[]
}
const MailItemsSlice=createSlice({
    name:'MailBoxItemsData',
    initialState:inboxInitialState,
    reducers:{
        inboxItems(state,action){
            state.inboxItems=action.payload
            
        },
        sendboxItems(state,action){
            state.SendboxItems=action.payload
            
        }
    }
})
export const MailItemsSliceAction=MailItemsSlice.actions
export default MailItemsSlice.reducer