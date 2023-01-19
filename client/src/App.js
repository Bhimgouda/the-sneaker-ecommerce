import { Route, Routes } from "react-router-dom";
import React, { lazy, Suspense, useEffect, useState} from "react";
import Navbar from "./components/navbar";
import Contact from "./pages/contact";
import NotFound from "./pages/not-found";
import { Provider, useDispatch, useSelector } from "react-redux";
import {setUser} from './slices/userSlice'
import axios from "axios";
import { getProducts, setProducts } from "./slices/productSlice";
import Checkout from "./pages/checkout";
import Sucess from "./pages/success";
import Orders from "./pages/orders";

// Lazy load components
const Collection = lazy(() => import("./pages/collections"));
const Store = lazy(() => import("./pages/store"));
const Product = lazy(() => import("./pages/product"));
const About = lazy(() => import("./pages/about"));

function App() {
  const [productsInCart, setProductsInCart] = useState([]);
  const dispatch = useDispatch()

  const products = [...useSelector(getProducts)]
  console.log(products.slice(0,2))

  useEffect(() => {
    const getCurrentUser = async()=>{
      try{
        const {data:user} = await axios.get('/api/current-user');
        if(user){
          console.log(user)
          dispatch(setUser(user));
          const {data:cart} = await axios.get("/api/cart")
          // dispatch(setUserCart)
        }
      }
      catch(e){
        console.log(e)
      }
    }
    getCurrentUser()
  }, []);

  
  useEffect(()=>{
    const requestProducts = async()=>{
      const {data} = await axios.get("/api/products")
      dispatch(setProducts(data));
    }
    requestProducts()
  }, [])

  const handleCheckout = () => {
    setProductsInCart([]);
  };

  return (
   <>
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