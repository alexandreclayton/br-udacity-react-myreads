import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../services/api/BooksAPI';
import { Book, SelectShelfBook, If, Loading } from '../../components';
import { Debounce } from 'react-throttle';

class SearchScene extends Component {

    state = {
        query: "",
        books: [],
        checked: false
    };

    onChangeQuery = (query) => {
        BooksAPI.search(query, 10).then((books) => {
            if (Array.isArray(books)) {
                this.setState({ books, query });
            } else {
                this.setState({ books: [], query });
            }
        });
    };

    onBookCheck = (evt) => (p_book) => {
        const { books } = this.state;
        p_book.checked = evt.target.checked;
        this.setState({ ...books, p_book, checked: (books.find(b => b.checked === true) !== undefined) });
    };

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
    };

    render() {
        let { query = "", books = [], checked } = this.state;
        let { onBookChangeShelf, onBookExist } = this.props;
        return (<div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    <Debounce time="500" handler="onChangeQuery">
                        <input type="text"
                            placeholder="Search by title or author"
                            onChange={(evt) => this.onChangeQuery(evt.target.value)} />
                    </Debounce>
                </div>
            </div>
            <div className="search-books-results">
                <If test={books.length > 0
                    || (query === "" && books.length === 0)
                    || (query !== "" && books.length > 0)} fail={<h1>no results found for "{query}".</h1>}>
                    <ol className="books-grid">
                        {books.map(book => (<li key={book.id}>
                            <Book data={onBookExist(book)}
                                onBookChangeShelf={onBookChangeShelf}
                                onBookCheck={this.onBookCheck} />
                        </li>))}
                    </ol>
                </If>
            </div>
            {checked && <div className="book-shelf-multi-search">
                <SelectShelfBook onChange={this.onBookChangeShelfMulti} />
            </div>}
        </div>);
    };
};
export default SearchScene;