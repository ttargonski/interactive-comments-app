import React, { useState } from "react";
import CommentReply from "./CommentReply";
import fetchActions from "../api/fetchActions";
import DeleteComment from "./DeleteComment";
import AddComment from "./AddComment";
import EditComment from "./EditComment";

function Comment({
  comment,
  currentUser,
  editComment,
  deleteComment,
  updateScore,
}) {
  const [replyState, setReplyState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [replies, setReplies] = useState(comment.replies);

  const [modalIsOpen, setIsOpen] = useState(false);

  const fetch = new fetchActions();

  // ADD REPLY
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

  const onEdit = (updateContent) => {
    editComment(updateContent, comment.id);
    setEditState(false);
  };

  // DELETE REPLY
  const deleteReply = async (id) => {
    // get from server
    const commentToUpdate = await fetch.fetchComment(comment.id);
    const updatedReplies = commentToUpdate.replies.filter(
      (reply) => reply.id !== id
    );
    commentToUpdate.replies = updatedReplies;

    // update to server
    await fetch.updateComment(commentToUpdate, comment.id);

    // update to state
    setReplies(replies.filter((reply) => reply.id !== id));
  };

  // UPDATE REPLY
  const editReply = async (editContent, id) => {
    if (editContent) {
      // get from server
      const commentToUpdate = await fetch.fetchComment(comment.id);
      const updatedReplies = commentToUpdate.replies.map((reply) =>
        reply.id === id ? { ...reply, content: editContent } : reply
      );
      commentToUpdate.replies = updatedReplies;

      // update to server
      await fetch.updateComment(commentToUpdate, comment.id);

      // update to state
      setReplies(
        replies.map((reply) =>
          reply.id === id ? { ...reply, content: editContent } : reply
        )
      );
    }
  };

  // UPDATE REPLY SCORE
  const updateReplyScore = async (action, id) => {
    const commentToUpdate = await fetch.fetchComment(comment.id);

    if (action === "add") {
      // update to sever
      const updatedReplies = commentToUpdate.replies.map((reply) =>
        reply.id === id ? { ...reply, score: reply.score + 1 } : reply
      );
      commentToUpdate.replies = updatedReplies;
      // update to state
      setReplies(
        replies.map((reply) =>
          reply.id === id ? { ...reply, score: reply.score + 1 } : reply
        )
      );
    }
    if (action === "remove") {
      // update to sever
      const updatedReplies = commentToUpdate.replies.map((reply) =>
        reply.id === id ? { ...reply, score: reply.score - 1 } : reply
      );
      commentToUpdate.replies = updatedReplies;
      // update state
      setReplies(
        replies.map((reply) =>
          reply.id === id ? { ...reply, score: reply.score - 1 } : reply
        )
      );
    }
    await fetch.updateComment(commentToUpdate, comment.id);
  };

  return (
    <div>
      <div className="comment">
        <div className="comment-score">
          <button onClick={() => updateScore(comment.id, "add")}>+</button>
          <p>{comment.score}</p>
          <button onClick={() => updateScore(comment.id, "remove")}>-</button>
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
            {comment.user.username === currentUser.username ? (
              <div className="comment-actions">
                <button
                  className="comment-btn delete"
                  onClick={() => setIsOpen(!modalIsOpen)}
                >
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
              <div className="comment-actions">
                <button
                  className="comment-btn"
                  onClick={() => setReplyState(!replyState)}
                >
                  <img src={"/assets/images/icon-reply.svg"} />
                  Reply
                </button>
              </div>
            )}
          </div>
          {editState ? (
            <EditComment content={comment.content} onEdit={onEdit} />
          ) : (
            <div className="comment-body">{comment.content}</div>
          )}
        </div>
      </div>

      {/* ADD REPLY */}
      {replyState && (
        <AddComment
          currentUser={currentUser}
          addComment={addReply}
          button={"reply"}
        />
      )}

      {/* REPLIES LIST */}
      <div className="replies">
        {replies.map((reply) => (
          <CommentReply
            key={reply.id}
            comment={reply}
            currentUser={currentUser}
            deleteReply={deleteReply}
            editReply={editReply}
            updateReplyScore={updateReplyScore}
          />
        ))}
      </div>

      {/* DELETE MODAL */}
      {modalIsOpen && (
        <DeleteComment
          deleteComment={deleteComment}
          id={comment.id}
          toggleModal={() => setIsOpen(!modalIsOpen)}
        />
      )}
    </div>
  );
}

export default Comment;
