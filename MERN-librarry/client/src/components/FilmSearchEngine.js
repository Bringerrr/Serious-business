import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  Pagination, 
  PaginationItem, 
  PaginationLink
} from 'reactstrap';

import { NavLink,Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import { getFilm, getCurrentFilm } from '../actions/imdbActions';

import FilmProfile from '../pages/FilmProfile';

class FilmSearchEngine extends Component {
  state = {
    modal:false,
    currentPage: 1,
    modalImg:'',
    name: '',
    year: '',
    type: '',
    url:''
  };

  renderTableRows = () =>{
    let results = this.props.imdb.items.Search;

    return results.map( (element, key) => {
        return( 
            <tr imgsrc={element.Poster} id={element.imdbID} key ={key} onClick={this.onClickGetInfo}>
                <th scope="row">{'Info'}</th>
                <td>{element.Title}</td>
                <td>{element.Year}</td>
                <td>{element.Type}</td>
            </tr>
        )
    })
  }

  renderSelectElem = () =>{
    let allTypes = ['','movie','game','series','episode']

    return allTypes.map((elem,key)=>{
      let array = []

      if (elem === "") array.push(<option key={key} value="">All</option>)
      else array.push(<option key={key} >{elem}</option>)

      return array
    })
  }

  onCLickPagination = (event) => {
    event.preventDefault();


    var pressedPage = parseInt(event.currentTarget.innerHTML,10)
    this.setState({currentPage:pressedPage})

    this.props.getFilm(
        this.state.name, 
        this.state.type,
        this.state.year,
        pressedPage
    );
  }

  findFilm = () => {
    this.props.getFilm();
  }

  getCurrentFilm = (id) =>{
    this.props.getCurrentFilm(id)
  }

  onClickGetInfo = e => {
    e.preventDefault();

    this.setState({modalImg:e.currentTarget.getAttribute("imgsrc")})

    this.getCurrentFilm(e.currentTarget.id);

    this.toggle();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    // Find a film
    this.props.getFilm(
        this.state.name, 
        this.state.year,
        this.state.type
    );
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  renderPagination = () =>{

    let codeArray = []
    let itemsPerPage = 10     // Maximum number of results this API can return is 10;
    let middlepages = 3;     // Number of buttons that can exist on compact Pagination
                                  //  bar. For exemple midlepages = 4 and bar looks like ([1, ..., 6,7,8,9, ... , 98 ])
    let totalPages = Math.ceil(this.props.imdb.items.totalResults/itemsPerPage)
    let currPage = this.state.currentPage;

    let pagItem = (elem)  => {   // Page button element
      return(
        <PaginationItem key ={elem}>
          <PaginationLink key ={elem} onClick={this.onCLickPagination}>
            {elem}
          </PaginationLink>
        </PaginationItem>
      )
    }
    let pagItemDots=          // Three dots element
      <PaginationItem >
        <PaginationLink >
          {'...'}
        </PaginationLink>
      </PaginationItem>

    switch (true) {
      case (totalPages <= ( 1 + middlepages + 1 )): // Template for pagination bar like ( [1,   2,3,4,   5])
        for (let i = 1; i <= totalPages; i++) {     // without places for three dots 
          codeArray.push( pagItem(i) )
        }
        break;
      case (totalPages <= ( 1 + 1 + middlepages + 1 )): // Template for pagination bar like ( [1,   2,3,4,   5])
        for (let i = 1; i <= totalPages; i++) {         // with one potential place for three dots 
          codeArray.push( pagItem(i) )
        }
        break;
      case (totalPages >= ( 1 + 1 + middlepages + 1 + 1 )):  // Template for pagination bar like ( [1, ... 5,6,7, ... 100])
        if(currPage <= middlepages){                         // with two potential places three dots
          for (let i = 1; i <= middlepages+1; i++) {
            codeArray.push( pagItem(i) );
          }
          codeArray.push( pagItemDots );
          codeArray.push( pagItem( totalPages ) );
        }

        else if(currPage >= middlepages && currPage <= ( totalPages - middlepages ) ){
          codeArray.push( pagItem( 1 ) );
          codeArray.push( pagItemDots );
          codeArray.push( pagItem( currPage-1 ) );
          codeArray.push( pagItem( currPage ) );
          codeArray.push( pagItem( currPage+1 ) );
          codeArray.push( pagItemDots );
          codeArray.push( pagItem( totalPages ) );
        }

        else if( currPage >= ( totalPages - middlepages ) ){
          codeArray.push( pagItem( 1 ) );
          codeArray.push( pagItemDots );
          for (let i = totalPages - middlepages; i <= totalPages; i++) {
            codeArray.push( pagItem(i) );
          }
        }
        break;
      
      default:
        null;
    }

    const onCLickPaginationBack = e => {
      e.preventDefault();
  
      let stepBack = this.state.currentPage-1
  
      if(stepBack<1){
        return null
      }
      this.setState({currentPage:stepBack})
  
      this.props.getFilm(
          this.state.name, 
          this.state.year,
          this.state.currentPage-1
      );
    }
  
    const onCLickPaginationForward = e => {
      e.preventDefault();
  
      let stepForward = this.state.currentPage + 1
  
      if(stepForward > totalPages){
        return null
      }
  
        this.setState({currentPage:stepForward})
  
        this.props.getFilm(
          this.state.name, 
          this.state.year,
          this.state.currentPage+1
        );
     
    }
      
      return (
        <Pagination aria-label="Page navigation example">
          <PaginationItem>
            <PaginationLink previous onClick={onCLickPaginationBack} />
          </PaginationItem>
            {codeArray}
          <PaginationItem>
            <PaginationLink next onClick={onCLickPaginationForward}/>
          </PaginationItem>
        </Pagination>
      )
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="item">Film Title</Label>
            <Input
              type="text"
              name="name"
              id="item"
              placeholder="Write a title"
              required
              onChange={this.onChange}
            />
            <Label for="year">Year</Label>
            <Input
              type="text"
              name="year"
              id="year"
              placeholder="Write a year"
              onChange={this.onChange}
            />

            <FormGroup>
            <Label for="exampleSelect">Type</Label>
            <Input 
              type="select" 
              name="type" 
              id="type"
              onChange={this.onChange}
              >
              {this.renderSelectElem()}
            </Input>
          </FormGroup>
            <Button
                color="danger"
                style={{ marginBottom: '2rem' }}
                >
                Search
            </Button>
          </FormGroup>

        </Form>
    
        {(this.props.imdb.items.Search)
          ?<Table dark>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Year</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTableRows()}
            </tbody>
          </Table>
          :null
        }

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.props.imdb.currentFilm.Title}</ModalHeader>
          <ModalBody>
              {(this.state.modalImg !== "")
              ?<img style={{float:'left'}} src={this.state.modalImg} alt=""/>
              :<img src={"https://cdn.browshot.com/static/images/not-found.png"} alt=""/>}

              <span style={{float:'left'}}>{this.props.imdb.currentFilm.Plot}</span>
              <NavLink to={"/films/"+this.props.imdb.currentFilm.imdbID}>
                <Button
                  color="danger"
                  style={{ marginBottom: '2rem' }}
                  >
                  Подробнее
                </Button>
              </NavLink>
              
          </ModalBody>
        </Modal>

        {this.renderPagination()}
        <Route path={`/films/:id`} component={FilmProfile} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  imdb: state.imdb
});

export default connect(
  mapStateToProps,
  { addItem, getFilm, getCurrentFilm }
)(FilmSearchEngine);
