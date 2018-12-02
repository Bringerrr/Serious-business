import React, {Component} from 'react';
import { 
    Col, 
    Form, 
    FormGroup, 
    Label,
    Input,
    Button 
} from 'reactstrap';
import {connect} from 'react-redux';

class SignIn extends Component {
    state = {
        modal: false,
        name: ''
    };

    onSubmit = e => {
        e.preventDefault();

        const newItem = {
            name: this.state.name
        };

        // Add item via addItem action
        this
            .props
            .addItem(newItem);

        // Close modal
        this.toggle();
    };

    render() {
        return (
            <Form inline>
                <FormGroup>
                    <Label for="exampleEmail" hidden>Email</Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
                </FormGroup>
                {' '}
                <FormGroup>
                    <Label for="examplePassword" hidden>Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="Password" />
                </FormGroup>
                {' '}
                <Button>Submit</Button>
            </Form>
        );
    }
}



export default SignIn;
