import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

let dialogStyles = {
    width: '300px',
    maxWidth: '100%',
    margin: '0 auto',
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: '999',
    backgroundColor: '#ffcccc',
    color: 'black',
    padding: '10px 20px 20px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    opacity: 1
};
/* for close icon
let dialogCloseButtonStyles = {
    marginBottom: '15px',
    padding: '3px 8px',
    cursor: 'pointer',
    borderRadius: '50%',
    border: 'none',
    width: '30px',
    height: '30px',
    fontWeight: 'bold',
    alignSelf: 'flex-end'
};
*/

let headerstyle={
    padding: "5px 5px",
};

let wholePage={
    position: 'fixed', /* Sit on top of the page content */
  display: 'block', /* Hidden by default */
  width: '100%', /* Full width (cover the whole page) */
  height: '100%', /* Full height (cover the whole page) */
  top: '0',
  left: '0',
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)', /* Black background with opacity */
  zIndex: 2, /* Specify a stack order in case you're using a different order for other elements */
  cursor: 'pointer'
}


class Dialog extends Component {
constructor(props)
{
    super(props);
    this.state={
        story_id:""
    }
}


deleteHandler=(e)=>{
e.preventDefault();
const story_id=this.props.story_id;
console.log('tap',story_id);
const token = sessionStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Basic ${token}`,
  },
};
axios
.delete("http://localhost:5000/api/stories/" + story_id,config)
.then((res)=>{
    console.log(res.data);
    this.props.history.push('/api/stories');
    
})
.catch(err=>{
    console.log(err);
})

}

    render() {
        let dialog = (
            <div style={wholePage}>
            <div style={dialogStyles}>
                <div style={headerstyle}>
                    Are you sure?
                    </div>

                <div>This story will be deleted</div>
                <button className="btn btn-danger" onClick={this.deleteHandler}>Yes</button>
                <button className="btn btn-dark" onClick={this.props.onClose}>No</button>
            </div>
            </div>
        );

        if (! this.props.show) {
            dialog = null;
        }
        return (
            <div>
                {dialog}
            </div>
        );
    }
}

export default withRouter(Dialog);