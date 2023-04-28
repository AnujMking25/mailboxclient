import { createSlice } from "@reduxjs/toolkit";
const isLoggedIn=!!localStorage.getItem('email')

const initialState={
isAuth:isLoggedIn
}
const AuthSlice=createSlice({
    name:'Authentication',
    initialState:initialState,
    reducers:{
        login(state,action){
            localStorage.setItem('email',action.payload.email);
            localStorage.setItem('token',action.payload.token);
            state.isAuth=true
            alert('Login Successfull')

        },
        logout(state){
            state.isAuth=false
            localStorage.removeItem('email')
            localStorage.removeItem('token')
        }
    }
})
export const AuthSliceAction=AuthSlice.actions
export default AuthSlice.reducer