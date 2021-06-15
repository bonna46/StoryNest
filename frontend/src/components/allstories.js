/* eslint-disable react/style-prop-object */
import react from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css";

function SampAllStories(props) {
  const stories = props.stories;
  const sample = stories.map((story) => <SampOneStory story={story} />);
  return sample;
}

function SampOneStory(props) {
  return (
    <div>
      <form>
        <Link to={`/api/stories/${props.story._id}`} style={{ textDecoration: 'none' }}>
          <div className="form-border">
            <div className="form-title">
              {props.story.title}
            </div>
              <div className="form-author">{props.story.author}</div>
            <div className="form-body">
              {props.story.story}
            </div>
          </div>
        </Link>
      </form>
    </div>
  );
}


class AllStories extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [],
      message: ""
    };
  }
  componentDidMount = () => {
    axios
      .get("http://localhost:5000/api/stories")
      .then((res) => {
        const stories = res.data.slice(0);
          this.setState({
            stories: stories
          });
      })
      .catch((err) => {
        console.log("err", err);
      });
    
  };

  componentWillUnmount = () => {
    this.setState({
      stories: [],
      message: ""
    });
  }

  render() {
    //const mes=this.props.location.state.detail;
    //console.log(mes);   
      return (
        <div>
          <p>{this.state.message}</p>
            <SampAllStories stories={this.state.stories} />
        </div>
      ); 
  }
}

export default AllStories;
