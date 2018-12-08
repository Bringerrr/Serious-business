import React, {Component} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import {connect} from 'react-redux';

import {getUserData, userDashboard} from '../actions/userActions';

class SignIn extends Component {
    state = {
        modal: false,
        email: '',
        password: ''
    };

    auth = (email, password) => {
        this.props.getUserData(email, password);
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        // debugger; this.props.userDashboard()
        const {email, password} = this.state
        this.auth(email, password);
        this.props.userDashboard();
    };

    render() {
        return (
            <Form inline onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label for="exampleEmail" hidden>Email</Label>
                    <Input
                        onChange={this.onChange}
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder="Email"/>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword" hidden>Password</Label>
                    <Input
                        onChange={this.onChange}
                        type="password"
                        name="password"
                        id="examplePassword"
                        placeholder="Password"/>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    }
}

const mapStateToProps = state => ({imdb: state.imdb, user: state.user});

export default connect(mapStateToProps, {getUserData, userDashboard})(SignIn);