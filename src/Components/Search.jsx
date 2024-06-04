// Search.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsSearch } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Search = ({ addToBookShelf }) => {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);

  const fetchPopularBooks = async () => {
    try {
      const response = await axios.get("https://openlibrary.org/search.json?q=popular&limit=10&page=1");
      setBooks(response.data.docs);
    } catch (error) {
      console.log("Error while fetching books", error);
    }
  };


  useEffect(() => {
    if (search.length > 2) {
      axios
        .get(`https://openlibrary.org/search.json?q=${search}&limit=10&page=1`)
        .then((response) => {
          setBooks(response.data.docs);
        });
    } else {
      fetchPopularBooks();
    }
  }, [search]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder='Search the book'
        />
        <BsSearch onClick={() => {}} className="searchStyle" />
      </div>
      <div className="bookshelf">
          <Link to="/bookshelf"><button>My Bookshelf</button></Link>
          </div>
      <div className='List'>
        {books.map((book) => (
          <div key={book.key} className="book-card">
            <h3>{book.title}</h3>
            <p>{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
            <button onClick={() => addToBookShelf(book)}>Add to Bookshelf</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;