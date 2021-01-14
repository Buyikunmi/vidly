import React, { Component, Fragment } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import Movies from "./components/movies";
import Navbar from "./components/navbar";
import Rentals from "./common/rentals";
import Customers from "./common/customers";
import NotFound from "./common/notFound";
import MovieForm from "./common/movieForm";
import LoginForm from "./common/loginForm";
import RegisterForm from "./common/registerForm";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <main className="container">
          <Switch>
            {" "}
            <Route path="/movies/new" component={MovieForm} />
            <Route
              path="/movies/:id"
              render={(props) => <MovieForm {...props} />}
            />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/not-found" component={NotFound} />
            <Route exact path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route exact path="/" component={Movies} />
            <Redirect exact from="/" to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </Fragment>
    );
  }
}
export default App;
