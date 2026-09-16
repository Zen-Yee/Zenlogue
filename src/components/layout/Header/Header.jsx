import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <h1>Zenlogue</h1>
      <div className="nav-bar">
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link to="/auth" onClick={() => setMenuOpen(false)}>
            Sign In
          </Link>
        </div>

        <a className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </a>
      </div>
    </header>
  );
}

export default Header;
