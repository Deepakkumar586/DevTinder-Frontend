import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        isAuth:false,
    },
    reducers:{
        addUser:(state,action)=>{
            state.user = action.payload;
            state.isAuth=true
        },
        removeUser:(state)=>{
            state.user = null,
            state.isAuth= false
        }

    }

})
export const {addUser,removeUser}= authSlice.actions;
export default authSlice.reducer;