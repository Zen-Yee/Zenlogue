import IconButton from "../Button/IconButton/IconButton";
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
      <IconButton className="reaction-button" icon={ThumbsUp} size="20" color="var(--color-text)"/>
      {LikeCount}
      <IconButton className="reaction-button" icon={ThumbsDown} size="20" color="var(--color-text)" />
      {DislikeCount}
      <IconButton className="reaction-button" icon={MessageCircle} size="20" color="var(--color-text)" />
      {CommentCount}
    </div>
  );
}

export default ReactionBar;
