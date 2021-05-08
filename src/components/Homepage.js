import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./homepage.css"

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      numPlayers: 0,
      numProperties: 0,
      totalEarnings: 0,
    };
  }

  async componentDidMount() {
    // Call the backend to get user account information
    const res = await axios({
        method: "get",
        url: "https://backend-426.herokuapp.com/api/stats",
    });
    if (res.status !== 200) {
        return;
    }

    this.setState(() => ({
        numPlayers: res.data.numUsers,
        numProperties: res.data.numProperties,
        totalEarnings: res.data.totalEarnings,
    }));
  }

  // Helper for turning big int into dollar readable format
  numberWithCommas(x) {
    if (!x) {
      return "";
    }
    x = parseFloat(x.toFixed(2));
    return "$" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    if (this.state.redirect) {
      return this.state.redirect;
    }
    return (
      <div className="home im">
        <h1 className="display-3 gameT">Earth 3.0</h1>
        <div>
          <h3 className="font">Scroll Down to See How to Play</h3>
        </div>
        <button
          type="button"
          className="btn btn-dark btn-rounded loginregister"
          data-mdb-ripple-color="dark"
          onClick={() => {
            this.setState(() => ({
              redirect: (
                <Redirect to="/Earth3-Frontend/login"></Redirect>
              ),
            }));
          }}
        >
          Login
                </button>

        <button
          type="button"
          className="btn btn-dark btn-rounded loginregister"
          data-mdb-ripple-color="dark"
          onClick={() => {
            this.setState(() => ({
              redirect: (
                <Redirect to="/Earth3-Frontend/register"></Redirect>
              ),
            }));
          }}
        >
          Register
                </button>
        <div className="bottom">
          <h3>Active Players: {this.state.numPlayers}</h3>
          <h3>Total Properties: {this.state.numProperties}</h3>
          <h3>Total Revenue Generated: {this.numberWithCommas(this.state.totalEarnings)}</h3>
        </div>
        <div className="htpt pad">
          <h1>How it works:</h1>
			<ul>
				<li>	You are a real player on a map and you have a balance</li>
          <li>When you create an account, your player starts in Chapel Hill, NC.</li>
          <li>You can walk around by clicking on the map walking on the map costs money.</li>
          <li>You can see all the properties that are within 500 meters of you Each property has 5 tiers</li>
          <li>Each tier costs propertyValue^tier</li>
          <li>Each tier earns you baseIncome^tier</li>
          <li>Your properties pay out every minute, your balance is automatically changed.</li>
          <li>	By default you can only own 5 total properties (any number of tiers in a property is not limited)</li>
          <li>You can increase the amount of properties you may have on the account view page</li>
          <li>Cost of additional property spaces: (current maximum number of properties)  ^ 3 </li>
          <li>You can also increase your per minute payout by upgrading your multiplier</li>
          <li>Each 1,000,000 spent on increasing multiplier will increase per minute payout by 1%</li>
          <li>Cost for multiplier is constant (1M = 1%) and doesn't increase.</li>
          <li>User can sell properties if constrained by their current maximum property limit</li>
          <li>User will not earn money for selling properties, they simply lose ownership There are over 10,000 properties.</li>
          <li>We have added a property corresponding to every major American city</li>
          <li>We have also added properties corresponding to many buildings on UNC's campus </li>
			</ul>
          <h1>What we Used:</h1>
          <p>	Heroku : Hosting backend</p>
          <p>Github Pages: Hosting Frontend</p>
          <p>	Node.JS + Express.JS + Mongoose: Implementing Backend</p>
          <p>	MongoDB: Storing Backend Information</p>
          <p>	React + Axios + Google Maps API: Implementing Frontend</p>
          <p>Bootstrap and CSS: General Styling</p>
          <p>https://opencagedata.com: Decoding Coordinates to Addresses</p>

        </div>




      </div>

    );
  }
}
export default Homepage;
