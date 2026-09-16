import React, { useState, useEffect } from "react";
import "./PostList.css";
import HorizontalCard from "./HorizontalCard";

function PostList({ posts, className = "" }) {
  return (
    <div className={`postfeed-container ${className}`}>
      {posts.map((post) => (
        <HorizontalCard
          key={post.post_id}
          className="postfeed-cards"
          imageURL={post.cover_image_url}
          title={post.title}
          date={post.created_at}
          content={post.content}
          author={post.username}
        />
      ))}
    </div>
  );
}

export default PostList;
