import axios from "axios";
import React from "react";
import { token } from "../token";
import { Redirect } from "react-router-dom";

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
      properties: res.data.data.properties.length,
    }));
  }

  validateToken = () => {
    return true;
  };

  onRedirectRequest = () => {
    this.setState(() => ({
      redirect: true,
    }));
  };

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
            {this.state.balance}
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
            <strong>Location: </strong>
            {this.state.location}
          </li>
          <li>
            <strong>Properties: </strong>
            {this.state.properties}
          </li>
        </ul>
        <hr />
        <h1>Your Properties:</h1>
        <hr />
      </div>
    );
  }
}

export default AccountInfoView;
