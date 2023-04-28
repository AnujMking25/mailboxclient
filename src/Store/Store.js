import { configureStore } from "@reduxjs/toolkit";
import Authslice from "./Authslice";
import MailItemsSlice from "./MailItemsSlice";
 const  Store=configureStore({
    reducer:{auth:Authslice,
                mailboxitem:MailItemsSlice}
})
export default Store