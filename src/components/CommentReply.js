import React from "react";

function CommentReply({ comment, currentUser }) {
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
            {comment.user.username === currentUser.username ? (
              <div>
                <button className="comment-btn delete">
                  <img src={"/assets/images/icon-delete.svg"} />
                  Delete
                </button>
                <button className="comment-btn">
                  <img src={"/assets/images/icon-edit.svg"} />
                  Edit
                </button>
              </div>
            ) : null}
          </div>
          <div className="comment-body">{comment.content}</div>
        </div>
      </div>
    </div>
  );
}

export default CommentReply;
