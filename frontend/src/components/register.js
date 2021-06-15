import React from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirm_password: "",
      message: "",
    };
  }
  changeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  changePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  changeConfirmPassword = (e) => {
    this.setState({
      confirm_password: e.target.value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    if (this.state.password !== this.state.confirm_password) {
      this.setState({
        confirm_password: "",
        message: "password doesn't match",
      });
      return;
    }
    if (this.state.password.length < 6) {
      this.setState({
        password: "",
        confirm_password: "",
        message: "password length should be more than 5",
      });
      return;
    }
    const user = {
      username: this.state.username,
      password: this.state.password,
    };

    axios
    .post("http://localhost:5000/api/register", user)
    .then(res => {
        this.setState({
          username: "",
          password: "",
          confirm_password: "",
          message: "User created successfully",
        });
      
    })
    .catch((err) => 
    {
      if(err.response.status === 409)
      {this.setState({
        username: "",
        password: "",
        confirm_password: "",
        message: "Username already in use"});
      }
      else
      console.log(err);
    }
    );
    
  };

  render() {
    const { username, password, confirm_password, message } = this.state;
    return (
      <div class="row">
        <form onSubmit={this.submitHandler}>
          <div className="form-group">
            <label htmlFor="usr">Username:</label>
            <input
              type="text"
              className="form-control"
              id="usr"
              value={username}
              onChange={this.changeUsername}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input
              type="password"
              className="form-control"
              id="pwd"
              value={password}
              onChange={this.changePassword}
            />
          </div>
          <div className="form-group">
            <label htmlFor="con_pwd">Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              id="con_pwd"
              value={confirm_password}
              onChange={this.changeConfirmPassword}
            />
          </div>
          <p>{message}</p>
          <input
            type="submit"
            value="Register"
            className="btn btn-primary"
          ></input>
        </form>
      </div>
    );
  }
}

export default Register;
