import React from 'react';
import {connect} from 'react-redux';
import { getReview } from '../actions/reviewsActions';

import {NavLink} from 'react-router-dom'
import moment from 'moment'
import {Button} from 'reactstrap'

import './Reviews.css'

class Reviews extends React.PureComponent {

    state = {
        slice: 2,
    }

    componentWillMount() {
        this.props.getReview()
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    minimizeText = (text,maxLength) => {  // Slice text for preview on MainPage
        let slicePoint = maxLength
        for (let i = maxLength; i > 0; i--) {
            if(text[i] === " ") break ;
            else slicePoint-=1 
        }
        return text.slice(0,slicePoint)
    } 

    loadMoreReviews = (add) =>{
        this.setState({slice:this.state.slice+add})
    }


    render() {
        const {reviews} = this.props.review
        var code = []

        switch (this.props.filter) {
            case "individ":
                code= reviews.filter((e)=>e.imdbID===this.props.id).map((review, key) => {
                        return (
                            <div className="IND-UserReview  wrapper" key={key}>

                                <div className="IND-UserReview-Small-Block">
                                    <div className="IND-UserReview_IND-UserInfo">
                                        {'by : '}{review.user}
                                    </div>
                                    <div className="IND-UserReview_Date">
                                        <span>{moment(review.date).local(true).format('LLL')}</span>
                                    </div>
                                </div>
                                <div className="IND-UserReview-Small-Block">
                                </div>
                                <div className="IND-UserReview-Big-Block wide">
                                    <div className="IND-UserReview_Text">
                                        {review.review}

                                    </div>
                                </div>
                            </div>
                        )
                    })
            break;
            case "main":
                code= reviews.map((review, key) => {
                        return (
                            <div className="MP-UserReview  wrapper" key={key}>
                                <NavLink to={"/films/"+review.imdbID}>
                                    <div className="MP-UserReview_MP-Poster">
                                        <img src={review.poster} alt=""/>
                                    </div>
                                </NavLink>

                                <div className="MP-UserReview-Small-Block">
                                    <div className="MP-UserReview_MP-Title">
                                        {review.title}{", "}{review.year}
                                    </div>
                                    <div className="MP-UserReview_MP-UserInfo">
                                        {'by : '}{review.user}

                                    </div>
                                    <div className="MP-UserReview_Date">
                                        <span>{moment(review.date).local(true).format('LLL')}</span>
                                    </div>

                                </div>
                                <div className="MP-UserReview-Big-Block wide">
                                    <div className="MP-UserReview_Text">
                                        {this.minimizeText(review.review,170)}

                                    </div>
                                </div>
                            </div>
                        )
                    })
                
            break;
        
            default:
                code.push(null);
        }
          
        return (
            <div>
                <div className="UserReview-Container">
                    {code.map((e,key)=>{return e}).slice(0,this.state.slice) }
                </div>
                {this.props.filter === "main"
                ?<Button className="MP-UserReview_Button" onClick={()=>{this.loadMoreReviews(2)}}>load 2 more</Button>
                :null}
            </div>
        );
    }
}


const mapStateToProps = state => ({
    review: state.review
  });
  
  export default connect(
    mapStateToProps,
    { getReview }
  )(Reviews);