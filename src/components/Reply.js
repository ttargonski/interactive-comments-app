import React from "react";

const Reply = ({ currentUser }) => {
  return (
    <div className="comment reply">
      <img className="comment-user-image" src={currentUser.image.png} />

      <div className="reply-content">
        <textarea></textarea>
        <button className="reply-btn">reply</button>
      </div>
    </div>
  );
};

export default Reply;
