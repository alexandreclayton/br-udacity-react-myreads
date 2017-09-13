import React from 'react';
import PropTypes from 'prop-types';

import { SelectShelfBook } from './Shelf';
import { If } from './If';

export const Book = ({ data, onBookChangeShelf, onBookCheck }) => {
    const { authors = [], imageLinks = {}, shelf = "", checked = false } = data;
    const { smallThumbnail = "noimage" } = imageLinks;
    return (<div className="book">
        <div className="book-top">
            <div className="book-cover">
                <img src={smallThumbnail} alt={`Book ${data.title}`} />
            </div>
            <div className="book-shelf-changer">
                <SelectShelfBook onChange={onBookChangeShelf} book={data} defaultValue={shelf} />
            </div>
        </div>
        <div className="book-title">{data.title}</div>
        <div className="book-authors">
            <If test={authors.length > 0}>
                <span>{authors.join(", ")}</span>
            </If>
        </div>
        <input type="checkbox"
            name={`ckb_${shelf}`}
            checked={checked}
            onChange={(e) => onBookCheck(e)(data)} />
    </div>);
};

Book.propTypes = {
    data: PropTypes.object.isRequired,
    onBookChangeShelf: PropTypes.func.isRequired,
    onBookCheck: PropTypes.func.isRequired
};