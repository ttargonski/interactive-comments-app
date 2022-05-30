const url = "http://localhost:5000/";

class fetchActions {
  // fetch comments
  fetchComments = async () => {
    const response = await fetch(url + "comments");
    const data = await response.json();
    return data;
  };

  // fetch comment
  fetchComment = async (id) => {
    const response = await fetch(url + `comments/${id}`);
    const data = await response.json();
    return data;
  };

  // fetch user
  fetchCurrentUser = async () => {
    const response = await fetch(url + "currentUser");
    const data = await response.json();
    return data;
  };

  // add comment
  addComment = async (comment) => {
    const response = await fetch(url + "comments", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    const data = await response.json();
    return data;
  };

  // update comment
  updateComment = async (comment, id) => {
    const response = await fetch(url + `comments/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    const data = await response.json();
    return data;
  };
}

export default fetchActions;
