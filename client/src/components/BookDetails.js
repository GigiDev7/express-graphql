import React from 'react';
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries';

const BookDetails = ({ id }) => {
  const { loading, data } = useQuery(getBookQuery, {
    variables: { id },
  });

  if (loading) {
    return null;
  }

  if (!data) {
    return <div>No book selected...</div>;
  }

  return (
    <div id="book-details">
      <div>
        <h2>{data.book.name}</h2>
        <p>{data.book.genre}</p>
        <p>{data.book.author.name}</p>
        <p>All books by this author:</p>
        <ul className="other-books">
          {data.book.author.books.map((book) => {
            return <li key={book.id}>{book.name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default BookDetails;
