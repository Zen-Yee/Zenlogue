import React from "react";
import "./CommentCard.css";

function CommentCards(props) {
  return (
    <div className="comment-card">
      <div className="comment-author">
        <img src="https://picsum.photos" alt="" />
        <h4>{props.author}</h4>
      </div>
      <div>
        <p>{props.content}</p>
        <p>{props.lastupdated}</p>
      </div>
    </div>
  );
}

export default CommentCards;
