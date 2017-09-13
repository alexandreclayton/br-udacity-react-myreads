import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './services/api/BooksAPI';
import HomeScene from './scenes/Home';
import SearchScene from './scenes/Search';
import './App.css';

class BooksApp extends Component {
  state = {
    shelfs: [],
    books: [],
    checked: false
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState((state) => ({
        books,
        shelfs: [{ id: "currentlyReading", title: "Currently Reading" },
        { id: "wantToRead", title: "Want to Read" },
        { id: "read", title: "Read" }]
      }));
    });
  };

  _updateBookShelf = (p_bookId, p_newShelf) => {
    const resultFind = this.state.books.find(b => b.id === p_bookId);
    return (resultFind !== undefined) ? resultFind.shelf = p_newShelf : {};
  };

  onBookChangeShelf = (evt) => (book) => {
    const { books } = this.state;
    const shelfTarget = evt.target.value;
    const filterBook = books.find(b => b.id === book.id);
    BooksAPI.update(book, shelfTarget).then(p_books => {
      book.shelf = shelfTarget;
      this.setState({ ...books, book, checked: false });
    });
  };

  onBookCheck = (evt) => (p_book) => {
    const { books } = this.state;
    p_book.checked = evt.target.checked;
    this.setState({ ...books, p_book, checked: (books.filter(b => b.checked === true).length > 0) });
  };

  onBookChangeShelfMulti = (evt) => {
    const { books } = this.state;
    const shelfTarget = evt.target.value;
    const booksChecked = books.filter(b => b.checked === true);
    for (let book of booksChecked) {
      book.checked = false;
      book.shelf = shelfTarget;
      BooksAPI.update(book, shelfTarget).then(p_books => {
        this.setState({ ...books, book, checked: false });
      });
    }
  };

  AddMultiBooksSearch = (p_books) => {
    const { books } = this.state;
    for (let book of p_books) {
      BooksAPI.update(book, book.shelf).then(b => {
        this.setState({ books: [...books, ...p_books] });
      });
    }
  };

  render() {
    const { books, shelfs, checked } = this.state;
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <HomeScene
            books={books}
            shelfs={shelfs}
            onBookChangeShelf={this.onBookChangeShelf}
            showBtnMultiChange={checked}
            onBookCheck={this.onBookCheck}
            onBookChangeShelfMulti={this.onBookChangeShelfMulti}
          />
        )} />
        <Route path="/search" render={({ history }) => (
          <SearchScene
            onBookChangeShelf={this.onBookChangeShelf}
            AddMultiBooksSearch={this.AddMultiBooksSearch}
          />
        )} />
      </div>
    );
  };
};

export default BooksApp