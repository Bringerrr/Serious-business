import React from 'react';

import ShoppingList from '../components/ShoppingList';
import ItemModal from '../components/ItemModal';

import {Container} from 'reactstrap'

class UserLib extends React.Component {

    render() {
  
      return (
        <Container>
            <ItemModal />
            <ShoppingList />
        </Container>
      );
    }
  }
  
  export default UserLib;