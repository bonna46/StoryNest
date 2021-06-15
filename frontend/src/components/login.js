/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";
import { Link, Route, withRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
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

  submitHandler = (e) => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post("http://localhost:5000/api/login", user)
      .then((res) => {
        const token = res.data.data;
        sessionStorage.setItem("username", this.state.username);
        sessionStorage.setItem("token", token);
        this.setState({
          username: "",
          password: "",
          message: "User validated",
        });
        this.props.history.push({
          pathname: "/api/stories",
        });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.setState({
            username: "",
            password: "",
            message: "This user doesnot exist",
          });
        } else if (err.response.status === 403) {
          this.setState({
            password: "",
            message: "Invalid username or password",
          });
        } else {
          this.setState({
            username: "",
            password: "",
            message: "Unknown error occured",
          });
        }
      });
  };

  render() {
    const { username, password, message } = this.state;
    return (
      <div>
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
          <p>{message}</p>
          <input
            type="submit"
            value="Login"
            className="btn btn-primary"
          ></input>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
