import { Route, Routes } from "react-router-dom";
import React, { lazy, Suspense, useState} from "react";
import Navbar from "./components/navbar";
import Contact from "./components/contact";
import NotFound from "./components/not-found";
import { Provider } from "react-redux";
import { store } from "./app/store";

// Lazy load components
const Collection = lazy(() => import("./components/collections"));
const Store = lazy(() => import("./components/store"));
const Product = lazy(() => import("./components/product"));
const About = lazy(() => import("./components/about"));

function App() {
  const [productsInCart, setProductsInCart] = useState([]);

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
    <Provider store={store}>
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
      </Provider>
  )
}

export default App;
