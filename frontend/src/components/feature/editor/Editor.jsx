import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Menubar from "./Menubar";
import "./Editor.css";


function Editor({ post, isEdit, postId }) {
  const [title, setTitle] = useState(post?.title ?? "");

  const editor = useEditor({
    extensions: [StarterKit],
    content: post?.content ?? "",   // JSON for edit, empty for create
  });

  if (!editor) return null;

  const handleSubmit = async () => {
    const content = editor.getJSON();

    const res = await fetch(isEdit ? `/api/posts/${postId}` : "/api/posts/create", {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (!res.ok) {
      console.error("Failed to save post");
      return;
    }
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
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
export default Editor;
