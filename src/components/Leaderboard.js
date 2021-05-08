import axios from "axios";
import React from "react";
import { token } from "../token";
import { Redirect } from "react-router-dom";
import "./leaderboard.css"
import 'bootstrap/dist/css/bootstrap.min.css';

// Responsible for showing the leaderboard of the top 10 players, ranked by lifetime earnings
class Leaderboard extends React.Component {
  constructor(props) {
    super(props);

    // State for handling redirect requests
    this.state = {
      redirectAccountView: false,
      redirectDashboard: false,
    };
  }

  // Helper for turning big int into dollar readable format
  numberWithCommas(x) {
    if (!x) {
      return "";
    }
    x = parseFloat(x.toFixed(2));
    return "$" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // When the component is first loaded, get the leaderboard information
  async componentDidMount() {
    // Make sure we have a valid token
    if (!token.val) {
      return;
    }

    // Call the backend to get user account information
    const res = await axios({
      method: "get",
      url: "https://backend-426.herokuapp.com/api/user/leaderboard",
      headers: {
        "auth-token": token.val,
      },
    });

    // If there was an error, inform the user and abort
    if (res.data.error) {
      alert("Unable to access leaderboard");
      return;
    }

    // If we succeed, store data in state
    this.setState(() => ({
      people: res.data.data,
    }));
  }

  render() {
    // Handle the case where the user clicks the account view button
    if (this.state.redirectAccountView) {
      return <Redirect to="/Earth3-Frontend/personal"></Redirect>;
    }

    // Handle the case where the user clicks the dashboard view button
    if (this.state.redirectDashboard) {
      return <Redirect to="/Earth3-Frontend/dashboard"></Redirect>;
    }

    return (
      <div class = "pad">
        <button
          type="button"
          class="btn btn-outline-dark btn-rounded ml mt tbuttons"
          data-mdb-ripple-color="dark" 
          onClick={() => {
            this.setState(() => ({ redirectDashboard: true }));
          }}
        >
          Dashboard
        </button>
        <button
          type="button"
          class="btn btn-outline-dark btn-rounded ml mt tbuttons"
          data-mdb-ripple-color="dark" 
          onClick={() => {
            this.setState(() => ({ redirectAccountView: true }));
          }}
        >
          Account View
        </button>
        <hr />
        <h1 class = "ct">Leaderboard</h1>
        <ol>
          {this.state.people
            ? this.state.people.map((p) => {
                return (
                  <div class = 'card c2'>
                  <li class = "ct hc" key={p.name + p.experience}>
                      <h3 class = "hc">{p.name}</h3>
                      <br />
                      <strong>Properties Owned:</strong> {p.numProperties}
                      <br />
                      <strong>Lifetime Earnings:</strong>{" "}
                      {this.numberWithCommas(p.experience)}
                      
                  </li>
                  </div>
                );
              })
            : "No Players Found in Database..."}
        </ol>
      </div>
    );
  }
}

export default Leaderboard;
