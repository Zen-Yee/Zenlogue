import ReactionBar from "../../ui/ReactionBar/ReactionBar";
import "./HorizontalCard.css";

import { Link } from "react-router-dom";

import { getPostExcerpt } from "../../../utils/tiptap";
import { formatDate } from "../../../utils/date"

function HorizontalCard({
  id,
  title,
  content,
  date,
  imageURL,
  LikeCount = 0,
  DislikeCount = 0,
  CommentCount = 0,
}) {
  return (
    <div className="horizontal-card">
      <div className="card-image">
        <img src={imageURL} />
      </div>
      <div className="card-text">
        <div className="card-title">
          <Link to={`/post/${id}`}>
            <h3>{title}</h3>
          </Link>
          <p>{formatDate(date)}</p>
        </div>
        <div className="card-content">
          {/* <p>{renderPostHTML(content)}</p> */}
          <p dangerouslySetInnerHTML={{ __html: getPostExcerpt(content) }}></p>
          <a>Read more</a>
          <ReactionBar
            className=""
            LikeCount={LikeCount}
            DislikeCount={DislikeCount}
            CommentCount={CommentCount}
          />
        </div>
      </div>
    </div>
  );
}

export default HorizontalCard;
