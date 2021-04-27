import axios from "axios";
import React from "react";
import { token } from "../token";
import { Redirect } from "react-router-dom";
import "./login.css";

// Responsible for rendering the login page
class Login extends React.Component {
  constructor() {
    super();
    
    // Store the current user input, at any given moment, in state
    this.state = {
      passField: "",
      emailField: "",
      status: "",
    };
  }

  // If the user changes their email, update state
  emailFieldChanged = (e) => {
    this.setState(() => ({
      emailField: e.target.value,
    }));
  };

  // If the user updates their password, change state
  passwordFieldChanged = (e) => {
    this.setState(() => ({
      passField: e.target.value,
    }));
  };

  // Handler for when the user clicks the login button
  onLogin = async () => {
    try {
      // Call the backend 
      let res = await axios({
        method: "post",
        url: "https://backend-426.herokuapp.com/api/users/login",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          email: this.state.emailField,
          password: this.state.passField,
        },
      });

      // Grab the token and store it in the global variable
      token.val = res.data.data.token;

      // Update state so we redirect to the dashboard view
      this.setState(() => ({
        status: <Redirect to="/426-frontend/dashboard"></Redirect>,
      }));
    } catch (err) {
      // If there was an error authenticating, show it to the user 
      this.setState(() => ({ status: err.toString() }));
    }
  };

  render() {
    return (
      <div>
        <video
          src="https://www.youtube.com/embed/_Sl8diqCAFw"
          autoPlay
          loop
          playsInline
          muted
        ></video>
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="card">
                {this.state.status}
                {this.state.status ? <br /> : ""}
                <form class="box">
                  <h1>Login</h1>
                  <p class="text-muted">
                    {" "}
                    Please enter your Email and Password!
                  </p>
                  <input
                    type="text"
                    placeholder="Email"
                    onChange={this.emailFieldChanged}
                  ></input>
                  <br />
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={this.passwordFieldChanged}
                  ></input>
                  <br />
                  <button
                    type="button"
                    class="btn btn-outline-success btn-rounded"
                    data-mdb-ripple-color="dark"
                    onClick={this.onLogin}
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
