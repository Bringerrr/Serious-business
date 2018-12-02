import React from 'react';

import ShoppingList from '../components/ShoppingList';
import ItemModal from '../components/ItemModal';
import FilmSearchEngine from '../components/FilmSearchEngine';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

import { Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './MainPage.css'


class MainPage extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
  }

  state = {
    modal: false
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

    render() {
  
      return (
        <Container>
            <SignUp/>
            <Button color="danger" onClick={this.toggle}>Sign In</Button>

            
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Sign In</ModalHeader>
              <ModalBody>
                <SignIn/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" >Sign Up</Button>
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>

            <ItemModal />
            <ShoppingList />
            <FilmSearchEngine/>
          </Container>
      );
    }
  }
  
  export default MainPage;