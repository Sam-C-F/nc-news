import { useState } from "react";
import { getUsers, postCommentsForArticle } from "../utils/api";

export default function AddComment({ setComments, article_id }) {
  const [newComment, setNewComment] = useState({ username: "", body: "" });
  const [isError, setIsError] = useState("");

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      await getUsers().then(({ users }) => {
        const userNames = users.map((user) => {
          return user.username;
        });
        if (!userNames.includes(newComment.username)) {
          return setIsError(<p>Please enter a valid username</p>);
        }
      });
      setComments((currentComments) => {
        const optimisticComment = { ...newComment, comment_id: Date.now() };
        return [optimisticComment, ...currentComments];
      });
      await postCommentsForArticle(article_id, newComment).then((data) => {
        setNewComment({ username: "", body: "" });
      });
    } catch (err) {
      setIsError(err.response.data.msg);
    }
  };

  const handleOnChange = (e) => {
    setNewComment((previousObject) => {
      const newObject = { ...previousObject };
      newObject[e.target.id] = e.target.value;
      return newObject;
    });
  };

  return isError ? (
    <h1>{isError}</h1>
  ) : (
    <form onSubmit={(e) => handleOnSubmit(e)}>
      <label htmlFor="username">Username:</label>
      <input
        id="username"
        type="text"
        placeholder="username..."
        value={newComment.username}
        onChange={(e) => {
          handleOnChange(e);
        }}
        required
      />{" "}
      <br />
      <label htmlFor="body">Comment:</label>
      <textarea
        id="body"
        cols="30"
        rows="10"
        placeholder="Leave a comment here"
        value={newComment.body}
        onChange={(e) => {
          handleOnChange(e);
        }}
        required
      ></textarea>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
