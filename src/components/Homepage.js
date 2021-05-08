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
      <div class="container">
        <div class="row-md-6">
          <div class="col-md-6">
            <div class="card">
              <h1>Active Players: {this.state.numPlayers}</h1>
              <h1>Total Properties: {this.state.numProperties}</h1>
              <h1>Total Revenue Generated: {this.numberWithCommas(this.state.totalEarnings)}</h1>
            </div>
            <div class="card">
              <form>
                <h1 class="display-3">Welcome to the Game</h1>
                <button
                  onClick={() => {
                    this.setState(() => ({
                      redirect: (
                        <Redirect to="/Earth3-Frontend/login"></Redirect>
                      ),
                    }));
                  }}
                >
                  Move to Login
                </button>
                <button
                  onClick={() => {
                    this.setState(() => ({
                      redirect: (
                        <Redirect to="/Earth3-Frontend/register"></Redirect>
                      ),
                    }));
                  }}
                >
                  Move to Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Homepage;
