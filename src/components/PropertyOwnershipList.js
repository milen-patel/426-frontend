function PropertyOwnershipList(props) {
  if (!props.items) {
    return <h1>Buy Properties to Get Started...</h1>;
  }

  let processed = "";

  processed = props.items.map((e) => {
    return (
        <div key={e._id}>
            <hr />
          <h1>{e.name}</h1>
          <h5>Hourly Income: {e.hourlyIncome}</h5>
          <h5>Base Value: {e.value}</h5>
          <h5>Level:{e.level} </h5>
          <h5>Owners:</h5>
          <ul>
              <li>Tier 1: {e.ownerEmailT1 ? e.ownerEmailT1 : <em>Unowned</em>}</li>
              <li>Tier 2: {e.ownerEmailT2 ? e.ownerEmailT2 : <em>Unowned</em>}</li>
              <li>Tier 3: {e.ownerEmailT3 ? e.ownerEmailT3 : <em>Unowned</em>}</li>
              <li>Tier 4: {e.ownerEmailT4 ? e.ownerEmailT4 : <em>Unowned</em>}</li>
              <li>Tier 5: {e.ownerEmailT5 ? e.ownerEmailT5 : <em>Unowned</em>}</li>
          </ul>
          <hr />
        </div>
    )
  });

  return <div>{processed}</div>;
}

export default PropertyOwnershipList;
