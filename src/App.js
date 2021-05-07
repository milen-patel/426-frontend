// React Imports
import React from "react"; 
import { Route, Switch } from "react-router-dom";

// Component Imports
import Register from "./components/Register";
import Login from "./components/Login";
import AccountInfoView from "./components/AccountInfoView";
import Dashboard from "./components/Dashboard";
import Leaderboard from "./components/Leaderboard";
import { useHistory } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./app.css";
//import Jumbotron from 'react-bootstrap/Jumbotron'


function App() {
  // Hook for changing browser destination
  let history = useHistory();

    return (
      <Switch>
        <Route exact path="/Earth3-Frontend/">
          <div class = 'container'>
            <div class ='row-md-6'>
              <div class ='col-md-6'>
                <div class = 'card'>
                  <form>
                    <h1 class="display-3">Welcome to the Game</h1>
                    <button  onClick={() => {
                      history.push("/Earth3-Frontend/login")
                    }}>Move to Login</button>
                    <button  onClick={() => {
                      history.push("/Earth3-Frontend/register")
                    }}>Move to Register</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Route>
        <Route path="/Earth3-Frontend/login">
          <Login />
        </Route>
        <Route path="/Earth3-Frontend/register">
          <Register />
        </Route>
        <Route path="/Earth3-Frontend/personal">
          <AccountInfoView />
        </Route>
        <Route path="/Earth3-Frontend/dashboard">
          <Dashboard />
        </Route>
        <Route path="/Earth3-Frontend/leaderboard">
          <Leaderboard />
        </Route>
      </Switch>
    );
}

export default App;
