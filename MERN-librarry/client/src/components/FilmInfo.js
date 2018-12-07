import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';
import {saveFilm} from '../actions/userActions';

import './FilmInfo.css'

class FilmInfo extends React.Component {

    saveFilm = () => {
        const {currentFilm} = this.props;
        const userid = this.props.user.userData._id;
        const body = // creat a new obj with keys we need for fetch request
        (({imdbID, Title, Poster, Genre, Year}) => ({imdbID, Title, Poster, Genre, Year}))(currentFilm);

        this.props.saveFilm(userid, body)
        this.setState({add: 'Added'})
    }

    addFilmToLibrary = () => {
        console.log(this.props.user.userData)
    }

    render() {
        const film = this.props.currentFilm;
        const pureItems = [
            "Released",
            "Genre",
            "BoxOffice",
            "Rated",
            "Runtime",
            "Director",
            "Country",
            "Production",
            "Writer",
            "Actors"
        ];
        const rating = ["Metascore", "imdbRating", "imdbVotes"];

        let pureItemsCode = pureItems.map((element, key) => {
            return (
                <div key={key} className="FilmProfile-Info_Item">
                    <span className="Item_Info">
                        {film[element]}</span>
                    <h4
                        style={{
                        margin: 0
                    }}
                        className="Item_Title">{element}
                    </h4>
                </div>
            )
        })
        let ratingCode = rating.map((element, key) => {
            return (
                <div key={key} className="Rating_Container">
                    <span className="Item_Title">{element}</span>
                    <span className="Item_Info">
                        {film[element]}
                        {element === "Metascore"
                            ? <span>{' / 100'}</span>
                            : element === "imdbRating"
                                ? <span>{' / 10'}</span>
                                : null}
                    </span>
                </div>
            )
        })

        return (
            <div>
                <div className="FilmProfile-Container wrapper">
                    <div className="FilmProfile">
                        <div className="FilmProfile_Title">
                            <h2>{film.Title}</h2>
                        </div>
                        <div className="FilmProfile_TopContainer">
                            <div className="FilmProfile_Picture">
                                <img className="Picture_Img" src={film.Poster} alt=""/>
                                <div className="FilmProfile_Buttons">
                                    <Button onClick={this.saveFilm} size="lg" color="secondary">Add</Button>
                                    <Button size="lg" color="success">
                                        Added</Button>
                                    <Button size="lg" color="info">
                                        <i className="arrow"></i>to Search</Button>
                                    <Button size="lg" color="info">
                                        <i className="arrow"></i>to Library</Button>
                                </div>
                            </div>
                            <div className="FilmProfile_Info">
                                {pureItemsCode}
                            </div>
                        </div>
                        <div className="FilmProfile_Rating">
                            {ratingCode}
                        </div>

                        <div className="FilmProfile_Plot">
                            <h4>Plot</h4>
                            {film.Plot}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({user: state.user});

export default connect(mapStateToProps, {saveFilm})(FilmInfo);
