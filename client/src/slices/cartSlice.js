import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addTocart: (state, action)=>{
            const itemIndex = state.items.findIndex(item=>item._id === action.payload._id)
            if(itemIndex !== -1){
                state.items[itemIndex].quantity += action.payload.quantity;
            }
            else state.items = [...state.items, action.payload]
        },
        removeFromcart: (state, action)=>{
            state.items = [...state.items].filter(item=>item._id !== action.payload)
        }
    }
})

export const {addTocart, removeFromcart} = cartSlice.actions;

export const getcart = (state)=>state.cart.items;
export const getTotalQuantity = (state)=>{
   return state.cart.items.reduce((a,b)=>a + b.quantity, 0);
}

export default cartSlice.reducer;