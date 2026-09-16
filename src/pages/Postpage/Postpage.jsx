import React, { useState } from "react";
import "./Postpage.css";
import TwelveGrid from "../../components/layout/TwelveGrid/TwelveGrid";
import PostList from "../../components/ui/PostList/PostList";
import Pagination from "../../components/ui/Pagination/Pagination";
import usePosts from "../../hooks/usePosts";

function Postpage() {
  const [page, setPage] = useState(1);
  const { posts, hasMore } = usePosts({ page, limit: 10 });

  return (
    <div className="post-page">
      <TwelveGrid>
        <PostList posts={posts} className="post-list" />
        <Pagination />
      </TwelveGrid>
    </div>
  );
}

export default Postpage;
