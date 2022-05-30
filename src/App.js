import React, { useState, useEffect } from "react";

import "./App.css";
import CommentsList from "./components/CommentsList";
import fetchActions from "./api/fetchActions";

function App() {
  const [currentUser, setCurrentUser] = useState();

  // get current user from server
  useEffect(() => {
    const fetch = new fetchActions();

    const getUser = async () => {
      const userFromServer = await fetch.fetchCurrentUser();
      // update state
      setCurrentUser(userFromServer);
    };

    getUser();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <CommentsList currentUser={currentUser} />
      </div>
    </div>
  );
}

export default App;
