import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { generateHTML } from "@tiptap/html";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";

import TwelveGrid from "../../components/layout/TwelveGrid/TwelveGrid";
import ReactionBar from "../../components/ui/ReactionBar/ReactionBar";
// import CommentsList from "../../components/features/Comments/CommentsList";
import "./Displaypage.css";

function Displaypage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPost(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const postContent = useMemo(() => {
    if (!post?.content) return "";
    return generateHTML(post.content, [Document, Paragraph, Text, Bold]);
  }, [post?.content]);

  return (
    <div className="display-page">
      <TwelveGrid>
        <div className="post-container">
          <div className="post-header">
            <h2>The Title</h2>
            <h3>The author</h3>
            <p>The date</p>
          </div>
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: postContent }}
          />
        </div>
        <ReactionBar className="post-rection" />
        {/* <CommentsList className="post-comments" /> */}
      </TwelveGrid>
    </div>
  );
}

export default Displaypage;
