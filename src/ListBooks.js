import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";

const ListBooks = ({ books, onBookChange }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            name="Currently Reading"
            books={books.filter((book) => book.shelf === "currentlyReading")}
            onBookChange={onBookChange}
          />
          <BookShelf
            name="Want to Read"
            books={books.filter((book) => book.shelf === "wantToRead")}
            onBookChange={onBookChange}
          />
          <BookShelf
            name="Read"
            books={books.filter((book) => book.shelf === "read")}
            onBookChange={onBookChange}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default ListBooks;
