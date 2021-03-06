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

  onBookChangeShelf = (evt) => (p_book) => {
    const { books } = this.state;
    const shelfTarget = evt.target.value;
    const filterBook = books.find(b => b.id === p_book.id);
    BooksAPI.update(p_book, shelfTarget).then(p_books => {
      p_book.shelf = shelfTarget;
      this.setState({ ...books, p_book, checked: false });
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

  onBookExist = (p_book) => {
    const { books } = this.state;
    const book = books.find(b => b.id === p_book.id);
    return (book !== undefined ? book : p_book);
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
            onBookExist={this.onBookExist}
          />
        )} />
      </div>
    );
  };
};

export default BooksApp