import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Reply = ({ currentUser, addReply }) => {
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

  const [newReply, setNewReply] = useState({
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
    if (newReply.content !== "") {
      addReply(newReply);

      setNewReply({
        ...newReply,
        id: uuidv4(),
        content: "",
        createdAt: getDate(),
      });
    }
  };

  return (
    <div className="comment create">
      <img className="comment-user-image" src={currentUser.image.png} />

      <div className="create-content">
        <textarea
          onChange={(e) =>
            setNewReply({ ...newReply, content: e.target.value })
          }
          value={newReply.content}
        ></textarea>
        <button className="create-comment-btn" onClick={() => onAdd()}>
          reply
        </button>
      </div>
    </div>
  );
};

export default Reply;
