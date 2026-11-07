import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Menubar from "./Menubar";
import "./Editor.css";

const API_URL = import.meta.env.VITE_API_URL;

function Editor({ post, isEdit, postId }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(post?.title ?? "");

  const editor = useEditor({
    extensions: [StarterKit],
    content: post?.content ?? "", // JSON for edit, empty for create
  });

  if (!editor) return null;

  const handleSubmit = async () => {
    // placeholder for loading
    const content = editor.getJSON();

    const res = await fetch(
      isEdit ? `${API_URL}/api/posts/${postId}` : `${API_URL}/api/posts/create`,
      {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, content }),
      },
    );

    if (!res.ok) {
      console.error("Failed to save post");
      return;
    }

    const data = await res.json();
    const targetId = isEdit ? postId : data.postData.post_id;

    navigate(`/post/${targetId}`);
  };

  const handleCancel = () => {
    // placeholder for Loading & pop up
    navigate(`/post/${postId}`);
  };

  return (
    <div className="editor-container">
      <label>
        Title:{" "}
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <Menubar editor={editor} />
      <EditorContent className="edit-space" editor={editor} />
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
export default Editor;
