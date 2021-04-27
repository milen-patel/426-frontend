import axios from "axios";
import React from "react";
import { Redirect } from "react-router-dom";

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
        status: <Redirect to="/426-frontend/login"></Redirect>,
      }));

    } catch (err) {
      // If we fail, show information to user
      this.setState(() => ({ status: err.toString() }));
    }
  };

  render() {
    return (
      <div>
        {this.state.status}
        {this.state.status ? <br /> : ""}
        Name:
        <input type="text" onChange={this.nameFieldChanged}></input>
        <br />
        Email:
        <input type="text" onChange={this.emailFieldChanged}></input>
        <br />
        Password:
        <input type="password" onChange={this.passwordFieldChanged}></input>
        <br />
        Register:
        <button type="button" onClick={this.onRegister}>
          Register
        </button>
      </div>
    );
  }
}

export default Register;
