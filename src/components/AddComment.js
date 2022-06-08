import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddComment = ({ currentUser, addComment, button }) => {
  // current date
  const getDate = () => {
    const today = new Date();
    const date =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    return date;
  };

  const [newComment, setNewComment] = useState({
    id: uuidv4(),
    content: "",
    createdAt: getDate(),
    score: 0,
    user: {
      image: {
        png: currentUser.image.png,
        webp: currentUser.image.webp,
      },
      username: currentUser.username,
    },
    replies: [],
  });

  const onAdd = () => {
    if (newComment.content !== "") {
      addComment(newComment);

      setNewComment({
        ...newComment,
        id: uuidv4(),
        content: "",
        createdAt: getDate(),
      });
    }
  };

  return (
    <div className="comment create">
      <img className="comment-user-image" src={newComment.user.image.png} />

      <div className="create-content">
        <textarea
          placeholder="Add a comment..."
          onChange={(e) =>
            setNewComment({ ...newComment, content: e.target.value })
          }
          value={newComment.content}
        ></textarea>
        <button className="create-comment-btn" onClick={() => onAdd()}>
          {button === "reply" ? "reply" : "send"}
        </button>
      </div>
    </div>
  );
};

export default AddComment;
