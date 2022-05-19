import React, { useState } from "react";

const Comment = ({ comment }) => {
  const [replyState, setReplyState] = useState(false);

  return (
    <div>
      <div className="comment">
        <div className="comment-score">
          <button>+</button>
          <p>{comment.score}</p>
          <button>-</button>
        </div>
        <div className="comment-content">
          <div className="comment-header">
            <div>
              <div className="comment-user">
                <img
                  className="comment-user-image"
                  src={comment.user.image.png}
                />
                <p className="comment-user-name">{comment.user.username}</p>
                <p className="comment-user-time">{comment.createdAt}</p>
              </div>
            </div>
            <button
              className="comment-btn-reply"
              onClick={() => setReplyState(!replyState)}
            >
              <img src={"/assets/images/icon-reply.svg"} /> Reply
            </button>
          </div>
          <div className="comment-body">{comment.content}</div>
        </div>
      </div>

      {/* REPLY - nowy komponent? */}
      {replyState && (
        <div className="comment reply">
          <img className="comment-user-image" src="" />

          <div className="reply-content">
            <textarea></textarea>
            <button className="reply-btn">reply</button>
          </div>
        </div>
      )}

      {/* odpowiedzi .. lista */}
    </div>
  );
};

export default Comment;
