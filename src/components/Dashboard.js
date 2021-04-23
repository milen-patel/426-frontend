import axios from "axios";
import React from "react";
import { token } from "../token";
import { Redirect } from "react-router-dom";
import Map from "./Map";
import PropertyListVisualizer from "./PropertyListVisualizer";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    if (!token.val || !this.validateToken()) {
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

  changePage = () => {
    this.setState(() => ({
      redirect: <Redirect to="/426-frontend/personal"></Redirect>,
    }));
  }

  makeMove = async (walkLat, walkLon) => {
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

    this.setState(() => ({
      balance: res.data.data.balance,
      lat: res.data.data.lat,
      lon: res.data.data.lon,
      propertiesToShow: localProperties.data,
    }));
  };

  makePurchase = async (id, tier) => {
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
    console.log(res);
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
