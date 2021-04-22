import React from "react";
import GoogleMapReact from "google-map-react";
import PropertyOnMap from "./PropertyOnMap";
import UserOnMap from "./UserOnMap";

function Map(props) {
    let propertyVisuals;
    if (props.properties) {
        propertyVisuals = props.properties.map(e => PropertyOnMap(e));
    }
    console.log(9);
    
    return (
          <div style={{ width: "500px", height: "500px" }}>
            <GoogleMapReact
              onChange={(e) => console.log(e)}
              bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                language: "en",
                region: "US",
              }}
              center={{ lat: props.userLat, lng: props.userLon }}
              defaultZoom={15}
            >
                {propertyVisuals}
                <UserOnMap lat={props.userLat} lng={props.userLon} name={"Me"} />
            </GoogleMapReact>
          </div>

    );

}

export default Map;