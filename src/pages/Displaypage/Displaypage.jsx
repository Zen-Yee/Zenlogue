import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PencilLine, Trash } from "lucide-react";
import axios from "axios";

import { generateHTML } from "@tiptap/html";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";

import TwelveGrid from "../../components/layout/TwelveGrid/TwelveGrid";
// import ReactionBar from "../../components/ui/ReactionBar/ReactionBar";
// import CommentsList from "../../components/features/Comments/CommentsList";

import { useAuth } from "../../../context/AuthContext";
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
    return generateHTML(post.content, [Document, Paragraph, Text, Bold]);
  }, [post?.content]);

  const deletePost = async () => {
    try {
      const response = await axios.delete(`${API_URL}/api/posts/${id}`);
      navigate("/post");
    } catch (err) {
      setError(err.message);
    }
  }

  function handleDelete() {
    deletePost();
  }

  return (
    <div className="display-page">
      <TwelveGrid>
        <div className="post-container">
          <div className="post-header">
            <h2>{post?.title}</h2>
            <h3>{post?.author_name}</h3>
            <p>{post?.created_at}</p>
          </div>

          {user && post && user.user_id === post.user_id && (
            <div className="post-control">
              <Link to={`/post/${id}/edit`}>
                <PencilLine />
              </Link>
              <button onClick={handleDelete}><Trash /></button>
            </div>
          )}
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: postContent }}
          />
        </div>
        {/* <ReactionBar
          className="post-rection"
          LikeCount={post?.LikeCount}
          DislikeCount={post?.DislikeCount}
          CommentCount={post?.CommentCount} /> */}
        {/* <CommentsList className="post-comments" /> */}
      </TwelveGrid>
    </div>
  );
}

export default Displaypage;
