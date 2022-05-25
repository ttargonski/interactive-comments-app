import React, { useState, useEffect } from "react";

import "./App.css";
import CommentsList from "./components/CommentsList";
import fetchActions from "./api/fetchActions";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const fetch = new fetchActions();

    const getUser = async () => {
      const userFromServer = await fetch.fetchCurrentUser();
      setCurrentUser(userFromServer);
    };

    getUser();
  }, []);

  return (
    <div className="App">
      <CommentsList currentUser={currentUser} />
    </div>
  );
}

export default App;
