import React from 'react';

import FilmSearchEngine from '../components/FilmSearchEngine';

import {Container} from 'reactstrap'
import './MainPage.css'


class SearchFilm extends React.Component {

    render() {
  
      return (
        <Container>
            <FilmSearchEngine/>
        </Container>
      );
    }
  }
  
  export default SearchFilm;