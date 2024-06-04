import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Search from "./Components/Search";
import BookShelf from "./Components/BookShelf";

function App() {
  const [bookShelf, setBookShelf] = useState([]);

  useEffect(() => {
    const storedBookShelf = JSON.parse(localStorage.getItem("bookshelf"));
    if (storedBookShelf) {
      setBookShelf(storedBookShelf);
    }
  }, []);

  const addToBookShelf = (book) => {
    const bookExists = bookShelf.some((b) => b.key === book.key);
    if (bookExists) {
      alert('The book is already added to the bookshelf.');
      return;
    }
    const newbookshelf = [...bookShelf, book];
    setBookShelf(newbookshelf);
    localStorage.setItem("bookshelf", JSON.stringify(newbookshelf));
  };

  const removeFromBookshelf = (book) => {
    const newBookshelf = bookShelf.filter((b) => b.key !== book.key);
    setBookShelf(newBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(newBookshelf));
  };
  return (
    <Router>
    <div className="App">
      
          
        <Routes>
          <Route
            path="/"
            element={<Search addToBookShelf={addToBookShelf} />}
          />
          <Route
            path="/bookshelf"
            element={<BookShelf bookShelf={bookShelf} removeFromBookshelf={removeFromBookshelf}/>}
          />
        </Routes>
     
    </div>
    </Router>
  );
}

export default App;
