import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";

function App() {
  const [books, setBooks] = useState([]);

  const fatchBooks = async () => {
    const response = await axios.get('http://localhost:3001/books');
    setBooks(response.data);
  }

  useEffect( () => {
    fatchBooks()
  }, [])

  const createBook = async (title) => {   
    const response = await axios.post('http://localhost:3001/books', {
      title,
    });

    const updatedBooks = [
      ...books,
      response.data,
    ];
    setBooks(updatedBooks);
  };

  const editBookbyId = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });

    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  const deleteBookById = async (id) => {
    const response = await axios.delete(`http://localhost:3001/books/${id}`);

    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });
    setBooks(updatedBooks);
  };

  return (
    <>
      <div className="app">
        <h1>Reading List</h1>
        <BookList
          books={books}
          onDelete={deleteBookById}
          onEdit={editBookbyId}
        />
        <BookCreate onCreate={createBook} />
      </div>
    </>
  );
}

export default App;
