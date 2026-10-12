import StarterKit from "@tiptap/starter-kit";
// import Link from "@tiptap/extension-link";
// import Image from "@tiptap/extension-image";
import { generateHTML } from "@tiptap/html";
import { generateText } from "@tiptap/core";
import DOMPurify from "dompurify";

// Use this same array in useEditor({ extensions }) too
export const editorExtensions = [StarterKit];

export function renderPostHTML(json) {
  if (!json) return "";
  try {
    return DOMPurify.sanitize(generateHTML(json, editorExtensions));
  } catch {
    return ""; // malformed JSON shouldn't crash the page
  }
}

export function getPostExcerpt(json, maxLength = 150) {
  if (!json) return "";
  try {
    const text = generateText(json, editorExtensions);
    return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
  } catch {
    return "";
  }
}