import React from "react";
import Comment from "./Comment";
import AddComment from "./AddComment";

import { useState, useEffect } from "react";
import fetchActions from "../api/fetchActions";

const CommentsList = ({ currentUser }) => {
  const [comments, setComments] = useState([]);
  const fetch = new fetchActions();

  // Fetch comments from server
  useEffect(() => {
    const getComments = async () => {
      const commentsFromServer = await fetch.fetchComments();
      // update state
      setComments(commentsFromServer);
    };

    getComments();
  }, []);

  // ADD COMMENT
  const addComment = async (newComment) => {
    await fetch.addComment(newComment);
    // update state
    setComments([...comments, newComment]);
  };

  return (
    <>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} currentUser={currentUser} />
      ))}
      {currentUser && (
        <AddComment currentUser={currentUser} addComment={addComment} />
      )}
    </>
  );
};

export default CommentsList;
