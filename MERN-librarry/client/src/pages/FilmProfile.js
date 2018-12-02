import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button } from 'reactstrap';

import { getFilm, getCurrentFilm } from '../actions/imdbActions';

import './FilmProfile.css'

class FilmProfile extends Component {

    componentWillMount(){
        const {match} = this.props
        console.log(match.params._id);
        this.props.getCurrentFilm(match.params._id);
    }

    getCurrentFilm = (id) =>{
        this.props.getCurrentFilm(id)
      }

    render() {

        const film = this.props.imdb.currentFilm
        
        // const pureItems = ["Released","Genre","BoxOffice","Rated","Runtime"]
        // const severalItems = ["Director","Country","Production","Writer","Actors"]
        const pureItems = ["Released","Genre","BoxOffice","Rated","Runtime", "Director","Country","Production","Writer","Actors"]
        const severalItems = []
        const rating = ["Metascore","imdbRating", "imdbVotes"]

        let pureItemsCode = pureItems.map((element)=>{
            return (
            <div className="FilmProfile-Info_Item"> 
                <span className="Item_Info"> {film[element]}</span>
                <h4 className="Item_Title">{element} </h4>
            </div>)
        })

        let severalItemsCode = severalItems.map((element)=>{
            return (
                <div className="FilmProfile-Info_Item"> 
                    <h4 className="Item_Title">{element} </h4>
                    <span className="Item_Info"> {film[element]}</span>
                </div>)
        })

        let ratingCode = rating.map((element)=>{
            return (
                <div className="Rating_Container"> 
                    <span className="Item_Title">{element}</span>
                    <span className="Item_Info"> {film[element]}</span>
                </div>)
        })
        
        return (
            <div>
                {this.props.imdb.currentFilm.length == 0
                ?<div>Я Загружаюсь</div>
                :<div className="FilmProfile-Container wrapper">
                    <div className="FilmProfile">
                        <div className="FilmProfile_Title">
                            <h2>{film.Title}</h2>
                        </div>
                        <div className="TopContainer">
                            <div className="FilmProfile_Picture">
                                <img className="Picture_Img" src={film.Poster} alt=""/>
                                <Button size="lg" color="secondary">Add To Library</Button>
                                <Button size="lg" color="success">Added</Button>
                            </div>
                            <div className="FilmProfile_Info">
                                {pureItemsCode}
                            </div>
                        </div>
                        <div className="FilmProfile_Rating">
                            {ratingCode}
                        </div>

                        <div className="FilmProfile_Plot">
                            {film.Plot}
                        </div>    
                    </div>
                </div>}
            </div>
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
    { getCurrentFilm }
  )(FilmProfile);
