import "./Header.css";

// Library
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

// Context
import { useAuth } from "../../../context/AuthContext";

// Components
import SearchBar from "../../ui/SearchBar/SearchBar";


function Header() {
  const navigate = useNavigate();

  // Hamburger Button
  const [menuOpen, setMenuOpen] = useState(false);

  // Logout Button
  const { user, logout } = useAuth();
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // SearchBar
  const [searchParams] = useSearchParams();
  function handleSearch(q) {
    navigate(q ? `/post?search=${encodeURIComponent(q)}` : "/post");
  }

  return (
    <header>
      <h1>Zenlogue</h1>
      <SearchBar
        initialValue={searchParams.get("search") || ""}
        onSearch={handleSearch}
      />
      <div className="nav-bar">
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {user && <span className="nav-items">Hi, {user.username}</span>}

          <Link className="nav-items" to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          {user ? (
            <>
              <Link className="nav-items" to={`/post/create`}>
                <p>Create Post</p>
              </Link>
              <button className="nav-items" type="button" onClick={handleLogout}>
                Log Out
              </button>
            </>
          ) : (
            <Link  className="nav-items" to="/auth" onClick={() => setMenuOpen(false)}>
              Sign In
            </Link>
          )}
        </div>

        <a className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </a>
      </div>
    </header>
  );
}

export default Header;
