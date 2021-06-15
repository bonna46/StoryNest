/* eslint-disable react/style-prop-object */
import React from "react";
import axios from "axios";

import ViewOneStory from "./viewstory";

class Onestory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story_id: "",
      story: {},
    };
  }
  changeId = (e) => {
    this.setState({
      story_id: e.target.value,
    });
  };
  loadStory = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:5000/apii/stories/" + this.state.story_id)
      .then((res) => {
        this.setState({
          story: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    // const {story_id}= this.state();
    return (
      <div>
        <form onSubmit={this.loadStory}>
          <input
            type="text"
            className="form-control"
            onChange={this.changeId}
          />
          <button type="submit" class="btn btn-info">
            <span className="glyphicon glyphicon-search"></span> Search
          </button>
        </form>
        <ViewOneStory story={this.state.story} />
      </div>
    );
  }
}

export default Onestory;
