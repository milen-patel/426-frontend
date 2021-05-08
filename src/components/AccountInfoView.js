import React from "react";
import { Redirect } from "react-router-dom";
import { token } from "../token";
import axios from "axios";
import PropertyOwnershipList from "./PropertyOwnershipList";
import "./accountinfoview.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// Response for loading the personal account information pages
class AccountInfoView extends React.Component {
  constructor() {
    super();
    this.state = {
      multiplier: 1.0,
    };
  }

  // First time the component is rendered, fetch data
  async componentDidMount() {
    // Validate that the user has authenticated
    if (!token.val) {
      // Don't fetch, render will automatically redirect the user
      return;
    }

    // Call backend for account information
    const res = await axios({
      method: "get",
      url: "https://backend-426.herokuapp.com/api/user/accountInformation",
      headers: {
        "auth-token": token.val,
      },
    });

    // If the call fails, redirect the user
    if (res.data.error) {
      window.location.href = "../login";
    }

    // Set the state based on the result of the call
    this.setState(() => ({
      email: res.data.data.email,
      name: res.data.data.name,
      created: res.data.data.accountCreatedDate,
      balance: res.data.data.balance,
      multiplier: res.data.data.multiplier,
      maxProperties: res.data.data.maxProperties,
      experience: res.data.data.experience,
      location: res.data.data.location,
      numProperties: res.data.data.properties.length,
      properties: res.data.properties,
    }));
  }

  // Handler if the user requests to upgrade their income multiplier
  onUpgradeMultiplier = async () => {
    // Make sure that they have enough money
    if (this.state.balance <= 1000000) {
      alert("You don't have enough money for this transaction!");
      return;
    }

    // Call API for upgrading
    const res = await axios({
      method: "post",
      url: "https://backend-426.herokuapp.com/api/user/increaseMultiplier",
      headers: {
        "auth-token": token.val,
      },
    });

    // Abort if error
    if (res.data.error) {
      alert("Unable to upgrade!");
      return;
    }

    // Update state after API Call
    this.setState(() => ({
      balance: res.data.data.balance,
      multiplier: res.data.data.multiplier,
    }));
  };

  // Handler for if the user requests to upgrade their property limit
  onUpgrade = async () => {
    // Make sure that they have enough money
    if (this.state.balance <= this.state.maxProperties ** 3) {
      alert("You don't have enough money for this transaction!");
      return;
    }

    // Call API for upgrading
    const res = await axios({
      method: "post",
      url: "https://backend-426.herokuapp.com/api/user/buyLevel",
      headers: {
        "auth-token": token.val,
      },
    });

    // Abort if error
    if (res.data.error) {
      alert("Unable to upgrade!");
      return;
    }

    // Update state after API Call
    this.setState(() => ({
      balance: res.data.data.balance,
      maxProperties: res.data.data.maxProperties,
    }));
  };

  // Handler for if the user wants to go back to the dashboard
  onRedirectRequest = () => {
    // Update state so we render a <Redirect> tag
    this.setState(() => ({
      redirect: true,
    }));
  };

  //Handler if the user wants to go to the leaderboard
  onLeaderboardRequest = () => {
    // Update state so we render a <Redirect> tag
    this.setState(() => ({
      redirectLeader: true,
    }));
  };

