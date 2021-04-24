import React from "react";

class PropertyListVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items
    }
  }
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
    return "$" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  generateEntries(rawData) {
    if (!rawData || rawData.length === 0) {
      return (
        <div>
          <h1>No nearby properties found...</h1>
        </div>
      );
    }

    return rawData.map((e) => {
      return (
        <div key={String(e._id)}>
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
    let filter;
    if (this.state.items && this.state.items.length > 1) {
      filter = (
        <div>
          <button
            onClick={() => {
              this.setState((prevState) => ({items:prevState.items.sort((a, b) => {
                return a.value > b.value ? 1 : -1;
              })}));
            }}
          >
            Sort by Value Ascending
          </button>
          <button
            onClick={() => {
              this.setState((prevState) => ({items:prevState.items.sort((a, b) => {
                return a.value > b.value ? -1 : 1;
              })}));
            }}
          >
            Sort by Value Descending
          </button>
          <br />
          <button
            onClick={() => {
              this.setState((prevState) => ({items:prevState.items.sort((a, b) => {
                return a.hourlyIncome > b.hourlyIncome ? 1 : -1;
              })}));
            }}
          >
            Sort by Income Ascending
          </button>
          <button
            onClick={() => {
              this.setState((prevState) => ({items:prevState.items.sort((a, b) => {
                return a.hourlyIncome > b.hourlyIncome ? -1 : 1;
              })}));
            }}
          >
            Sort by Income Descending
          </button>
          <br />
          <button
            onClick={() => {
              this.setState((prevState) => ({items:prevState.items.sort((a, b) => {
                return a.level > b.level ? 1 : -1;
              })}));
            }}
          >
            Sort by Level Ascending
          </button>
          <button
            onClick={() => {
              this.setState((prevState) => ({items:prevState.items.sort((a, b) => {
                return a.hourlyIncome > b.hourlyIncome ? 1 : -1;
              })}));
            }}
          >
            Sort by Level Descending
          </button>
        </div>
      );
    }
    return (
      <div>
        <div>{filter}</div>
        {this.generateEntries(this.state.items)}
      </div>
    );
  }
}

export default PropertyListVisualizer;
