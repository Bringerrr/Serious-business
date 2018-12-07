import React from 'react';
import {Container, Button} from 'reactstrap';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom'

import {getUserData, delFilm} from '../actions/userActions';

import './FilmList.css'

class FilmList extends React.Component {

    componentWillMount() {
        const {userData} = this.props.user
        getUserData(userData.email, userData.password)
    }

    delFilm = (e) => {
        e.preventDefault();
        const {userData} = this.props.user
        
        this.props.delFilm(this.props.user.userData._id, {imdbID:e.currentTarget.id})
        this.props.getUserData(userData.email, userData.password)
    }

    render() {
        const {userData} = this.props.user
        return (
            <Container>
                <div className="FilmCard">
                    {userData.length === 0
                        ? null
                        : userData.film_storage.map((elem, key) => {
                                return (
                                    <div className="FilmCard_Item">
                                        <div className="FilmCard_Poster">
                                            <img src={elem.Poster} alt="Poster"/>
                                        </div>

                                        <h4>{elem.Title}</h4>
                                        <span>{elem.Genre} {elem.Year}</span>
                                        <div className="FilmCard_Buttons">
                                            <NavLink to={"/films/" + elem.imdbID}>
                                                <Button className="go" color="info">Перейти</Button>
                                            </NavLink>
                                            <Button onClick={this.delFilm} id={elem.imdbID} className="del" color="danger">Удалить</Button>
                                        </div>
                                    </div>
                                )
                            })
                      }
                </div>
            </Container>
        );
    }
}

const mapStateToProps = state => ({user: state.user});

export default connect(mapStateToProps, {getUserData, delFilm})(FilmList);
