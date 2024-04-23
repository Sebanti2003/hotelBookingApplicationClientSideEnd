import { createSlice } from "@reduxjs/toolkit";

const userslice=createSlice({
    name:"user",
    initialState:{
        email:"",
        username:"",
        avatar:"",
        isauthenticated:false,
        accesstoken:"",
        refreshtoken:""
    },
    reducers:{
        setlogin:(state,action)=>{
            state.email=action.payload.email;
            state.username=action.payload.username
            state.avatar=action.payload.avatar,
            state.isauthenticated=true,
            state.accesstoken=action.payload.accesstoken,
            state.refreshtoken=action.payload.refreshtoken
        },
        refreshAccessToken:(state,action)=>{
            state.accesstoken=action.payload.accesstoken,
            state.refreshtoken=action.payload.refreshtoken
        }
    }
})

export const {setlogin,refreshAccessToken}=userslice.actions
export default userslice.reducer