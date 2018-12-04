import React from 'react';

import FilmList from '../components/FilmList';

import {Container} from 'reactstrap'

class UserLib extends React.Component {

    render() {
  
      return (
        <Container>
            <FilmList />
        </Container>
      );
    }
  }
  
  export default UserLib;