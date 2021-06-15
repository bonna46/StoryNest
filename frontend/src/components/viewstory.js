/* eslint-disable react/style-prop-object */
import React from 'react';
import "./style.css";


 class ViewOneStory extends React.Component {
   render(){
  if (this.props.story !== {}) {
    return (
      <div>
        <div class="form-border">
          <div >
            <div className="form-title" >{this.props.story.title}</div>
            <div className="form-author">{this.props.story.author}</div>
            <div className="form-body">
              {this.props.story.story}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>No story found with this id</p>
      </div>
    );
  }
}
}

export default ViewOneStory;


