import icon from "./MapMarkerIcon.png";

let PropertyOnMap = (props) => {
  return (
    <div key={props.name}>
      <img src={icon} style={{ width: "25px" }} alt={""} onClick={() =>{props.onHover(props.location)}}/>
        {props.$hover ?props.name :""}
    </div>
  );
};

export default PropertyOnMap;
