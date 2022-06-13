import React, { useState } from "react";
import DeleteComment from "./DeleteComment";
import EditComment from "./EditComment";

function CommentReply({
  comment,
  currentUser,
  deleteReply,
  editReply,
  updateReplyScore,
}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [editState, setEditState] = useState(false);

  const onEdit = (updateContent) => {
    editReply(updateContent, comment.id);
    setEditState(!editState);
  };

  return (
    <div>
      <div className="comment">
        <div className="comment-score">
          <button onClick={() => updateReplyScore("add", comment.id)}>+</button>
          <p>{comment.score}</p>
          <button onClick={() => updateReplyScore("remove", comment.id)}>
            -
          </button>
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
                  {/* you label */}
                  {comment.user.username === currentUser.username && (
                    <span className="label-you">you</span>
                  )}
                </p>

                <p className="comment-user-time">{comment.createdAt}</p>
              </div>
            </div>
            {/* SHOW  EDIT & DELETE OR REPLY ACTIONS */}
            {comment.user.username === currentUser.username && !editState ? (
              <div className="comment-actions">
                <button
                  className="comment-btn delete"
                  onClick={() => setIsOpen(!modalIsOpen)}
                >
                  <img src={"/assets/images/icon-delete.svg"} />
                  Delete
                </button>
                <button
                  className="comment-btn"
                  onClick={() => setEditState(!editState)}
                >
                  <img src={"/assets/images/icon-edit.svg"} />
                  Edit
                </button>
              </div>
            ) : null}
          </div>
          {/* EDIT REPLY */}
          {editState ? (
            <EditComment content={comment.content} onEdit={onEdit} />
          ) : (
            <div className="comment-body">{comment.content}</div>
          )}
        </div>
      </div>
      {/* DELETE REPLY */}
      {modalIsOpen && (
        <DeleteComment
          deleteComment={deleteReply}
          id={comment.id}
          toggleModal={() => setIsOpen(!modalIsOpen)}
        />
      )}
    </div>
  );
}

export default CommentReply;
