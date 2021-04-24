import React from "react";
import { Redirect } from "react-router-dom";
import { token } from "../token";
import axios from "axios";
import PropertyOwnershipList from "./PropertyOwnershipList";

// Response for loading the personal account information pages
class AccountInfoView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  // First time the component is rendered, go get data
  async componentDidMount() {
    // Validate that the user has authenticated
    if (!token.val) {
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
      maxProperties: res.data.data.maxProperties,
      experience: res.data.data.experience,
      location: res.data.data.location,
      numProperties: res.data.data.properties.length,
      properties: res.data.properties,
    }));
  }

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

  validateToken = () => {
    return true;
  };

  // Handler for if the user wants to go back to the dashboard
  onRedirectRequest = () => {
    // Update state so we render a <Redirect> tag
    this.setState(() => ({
      redirect: true,
    }));
  };

  // Helper function for converting big integers into dollar readable format
  numberWithCommas(x) {
    if (!x) {
      return "";
    }
    return "$" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    // Validate token
    if (!token.val || !this.validateToken()) {
      return <Redirect to="/426-frontend/login"></Redirect>;
    }

    // If the user has requested to go back to the dashboard
    if (this.state.redirect) {
      return <Redirect to="/426-frontend/dashboard"></Redirect>;
    }

    return (
      <div>
        <p>Welcome</p>
        <button onClick={this.onRedirectRequest}>Go Back to Dashboard</button>
        <button>Go to Leaderboard</button>
        <hr />
        <h1>Account Information:</h1>
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
            <strong>Experience: </strong>
            {this.state.experience}
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
        <h1>Upgrades</h1>
        <p>
          You can currently own up to {this.state.maxProperties} properties and
          you currently own {this.state.numProperties}. You can upgrade to{" "}
          {2 * this.state.maxProperties} slots for{" "}
          {this.numberWithCommas(this.state.maxProperties ** 3)}
        </p>
        {this.state.balance >= this.state.maxProperties ** 3 ? (
          <button onClick={this.onUpgrade}>Upgrade</button>
        ) : (
          <button>Not enough funds!</button>
        )}
        <hr />
        <h1>Your Properties:</h1>
        <PropertyOwnershipList items={this.state.properties} />
        <hr />
      </div>
    );
  }
}

export default AccountInfoView;
