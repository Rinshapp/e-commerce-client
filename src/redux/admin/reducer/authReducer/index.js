import { createSlice } from "@reduxjs/toolkit"
import { initialState } from "./initialState"


const userReducer = createSlice({
    initialState,
    name:'userReducer',
    reducers:{
        isAdminLogin:(state,action)=>{
            // localStorage.setItem("token",action.payload.token)
            // localStorage.setItem("useDetails",JSON.stringify(action.payload.users))
            // localStorage.setItem("isLogged",true)
            // return {isLogged:true,token:action.payload.token,userDetails:action.payload.users}
        },
        isAdminSignup:()=>{

        },
        isAdminLoggOut:()=>{
            // return {isLogged:false,token:null,userDetails:null}
        },
        isAdminProfile:()=>{

        },
    }
})



export const { isAdminLoggOut,isAdminLogin,isAdminSignup,isAdminProfile } = userReducer.actions

export default userReducer.reducer;
