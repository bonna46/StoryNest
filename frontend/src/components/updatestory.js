/* eslint-disable react/style-prop-object */
import React from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';

class UpdateStory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story_id: "",
      newtitle: "",
      newstory: "",
      message: "",
      story: {},
    };
  }

  componentDidMount = () => {
    const update_id = this.props.match.params.updateid;
    axios
    .get(
      "http://localhost:5000/api/stories/" + update_id)
    .then((res) => {
      this.setState({
        newtitle: res.data.title,
        newstory: res.data.story,
        story_id: update_id,
      })
    })
    .catch(err=>{
      if(err.response.status === 404)
      {this.setState({
        message: "Story not found"
      });}
      else
      console.log(err);
    });
  };
componentWillUnmount=()=>{
  this.setState ({
    newtitle: "",
    newstory: "",
    message: "",
    story: {},
  })
}
  changeTitle = (e) => {
    this.setState({
      newtitle: e.target.value,
    });
  };

  changeStory = (e) => {
    this.setState({
      newstory: e.target.value,
    });
  };


  SubmitHandler = (e) => {
    e.preventDefault();
    const newtitle=this.state.newtitle;
    const newstory = this.state.newstory;
    const user={};
    if(newtitle.length > 0)
    user.newtitle=newtitle;
    if(newstory.length >0)
    user.newstory=newstory;
    const token = sessionStorage.getItem("token");
    if(!token)
    {
      this.props.history.push("/api/stories");
    }
    const config = {
      headers: {
        Authorization: `Basic ${token}`,
      },
    };
    axios
      .put(
        "http://localhost:5000/api/stories/" + this.state.story_id,
        user,
        config
      )
      .then((res) => {
        this.setState({
          message: res.data
        })
        this.props.history.push({
          pathname: "/api/stories",
          state: { detail: "User validated" }
        });
      })
      .catch(err=>{
        if(err.response.status === 403)
         this.props.history.push("/api/stories");
         else
         {
         console.log(err);
         }
      });
    };

  render() {
    const { newtitle, newstory, message } = this.state;
    return (
      <div>
        <form onSubmit={this.SubmitHandler}>
          <div className="form-group">
            <label htmlFor="usr">Title</label>
            <input
              type="text"
              className="form-control"
              id="usr"
              value={newtitle}
              onChange={this.changeTitle}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Story</label>
            <input
              type="text"
              className="form-control"
              id="pwd"
              value={newstory}
              onChange={this.changeStory}
            />
          </div>
          <p>{message}</p>
          <input
            type="submit"
            value="Update"
            className="btn btn-primary"
          ></input>
        </form>
      </div>
    );
  }
}

export default withRouter(UpdateStory);
