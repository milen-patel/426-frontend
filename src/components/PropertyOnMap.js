  let PropertyOnMap = (props) => {
    return (
      <div key ={props.name}>
        <button>{props.name}</button>
      </div>
    );
  };

  export default PropertyOnMap;