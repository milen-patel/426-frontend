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

  clickedMap = (e) => {
    const walkCost = this.distanceInmBetweenEarthCoordinates(
      this.state.lat,
      this.state.lon,
      e.lat,
      e.lng
    );
    this.setState(() => ({
      walkLat: e.lat,
      walkLon: e.lng,
      walkCost: walkCost,
      shouldShowWalkOffer: true,
    }));
  };

  makeMove = async () => {
    const res = await axios({
      method: "post",
      url: "https://backend-426.herokuapp.com/api/user/move",
      headers: {
        "auth-token": token.val,
      },
      data: {
        lat: this.state.walkLat,
        lon: this.state.walkLon,
      },
    });

    const localProperties = await axios({
      method: "post",
      url: "https://backend-426.herokuapp.com/api/property/nearbyProperties",
      headers: {
        "auth-token": token.val,
      },
      data: {
        lat: res.data.data.lat,
        lon: res.data.data.lon,
        range: 500,
      },
    });

    this.setState(() => ({
      balance: res.data.data.balance,
      lat: res.data.data.lat,
      lon: res.data.data.lon,
      propertiesToShow: localProperties.data,
      shouldShowWalkOffer: false,
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

    let walkOffer;
    if (this.state.shouldShowWalkOffer) {
      walkOffer = (
        <div>
          Lat: {this.state.walkLat}
          <br />
          Lon: {this.state.walkLon}
          <br />
          Cost: {this.state.walkCost}
          <br />
          {this.state.balance > this.state.walkCost ? (
            <button type="button" onClick={this.makeMove}>
              Move
            </button>
          ) : (
            <button type="button">Insufficient Funds</button>
          )}
        </div>
      );
    }
    return (
      <div>
        <p>welcome</p>
        <p>
          <strong>Balance:</strong>
          {this.state.balance}
        </p>
        {walkOffer}
        <walkOffer />
        <Map userLat={this.state.lat} userLon={this.state.lon} properties={this.state.propertiesToShow} />
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

  walkOffer = (props) => {
    return <div>TODO</div>;
  };

  degreesToRadians = (degrees) => {
    return (degrees * Math.PI) / 180;
  };

  distanceInmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;

    var dLat = this.degreesToRadians(lat2 - lat1);
    var dLon = this.degreesToRadians(lon2 - lon1);

    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return 1000 * earthRadiusKm * c;
  }
}

export default Dashboard;
