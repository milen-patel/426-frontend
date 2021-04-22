  let PropertyOnMap = (props) => {
    return (
      <div lat={props.location[0]} lng={props.location[1]}>
        <button>{props.name}</button>
      </div>
    );
  };

  export default PropertyOnMap;