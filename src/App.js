import { Route, Switch, Redirect } from "react-router-dom";
import React, { Component, lazy, Suspense } from "react";
import Navbar from "./components/navbar";
import Contact from "./components/contact";
import NotFound from "./components/not-found";

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

  componentDidMount() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 700);
  }

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

        <Suspense fallback={<div className="loading">Loading...</div>}>
          <main>
            <Switch>
              <Route
                path="/category/product/:id"
                render={(props) => (
                  <Product onATC={this.handleATC} {...props} />
                )}
              />
              <Route
                path="/product/:id"
                render={(props) => (
                  <Product onATC={this.handleATC} {...props} />
                )}
              />
              <Route path="/category/:id" component={Store} />
              <Route path="/collections" component={Collection} />
              <Route path="/store" component={Store} />
              <Route path="/contact" component={Contact} />
              <Route path="/about" component={About} />
              <Route path="/not-found" component={NotFound} />
              <Redirect exact from="/" to="/store" />
              <Redirect to="/not-found" />
            </Switch>
          </main>
        </Suspense>
      </React.Fragment>
    );
  }
}

export default App;
