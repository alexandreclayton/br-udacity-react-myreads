import React from 'react';

import { Book } from './Book'

export const Shelf = ({ title = "No title", books = [], onBookChangeShelf, onBookCheck }) => (
    <div className="bookshelf" >
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
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
    </div>
);

export const SelectShelfBook = ({ onChange = {}, book = {}, defaultValue = "none" }) => (
    <select onChange={(book.id !== undefined ? (evt) => onChange(evt)(book) : (evt) => onChange(evt))} defaultValue={defaultValue}>
        <option value="none" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
    </select>
);