import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import "./Header.css"

import { getUserData } from '../actions/userActions'

class Header extends React.Component {

  state = {
    email:"",
    password:"",
    loading: true,
  }

  componentWillMount () {
      const {password,email} = JSON.parse(localStorage.getItem('MERN Library'))
      this.getUserParams(email,password)
      this.setState({loading:false})
  }

  getUserParams = (email,password) =>{
    this.props.getUserData(email,password) 
  }

  render() {
    return (

      <div>
        <div  id="Main" className="Header">
                <NavLink to="/" exact className="MainMenu_Item __User">{
                  (this.props.user.userData.email)
                  ?this.props.user.userData.email
                  :null
                }</NavLink>
                <NavLink to="/" exact className="MainMenu_Item">Home</NavLink>
                <NavLink to="/films"className="MainMenu_Item" activeClassName="ActivePageLink">Search Film</NavLink>
                <NavLink to="/userlib" className="MainMenu_Item" activeClassName="ActivePageLink">User Library</NavLink>
        </div>
        <div className="Gap">
          <div className="Header opacity">
                <NavLink to="/" exact className="MainMenu_Item __User">
                  {/* {(this.props.user.userData.email)
                  ?this.props.user.userData.email
                  :null} */}
                </NavLink>
                <NavLink to="/" exact className="MainMenu_Item">Home</NavLink>
                <NavLink to="/films"className="MainMenu_Item" activeClassName="ActivePageLink">Search Film</NavLink>
                <NavLink to="/userlib" className="MainMenu_Item" activeClassName="ActivePageLink">User Library</NavLink>
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
  { getUserData }
)(Header);

    