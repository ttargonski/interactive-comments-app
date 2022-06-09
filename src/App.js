import React from "react";

import "./styles/App.css";
import CommentsList from "./components/CommentsList";

function App() {
  return (
    <div className="App">
      <div className="container">
        <CommentsList />
      </div>
    </div>
  );
}

export default App;
