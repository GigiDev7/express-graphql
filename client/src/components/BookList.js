import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = () => {
  const { loading, data } = useQuery(getBooksQuery);
  const [bookId, setBookId] = useState(null);

  if (loading) {
    return <div>Loading books...</div>;
  }

  return (
    <div>
      <ul id="book-list">
        {data.books.map((book) => (
          <li onClick={() => setBookId(book.id)} key={book.id}>
            {book.name}
          </li>
        ))}
      </ul>
      <BookDetails id={bookId} />
    </div>
  );
};

export default BookList;
