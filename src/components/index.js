import React from 'react';

export const Book = ({ data, onBookChangeShelf, onBookCheck }) => {
    const { authors = [], imageLinks = {}, shelf = "none", checked = false } = data;
    const { smallThumbnail = "noimage" } = imageLinks;
    return (<div className="book">
        <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${smallThumbnail}")` }}></div>
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
    </div>)
};

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

export const Loading = () => (<div><span className="loading-img"></span> <span className="loading-text">Loading...</span></div>);

export const If = ({ test, fail = false, children }) => (test ? children : fail);

