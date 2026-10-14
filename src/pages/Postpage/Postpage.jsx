import { useState } from "react";
import "./Postpage.css";
import TwelveGrid from "../../components/layout/TwelveGrid/TwelveGrid";
import PostList from "../../components/ui/PostList/PostList";
import Pagination from "../../components/ui/Pagination/Pagination";
import usePosts from "../../hooks/usePosts";

function Postpage() {
  const limit = 10;
  const [page, setPage] = useState(1);
  const { posts, total } = usePosts({ page, limit });

  const pagesCount = Math.ceil((total ?? 0) / limit);

  function onSelect(page) {
    setPage(newPage);
  }

  return (
    <div className="post-page">
      <TwelveGrid>
        <PostList posts={posts} className="post-list" />
        <Pagination
          currentPage={page}
          totalPages={pagesCount}
          onSelect={onSelect}
        />
      </TwelveGrid>
    </div>
  );
}

export default Postpage;
