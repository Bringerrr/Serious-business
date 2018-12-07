import React from 'react';
import {connect} from 'react-redux';

import './FilmProfile.css'

import FilmInfo from '../components/FilmInfo'
import Reviews from '../components/Reviews'
import WriteReviewForm from '../components/WriteReviewForm'

import {getCurrentFilm} from '../actions/imdbActions';
import { getReview } from '../actions/reviewsActions';

class FilmProfile extends React.PureComponent {

    componentWillMount() {
        const {match} = this.props
        this.props.getCurrentFilm(match.params._id);
        this.props.getReview()
    }

    getCurrentFilm = id => {
        this.props.getCurrentFilm(id);
    }

    render() {
        return (
            <div>
                <FilmInfo 
                    currentFilm={this.props.imdb.currentFilm} 
                    id={this.props.match.params._id} 
                />
                {( this.props.user.authorized === true || this.props.user.userData.email) 
                ?<WriteReviewForm 
                    id={this.props.match.params._id}
                    currentFilm={this.props.imdb.currentFilm}
                    getReview = {this.props.getReview()}  
                />
                :null}
                <Reviews 
                    filter={"individ"} // values: main, individ
                    id={this.props.match.params._id}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({imdb: state.imdb, user: state.user, review: state.review});

export default connect(mapStateToProps, { getCurrentFilm, getReview } )(FilmProfile);
