import React, { useState } from "react";
import { useParams } from "react-router";
import Editor from "../../components/feature/editor/Editor";
import "./EditPost.css";

import TwelveGrid from "../../components/layout/TwelveGrid/TwelveGrid";
import usePost from "../../hooks/usePost";

function EditPost() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { post } = id ? usePost(id):"";

  if (isEdit && !post) return <p>Loading...</p>;
  console.log(isEdit);
  return (
    <div className="full-page">
      <TwelveGrid>
        <Editor key={id ?? "new"} post={post} isEdit={isEdit} postId={id} />
      </TwelveGrid>
    </div>
  );
}

export default EditPost;
