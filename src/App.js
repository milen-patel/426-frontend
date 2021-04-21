import React, { Component } from "react"; //different
import { Route, Switch } from "react-router-dom";
import "./components/Register";
import Register from "./components/Register";
import Login from "./components/Login";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/426-frontend/">
          <p>Homepage</p>
        </Route>
        <Route path="/426-frontend/login">
          <Login />
        </Route>
        <Route path="/426-frontend/register">
          <Register />
        </Route>
        <Route path="/426-frontend/portal">
          <p>Authenticated Page</p>
        </Route>
      </Switch>
    );
  }
}

export default App;
