import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from '../queries/queries';

const AddBook = () => {
  const [state, setState] = useState({
    name: '',
    genre: '',
    authorId: '',
  });
  const { loading, data } = useQuery(getAuthorsQuery);
  const [addBook, { data: newBook }] = useMutation(addBookMutation, {
    refetchQueries: [getBooksQuery],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({
      variables: {
        name: state.name,
        genre: state.genre,
        authorId: state.authorId,
      },
    });
  };

  if (loading) {
    return null;
  }

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input
          onChange={(e) => setState({ ...state, name: e.target.value })}
          type="text"
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          onChange={(e) => setState({ ...state, genre: e.target.value })}
          type="text"
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select
          onChange={(e) => setState({ ...state, authorId: e.target.value })}
        >
          <option>Select author</option>
          {data.authors.map((author) => {
            return (
              <option value={author.id} key={author.id}>
                {author.name}
              </option>
            );
          })}
        </select>
      </div>

      <button>+</button>
    </form>
  );
};

export default AddBook;
