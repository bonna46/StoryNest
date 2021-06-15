//can search stories through story_id
import React from "react";
import { Switch, Route } from "react-router-dom";
import "./components/style.css";

import Navbar from "./components/navbar";
import Register from "./components/register";
import Login from "./components/login";
import PostStory from "./components/poststory";
import AllStories from "./components/allstories";
import OneStory from "./components/onestory";
import UpdateStory from "./components/updatestory";

class App extends React.Component {
  

  render() {
    return (
    <div>
      <Navbar />
    <div>
            <h1 className="bodystyle">Welcome to MyStory</h1>
          </div>

        <div className="container mt-3">
          <Switch>
            <Route path="/api/register" component={Register} />
            <Route path="/api/login" component={Login} />
            <Route path={`/api/stories/edit/:updateid`}
              component={UpdateStory} />
            <Route path="/api/stories/post" component={PostStory} />
            <Route path={`/api/stories/:storyid`} component={OneStory} />
            <Route path="/api/stories" component={AllStories} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
