import axios from "axios";
import React from "react";
import { token } from "../token";
import { Redirect } from "react-router-dom";

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
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
    return "$"+x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  async componentDidMount() {
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

    if (res.data.error) {
      alert("Unable to access leaderboard");
      return;
    }

    this.setState(() => ({
      people: res.data.data,
    }));
  }

  render() {
    if (this.state.redirectAccountView) {
      return <Redirect to="/426-frontend/personal"></Redirect>;
    }
    if (this.state.redirectDashboard) {
      return <Redirect to="/426-frontend/dashboard"></Redirect>;
    }
    return (
      <div>
        <button
          onClick={() => {
            this.setState(() => ({ redirectDashboard: true }));
          }}
        >
          Dashboard
        </button>
        <button
          onClick={() => {
            this.setState(() => ({ redirectAccountView: true }));
          }}
        >
          Account View
        </button>
        <ol>
          {this.state.people
            ? this.state.people.map((p) => {
                return (
                  <li key={p.name + p.experience}>
                    <div>
                        <strong>Name:</strong> {p.name}
                        <br/>
                        <strong>Properties Owned:</strong> {p.numProperties}
                        <br/>
                        <strong>Lifetime Earnings:</strong> {this.numberWithCommas(p.experience)}
                        <hr/>
                    </div>
                  </li>
                );
              })
            : "No Players Found in Database..."}
        </ol>
      </div>
    );
  }
}

export default Leaderboard;
