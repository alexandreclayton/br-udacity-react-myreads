import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Shelf } from '../../components';

class HomeScene extends Component {

    _filterBooksByShelf = (p_Shelf) => {
        const { books = [] } = this.props;
        return books.filter(b => b.shelf === p_Shelf);
    }

    render() {
        return (<div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <Shelf title="Currently Reading"
                        books={this._filterBooksByShelf("currentlyReading")}
                        onBookChangerState={this.props.onBookChangerState} />
                    <Shelf title="Want to Read"
                        books={this._filterBooksByShelf("wantToRead")}
                        onBookChangerState={this.props.onBookChangerState} />
                    <Shelf title="Read"
                        books={this._filterBooksByShelf("read")}
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