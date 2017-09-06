import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './services/api/BooksAPI';
import HomeScene from './scenes/Home';
import SearchScene from './scenes/Search';
import './App.css'

class BooksApp extends Component {
  state = {
    shelfs: [],
    books: [],
    checked: false
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

  onBookChangeShelf = (evt) => (p_book) => {
    const { books } = this.state;
    const shelfTarget = evt.target.value;
    const filterBook = books.filter(b => b.id === p_book.id);
    BooksAPI.update(p_book, shelfTarget).then(p_books => {
      if (filterBook > 0) {
        p_books[shelfTarget].forEach((p_bookId) => {
          this.setState({ books: [...books, this._updateBookShelf(p_bookId, shelfTarget)] });
        });
      } else {
        p_book.shelf = shelfTarget;
        this.setState({ books: [...books, p_book] });
      }
    });
  }

  onBookCheck = (evt) => (p_book) => {
    const { books } = this.state;
    p_book.checked = evt.target.checked;
    this.setState({ ...books, p_book, checked: (books.filter(b => b.checked == true).length > 0) });
  }

  onBookChangeShelfMulti = (evt) => {
    const { books } = this.state;
    const shelfTarget = evt.target.value;
    const booksChecked = books.filter(b => b.checked == true);
    for (let book of booksChecked) {
      book.checked = false;
      BooksAPI.update(book, shelfTarget).then(p_books => {
        p_books[shelfTarget].forEach((p_bookId) => {
          this.setState({ books: [...books, this._updateBookShelf(p_bookId, shelfTarget)], checked: false });
        });
      });
    }
  }

  render() {
    const { books, shelfs, checked } = this.state;
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <HomeScene
            books={books}
            shelfs={shelfs}
            onBookChangeShelf={this.onBookChangeShelf}
            showBtnMultiChange={checked}
            onBookCheck={this.onBookCheck}
            onBookChangeShelfMulti={this.onBookChangeShelfMulti}
          />
        )} />
        <Route path='/search' render={({ history }) => (
          <SearchScene onBookChangeShelf={this.onBookChangeShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
