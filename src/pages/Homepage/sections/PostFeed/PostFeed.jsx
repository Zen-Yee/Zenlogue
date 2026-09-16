import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostList from "../../../../components/ui/PostList/PostList";
import TwelveGrid from "../../../../components/layout/TwelveGrid/TwelveGrid";
import usePosts from "../../../../hooks/usePosts";
import "./PostFeed.css";

function PostFeed() {
  const navigate = useNavigate();

  const { posts, hasMore } = usePosts({ limit: 10 });

  const handleClick = () => {
    navigate("/post");
  };

  return (
    <div className="postfeed-section">
      <TwelveGrid>
        <h2 className="section-title">Latest Post</h2>
        <PostList posts={posts} className="post-list" />
        <button className="postfeed-button" onClick={handleClick}>
          More Posts
        </button>
      </TwelveGrid>
    </div>
  );
}

export default PostFeed;
