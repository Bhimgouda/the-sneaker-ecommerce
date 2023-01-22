import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: []
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        setUserCart: (state, action)=>{
            if(action.payload){
                state.items = [...action.payload];
            }
            else{
                state.items = []
            }
        },
        addTocart: (state, action)=>{
            const itemIndex = state.items.findIndex(item=>item.product._id == action.payload.product._id)
            if(itemIndex !== -1){
                state.items[itemIndex].quantity += action.payload.quantity;
            }
            else {
                state.items = [...state.items, action.payload]
            }
        },
        removeFromcart: (state, action)=>{
            state.items = [...state.items].filter(item=>item.product._id !== action.payload)
        },
        cartItemQuantityIncrementer: (state, action)=>{
            state.items = [...state.items].map(item=>{
                if(item.product._id === action.payload) item.quantity++ ;
                return item;
            })
        },
        cartItemQuantityDecrementer: (state,action)=>{
            state.items = [...state.items].map(item=>{
                if(item.product._id === action.payload && item.quantity > 1) item.quantity --;
                return item
            })
        }
    }
})

export const {addTocart, removeFromcart, cartItemQuantityDecrementer, cartItemQuantityIncrementer, setUserCart} = cartSlice.actions;

export const getCartItems = (state)=>state.cart.items;
export const getTotalQuantity = (state)=>state.cart.items.reduce((a,b)=>a + b.quantity, 0);
export const itemsSubTotal = (state)=>state.cart.items.reduce((amount, item)=> amount + item.quantity*item.product.discountedPrice ,0)

export default cartSlice.reducer;