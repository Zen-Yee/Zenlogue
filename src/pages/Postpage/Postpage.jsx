import { useState } from "react";
import { useSearchParams } from 'react-router-dom';
import "./Postpage.css";
import TwelveGrid from "../../components/layout/TwelveGrid/TwelveGrid";
import PostList from "../../components/ui/PostList/PostList";
import Pagination from "../../components/ui/Pagination/Pagination";
import usePosts from "../../hooks/usePosts";

function Postpage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";

  return <PostResults key={search} search={search} />;
}

function PostResults({ search }) {
  const limit = 10;
  const [page, setPage] = useState(1);
  const { posts, total } = usePosts({ page, limit, search });
  const pagesCount = Math.ceil(total / limit);

  return (
    <div className="post-page">
      <TwelveGrid>
        <PostList posts={posts} className="post-list" />
        <Pagination
          currentPage={page}
          totalPages={pagesCount}
          onSelect={setPage}
        />
      </TwelveGrid>
    </div>
  );
}

export default Postpage;
