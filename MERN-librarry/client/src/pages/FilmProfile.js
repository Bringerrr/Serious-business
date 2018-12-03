import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button } from 'reactstrap';

import { getCurrentFilm } from '../actions/imdbActions';
import { saveFilm } from '../actions/userActions';

import './FilmProfile.css'

class FilmProfile extends Component {

    componentWillMount(){
        const {match} = this.props
        console.log(match.params._id);
        this.props.getCurrentFilm(match.params._id);
    }

    getCurrentFilm = id =>{
        this.props.getCurrentFilm(id)
    }

    saveFilm = () => {
        const currentFilm = this.props.imdb.currentFilm;
        const userid = this.props.user.userData._id;
        const body =  // creat a new obj with keys we need for registration
        (   ({ imdbID, Title, Poster, Genre, Year }) =>
            ({ imdbID, Title, Poster, Genre, Year }) 
        )   (currentFilm);

        console.log(body);
        this.props.saveFilm(userid,body)
    }

    addFilmToLibrary = () =>{
        console.log(this.props.user.userData)
    }

    render() {

        const film = this.props.imdb.currentFilm;
        const pureItems = ["Released","Genre","BoxOffice","Rated",
        "Runtime", "Director","Country","Production","Writer","Actors"];
        const rating = ["Metascore","imdbRating", "imdbVotes"];

        let pureItemsCode = pureItems.map((element, key)=>{
            return (
            <div key={key} className="FilmProfile-Info_Item"> 
                <span className="Item_Info"> {film[element]}</span>
                <h4 style={{margin:0}} className="Item_Title">{element} </h4>
            </div>)
        })
        let ratingCode = rating.map((element,key)=>{
            return (
                <div key={key} className="Rating_Container"> 
                    <span className="Item_Title">{element}</span>
                    <span className="Item_Info"> {film[element]}
                    {element === "Metascore"
                        ?<span>{' / 100'}</span>
                        :element === "imdbRating"
                            ?<span>{' / 10'}</span>
                            :null} 
                    </span>
                </div>)
        })
        
        return (
            <div>
                {this.props.imdb.currentFilm.length === 0
                ?<div>Я Загружаюсь</div>
                :<div className="FilmProfile-Container wrapper">
                    <div className="FilmProfile">
                        <div className="FilmProfile_Title">
                            <h2>{film.Title}</h2>
                        </div>
                        <div className="TopContainer">
                            <div className="FilmProfile_Picture">
                                <img className="Picture_Img" src={film.Poster} alt=""/>
                                <Button onClick={this.saveFilm} size="lg" color="secondary">Add To Library</Button>
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
    imdb: state.imdb,
    user: state.user
  });
  
  export default connect(
    mapStateToProps,
    { saveFilm,getCurrentFilm }
  )(FilmProfile);
