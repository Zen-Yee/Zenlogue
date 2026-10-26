import { useState, useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { PencilLine, Trash } from "lucide-react";
import axios from "axios";

import { renderPostHTML } from "../../utils/tiptap";

import TwelveGrid from "../../components/layout/TwelveGrid/TwelveGrid";
// import ReactionBar from "../../components/ui/ReactionBar/ReactionBar";
// import CommentsList from "../../components/features/Comments/CommentsList";

import { useAuth } from "../../context/AuthContext";
import usePost from "../../hooks/usePost";

import "./Displaypage.css";

const API_URL = import.meta.env.VITE_API_URL;

function Displaypage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { post } = usePost(id);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const postContent = useMemo(() => {
    if (!post?.content) return "";
    return renderPostHTML(post?.content);
  }, [post?.content]);

  // console.log(`Author: ${post.author_id}`);
  // console.log(post.author_id);

  const deletePost = async () => {
    try {
      const response = await axios.delete(`${API_URL}/api/posts/${id}`);
      navigate("/post");
    } catch (err) {
      setError(err.message);
    }
  };

  function handleDelete() {
    deletePost();
  }

  // && user.user_id === post.author_id &&

  return (
    <div className="display-page">
      <TwelveGrid>
        <div className="post-container">
          <div className="post-header">
            <div className="post-information">
              <h2>{post?.title}</h2>
              <h3>{post?.author_id}</h3>
              <p>{post?.created_at}</p>
            </div>

            {user && post && (
              <div className="post-control">
                <Link className="post-control-item" to={`/post/${id}/edit`}>
                  <PencilLine />
                </Link>
                <button className="post-control-item" onClick={handleDelete}>
                  <Trash />
                </button>
              </div>
            )}
          </div>

          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: postContent }}
          />
        </div>
        {/* <ReactionBar
          className="post-reaction"
          LikeCount={post?.LikeCount}
          DislikeCount={post?.DislikeCount}
          CommentCount={post?.CommentCount} /> */}
        {/* <CommentsList className="post-comments" /> */}
      </TwelveGrid>
    </div>
  );
}

export default Displaypage;
