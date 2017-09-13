import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Shelf, Loading, If, SelectShelfBook } from '../../components';

class HomeScene extends Component {

    _filterBooksByShelf = (p_Shelf) => {
        const { books = [] } = this.props;
        return books.filter(b => b.shelf === p_Shelf);
    };

    _loadShelfs = (p_Shelfs = []) => {
        let { onBookChangeShelf, onBookCheck } = this.props;
        return (
            <If test={p_Shelfs.length > 0} fail={<Loading />}>
                <div>
                    {p_Shelfs.map(s => (
                        <Shelf key={s.id} title={s.title}
                            books={this._filterBooksByShelf(s.id)}
                            onBookChangeShelf={onBookChangeShelf}
                            onBookCheck={onBookCheck} />
                    ))}
                </div>
            </If>
        );
    };

    render() {
        let { shelfs, showBtnMultiChange, onBookChangeShelfMulti } = this.props;
        return (<div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {this._loadShelfs(shelfs)}
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
            {showBtnMultiChange && <div className="book-shelf-multi-add">
                <SelectShelfBook onChange={onBookChangeShelfMulti} />
            </div>}
        </div >);
    };
}

export default HomeScene;