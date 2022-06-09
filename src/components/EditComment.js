import React, { useState } from "react";

const EditComment = ({ content, onEdit }) => {
  const [updateContent, setUpdateContent] = useState();
  return (
    <div className="create">
      <textarea
        defaultValue={content}
        onChange={(e) => setUpdateContent(e.target.value)}
      ></textarea>
      <button
        className="create-comment-btn"
        onClick={() => onEdit(updateContent)}
      >
        update
      </button>
    </div>
  );
};

export default EditComment;
