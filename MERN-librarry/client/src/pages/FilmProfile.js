import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { getCurrentFilm } from '../actions/imdbActions';
import { saveFilm } from '../actions/userActions';
import { getReview, postReview } from '../actions/activityActions';

import './FilmProfile.css'

class FilmProfile extends React.PureComponent {

    state = {
        review: "",
        filmId: "",
        posted: false,
        ready: false
    }

    componentWillMount(){
        this.props.getReview()          // Getting all reviews
        const {match} = this.props      // Get current film's id from router's path
        this.props.getCurrentFilm(match.params._id);
        this.setState({filmId:match.params._id})
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    postReview = e =>{
        e.preventDefault();
        this.props.postReview({
            id:      this.state.filmId,
            review:  this.state.review, 
            user:    this.props.user.userData.email
        }) 
        this.setState({posted:true})
    }

    saveFilm = () => {
        const currentFilm = this.props.imdb.currentFilm;
        const userid = this.props.user.userData._id;
        const body =     // creat a new obj with keys we need for fetch request
        (   ({ imdbID, Title, Poster, Genre, Year }) =>
            ({ imdbID, Title, Poster, Genre, Year }) 
        )   (currentFilm);

        console.log(body);
        console.log(userid);
        this.props.saveFilm(userid,body)
        this.setState({add:'Added'})
    }

    addFilmToLibrary = () =>{
        console.log(this.props.user.userData)

    }

    render() {
        const { reviews } = this.props.activity
        console.log(reviews)
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
                        <div className="FilmProfile_TopContainer">
                            <div className="FilmProfile_Picture">
                                <img className="Picture_Img" src={film.Poster} alt=""/>
                                <div className="FilmProfile_Buttons">
                                    <Button onClick={this.saveFilm} size="lg" color="secondary">Add</Button>
                                    <Button size="lg" color="success"> Added</Button>
                                    <Button size="lg" color="info"><i className="arrow"></i>to Search</Button>
                                    <Button size="lg" color="info"> <i className="arrow"></i>to Library</Button>
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
                        {this.props.user.authorized === true
                        ?<div className="FilmProfile_Review">  
                            <Form onSubmit={this.postReview} className="Review_Form">
                                <FormGroup>
                                    <Label for="exampleText">Leave review</Label>
                                    <Input onChange={this.onChange} placeholder="Write here ..." 
                                    rows="10" type="textarea" name="review" id="exampleText" />
                                </FormGroup>
                                <Button>Post</Button>
                            </Form>
                        </div> 
                        :null}
                    
                    </div>
                        {reviews.length > 0
                        ?reviews.map( (e,key) => {
                            return <div className="FilmProfile_UserReview wrapper" key={key}>{e.userReview.review}!!!!!!!!</div>
                        })
                        :null
                        }
                </div>}
            </div>
        );
    }
}


const mapStateToProps = state => ({
    imdb: state.imdb,
    user: state.user,
    activity: state.activity,
  });
  
  export default connect(
    mapStateToProps,
    { saveFilm,getCurrentFilm,getReview, postReview }
  )(FilmProfile);
