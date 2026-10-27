import React from "react";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <p>Made from scratch by Zen Yee @ {year}</p>
    </footer>
  );
}

export default Footer;