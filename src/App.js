// React Imports
import React from "react"; 
import { Route, Switch } from "react-router-dom";

// Component Imports
import Register from "./components/Register";
import Login from "./components/Login";
import AccountInfoView from "./components/AccountInfoView";
import Dashboard from "./components/Dashboard";
import Leaderboard from "./components/Leaderboard";
import Homepage from "./components/Homepage";
import 'bootstrap/dist/css/bootstrap.min.css';

//import Jumbotron from 'react-bootstrap/Jumbotron'


function App() {
    return (
      <Switch>
        <Route exact path="/Earth3-Frontend/">
          <Homepage /> 
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
