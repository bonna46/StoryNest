import React from "react";
import {  Link } from "react-router-dom";



class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          show: false,
          login_info: "Login",
          story_owner_name: "",
        };
      }
    
      componentDidMount = () => {
        this.clockTimer = setInterval(() => this.showLogout(), 1000);
      };
    
      componentWillUnmount = () => {
        clearInterval(this.clockTimer);
      };
    
      showLogout = () => {
        const owner_name = sessionStorage.getItem("username");
        //console.log("username=",owner_name);
        if (owner_name !== null) {
          this.setState({
            show: true,
            login_info: "LogOut",
            story_owner_name: "Hello "+ owner_name,
          });
          //console.log('loggedin');
        }
      };
    
      showLogin = () => {
        if (this.state.login_info === "LogOut") {
          sessionStorage.removeItem("username");
          this.setState({
            show: false,
            login_info: "Login",
            story_owner_name: "",
          });
          //console.log('notloggedin');
        }
      };

  render(){
    if (this.state.login_info === "Login")
    {
        return (
            <div className="App">
              <ul className="ui">
                <li className="li">
                  <Link to={"/api/stories"}>See Stories</Link>
                </li>
               
                <li className="li">
                  <Link to={"/api/login"}>
                    <div onClick={this.showLogin}>
                      {this.state.login_info}
                    </div>
                  </Link>
                </li>
                <li className="li">
                  <Link to={"/api/register"}>Register</Link>
                </li>
                
              </ul>
              </div>
        );
    }
    else
    {
        return (
            <div className="App">
              <ul className="ui">
                <li className="li">
                  <Link to={"/api/stories"}>See Stories</Link>
                </li>
              
                <li className="li">
                  <Link to={"/api/login"}>
                    <div onClick={this.showLogin}>
                      {this.state.login_info}
                    </div>
                  </Link>
                </li>

                <li className="li">
                  <Link to={"/api/stories/post"}>Post Stories</Link>
                </li>

                <li className="li-right">{this.state.story_owner_name}</li>
              </ul>
              </div>
        );
    }
    
  
          
  }

}
export default Navbar;