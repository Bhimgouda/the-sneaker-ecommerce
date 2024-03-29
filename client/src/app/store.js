import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import ProductsReducer from "../slices/productSlice";
import userReducer from "../slices/userSlice"
import cartReducer from "../slices/cartSlice"

// The global store Setup
export const store = configureStore({
    reducer: {
        products: ProductsReducer,
        user: userReducer,
        cart: cartReducer,
    },
})