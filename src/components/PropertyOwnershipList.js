// Responsible for generating the list of properties owned by the current user
import "./propertyowner.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function PropertyOwnershipList(props) {
  // If user owns no properties, stop
  if (!props.items) {
    return <h1>Buy Properties to Get Started...</h1>;
  }

  let processed = "";

  processed = props.items.map((e) => {
    return (
      
      <div className="card cpo" key={e._id}>
        <h1 className="ct tm">{e.name}</h1>
        <h7 className="ct">Hourly Income: {e.hourlyIncome}</h7>
        <h7 className="ct">Base Value: {e.value}</h7>
        <h7 className="ct">Level:{e.level} </h7>
        <h4 className="ct">Owners:</h4>
        <ul className="ct c ">

          <li className="ct mg">

            Tier 1:  {e.ownerEmailT1 ? e.ownerEmailT1 : <em>Unowned  </em>}
            {e.ownerEmailT1 === props.email ? (

              <button
                type="button"
                className="btn btn-outline-warning btn-rounded sbtn"
                data-mdb-ripple-color="dark"
                onClick={() => {
                  props.onSell(props.email, e._id, 1);
                }}
              >
                Sell
              </button>
            ) : (
              ""
            )}
          </li>
          <li className="ct mg">
            Tier 2: {e.ownerEmailT2 ? e.ownerEmailT2 : <em>Unowned  </em>}
            {e.ownerEmailT2 === props.email ? (
              <button
                type="button"
                className="btn btn-outline-warning btn-rounded sbtn"
                data-mdb-ripple-color="dark"
                onClick={() => {
                  props.onSell(props.email, e._id, 2);
                }}
              >
                Sell
              </button>
            ) : (
              ""
            )}
          </li>
          <li className="ct mg ">
            Tier 3: {e.ownerEmailT3 ? e.ownerEmailT3 : <em>Unowned</em>}
            {e.ownerEmailT3 === props.email ? (
              <button
                type="button"
                className="btn btn-outline-warning btn-rounded sbtn"
                data-mdb-ripple-color="dark"
                onClick={() => {
                  props.onSell(props.email, e._id, 3);
                }}
              >
                Sell
              </button>
            ) : (
              ""
            )}
          </li>
          <li className="ct mg">
            Tier 4: {e.ownerEmailT4 ? e.ownerEmailT4 : <em>Unowned  </em>}
            {e.ownerEmailT4 === props.email ? (
              <button
                type="button"
                className="btn btn-outline-warning btn-rounded sbtn"
                data-mdb-ripple-color="dark"
                onClick={() => {
                  props.onSell(props.email, e._id, 4);
                }}
              >
                Sell
              </button>
            ) : (
              ""
            )}
          </li>
          <li className="ct mg">
            Tier 5: {e.ownerEmailT5 ? e.ownerEmailT5 : <em>Unowned  </em>}
            {e.ownerEmailT5 === props.email ? (
              <button
                type="button"
                className="btn btn-outline-warning btn-rounded sbtn"
                data-mdb-ripple-color="dark"
                onClick={() => {
                  props.onSell(props.email, e._id, 5);
                }}
              >
                Sell
              </button>
            ) : (
              ""
            )}
          </li>
        </ul>
      </div>
    
    );
  });

  return <div>{processed}</div>;
}

export default PropertyOwnershipList;
