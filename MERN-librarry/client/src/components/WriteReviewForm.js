import React from 'react';
import {connect} from 'react-redux';

import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

import {postReview} from '../actions/reviewsActions';

import './WriteReviewForm.css'

class WriteReviewForm extends React.Component {

    state = {
        review: ""
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    toggle = () => {
        this.setState({toggle: this.toggle})
    }

    postReview = e => {
        e.preventDefault();

        this.props.postReview({
                imdbID: this.props.id,
                review: this.state.review,
                user: this.props.user.userData.email,
                title: this.props.currentFilm.Title,
                year: this.props.currentFilm.Year,
                poster: this.props.currentFilm.Poster
            })
        this.setState({review:""})
        this.toggle();
        this.props.getReview // static prop function 
    }

    writeReview = () => {
        this.setState({
            writeReview: !this.state.writeReview
        })
    }

    render() {
        return (
            <div className="Review-Form-Container">
                <Form onSubmit={this.postReview} className="Review-Form">
                    <FormGroup>
                        <Label for="exampleText">Leave review</Label>
                        <Input
                            onChange={this.onChange}
                            placeholder={this.state.review}
                            rows="10"
                            type="textarea"
                            name="review"
                            id="exampleText"/>
                    </FormGroup>
                    <Button>Post</Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({user: state.user, review: state.review});

export default connect(mapStateToProps, {postReview})(WriteReviewForm);
