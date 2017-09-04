import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './services/api/BooksAPI';
import HomeScene from './scenes/Home';
import SearchScene from './scenes/Search';
import './App.css'

class BooksApp extends Component {
  state = {
    shelfs: [],
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState((state) => ({
        books,
        shelfs: [{ id: "currentlyReading", title: "Currently Reading" },
        { id: "wantToRead", title: "Want to Read" },
        { id: "read", title: "Read" }]
      }))
    });
  }

  _updateBookShelf = (p_bookId, p_newShelf) => {
    const resultFilter = this.state.books.filter(b => b.id === p_bookId);
    return (resultFilter.length > 0) ? resultFilter[0].shelf = p_newShelf : {};
  }

  onBookChangerState = (evt) => (book) => {
    const shelfTarget = evt.target.value;
    BooksAPI.update(book, shelfTarget).then(books => {
      books[shelfTarget].forEach((p_bookId) => {
        this.setState({ books: [...this.state.books, this._updateBookShelf(p_bookId, shelfTarget)] });
      });
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <HomeScene books={this.state.books} shelfs={this.state.shelfs}
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
