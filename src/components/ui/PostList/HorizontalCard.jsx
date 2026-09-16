import React from "react";
import ReactionBar from "../ReactionBar/ReactionBar";
import "./HorizontalCard.css";

function HorizontalCard({
  title,
  content,
  date,
  imageURL,
  LikeCount = 0,
  DislikeCount = 0,
  CommentCount = 0,
}) {
  return (
    <div className="horizontal-card">
      <div className="card-image">
        <img src={imageURL} />
      </div>
      <div className="card-text">
        <div className="card-title">
          <h3>{title}</h3>
          <p>{date}</p>
        </div>
        <div className="card-content">
          <p>{content}</p>
          <a>Read more</a>
          <ReactionBar />
        </div>
      </div>
    </div>
  );
}

export default HorizontalCard;
