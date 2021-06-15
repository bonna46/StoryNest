/* eslint-disable react/style-prop-object */
import React from "react";


import Dialog from './dialogbox';


class Deletestory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     show: false,
    };
  }


  onClose = () =>
  {
    this.setState({
      show: false
    })
  } 
  isOpen = () =>{
    this.setState({
      show: true
    })
  } 
  
  render() {
    
    return (
      <div>
        <button className="btn btn-danger" type="button" onClick={this.isOpen}>Delete story</button>
      <Dialog onClose={this.onClose}
      isOpen={this.isOpen}
      show={this.state.show}
      story_id={this.props.story_id}/>
        </div>
    );
  }
}

export default Deletestory;