  // Helper function for converting big integers into dollar readable format
  numberWithCommas(x) {
    if (!x) {
      return "$0";
    }
    x = parseFloat(x.toFixed(2));
    return "$" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Handler if the user requests to sell a property
  onSell = async (email, propertyId, tier) => {
    // Defer to backend
    const res = await axios({
      method: "post",
      url: "https://backend-426.herokuapp.com/api/property/sell",
      headers: {
        "auth-token": token.val,
      },
      data: {
        email: email,
        id: propertyId,
        tier: tier,
      },
    });

    // Update state with properties that may have changed
    this.setState(() => ({
      maxProperties: res.data.data.maxProperties,
      location: res.data.data.user.location,
      numProperties: res.data.data.user.properties.length,
      properties: res.data.data.properties,
    }));
  };

  render() {
    // Validate token
    if (!token.val) {
      return <Redirect to="/Earth3-Frontend/login"></Redirect>;
    }

    // If the user has requested to go back to the dashboard
    if (this.state.redirect) {
      return <Redirect to="/Earth3-Frontend/dashboard"></Redirect>;
    }

    // If user wants to visit leaderboard
    if (this.state.redirectLeader) {
      return <Redirect to="/Earth3-Frontend/leaderboard"></Redirect>;
    }

    return (
      <div className="ml back">

        <button
          type="button"
          className="btn btn-outline-dark btn-rounded ml mt tbuttons"
          data-mdb-ripple-color="dark"
          onClick={this.onRedirectRequest}>Go Back to Dashboard</button>
        <button
          type="button"
          className="btn btn-outline-dark btn-rounded ml mt tbuttons"
          data-mdb-ripple-color="dark"
          onClick={this.onLeaderboardRequest}>Go to Leaderboard</button>
        <hr />
        <div>
          <h1 className="ml">Account Information:</h1>
          <ul>
            <li>
              <strong>Email: </strong>
              {this.state.email}
            </li>
            <li>
              <strong>Name: </strong>
              {this.state.name}
            </li>
            <li>
              <strong>Account Created On: </strong>
              {this.state.created}
            </li>
            <li>
              <strong>Balance: </strong>
              {this.numberWithCommas(this.state.balance)}
            </li>
            <li>
              <strong>Maximum Properties: </strong>
              {this.state.maxProperties}
            </li>
            <li>
              <strong>Total Earnings: </strong>
              {this.numberWithCommas(this.state.experience)}
            </li>
            <li>
              <strong>Multiplier: </strong>
              {this.state.multiplier.toFixed(2)}
            </li>
            <li>
              <strong>Latitude: </strong>
              {this.state.location ? this.state.location[0] : ""}
            </li>
            <li>
              <strong>Longitude: </strong>
              {this.state.location ? this.state.location[1] : ""}
            </li>
            <li>
              <strong>Number of Properties: </strong>
              {this.state.numProperties}
            </li>
          </ul>
          <hr />
          <h1 className="ml">Upgrades</h1>
          <p className="ml">
            You can currently own up to {this.state.maxProperties} properties and
          you currently own {this.state.numProperties}. You can upgrade to{" "}
            {2 * this.state.maxProperties} slots for{" "}
            {this.numberWithCommas(this.state.maxProperties ** 3)}
          </p>
          {this.state.balance >= this.state.maxProperties ** 3 ? (
            <button
              type="button"
              className="btn btn-outline-success btn-rounded ml ms mbuttons"
              data-mdb-ripple-color="dark"
              onClick={this.onUpgrade}>Upgrade</button>
          ) : (
            <button
              type="button"
              className="btn btn-outline-danger btn-rounded ml ms mbuttons"
              data-mdb-ripple-color="dark">Not Enough funds!</button>
          )}
          <p className="ml">
            Your income multiplier is currently {this.state.multiplier.toFixed(2)}
          . You can upgrade to {(this.state.multiplier + 0.01).toFixed(2)} for
          $1,000,000
        </p>
          {this.state.balance >= 1000000 ? (
            <button
              type="button"
              className="btn btn-outline-success btn-rounded ml ms mbuttons"
              data-mdb-ripple-color="dark"
              onClick={this.onUpgradeMultiplier}>Upgrade</button>
          ) : (
            <button
              type="button"
              className="btn btn-outline-danger btn-rounded ml ms mbuttons"
              data-mdb-ripple-color="dark">Not Enough Funds!</button>
          )}
          <hr />
        </div>
        <h1 className="ml">Your Properties:</h1>
        <div className="wrapper">

          <PropertyOwnershipList
            items={this.state.properties}
            email={this.state.email}
            onSell={this.onSell.bind(this)}
          />


        </div>

      </div>
    );
  }
}

export default AccountInfoView;
