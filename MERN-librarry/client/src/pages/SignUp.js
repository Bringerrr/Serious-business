import React from 'react';

import FilmList from '../components/FilmList';
import SignUp from '../components/SignUp';

import {Container} from 'reactstrap';

class SignUpPage extends React.Component {

    render() {
  
      return (
        <Container>
            <SignUp />
        </Container>
      );
    }
  }
  
  export default SignUpPage;