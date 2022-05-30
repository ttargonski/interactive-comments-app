import React, { useState } from "react";
import Reply from "./Reply";
import CommentReply from "./CommentReply";
import fetchActions from "../api/fetchActions";

function Comment({ comment, currentUser }) {
  const [replyState, setReplyState] = useState(false);
  const [replies, setReplies] = useState(comment.replies);
  const fetch = new fetchActions();

  const addReply = async (newReply) => {
    // get from server
    const commentToUpdate = await fetch.fetchComment(comment.id);

    const updateComment = {
      ...commentToUpdate,
      replies: [...replies, newReply],
    };

    // update to server
    await fetch.updateComment(updateComment, comment.id);

    // update to state
    setReplies([...replies, newReply]);
    setReplyState(false);
  };

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
              <img src={"/assets/images/icon-reply.svg"} />
              Reply
            </button>
          </div>
          <div className="comment-body">{comment.content}</div>
        </div>
      </div>

      {/* REPLY */}
      {replyState && <Reply currentUser={currentUser} addReply={addReply} />}

      {/* REPLIES LIST */}
      <div className="replies">
        {replies.map((reply) => (
          <CommentReply
            key={reply.id}
            comment={reply}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
}

export default Comment;
