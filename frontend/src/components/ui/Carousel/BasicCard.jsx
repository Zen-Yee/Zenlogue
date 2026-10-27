import React from "react";
import "./BasicCard.css";

function BasicCard({ title, content }) {
  return (
    <div className="basic-card">
      <div className="card-image">
        <img src="https://picsum.photos/500" alt="Random placeholder" />
      </div>
      <div className="card-text">
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </div>
  );
}

export default BasicCard;
