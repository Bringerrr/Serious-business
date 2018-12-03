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

import {getUserData} from '../actions/userActions';

class SignIn extends Component {
    state = {
        modal: false,
        email: '',
        password: ''
    };

    auth = (email, password) =>{
        this.props.getUserData(email,password)
    } 

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const {email,password} = this.state
        this.auth(email,password);

        setTimeout( () => { 
            if(!this.props.user.userInfo.errors){   // if threre are no error during registrartion
                localStorage.setItem(               // save our data in LocalStorage
                    'MERN Library',
                    JSON.stringify({email:email,password:password})
                )
            }
            this.setState({loading:false})
        }, 1500 );
    };

    render() {
        return (
            <Form inline onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label for="exampleEmail" hidden>Email</Label>
                    <Input onChange={this.onChange} type="email" name="email" id="exampleEmail" placeholder="Email" />
                </FormGroup>
                {' '}
                <FormGroup>
                    <Label for="examplePassword" hidden>Password</Label>
                    <Input onChange={this.onChange} type="password" name="password" id="examplePassword" placeholder="Password" />
                </FormGroup>
                {' '}
                <Button>Submit</Button>
            </Form>
        );
    }
}


const mapStateToProps = state => ({
    item: state.item,
    imdb: state.imdb,
    user: state.user
  });
  
  export default connect(
    mapStateToProps,
    { getUserData }
  )(SignIn);
