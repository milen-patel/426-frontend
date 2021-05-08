import React from "react";
import "./propertylistvisualizer.css"
// Responsible for showing the user a list of nearby properties
class PropertyListVisualizer extends React.Component {
  // Helper function for showing purchase buttons under each property tier
  generateBuyButton(id, tier, cost) {
    // Ensure that the user has sufficient funds
    if (cost > this.props.balance) {
      return <button
      type="button"
      class="btn btn-outline-danger btn-rounded nebtn"
      data-mdb-ripple-color="dark">Not enough $$$</button>;
    }

    return (
      <button
      type="button"
      class="btn btn-outline-success btn-rounded pbtn"
      data-mdb-ripple-color="dark"
        onClick={() => {
          this.props.handler(id, tier);
        }}
      >
        Purchase for {`${this.numberWithCommas(cost)}`}
      </button>
    );
  }

  // Hepler for parsing numbers into a dollar readable format
  numberWithCommas(x) {
    if (!x) {
      return "";
    }
    x = parseFloat(x.toFixed(2));
    return "$" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Function for generating the entire list to show 
  generateEntries() {
    // If we have no properties, or the component just loaded...
    if (!this.props.items || this.props.items.length === 0) {
      return (
        <div>
          <h1>No nearby properties found...</h1>
        </div>
      );
    }

    return this.props.items.map((e) => {
      return (
        <div class = "card ct" key={e._id}>
          <h1 class = "tm">{e.name}</h1>
          <h5>Hourly Income: {e.hourlyIncome}</h5>
          <h5>Base Value: {e.value}</h5>
          <h5>Level:{e.level} </h5>
          <h5>Owners:</h5>
          <ul class = "c ct">
            <li>
              Tier 1:{" "}
              {e.ownerEmailT1
                ? e.ownerEmailT1
                : this.generateBuyButton(e._id, 1, e.value ** 1)}
            </li>
            <li>
              Tier 2:{" "}
              {e.ownerEmailT2
                ? e.ownerEmailT2
                : this.generateBuyButton(e._id, 2, e.value ** 2)}
            </li>
            <li>
              Tier 3:{" "}
              {e.ownerEmailT3
                ? e.ownerEmailT3
                : this.generateBuyButton(e._id, 3, e.value ** 3)}
            </li>
            <li>
              Tier 4:{" "}
              {e.ownerEmailT4
                ? e.ownerEmailT4
                : this.generateBuyButton(e._id, 4, e.value ** 4)}
            </li>
            <li>
              Tier 5:{" "}
              {e.ownerEmailT5
                ? e.ownerEmailT5
                : this.generateBuyButton(e._id, 5, e.value ** 5)}
            </li>
          </ul>
          
        </div>
      );
    });
  }

  render() {
    return <div>{this.generateEntries()}</div>;
  }
}

export default PropertyListVisualizer;
