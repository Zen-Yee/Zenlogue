import React from "react";
import IconButton from "../../ui/Button/IconButton/IconButton";
import "./ReactionBar.css";

import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";

function ReactionBar({
  className = "",
  LikeCount = 0,
  DislikeCount = 0,
  CommentCount = 0,
}) {
  return (
    <div className={`reaction-bar ${className}`}>
      <IconButton icon={ThumbsUp} size="30" color="#FFFFFF" />
      {LikeCount}
      <IconButton icon={ThumbsDown} size="30" color="#FFFFFF" />
      {DislikeCount}
      <IconButton icon={MessageCircle} size="30" color="#FFFFFF" />
      {CommentCount}
    </div>
  );
}

export default ReactionBar;
