import React from 'react';

export const Book = ({ title, authors, urlImage, bookCurrentShelf, onBookChanger }) => (
    <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${urlImage}")` }}></div>
            <div className="book-shelf-changer">
                <select onChange={onBookChanger} value={bookCurrentShelf}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
    </div>
);

export const bookshelf = ({ title = "No title", listBooks = [], typeShelf, onBookChanger }) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                {{
                    listBooks.map(book => (
                        <li>
                            <Book title={book.title}
                                authors={book.authors}
                                urlImage={book.urlImage}
                                bookCurrentShelf={typeShelf}
                                onBookChanger={onBookChanger}
                            />
                        </li>
                    ))
                }}
            </ol>
        </div>
    </div>
);
