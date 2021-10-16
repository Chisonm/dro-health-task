import React from 'react'
import Moment from 'react-moment';

interface bookData  {
    name: string,
    publisher: string,
    authors: string[],
    isbn: number,
    released: string,
}


const BooksData = (book: bookData) => {
    
    return (
        <div className="book-cover">
          <h3 className="book-title">{book.name}</h3>
          <div className="book-content">
            <h4 className="book-name">{book.publisher}</h4>
            <p>Authors <span></span> {book.authors}</p>
            <p>Isban <span></span> {book.isbn}</p>
          </div>
          <p className="end-date"><Moment format='MMMM Do YYYY, h:mm:ss a'>{book.released}</Moment></p>
        </div>
     
    )
}


export default BooksData

