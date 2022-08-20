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
  state = {};
  render() {
    return (
      <React.Fragment>
        <header>
          <Navbar />
        </header>
        <main>
          <Switch>
            <Route path="/product/:id" component={Product} />
            <Route path="/collections" component={Collection} />
            <Route path="/category/:id" component={Store} />
            <Route path="/category/:id" component={Store} />
            <Route path="/store" component={Store} />
            <Route path="/contact" component={Contact} />
            <Route path="/about" component={About} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/product/:id" component={Product} />
            <Redirect exact from="/" to="/store" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
