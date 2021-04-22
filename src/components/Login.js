import axios from "axios";
import React from "react";
import { token } from "../token";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      passField: "",
      emailField: "",
      status: "",
    };
  }

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

  onLogin = async () => {
    //MILEN fix double login broken bug
    //CASEY validate input
    try {
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
      token.val = res.data.data.token;
      this.setState(() => ({
        status: <Redirect to="/426-frontend/dashboard"></Redirect>,
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
        Email:
        <input type="text" onChange={this.emailFieldChanged}></input>
        <br />
        Password:
        <input type="password" onChange={this.passwordFieldChanged}></input>
        <br />
        Login:
        <button type="button" onClick={this.onLogin}>
          Login
        </button>
      </div>
    );
  }
}

export default Login;
