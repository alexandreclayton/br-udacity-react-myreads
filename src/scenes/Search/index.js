import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../services/api/BooksAPI';
import { Book } from '../../components'


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
        console.log(books);
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
                            <Book data={book} onBookChangeShelf={this.props.onBookChangeShelf} />
                        </li>
                    ))}
                </ol>
            </div>
        </div>);
    }
}
export default SearchScene;