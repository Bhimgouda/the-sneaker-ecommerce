import { Route, Routes, useNavigate } from "react-router-dom";
import React, { lazy, Suspense, useEffect, useState} from "react";
import Navbar from "./components/navbar";
import Contact from "./pages/contact";
import NotFound from "./pages/not-found";
import { Provider, useDispatch, useSelector } from "react-redux";
import {setUser} from './slices/userSlice'
import { getProducts, setProducts } from "./slices/productSlice";
import Checkout from "./pages/checkout";
import Sucess from "./pages/success";
import Orders from "./pages/orders";
import { getCartItems, setUserCart } from "./slices/cartSlice";
import http from "./services/httpService"
import toast, { Toaster } from 'react-hot-toast';

// Lazy load components
const Collection = lazy(() => import("./pages/collections"));
const Store = lazy(() => import("./pages/store"));
const Product = lazy(() => import("./pages/product"));
const About = lazy(() => import("./pages/about"));


function App() {
  const [productsInCart, setProductsInCart] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    const getCurrentUser = async()=>{
        const {data:user} = await http.get('/api/current-user');
        if(user){
          dispatch(setUser(user));
          toast(`Welcome Back ${user.name.split(" ")[0]}`)
        }
        const {data:cart} = await http.get("/api/cart")
        dispatch(setUserCart(cart.items))
        // handle error
    }
    getCurrentUser()
  }, []);

  
  useEffect(()=>{
    const requestProducts = async()=>{
      const {data} = await http.get("/api/products")
      dispatch(setProducts(data));
    }
    requestProducts()
  }, [])

  const handleCheckout = () => {
    setProductsInCart([]);
  };

  return (
   <>
   <Toaster />
      <header>
          <Navbar
            handleCheckout={handleCheckout}
            productsInCart={productsInCart}
          />
        </header>
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <main>
            <Routes>
              <Route path="/" element={<Store />} />
              <Route path="/category/:collection/product/:id" element={<Product />}/>
              <Route path="/product/:id" element={<Product />}/>
              <Route path="/store" element={<Store />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/success" element={<Sucess />} />
              <Route path="/collections" element={<Collection />} />
              <Route path="/category/:id" element={<Store />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </Suspense>
   </>
  )
}

export default App;