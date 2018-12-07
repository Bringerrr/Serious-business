import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import "./Header.css";

import SignInContainer from './SignInContainer';
import SignOut from './SignOut';

import MediaQuery from 'react-responsive';

import {CSSTransition} from 'react-transition-group';

import {getUserData, userSignOut, userDashboard} from '../actions/userActions'

console.log(document.getElementById("demo"))

class Header extends React.PureComponent {

    state = {
        active: false,
        email: "",
        password: "",
        loading: true,
        toggle: true
    };

    componentWillMount() {
        this.props.userDashboard();
    }

    toggle = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    render() {
        return (
            <div>

                <MediaQuery query="(max-width: 768px)">

                    <div className="Burger-Icon" onClick={this.toggle}>
                        <div className="Burger-Icon_Inner"></div>
                        <div className="Burger-Icon_Inner"></div>
                        <div className="Burger-Icon_Inner"></div>
                        <div className="Burger-Icon_Inner"></div>
                        <div className="Burger-Icon_Inner"></div>
                    </div>

                    <CSSTransition
                        mountOnEnter={this.state.toggle}
                        in={!this.state.toggle}
                        timeout={300}
                        classNames="list">
                        <div onClick={this.toggle} className="Header-Burger-Container list">
                            <div className="Header-Burger-List">
                                <NavLink
                                    className="Header-Burger-List_Item"
                                    to="/"
                                    exact
                                    className="MainMenu_Item">Home</NavLink>
                                <NavLink
                                    className="Header-Burger-List_Item"
                                    to="/films"
                                    className="MainMenu_Item">Search Film</NavLink>
                                <NavLink
                                    className="Header-Burger-List_Item"
                                    to="/userlib"
                                    className="MainMenu_Item">User Library</NavLink>
                                {(this.props.user.authorized === true || this.props.user.userData.email)
                                    ? <div>
                                            {this.props.user.userData.email}
                                            <SignOut className="" toggle={this.toggle}/>
                                        </div>
                                    : <SignInContainer/>}
                            </div>
                        </div>
                    </CSSTransition>
                </MediaQuery>

                <MediaQuery query="(min-width: 769px)">
                    <div id="Main" className="Header">
                        <div className="MainMenu_Item__Left">
                            <NavLink to="/" exact className="MainMenu_Item __User"></NavLink>
                            <NavLink to="/" exact className="MainMenu_Item">Home</NavLink>
                            <NavLink to="/films" className="MainMenu_Item">Search Film</NavLink>
                            <NavLink to="/userlib" className="MainMenu_Item">User Library</NavLink>
                        </div>
                        <div className="MainMenu_Item_Buttons">
                            {(this.props.user.authorized === true || this.props.user.userData.email)
                                ? <div>
                                        {this.props.user.userData.email}
                                        <SignOut className="" toggle={this.toggle}/>
                                    </div>
                                : <SignInContainer/>}

                        </div>
                    </div>
                    <div className="Gap"></div> 
                </MediaQuery>
            </div>
        );
    }
}

const mapStateToProps = state => ({user: state.user});

export default connect(mapStateToProps, {getUserData, userSignOut, userDashboard})(Header);
