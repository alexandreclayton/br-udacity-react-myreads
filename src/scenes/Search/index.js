import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../services/api/BooksAPI';
import { Book, SelectShelfBook } from '../../components'


class SearchScene extends Component {
    state = {
        query: '',
        books: []
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

    render() {
        let { query = "", books = [] } = this.state;
        let { showBtnMultiChange, onBookCheck, onBookChangeShelf, onBookChangeShelfMulti } = this.props;
        console.log(showBtnMultiChange);
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
                                onBookCheck={onBookCheck} />
                        </li>
                    ))}
                </ol>
            </div>
            {showBtnMultiChange && <div className="book-shelf-multi-add">
                <SelectShelfBook onEvtChange={onBookChangeShelfMulti} />
            </div>}
        </div>);
    }
}
export default SearchScene;