import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    currentUser: undefined,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setUser: (state, action)=>{
            if(action.payload) state.currentUser = {...action.payload}
        },
        removeUser: async(state, action)=>{
            state.currentUser = undefined;
            const {data} = await axios.get("/api/logout");
            console.log(data.message)
        }
    }
})

export const {setUser, removeUser} = userSlice.actions;

export const getUser = (state) => state.user.currentUser;

export default userSlice.reducer;