import axios from "axios";
import React from "react";
import { Redirect } from "react-router-dom";
import "./register.css";

// Responsible for generating register page
class Register extends React.Component {
  constructor() {
    super();
    // Store the form information as state
    this.state = {
      nameField: "",
      passField: "",
      emailField: "",
      status: "",
    };
  }

  // If the user name changes, update state
  nameFieldChanged = (e) => {
    this.setState(() => ({
      nameField: e.target.value,
    }));
  };

  // If the user email changes, update state
  emailFieldChanged = (e) => {
    this.setState(() => ({
      emailField: e.target.value,
    }));
  };

  // If the user password changes, update state
  passwordFieldChanged = (e) => {
    this.setState(() => ({
      passField: e.target.value,
    }));
  };

  // Handler when the user attempts to register
  onRegister = async () => {
    try {
      // Defer to backend
      await axios({
        method: "post",
        url: "https://backend-426.herokuapp.com/api/users/register",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          name: this.state.nameField,
          email: this.state.emailField,
          password: this.state.passField,
        },
      });

      // If we suceed, redirect user to authentication page
      this.setState(() => ({
        status: <Redirect to="/Earth3-Frontend/login"></Redirect>,
      }));

    } catch (err) {
      // If we fail, show information to user
      this.setState(() => ({ status: err.toString() }));
    }
  };

  render() {
    return (
      <div className="im">
        <div className="row">
          <div className="col-md-6">
            <div className="c3">
              {this.state.status}
              {this.state.status ? <br /> : ""}
              <form className="box eh">
                <h1>Register</h1>
                <p className="text-muted">
                  {" "}
                Please enter your Name, Email, and Password!
              </p>
                <input
                  type="text"
                  placeholder="Name"
                  onChange={this.nameFieldChanged}
                ></input>
                <br />
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
                  className="btn btn-outline-success btn-rounded"
                  data-mdb-ripple-color="dark"
                  onClick={this.onRegister}
                >
                  Register
              </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
