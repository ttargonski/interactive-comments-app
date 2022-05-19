import React from "react";
import Comment from "./Comment";

import { useState, useEffect } from "react";
import fetchActions from "../api/fetchActions";

const CommentList = () => {
  const [comments, setComments] = useState([]);

  // Fetch comments from server
  useEffect(() => {
    const fetch = new fetchActions();

    const getComments = async () => {
      const commentsFromServer = await fetch.fetchComments();
      setComments(commentsFromServer);
    };

    getComments();
  }, []);

  return (
    <div className="container">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
