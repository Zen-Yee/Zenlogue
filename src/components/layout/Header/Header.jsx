import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import SearchBar from "../../ui/SearchBar/SearchBar";
import "./Header.css";

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
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          {user ? (
            <>
              <span>Hi, {user.username}</span>
              <Link to={`/post/create`}>
                <p>Create Post</p>
              </Link>
              <button type="button" onClick={handleLogout}>
                Log Out
              </button>
            </>
          ) : (
            <Link to="/auth" onClick={() => setMenuOpen(false)}>
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
