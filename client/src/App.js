import { Route, Routes } from "react-router-dom";
import React, { lazy, Suspense, useEffect, useState} from "react";
import Navbar from "./components/navbar";
import Contact from "./pages/contact";
import NotFound from "./pages/not-found";
import { Provider, useDispatch, useSelector } from "react-redux";
import {setUser} from './slices/userSlice'
import axios from "axios";
import { setProducts } from "./slices/productSlice";
import Checkout from "./pages/checkout";
import Sucess from "./pages/sucess";
import { getCartItems, requestUserCart } from "./slices/cartSlice";
// import Collection from "./pages/collections"
// import Store from "./pages/store"
// import Product from "./pages/product"
// import About from "./pages/about"

// Lazy load components
const Collection = lazy(() => import("./pages/collections"));
const Store = lazy(() => import("./pages/store"));
const Product = lazy(() => import("./pages/product"));
const About = lazy(() => import("./pages/about"));

function App() {
  const [productsInCart, setProductsInCart] = useState([]);
  const dispatch = useDispatch()

  const cart = useSelector(getCartItems);
  console.log(cart)

  useEffect(() => {
    const getCurrentUser = async()=>{
      try{
        const {data} = await axios.get('/api/current-user');
        dispatch(setUser(data))
        const {data:fart} = await axios.get("/api/cart");
        console.log(fart)
        dispatch(requestUserCart(fart))
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

  // return (
  //  <>
  //     <header>
  //         <Navbar
  //           handleCheckout={handleCheckout}
  //           productsInCart={productsInCart}
  //         />
  //       </header>
  //       <Suspense fallback={<div className="loading">Loading...</div>}>
  //         <main>
  //           <Routes>
  //             <Route path="/" element={<Store />} />
  //             <Route path="/category/:collection/product/:id" element={<Product />}/>
  //             <Route path="/product/:id" element={<Product />}/>
  //             <Route path="/store" element={<Store />} />
  //             <Route path="/checkout" element={<Checkout />} />
  //             <Route path="/success" element={<Sucess />} />
  //             <Route path="/collections" element={<Collection />} />
  //             <Route path="/category/:id" element={<Store />} />
  //             <Route path="/contact" element={<Contact />} />
  //             <Route path="/about" element={<About />} />
  //             <Route path="*" element={<NotFound />} />
  //           </Routes>
  //         </main>
  //       </Suspense>
  //  </>
  // )
}

export default App;
