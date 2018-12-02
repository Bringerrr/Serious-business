import React, { Component } from 'react';

import SearchFilm from './pages/SearchFilm';
import UserLib from './pages/UserLib';
import FilmProfile from './pages/FilmProfile'
import MainPage from './pages/MainPage';

import Header from './components/Header';



import { Provider } from 'react-redux';

import thunk from 'redux-thunk';
import reducers from './reducers/index'
import { applyMiddleware, createStore } from 'redux';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers)


class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Provider store={store}>
        <div className="App">

            <div>

              <Header/>

              <Switch>
                <Route path="/" exact component={MainPage}/>
                <Route path="/userLib" component={UserLib}/>
                <Route path="/films" exact component={SearchFilm}/>
                <Route path="/films/:_id" component={FilmProfile}/>
              </Switch>
            </div>

        </div>
      </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
