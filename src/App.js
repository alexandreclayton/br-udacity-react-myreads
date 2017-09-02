import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import * as BooksAPI from './BooksAPI'
import HomeScene from './scenes/Home';
import SearchScene from './scenes/Search';
import './App.css'

class BooksApp extends Component {
  state = {}

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <HomeScene />
        )} />
        <Route path='/search' render={({ history }) => (
          <SearchScene />
        )} />
      </div>
    )
  }
}

export default BooksApp
