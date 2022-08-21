import logo from "./logo.svg";
import { Route, Switch, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Navbar from "./components/navbar";
import Collection from "./components/collections";
import Contact from "./components/contact";
import About from "./components/about";
import NotFound from "./components/not-found";
import Product from "./components/product";
import Store from "./components/store";

class App extends Component {
  state = { productsInCart: [], loading: false };

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
    let loadingClass = "loading";
    let mainClass = "hide";
    if (!this.state.loading) {
      mainClass = "";
      loadingClass = "loading hide";
    }
    const { productsInCart } = this.state;
    return (
      <React.Fragment>
        <header>
          <Navbar
            onDelete={this.handleDelete}
            productsInCart={productsInCart}
          />
        </header>
        <p className={loadingClass}>Loading...</p>
        <main className={mainClass}>
          <Switch>
            <Route
              path="/category/product/:id"
              render={(props) => <Product onATC={this.handleATC} {...props} />}
            />
            <Route
              path="/product/:id"
              render={(props) => <Product onATC={this.handleATC} {...props} />}
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
      </React.Fragment>
    );
  }
}

export default App;
