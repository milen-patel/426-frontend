import React from "react";

class PropertyListVisualizer extends React.Component {
  generateBuyButton(id, tier, cost) {
    if (cost > this.props.balance) {
      return <button>Not enough $$$</button>;
    }
    return (
      <button
        onClick={() => {
          this.props.handler(id, tier);
        }}
      >
        Purchase for {`${this.numberWithCommas(cost)}`}
      </button>
    );
  }

  numberWithCommas(x) {
    if (!x) {
      return "";
    }
    return "$"+x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  generateEntries() {
    if (!this.props.items || this.props.items.length === 0) {
      return (
        <div>
          <h1>No nearby properties found...</h1>
        </div>
      );
    }
    

    return this.props.items.map((e) => {
      return (
        <div key={e._id}>
          <h1>{e.name}</h1>
          <h5>Hourly Income: {e.hourlyIncome}</h5>
          <h5>Base Value: {e.value}</h5>
          <h5>Level:{e.level} </h5>
          <h5>Owners:</h5>
          <ul>
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
          <hr />
        </div>
      );
    });
  }

  render() {
    return <div>{this.generateEntries()}</div>;
  }
}

export default PropertyListVisualizer;
