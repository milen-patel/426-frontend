import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { token } from "../token";
import Map from "./Map";
import PropertyListVisualizer from "./PropertyListVisualizer";

// Responsible for rendering the dashboard shown to the user after authentication
class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  // When the component first loads, fetch information
  async componentDidMount() {
    if (!token.val || !this.validateToken()) {
      return;
    }

    // Call the backend to get user account information
    const res = await axios({
      method: "get",
      url: "https://backend-426.herokuapp.com/api/user/accountInformation",
      headers: {
        "auth-token": token.val,
      },
    });

    // If the call fails, redirect user to authenticate
    if (res.data.error) {
      window.location.href = "../login";
    }

    // Call backend to find properties to show on the map
    const localProperties = await axios({
      method: "post",
      url: "https://backend-426.herokuapp.com/api/property/nearbyProperties",
      headers: {
        "auth-token": token.val,
      },
      data: {
        lat: res.data.data.location[0],
        lon: res.data.data.location[1],
        range: 500,
      },
    });

    // If the call fails, redirect user to authenticate
    if (res.data.error) {
      window.location.href = "../login";
    }

    // Store both results in state
    this.setState(() => ({
      balance: res.data.data.balance,
      lat: res.data.data.location[0],
      lon: res.data.data.location[1],
      propertiesToShow: localProperties.data,
    }));
  }

  validateToken = () => {
    return true;
  };

  // If the user requests to go to the account view page
  changePage = () => {
    // Update state so we render a Redirect tag
    this.setState(() => ({
      redirect: <Redirect to="/426-frontend/personal"></Redirect>,
    }));
  }

  // If the user requests to make a move on the map
  makeMove = async (walkLat, walkLon) => {
    // Immediately call backend
    const res = await axios({
      method: "post",
      url: "https://backend-426.herokuapp.com/api/user/move",
      headers: {
        "auth-token": token.val,
      },
      data: {
        lat: walkLat,
        lon: walkLon,
      },
    });

    // Get the new properties that are nearby the user
    const localProperties = await axios({
      method: "post",
      url: "https://backend-426.herokuapp.com/api/property/nearbyProperties",
      headers: {
        "auth-token": token.val,
      },
      data: {
        lat: walkLat,
        lon: walkLon,
        range: 500,
      },
    });

    // Update state accordingly
    this.setState(() => ({
      balance: res.data.data.balance,
      lat: res.data.data.lat,
      lon: res.data.data.lon,
      propertiesToShow: localProperties.data,
    }));
  };

  // Handler if the user requests to buy a certain tier of a property
  makePurchase = async (id, tier) => {
    // Defer to backend
    const res = await axios({
      method: "post",
      url: "https://backend-426.herokuapp.com/api/property/buy",
      headers: {
        "auth-token": token.val,
      },
      data: {
        propertyId: id,
        tier: tier,
      },
    });

    // Refresh property information
    const localProperties = await axios({
      method: "post",
      url: "https://backend-426.herokuapp.com/api/property/nearbyProperties",
      headers: {
        "auth-token": token.val,
      },
      data: {
        lat: this.state.lat,
        lon: this.state.lon,
        range: 500,
      },
    });


    // Handle results and possible error
    if (res.data.error) {
      this.setState(() => ({
        propertiesToShow: localProperties.data,
      }));
    } else {
      this.setState(() => ({
        balance: res.data.data.user.balance,
        propertiesToShow: localProperties.data,
      }));
    }
  };

  // Helper for turning big int into dollar readable format
  numberWithCommas(x) {
    if (!x) {
      return "";
    }
    return "$"+x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    // Validate token
    if (!token.val || !this.validateToken()) {
      return <Redirect to="/426-frontend/login"></Redirect>;
    }

    return (
      <div>
        <p>welcome</p>
        {this.state.redirect}
        <button onClick={this.changePage}>
          Go to Account View
        </button>
        <p>
          <strong>Balance:</strong>
          {this.numberWithCommas(this.state.balance)}
        </p>
        <Map
          userLat={this.state.lat}
          userLon={this.state.lon}
          properties={this.state.propertiesToShow}
          userBalance={this.state.balance}
          moveHandler={this.makeMove.bind(this)}
        />
        <div>
          <hr />
          <PropertyListVisualizer
            items={this.state.propertiesToShow}
            balance={this.state.balance}
            handler={this.makePurchase}
          />
        </div>
      </div>
    );
  }
}

export default Dashboard;
