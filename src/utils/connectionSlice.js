import { createSlice } from "@reduxjs/toolkit";


const connectionSlice = createSlice({
    name:"connection",
    initialState: null,
    reducers:{
        addConnection:(state,action) => {
            return action.payload
        },
        removeConnection:(state,action) => {
            return null
        },
        setConnection:(state,action) => {
            return action.payload
        }

    }
})

export const {addConnection, removeConnection,setConnection} = connectionSlice.actions

export default connectionSlice.reducer