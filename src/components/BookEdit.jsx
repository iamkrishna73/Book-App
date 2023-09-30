import React, { useState } from "react";

const BookEdit = ({ book, onSubmit }) => {
  const [title, setTitle] = useState(book.title);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(book.id, title);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="book-edit">
        <label htmlFor="">Title</label>
        <input
          type="text"
          value={title}
          onChange={handleChange}
          className="input"
          required
        />
        <button className="button is-primary">Save</button>
      </form>
    </div>
  );
};

export default BookEdit;
