import React, { Component } from "react"; //different
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/426-frontend/">
          <p>Homepage</p>
        </Route>
        <Route path="/426-frontend/login">
          <p>Login</p>
        </Route>
        <Route path="/426-frontend/register">
          <p>Register</p>
        </Route>
      </Switch>
    );
  }
}

export default App;
