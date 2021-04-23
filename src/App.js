// React Imports
import React from "react"; 
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router"

// Component Imports
import Register from "./components/Register";
import Login from "./components/Login";
import AccountInfoView from "./components/AccountInfoView";
import Dashboard from "./components/Dashboard";

function App() {
  // Hook for changing browser destination
  let history = useHistory();

    return (
      <Switch>
        <Route exact path="/426-frontend/">
          <p>Homepage</p>
          <button onClick={() => {
            history.push("/426-frontend/login")
          }}>Move to Login</button>
          <button onClick={() => {
            history.push("/426-frontend/register")
          }}>Move to Register</button>
        </Route>
        <Route path="/426-frontend/login">
          <Login />
        </Route>
        <Route path="/426-frontend/register">
          <Register />
        </Route>
        <Route path="/426-frontend/personal">
          <AccountInfoView />
        </Route>
        <Route path="/426-frontend/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    );
}

export default App;
