/* eslint-disable no-useless-constructor */
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import ViewOneStory from "./viewstory";
import Deletestory from "./deletestory";

class UpdateOneStory extends React.Component {
  render() {
    return (
      <Link to={`/api/stories/edit/${this.props.story._id}`}>
        <button className="btn btn-success">Update Story</button>
      </Link>
    );
  }
}

class OneStory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story_id: "",
      username: "",
      story: {},
    message: ""
    };
  }

  componentWillMount = () => {
    const s_id = this.props.match.params.storyid;
    this.setState({
      story_id: s_id,
    });
    axios
      .get("http://localhost:5000/api/stories/" + s_id)
      .then((res) => {
        this.setState({
          story: res.data,
          username: sessionStorage.getItem("username"),
        });
      })
      .catch((err) => {
        if(err.response.status ===404)
        this.setState({
          message: "Story not found"
        });
        else
        console.log(err);
      });
  };

  render() {
    const { author } = this.state.story;
    const username = this.state.username;
    if (username === author) {
      //console.log(" match", username);
      return (
        <div>
          <ViewOneStory story={this.state.story} />
          <ul className="ui-update-delete">
            <li className="li">
              <UpdateOneStory story={this.state.story} />
            </li>
            <li className="li-right">
              <Deletestory story_id={this.state.story_id} />
            </li>
          </ul>
        </div>
      );
    } 
    else{
    //console.log("no match", username);
      return (
        <div>
          <p>{this.state.message}</p>
          <ViewOneStory story={this.state.story} />
        </div>
      );
    }
  }
}

export default OneStory;
