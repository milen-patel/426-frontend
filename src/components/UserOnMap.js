import icon from "./UserOnMapIcon.png";

// Responsible for showing the user on the map
function UserOnMap(props) {
  return (
    <div>
      <img
        src={icon}
        style={{ width: "30px" }}
        alt={"User visualized on the map."}
      />
    </div>
  );
}

export default UserOnMap;
