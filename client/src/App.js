import { Route, Routes } from "react-router-dom";
import React, { lazy, Suspense, useEffect, useState} from "react";
import Navbar from "./components/navbar";
import Contact from "./pages/contact";
import NotFound from "./pages/not-found";
import { Provider, useDispatch } from "react-redux";

import {setUser} from './slices/userSlice'
import axios from "axios";
import { setProducts } from "./slices/productSlice";

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
      try{
        const {data} = await axios.get('/api/current-user');
        dispatch(setUser(data))
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

  const handleATC = (product, itemsCount) => {
    let edited = false;
    let newProductsInCart = [...productsInCart].map((p) => {
      if (p._id === product._id) {
        p.itemsCount = p.itemsCount + itemsCount;
        edited = true;
        return product;
      }
      return p;
    });

    if (!edited) {
      product.itemsCount = itemsCount;
      newProductsInCart.push(product);
    }
    setProductsInCart(newProductsInCart);
  };

  const handleDelete = (id) => {
    let newProductsInCart = [...productsInCart];
    newProductsInCart = newProductsInCart.filter((p) => p._id !== id);
    setProductsInCart(newProductsInCart);
  };

  return (
   <>
      <header>
          <Navbar
            handleCheckout={handleCheckout}
            onDelete={handleDelete}
            productsInCart={productsInCart}
          />
        </header>
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <main>
            <Routes>
              <Route path="/" element={<Store />} />
              <Route path="/category/:collection/product/:id" element={<Product onATC={handleATC} />}/>
              <Route path="/product/:id" element={<Product onATC={handleATC} />}/>
              <Route path="/store" element={<Store />} />
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
