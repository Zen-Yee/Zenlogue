import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./Menubar.css";

function Menubar({ editor }) {
  if (!editor) return null;

    const btnClass = (type, attrs = {}) =>
    `menu-btn ${editor.isActive(type, attrs) ? "active" : ""}`;

  return (
    <div className="menu-bar">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={btnClass("bold")}
        title="Bold"
      >
        <b>B</b>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={btnClass("italic")}
        title="Italic"
      >
        <i>I</i>
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={btnClass("strike")}
        title="Strikethrough"
      >
        <s>S</s>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btnClass("bulletList")}
        title="Bullet List"
      >
        • List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={btnClass("orderedList")}
        title="Ordered List"
      >
        1. List
      </button>

        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="menu-btn"
          disabled={!editor.can().undo()}
          title="Undo"
        >
          ↩
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="menu-btn"
          disabled={!editor.can().redo()}
          title="Redo"
        >
          ↪
        </button>
    </div>
  );
}

export default Menubar;
