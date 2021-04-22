import { Redirect } from "react-router-dom";
import React from "react";

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      mover: null,
    };
  }

  setStateHandler(idx) {
    this.setState(() => ({
      mover: <Redirect to={`${idx}`} />,
    }));
  }

  render() {
    if (this.state.mover) {
      return this.state.mover;
    }

    return (
      <ul>
        <button
          type="button"
          onClick={() => {
              this.setStateHandler("./login");
          }}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => {
              this.setStateHandler("./register");
          }}
        >
          Register
        </button>
        <button
          type="button"
          onClick={() => {
              this.setStateHandler("./accountInfo");
          }}
        >
          Account Information
        </button>
        <button
          type="button"
          onClick={() => {
              this.setStateHandler("./dashboard");
          }}
        >
          Dashboard
        </button>
      </ul>
    );
  }
}

export default Navbar;
