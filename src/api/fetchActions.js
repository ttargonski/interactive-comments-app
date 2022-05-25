const url = "http://localhost:5000/";

class fetchActions {
  // fetch COMMENTS
  fetchComments = async () => {
    const response = await fetch(url + "comments");
    const data = await response.json();
    return data;
  };

  // fetch USER
  fetchCurrentUser = async () => {
    const response = await fetch(url + "currentUser");
    const data = await response.json();
    return data;
  };
}

export default fetchActions;
