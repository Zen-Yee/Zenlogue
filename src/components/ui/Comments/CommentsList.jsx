import React from "react";
import "./CommentsList.css";
import CommentCards from "./CommentCard";

function CommentsList({ className = "", postid }) {
  const comments = allComments.filter((c) => c.postid === postid);
  return (
    <div className={`comment-list ${className}`}>
      <h3>Comments</h3>
      {comments.map((x) => (
        <CommentCards
          author={x.author}
          content={x.content}
          lastupdated={x.lastupdated}
        />
      ))}
    </div>
  );
}

export default CommentsList;
