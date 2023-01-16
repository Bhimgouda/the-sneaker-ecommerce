import {configureStore} from "@reduxjs/toolkit";
import ProductsReducer from "../slices/productSlice";
import userReducer from "../slices/userSlice"

// The global store Setup
export const store = configureStore({
    reducer: {
        products: ProductsReducer,
        user: userReducer,
    }
})