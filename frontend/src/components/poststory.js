/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';

import ViewOneStory from "./viewstory";

class PostStory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          title: "",
          story: "",
          message: "",
          onesample: {}
    };
  }

  changeTitle = (e) => {
    this.setState({
        title: e.target.value,
    });
  };

  changeStory = (e) => {
    this.setState({
        story: e.target.value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const token=sessionStorage.getItem("token");
    if(!token)
    {
        this.setState({
            message: 'User is forbidden to edit'
        })
        return;
    }
const user={
    title: this.state.title,
    story: this.state.story
}
const config={
    headers:{
    Authorization: `bearer ${token}`
    }
    }

    axios
      .post("http://localhost:5000/api/stories", user, config)
      .then((res) => {
          //console.log(res.data);
          const sample={
            author: res.data.storyInfo.author,
            title: res.data.storyInfo.title,
            story: res.data.storyInfo.story
        }
      this.setState({
          title: "",
          story: "",
          message: 'Story created successfully',
          onesample: sample
      });
        this.props.history.push('/api/stories');

      })
      .catch((err) => {
        this.setState({
            title: "",
            story: ""
        })
        if(err.response.status === 400)
        {
            this.setState({
                message: 'Story not saved in database'
            });
        }
        else if(err.response.status === 404){
            this.setState({
                message: 'Include title and story'
            });
        }
        else{
            this.setState({
                message: 'Token is not valid'
            });
        }
      });
  
    };

  render() {
      const {title, story,message, onesample}= this.state;
    return (
        <div>
        <form onSubmit={this.submitHandler}>
          <div className="form-group">
            <label htmlFor="usr">Title</label>
            <input
              type="text"
              className="form-control"
              id="usr"
              value={title}
              onChange={this.changeTitle}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Story</label>
            <input
              type="text"
              className="form-control"
              id="pwd"
              value={story}
              onChange={this.changeStory}
            />
          </div>
          <p>{message}</p>
          <input
            type="submit"
            value="Post"
            className="btn btn-primary"
          ></input>
        </form>
      </div>
    );
  }
}

export default withRouter(PostStory);
