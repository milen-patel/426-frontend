import axios from "axios";
import React from "react";
import { token } from "../token";
import { Redirect } from "react-router-dom";

class AccountInfoView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    if (!token.val) {
      return;
    }

    const res = await axios({
      method: "get",
      url: "https://backend-426.herokuapp.com/api/user/accountInformation",
      headers: {
        "auth-token": token.val,
      },
    });
    if (res.data.error) {
      window.location.href = "../login";
    }
    
    this.setState(() => ({
      email: res.data.data.email,
      name: res.data.data.name,
      created: res.data.data.accountCreationDate,
    }));
  }

  validateToken = () => {
    return true;
  };

  render() {
    // Validate token
    if (!token.val || !this.validateToken()) {
      return <Redirect to="/426-frontend/login"></Redirect>;
    }

    return (
      <div>
        <p>welcome</p>
        <p>{this.state.email}</p>
        <p>{this.state.name}</p>
        <p>{this.state.created}</p>
      </div>
    );
  }
}

export default AccountInfoView;
