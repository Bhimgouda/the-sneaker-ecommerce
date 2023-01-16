import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
}

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers:{
        setProducts: (state, action)=>{
            if(action.payload) state.items = [...action.payload]
        },
    }
})

export const {setProducts} = productSlice.actions;

export const getProducts = (state)=>state.products.items;
export const getWomenProducts = (state)=>state.products.items.slice(5)
export const getMenProducts = (state)=>state.products.items.slice(0.4)

export default productSlice.reducer;