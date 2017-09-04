import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Shelf } from '../../components';

class HomeScene extends Component {

    _filterBooksByShelf = (p_Shelf) => {
        const { books = [] } = this.props;
        return books.filter(b => b.shelf === p_Shelf);
    }

    _loadShelfs = (p_Shelfs) => {
        if (p_Shelfs.length > 0) {
            return (
                <div>
                    {p_Shelfs.map(s => (
                        <Shelf key={s.id} title={s.title}
                            books={this._filterBooksByShelf(s.id)}
                            onBookChangerState={this.props.onBookChangerState} />
                    ))}
                </div>
            );
        } else {
            return (<div><span className="loading-img"></span> <span className="loading-text">Loading...</span></div>);
        }
    }

    render() {
        return (<div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {this._loadShelfs(this.props.shelfs)}
            </div>
            <div className="open-search">
                <Link to='/search'>Add a book</Link>
            </div>
        </div >);
    }
}

export default HomeScene;