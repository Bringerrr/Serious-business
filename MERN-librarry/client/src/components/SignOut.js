import React, {Component} from 'react';
import {Button} from 'reactstrap';

import {connect} from 'react-redux';
import {userSignOut} from '../actions/userActions';

class SignOut extends Component {

    signOut = () => {
        this.props.userSignOut();
    }
    render() {
        return (
            <Button onClick={this.signOut}>
                Sign Out
            </Button>
        );
    }
}

const mapStateToProps = state => ({user: state.user});

export default connect(mapStateToProps, {userSignOut})(SignOut);
