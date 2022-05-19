import React, { useState } from "react";
import Avatar from "../images/avatars/image-amyrobson.png";
import IconReply from "../images/icon-reply.svg";
import CurrentUserAvatar from "../images/avatars/image-juliusomo.png";

const Comment = () => {
  const [replyState, setReplyState] = useState(false);

  return (
    <div>
      <div className="comment">
        <div className="comment-score">
          <button>+</button>
          <p>12</p>
          <button>-</button>
        </div>
        <div className="comment-content">
          <div className="comment-header">
            <div>
              <div className="comment-user">
                <img className="comment-user-image" src={Avatar} />
                <p className="comment-user-name">amyrobson</p>
                <p className="comment-user-time">1 month ago</p>
              </div>
            </div>
            <button
              className="comment-btn-reply"
              onClick={() => setReplyState(!replyState)}
            >
              <img src={IconReply} /> Reply
            </button>
          </div>
          <div className="comment-body">
            Impressive! Though it seems the drag feature could be improved. But
            overall it looks incredible. You've nailed the design and the
            responsiveness at various breakpoints works really well.
          </div>
        </div>
      </div>

      {/* REPLY - nowy komponent? */}
      {replyState && (
        <div className="comment reply">
          <img className="comment-user-image" src={CurrentUserAvatar} />

          <div className="reply-content">
            <textarea></textarea>
            <button className="reply-btn">reply</button>
          </div>
        </div>
      )}

      {/* odpowiedzi .. lista */}
      <div className="replies">Comment Reply List</div>
    </div>
  );
};

export default Comment;
