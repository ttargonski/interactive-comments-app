import React from "react";
import Modal from "react-modal";

const DeleteComment = ({ deleteComment, id, toggleModal }) => {
  Modal.setAppElement("#root");

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "280px",
      borderRadius: "10px",
      padding: "30px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  return (
    <>
      <Modal isOpen={true} contentLabel="Delete Comment" style={customStyles}>
        <div className="delete-modal">
          <h2>Delete comment</h2>
          <p>
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone.
          </p>
          <div>
            <button className="modal-btn" onClick={() => toggleModal()}>
              no, cancel
            </button>
            <button
              className="modal-btn delete"
              onClick={() => deleteComment(id)}
            >
              yes, delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteComment;
