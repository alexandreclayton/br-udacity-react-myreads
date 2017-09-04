import React from 'react';

export const Book = ({ data, onBookChangerState }) => (
    <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${data.imageLinks.smallThumbnail}")` }}></div>
            <div className="book-shelf-changer">
                <select onChange={(e) => onBookChangerState(e)(data)} defaultValue={data.shelf}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        </div>
        <div className="book-title">{data.title}</div>
        <div className="book-authors">
            <If test={data.authors !== undefined}>
                <span>{data.authors.join(", ")}</span>
            </If>
        </div>
    </div>
);

export const Shelf = ({ title = "No title", books = [], onBookChangerState }) => (
    <div className="bookshelf" >
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                {books.map(book => (
                    <li key={book.id}>
                        <Book data={book} onBookChangerState={onBookChangerState} />
                    </li>
                ))}
            </ol>
        </div>
    </div>
);

export const If = ({ test, children }) => (test ? children : false);
