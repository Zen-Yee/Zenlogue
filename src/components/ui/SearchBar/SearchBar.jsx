import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import "./SearchBar.css";

function SearchBar({ initialValue = "", onSearch }) {
  const [text, setText] = useState(initialValue);

  // keep the input in sync if the URL changes (back/forward, shared link)
  useEffect(() => {
    setText(initialValue);
  }, [initialValue]);

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(text.trim());
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <label>
        <Search className="search-icon" />
        <input
          name="q"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search..."
          autoComplete="off"
        />
      </label>
    </form>
  );
}

export default SearchBar;