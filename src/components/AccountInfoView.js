import axios from "axios";
import React from "react";
import { token } from "../token";
import { Redirect } from "react-router-dom";
import PropertyOwnershipList from "./PropertyOwnershipList";

class AccountInfoView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    if (!token.val) {
      return;
    }

    const res = await axios({
      method: "get",
      url: "https://backend-426.herokuapp.com/api/user/accountInformation",
      headers: {
        "auth-token": token.val,
      },
    });
    if (res.data.error) {
      window.location.href = "../login";
    }

    console.log(res);
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

  onUpgrade = async () => {
   if (this.state.balance <= this.state.maxProperties**3) {
     return;
   } 
    const res = await axios({
      method: "post",
      url: "https://backend-426.herokuapp.com/api/user/buyLevel",
      headers: {
        "auth-token": token.val,
      },
    });

    console.log(res);

    if (res.data.error) {
      alert("Unable to upgrade!");
      return;
    } else {
      this.setState(() => ({
        balance: res.data.data.balance,
        maxProperties: res.data.data.maxProperties,
      }));
    }

  }


  validateToken = () => {
    return true;
  };

  onRedirectRequest = () => {
    this.setState(() => ({
      redirect: true,
    }));
  };

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

    if (this.state.redirect) {
      return <Redirect to="/426-frontend/dashboard"></Redirect>;
    }

    return (
      <div>
        <p>welcome</p>
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
          {2 * this.state.maxProperties} slots for {this.numberWithCommas(this.state.maxProperties ** 3)}
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
