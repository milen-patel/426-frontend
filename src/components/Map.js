import React from "react";
import GoogleMapReact from "google-map-react";
import PropertyOnMap from "./PropertyOnMap";
import UserOnMap from "./UserOnMap";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walkLat: this.props.userLat,
      walkLon: this.props.userLon,
      walkCost: 0,
    };
  }

  clickedMap = (e) => {
    const walkCost = this.distanceInmBetweenEarthCoordinates(
      this.props.userLat,
      this.props.userLon,
      e.lat,
      e.lng
    );
    this.setState(() => ({
      walkLat: e.lat,
      walkLon: e.lng,
      walkCost: walkCost.toFixed(2),
    }));
  };


  onHover = (e) => {
    // Take the location and find the correct property
    const target = this.props.properties.find((c) => {
      return ((c.location[0] === e[0]) && (c.location[1] === e[1]))
    })
    console.log("E");

    //Update state
    this.setState(() => ({
      hoverInfo: target,
    }));

  }

  render() {
    let walkOffer;
      walkOffer = (
        <div>
          <hr />
          <strong>Latitude:</strong> {this.state.walkLat}
          <br />
          <strong>Longitude: </strong>{this.state.walkLon}
          <br />
          <strong>Cost: </strong>${this.state.walkCost}
          <br />
          {this.props.userBalance > this.state.walkCost ? (
            <button
              type="button"
              onClick={async () => {
                // Only call API if they are moving to a new location
                if (this.state.walkCost === 0) {
                  return;
                }

                if (await this.props.moveHandler(this.state.walkLat, this.state.walkLon)) {
                  // Now it costs no money to move where we are
                  this.setState(() => ({walkCost: 0}));
                }
              }}
            >
              Move
            </button>
          ) : (
            <button type="button">Insufficient Funds</button>
          )}
          <hr />
        </div>
      );

    let propertyVisuals;
    if (this.props.properties) {
      propertyVisuals = this.props.properties.map((e) => (
        <PropertyOnMap
          location={e.location}
          name={e.name}
          lat={e.location[0]}
          lng={e.location[1]}
          key={e.location[0]+""+e.location[1]}
          onHover={this.onHover}
        />
      ));
    }

    let hoverVisuals = "Click a property for more details";
    if (this.state.hoverInfo) {
      //hoverVisuals = (<div>
      //<PropertyListVisualizer items={[this.state.hoverInfo]} handler={this.props.focusHandler} />
      //</div>);
      hoverVisuals = (
        <div>
          <h5>Name: {this.state.hoverInfo.name}</h5>
          <h5>Value: {this.state.hoverInfo.value}</h5>
          <h5>Income: {this.state.hoverInfo.hourlyIncome}</h5>
        </div>
      )
    }

    return (
      <div>
        {walkOffer}
        {hoverVisuals}
        <div style={{ width: "500px", height: "500px" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
              language: "en",
              region: "US",
            }}
            center={{ lat: this.props.userLat, lng: this.props.userLon }}
            defaultZoom={15}
            onClick={this.clickedMap}
          >
            {propertyVisuals}
            <UserOnMap
              lat={this.props.userLat}
              lng={this.props.userLon}
              name={"Me"}
            />
          </GoogleMapReact>
        </div>
      </div>
    );
  }

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

export default Map;
