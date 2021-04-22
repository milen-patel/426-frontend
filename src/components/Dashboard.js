import axios from "axios";
import React from "react";
import { token } from "../token";
import { Redirect } from "react-router-dom";
import Map from "./Map";

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

    //console.log(re)
    console.log(localProperties.data);
  }

  validateToken = () => {
    return true;
  };

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
    console.log('made it here');
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

    console.log("Nearby properies:");
    console.log(localProperties);

    this.setState(() => ({
      balance: res.data.data.balance,
      lat: res.data.data.lat,
      lon: res.data.data.lon,
      propertiesToShow: localProperties.data,
    }));
  };

  render() {
    // Validate token
    if (!token.val || !this.validateToken()) {
      return <Redirect to="/426-frontend/login"></Redirect>;
    }

    // Show Nearby Properties in a List
    let nearbyPropertiesList;
    if (this.state.propertiesToShow) {
      nearbyPropertiesList = this.state.propertiesToShow.map((e) => {
        return <this.propertyListEntry info={e}></this.propertyListEntry>;
      });
    }

    return (
      <div>
        <p>welcome</p>
        <p>
          <strong>Balance:</strong>
          {this.state.balance}
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
          {nearbyPropertiesList}
        </div>
      </div>
    );
  }

  propertyListEntry = (props) => {
    return (
      <div>
        <h1>Name: {props.info.name}</h1>
        <h5>Value: {props.info.value}</h5>
        <h5>Hourly Income: {props.info.income}</h5>
        <h5>Level: {props.info.level}</h5>
        <h5>Tier 1 Owner: {props.info.ownerEmailT1}</h5>
        <hr />
      </div>
    );
  };
}

export default Dashboard;
