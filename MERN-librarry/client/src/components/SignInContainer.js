import React from 'react';
import SignIn from './SignIn';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class SignInContainer extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
  }

  state = {
    modal: false,
    isLoading: true
  };

  componentWillMount() {
    localStorage.getItem('password') && this.setState({
      password: localStorage.getItem('password'),
      isLoading: false
    })
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

    render() {
      // console.log(this.state)
      return (
        <div>
            <Button color="danger" onClick={this.toggle}>Sign In</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Sign In</ModalHeader>
              <ModalBody>
                <SignIn toggle={this.toggle} />
              </ModalBody>
              <ModalFooter>

              <NavLink onClick={this.toggle} to="/signup" exact>
                <Button color="danger" >Sign Up</Button>
              </NavLink>
              
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
        </div>
      );
    }
  }
  
  export default SignInContainer;