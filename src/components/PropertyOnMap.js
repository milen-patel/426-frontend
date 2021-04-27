import icon from "./MapMarkerIcon.png";

// Responsible for showing an individual property on the map
let PropertyOnMap = (props) => {
  return (
    <div key={props.name}>
      <img
        src={icon}
        style={{ width: "25px" }}
        alt={"Property visualized on the map"}
        onClick={() => {
          props.onHover(props.location);
        }}
      />
      {props.$hover ? props.name : ""}
    </div>
  );
};

export default PropertyOnMap;
