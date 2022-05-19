import React, { useState } from "react";

import "./App.css";
import CommentList from "./components/CommentList";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <div className="App">
      <CommentList />
    </div>
  );
}

export default App;
