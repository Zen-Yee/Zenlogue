import React from "react";
import "./CommentList.css";
import allComments from "../../../data/comment";
import CommentCards from "./CommentCard";

function CommentList({ postid }) {
  const comments = allComments.filter((c) => c.postid === postid);
  return (
    <div className="comment-list">
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

export default CommentList;
