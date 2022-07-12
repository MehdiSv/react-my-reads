import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SearchBooks from "./SearchBooks";
import ListBooks from "./ListBooks";
import * as BooksAPI from "./BooksAPI";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    };

    getBooks();
  }, []);

  const removeBook = (book) => {
    setBooks(books.filter((b) => book.id !== b.id));
  };

  const addBook = (book) => {
    setBooks(books.concat(book));
  };

  const updateBook = (book, shelf) => {
    book.shelf = shelf;
    BooksAPI.update(book, shelf);

    if (shelf === "none") {
      removeBook(book);
      return;
    }

    const found = books.find((b) => b.id === book.id);
    if (found === undefined) {
      addBook(book);
      return;
    }

    const newBooks = books.map((b) => {
      if (b.id === book.id) {
        return book;
      }
      return b;
    });

    setBooks(newBooks);
  };

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/search"
          element={
            <SearchBooks
              personalBooks={books}
              onBookChange={(book, shelf) => updateBook(book, shelf)}
            />
          }
        />
        <Route
          exact
          path="/"
          element={
            <ListBooks
              books={books}
              onBookChange={(book, shelf) => updateBook(book, shelf)}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
