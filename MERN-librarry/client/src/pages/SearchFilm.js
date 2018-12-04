import React from 'react';

import FilmSearchEngine from '../components/FilmSearchEngine';

import {Container} from 'reactstrap'
import './MainPage.css'


class SearchFilm extends React.Component {

  componentWillMount(){
    const {match} = this.props
    console.log(match);
  }

    render() {
  
      return (
        <Container>
            <FilmSearchEngine/>
        </Container>
      );
    }
  }
  
  export default SearchFilm;