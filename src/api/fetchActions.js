const url = "http://localhost:5000/comments";

class fetchActions {
  // fetch comments
  fetchComments = async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
}

export default fetchActions;
