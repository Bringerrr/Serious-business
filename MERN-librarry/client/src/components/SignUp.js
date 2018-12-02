import React, { Component } from 'react';
import { Button, Form, FormFeedback, FormGroup, Label, Input, FormText } from 'reactstrap';
import {connect} from 'react-redux';

import {checkUserExistence, userReg} from '../actions/userActions';

class SignUp extends Component {
    state = {
        modal: false,
        name: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        emailValid: true,
    };

    userReg = (userInfo) =>{

        const picked = 
        (   ({ first_name, last_name, email, password }) =>
            ({ first_name, last_name, email, password }) 
        )   (this.state);

        this.props.userReg(picked)
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.checkUserExistence(
            this.state.email
        );
        setTimeout( () => { 
            this.emailValidation(); 
            console.log("Прошло 1.5 секунды")
        }, 1500 );
        setTimeout( () => { 
            if(!this.props.userInfo) this.userReg();
            else console.log("Уже такой есть")
        }, 2000 );
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };

    checkUserExistence = email => {
        this.props.checkUserExistence(email);
    }

    emailValidation = () =>{
        this.setState({emailValid:this.props.user.checkUser})
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>

                {this.props.user.checkUser
                ?<h4>This email already exist. Please use another one</h4>
                :null}

                <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input onChange={this.onChange} type="text" name="firstName" placeholder="First Name" />
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input onChange={this.onChange} type="text" name="lastName" placeholder="Last Name" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    {this.state.emailValid
                        ?<div><Input onChange={this.onChange} type="email" name="email" id="exampleEmail" placeholder="with a placeholder" /></div>
                        :<div><Input invalid onChange={this.onChange} type="email" name="email" id="exampleEmail" placeholder="with a placeholder" /> 
                        <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback></div>
                    }

                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input onChange={this.onChange} type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                </FormGroup>

                <Button>Submit</Button>
                <br/>
                <br/>

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
    { checkUserExistence,userReg }
  )(SignUp);
