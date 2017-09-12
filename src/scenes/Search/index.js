import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../services/api/BooksAPI';
import { Book, SelectShelfBook } from '../../components'


class SearchScene extends Component {
    state = {
        query: '',
        books: [],
        checked: false
    }

    onChangeQuery = (query) => {
        this.setState({ query: query })
        const queryTrim = query.trim();
        if (queryTrim !== "") {
            BooksAPI.search(queryTrim, 10).then((books) => {
                const { error = "" } = books;
                if (error === "") {
                    this.setState({ books });
                }
            });
        }
    }

    onBookCheck = (evt) => (p_book) => {
        const { books } = this.state;
        p_book.checked = evt.target.checked;
        this.setState({ ...books, p_book, checked: (books.find(b => b.checked === true) !== undefined) });
    }

    onBookChangeShelfMulti = (evt) => {
        const { books } = this.state;
        const { AddMultiBooksSearch } = this.props;
        const shelfTarget = evt.target.value;
        let booksChecked = books.filter(b => b.checked === true);
        for (let book of booksChecked) {
            book.shelf = shelfTarget;
            book.checked = false;
        }
        AddMultiBooksSearch(booksChecked);
    }

    render() {
        let { query = "", books = [], checked } = this.state;
        let { onBookChangeShelf } = this.props;
        return (<div className="search-books">
            <div className="search-books-bar">
                <Link className='close-search' to='/'>Close</Link>
                <div className="search-books-input-wrapper">
                    <input type="text"
                        placeholder="Search by title or author"
                        onChange={(event) => this.onChangeQuery(event.target.value)}
                        value={query} />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {books.map(book => (
                        <li key={book.id}>
                            <Book data={book}
                                onBookChangeShelf={onBookChangeShelf}
                                onBookCheck={this.onBookCheck} />
                        </li>
                    ))}
                </ol>
            </div>
            {checked && <div className="book-shelf-multi-search">
                <SelectShelfBook onChange={this.onBookChangeShelfMulti} />
            </div>}
        </div>);
    }
}
export default SearchScene;