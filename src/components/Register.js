import axios from "axios";
import React from "react";
import { Redirect } from "react-router-dom";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      nameField: "",
      passField: "",
      emailField: "",
      status: "",
    };
  }

  nameFieldChanged = (e) => {
    this.setState(() => ({
      nameField: e.target.value,
    }));
  };

  emailFieldChanged = (e) => {
    this.setState(() => ({
      emailField: e.target.value,
    }));
  };

  passwordFieldChanged = (e) => {
    this.setState(() => ({
      passField: e.target.value,
    }));
  };

  onRegister = async () => {
    //CASEY validate input
    try {
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
      this.setState(() => ({
        status: <Redirect to="/426-frontend/login"></Redirect>,
      }));
    } catch (err) {
      this.setState(() => ({ status: err.toString() }));
    }
  };

  render() {
    //CASEY: Display field requirements
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
