import { Route, Routes } from "react-router-dom";
import React, { Component, lazy, Suspense } from "react";
import Navbar from "./components/navbar";
import Contact from "./components/contact";
import NotFound from "./components/not-found";
import * as queryString from "query-string"

// Lazy load components
const Collection = lazy(() => import("./components/collections"));
const Store = lazy(() => import("./components/store"));
const Product = lazy(() => import("./components/product"));
const About = lazy(() => import("./components/about"));

class App extends Component {
  state = { productsInCart: [], loading: false };

  handleCheckout = () => {
    console.log("checkout");
    this.setState({ productsInCart: [] });
  };

  handleATC = (product, itemsCount) => {
    let edited = false;
    let productsInCart = [...this.state.productsInCart].map((p) => {
      if (p._id === product._id) {
        p.itemsCount = p.itemsCount + itemsCount;
        edited = true;
        return product;
      }
      return p;
    });
    if (!edited) {
      product.itemsCount = itemsCount;
      productsInCart.push(product);
    }
    this.setState({ productsInCart });
  };

  handleDelete = (id) => {
    let productsInCart = [...this.state.productsInCart];
    productsInCart = productsInCart.filter((p) => p._id !== id);
    this.setState({ productsInCart });
  };


  // This is to generate a query string
  queryString = queryString.stringify({
    client_id: "1030463715027-p7jmac6ju1iia3fbj6a09d6hnt866ec1.apps.googleusercontent.com",
    redirect_uri: 'http://localhost:5000/api/auth/google/callback',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '), // space seperated string
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });
  
  // This link takes the user from client to google's sign in page
  googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${this.queryString}`;


  render() {
    const { productsInCart } = this.state;
    return (
      <React.Fragment>
        <header>
          <Navbar
            handleCheckout={this.handleCheckout}
            onDelete={this.handleDelete}
            productsInCart={productsInCart}
          />
        </header>

        

  <a href={this.googleLoginUrl}>
    Login with Google
  </a>


        <Suspense fallback={<div className="loading">Loading...</div>}>
          <main>
            <Routes>
              <Route path="/" element={<Store />} />
              <Route path="/category/:collection/product/:id" element={<Product onATC={this.handleATC} />}/>
              <Route path="/product/:id" element={<Product onATC={this.handleATC} />}/>
              <Route path="/store" element={<Store />} />
              <Route path="/collections" element={<Collection />} />
              <Route path="/category/:id" element={<Store />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </Suspense>
      </React.Fragment>
    );
  }
}

export default App;
