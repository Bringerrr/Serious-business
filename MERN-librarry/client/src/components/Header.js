import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import "./Header.css";

import SignInContainer from './SignInContainer';
import SignOut from './SignOut';

import DropdownUser from './DropdownUser'

import { getUserData, userSignOut,userDashboard } from '../actions/userActions'

class Header extends React.Component {

  state = {
    email:"",
    password:"",
    loading: true,
  }

  componentWillMount () {
      this.props.userDashboard();
  }

  render() {
    console.log(this.props.user)
    return (
      <div>
        <div id="Main" className="Header">
          <div className="MainMenu_Item__Left">
          <NavLink to="/" exact className="MainMenu_Item __User">
            </NavLink>
            <NavLink to="/" exact className="MainMenu_Item">Home</NavLink>
            <NavLink to="/films"className="MainMenu_Item">Search Film</NavLink>
            <NavLink to="/userlib" className="MainMenu_Item">User Library</NavLink>
          </div>
          <div className="MainMenu_Item_Buttons">
            {( this.props.user.authorized === true || this.props.user.userData.email) 
              ?<div>                                                                  
                {this.props.user.userData.email}
                <SignOut className="" toggle={this.toggle}/>
              </div>
              :<SignInContainer/>}
            <SignInContainer/>

          </div>
        </div>
        <div className="Gap">
          <div className="Header opacity">
          <div className="MainMenu_Item__Left">
          <NavLink to="/" exact className="MainMenu_Item __User">
            </NavLink>
            <NavLink to="/" exact className="MainMenu_Item">Home</NavLink>
            <NavLink to="/films"className="MainMenu_Item">Search Film</NavLink>
            <NavLink to="/userlib" className="MainMenu_Item">User Library</NavLink>
          </div>
          <div className="MainMenu_Item_Buttons">
            {/* {(this.props.user.authorized)
              ?this.props.user.userData.email
              :null} */}
            <SignInContainer className=""/>
            <SignOut className="" toggle={this.toggle}/>
          </div>
          </div>
          
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUserData, userSignOut,userDashboard }
)(Header);

    