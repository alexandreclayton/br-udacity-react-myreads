import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './services/api/BooksAPI';
import HomeScene from './scenes/Home';
import SearchScene from './scenes/Search';
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState((state) => ({ books }))
    });
  }

  onBookChangerState = (evt) => (book) => {
    BooksAPI.update(book, evt.target.value).then(books => {
      this.setState((state) => ({ books }))
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <HomeScene books={this.state.books}
            onBookChangerState={this.onBookChangerState}
          />
        )} />
        <Route path='/search' render={({ history }) => (
          <SearchScene />
        )} />
      </div>
    )
  }
}

export default BooksApp
