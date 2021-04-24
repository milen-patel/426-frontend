// React Imports
import React from "react"; 
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router"

// Component Imports
import Register from "./components/Register";
import Login from "./components/Login";
import AccountInfoView from "./components/AccountInfoView";
import Dashboard from "./components/Dashboard";
<<<<<<< HEAD
import { useHistory } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import "./app.css";
//import Jumbotron from 'react-bootstrap/Jumbotron'

=======
>>>>>>> a9a957690fc18d2be0cb9c8dd1c6b35778ecb22e

function App() {
  // Hook for changing browser destination
  let history = useHistory();

    return (
      <Switch>
        <Route exact path="/426-frontend/">
          <div class = 'container'>
            <div class ='row-md-6'>
              <div class ='col-md-6'>
                <div class = 'card'>
                  <form>
                    <h1 class="display-3">Welcome to the Game</h1>
                    <button  onClick={() => {
                      history.push("/426-frontend/login")
                    }}>Move to Login</button>
                    <button  onClick={() => {
                      history.push("/426-frontend/register")
                    }}>Move to Register</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
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
