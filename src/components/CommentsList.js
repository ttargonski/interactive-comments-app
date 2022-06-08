import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import AddComment from "./AddComment";
import fetchActions from "../api/fetchActions";

const CommentsList = () => {
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  const fetch = new fetchActions();

  // GET FROM SERVER
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
    // update to server
    await fetch.addComment(newComment);

    // update to state
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

  // DELETE COMMENT
  const deleteComment = async (id) => {
    console.log("comment was deleted", id);

    // delete to server
    fetch.deleteComment(id);

    // delete to state
    setComments(comments.filter((comment) => comment.id !== id));
  };

  // UPDATE COMMENT SCORE
  const updateScore = async (id, action) => {
    const commentToUpdate = await fetch.fetchComment(id);

    if (action === "add") {
      // update to server
      commentToUpdate.score++;
    }
    if (action === "remove") {
      // update to server
      commentToUpdate.score--;
    }
    await fetch.updateComment(commentToUpdate, id);

    // update state server
    setComments(
      comments.map((comment) => (comment.id === id ? commentToUpdate : comment))
    );
  };

  return (
    <>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          currentUser={currentUser}
          editComment={editComment}
          deleteComment={deleteComment}
          updateScore={updateScore}
        />
      ))}
      {currentUser && (
        <AddComment currentUser={currentUser} addComment={addComment} />
      )}
    </>
  );
};

export default CommentsList;
