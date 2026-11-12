import "./PostFeed.css";

// Library
import { useNavigate } from "react-router-dom";

// Components
import PostList from "../../../../components/feature/PostList/PostList";
import TwelveGrid from "../../../../components/layout/TwelveGrid/TwelveGrid";
import Spinner from "../../../../components/ui/Spinner/Spinner";

// Hooks
import usePosts from "../../../../hooks/usePosts";

function PostFeed() {
  const navigate = useNavigate();
  const { posts, loading, error } = usePosts({ limit: 10 });

  const handleClick = () => {
    navigate("/post");
  };

  return (
    <div className="postfeed-section">
      <TwelveGrid>
        <h2 className="section-title">Latest Post</h2>
        {loading ? (
          <Spinner className="spinner-container full-width" />
        ) : error ? (
          <p>Failed to load posts: {error}</p>
        ) : (
          <PostList posts={posts} className="full-width" />
        )}
        <button className="postfeed-button" onClick={handleClick}>
          More Posts
        </button>
      </TwelveGrid>
    </div>
  );
}

export default PostFeed;
