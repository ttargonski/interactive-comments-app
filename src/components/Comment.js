import React, { useState } from "react";
import Reply from "./Reply";
import CommentReply from "./CommentReply";
import fetchActions from "../api/fetchActions";

function Comment({ comment, currentUser, editComment }) {
  const [replyState, setReplyState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [replies, setReplies] = useState(comment.replies);
  const [updateContent, setUpdateContent] = useState();

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

  const onEdit = () => {
    editComment(updateContent, comment.id);
    setEditState(false);
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
                <p className="comment-user-name">
                  {comment.user.username}
                  {comment.user.username === currentUser.username && (
                    <span>you</span>
                  )}
                </p>
                <p className="comment-user-time">{comment.createdAt}</p>
              </div>
            </div>

            {comment.user.username === currentUser.username ? (
              <div>
                <button className="comment-btn delete">
                  <img src={"/assets/images/icon-delete.svg"} />
                  Delete
                </button>
                <button
                  onClick={() => setEditState(!editState)}
                  className="comment-btn"
                >
                  <img src={"/assets/images/icon-edit.svg"} />
                  Edit
                </button>
              </div>
            ) : (
              <button
                className="comment-btn"
                onClick={() => setReplyState(!replyState)}
              >
                <img src={"/assets/images/icon-reply.svg"} />
                Reply
              </button>
            )}
          </div>
          {editState ? (
            <div className="create">
              <textarea
                defaultValue={comment.content}
                onChange={(e) => setUpdateContent(e.target.value)}
              ></textarea>
              <button className="create-comment-btn" onClick={() => onEdit()}>
                update
              </button>
            </div>
          ) : (
            <div className="comment-body">{comment.content}</div>
          )}
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
