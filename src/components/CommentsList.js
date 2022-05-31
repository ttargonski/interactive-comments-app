import React from "react";
import Comment from "./Comment";
import AddComment from "./AddComment";

import { useState, useEffect } from "react";
import fetchActions from "../api/fetchActions";

const CommentsList = () => {
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const fetch = new fetchActions();

  useEffect(() => {
    // get comments from server
    const getComments = async () => {
      const commentsFromServer = await fetch.fetchComments();
      // update state
      setComments(commentsFromServer);
    };

    // get current user from server
    const getUser = async () => {
      const userFromServer = await fetch.fetchCurrentUser();
      // update state
      setCurrentUser(userFromServer);
    };

    getUser();
    getComments();
  }, []);

  // ADD COMMENT
  const addComment = async (newComment) => {
    await fetch.addComment(newComment);
    // update state
    setComments([...comments, newComment]);
  };

  // EDIT COMMENT
  const editComment = async (editContent, id) => {
    if (editContent) {
      // get from server
      const commentToUpdate = await fetch.fetchComment(id);
      commentToUpdate.content = editContent;

      // update to server
      await fetch.updateComment(commentToUpdate, id);

      // update to state
      setComments(
        comments.map((comment) =>
          comment.id === id ? { ...comment, content: editContent } : comment
        )
      );
    }
  };

  return (
    <>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          currentUser={currentUser}
          editComment={editComment}
        />
      ))}
      {currentUser && (
        <AddComment currentUser={currentUser} addComment={addComment} />
      )}
    </>
  );
};

export default CommentsList;
