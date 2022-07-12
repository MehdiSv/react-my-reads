import { useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

const SearchBooks = ({ personalBooks, onBookChange }) => {
  const [books, setBooks] = useState([]);

  const updateQuery = (query) => {
    if (query === "") {
      setBooks([]);
      return;
    }

    const getBooks = async (query) => {
      const res = await BooksAPI.search(query);
      if (res.error !== undefined) {
        setBooks([]);
        return;
      }
      setBooks(res);
    };

    getBooks(query);
  };

  const getBookShelf = (book) => {
    const found = personalBooks.find((b) => b.id === book.id);
    if (found === undefined) {
      return "none";
    }
    return found.shelf;
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(event) => updateQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book
                book={book}
                onBookChange={onBookChange}
                bookShelf={getBookShelf(book)}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchBooks;
