import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

const handleLogout = async () => {
  await logout();
  navigate("/");
};

  return (
    <header>
      <h1>Zenlogue</h1>
      <div className="nav-bar">
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          {user ? (
            <>
              <span>Hi, {user.username}</span>
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
