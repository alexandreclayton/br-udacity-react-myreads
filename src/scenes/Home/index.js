import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Shelf } from '../../components';

class HomeScene extends Component {
    render() {
        let booksReanding = this.props.books.filter(b => b.shelf === "currentlyReading");
        let bookWantToRead = this.props.books.filter(b => b.shelf === "wantToRead");
        let booksRead = this.props.books.filter(b => b.shelf === "read");

        return (<div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <Shelf title="Currently Reading"
                        books={booksReanding}
                        onBookChangerState={this.props.onBookChangerState} />
                    <Shelf title="Want to Read"
                        books={bookWantToRead}
                        onBookChangerState={this.props.onBookChangerState} />
                    <Shelf title="Read"
                        books={booksRead}
                        onBookChangerState={this.props.onBookChangerState} />
                </div>
            </div>
            <div className="open-search">
                <Link to='/search'>Add a book</Link>
            </div>
        </div>);
    }
}

export default HomeScene;