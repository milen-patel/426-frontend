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
      
    <div class="card cpo" key = {e._id}>
    <h1 class = "ct tm">{e.name}</h1>
    <h7 class = "ct">Hourly Income: {e.hourlyIncome}</h7>
        <h7 class = "ct">Base Value: {e.value}</h7>
        <h7 class = "ct">Level:{e.level} </h7>
        <h4 class = "ct">Owners:</h4>
        <ul class = "ct">
        
        <li class = "ct mg">
          Tier 1:  {e.ownerEmailT1 ? e.ownerEmailT1 : <em>Unowned  </em>}
          {e.ownerEmailT1 === props.email ?(
            
            <button
            type="button"
            class="btn btn-outline-warning btn-rounded sbtn"
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
        <li class = "ct mg">
          Tier 2: {e.ownerEmailT2 ? e.ownerEmailT2 : <em>Unowned  </em>}
          {e.ownerEmailT2 === props.email ? (
             <button
             type="button"
             class="btn btn-outline-warning btn-rounded sbtn"
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
        <li class = "ct mg">
          Tier 3: {e.ownerEmailT3 ? e.ownerEmailT3 : <em>Unowned</em>}
          {e.ownerEmailT3 === props.email ? (
             <button
             type="button"
             class="btn btn-outline-warning btn-rounded sbtn"
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
        <li class = "ct mg">
          Tier 4: {e.ownerEmailT4 ? e.ownerEmailT4 : <em>Unowned  </em>}
          {e.ownerEmailT4 === props.email ? (
             <button
             type="button"
             class="btn btn-outline-warning btn-rounded sbtn"
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
        <li class = "ct mg">
          Tier 5: {e.ownerEmailT5 ? e.ownerEmailT5 : <em>Unowned  </em>}
          {e.ownerEmailT5 === props.email ? (
             <button
             type="button"
             class="btn btn-outline-warning btn-rounded sbtn"
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
    
      /*
      <div class = 'container' key={e._id}>
        <hr />
        <h1>{e.name}</h1>
        <h5>Hourly Income: {e.hourlyIncome}</h5>
        <h5>Base Value: {e.value}</h5>
        <h5>Level:{e.level} </h5>
        <h5>Owners:</h5>
        <div class='card'>
        <ul>
        
          <li>
            Tier 1: {e.ownerEmailT1 ? e.ownerEmailT1 : <em>Unowned</em>}
            {e.ownerEmailT1 === props.email ? (
              <button
              type="button"
              class="btn btn-outline-warning btn-rounded"
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
          <li>
            Tier 2: {e.ownerEmailT2 ? e.ownerEmailT2 : <em>Unowned</em>}
            {e.ownerEmailT2 === props.email ? (
               <button
               type="button"
               class="btn btn-outline-warning btn-rounded"
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
          <li>
            Tier 3: {e.ownerEmailT3 ? e.ownerEmailT3 : <em>Unowned</em>}
            {e.ownerEmailT3 === props.email ? (
               <button
               type="button"
               class="btn btn-outline-warning btn-rounded"
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
          <li>
            Tier 4: {e.ownerEmailT4 ? e.ownerEmailT4 : <em>Unowned</em>}
            {e.ownerEmailT4 === props.email ? (
               <button
               type="button"
               class="btn btn-outline-warning btn-rounded"
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
          <li>
            Tier 5: {e.ownerEmailT5 ? e.ownerEmailT5 : <em>Unowned</em>}
            {e.ownerEmailT5 === props.email ? (
               <button
               type="button"
               class="btn btn-outline-warning btn-rounded"
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
        <hr />
      </div>
      */
    );
  });

  return <div>{processed}</div>;
}

export default PropertyOwnershipList;
