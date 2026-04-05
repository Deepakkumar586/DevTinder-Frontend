import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:'feed',
    initialState:{
        feeds:[]
    },
    reducers:{
        addFeed:(state,action)=>{
            state.feeds = action.payload;
        },
        removeFeed:(state,action)=>{
            state.feeds=state.feeds.filter(feed=>feed._id !== action.payload);
        }


    }
})
export const {addFeed,removeFeed} = feedSlice.actions;
export default feedSlice.reducer;