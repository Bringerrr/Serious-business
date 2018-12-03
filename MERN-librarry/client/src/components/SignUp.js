import React, { Component } from 'react';
import { Button, Form, FormFeedback, FormGroup, Label, Input, FormText } from 'reactstrap';
import {connect} from 'react-redux';

import {userReg} from '../actions/userActions';

class SignUp extends Component {
    state = {
        modal: false,
        name: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        emailValid: true,
        loading: false,
    };

    userReg = (userInfo) =>{

        const picked =  // creat a new obj with keys we need for registration
        (   ({ first_name, last_name, email, password }) =>
            ({ first_name, last_name, email, password }) 
        )   (this.state);

        this.props.userReg(picked) // registration
    }

    onSubmit = e => {
        e.preventDefault();
        const {email,password} = this.state

        this.setState({loading:true})
        this.userReg();

        setTimeout( () => { 
            this.emailValidation(); 
            if(!this.props.user.userInfo.errors){   // if threre are no error during registrartion
                                                   // save our data in LocalStorage
            localStorage.setItem('MERN Library',JSON.stringify({email:email,password:password}))
             }
            this.setState({loading:false})
        }, 1500 );
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };

    emailValidation = () =>{
        this.props.user.userInfo.errors     //if it exists it means 
        ?this.setState({emailValid:false})  //that fetch req had an error
        :this.setState({emailValid:true})
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
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
                        ?<div><Input required onChange={this.onChange} type="email" name="email" id="exampleEmail" placeholder="with a placeholder" /></div>
                        :<div><Input required invalid onChange={this.onChange} type="email" name="email" id="exampleEmail" placeholder="with a placeholder" /> 
                        <FormFeedback tooltip>User with such email already exists</FormFeedback></div>
                    }
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input required onChange={this.onChange} type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                </FormGroup>

                {(this.state.loading) 
                    ?<img width="60" src="https://loading.io/spinners/coolors/lg.palette-rotating-ring-loader.gif" alt=""/>
                    :<Button>Submit</Button>
                }
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
    { userReg }
  )(SignUp);
