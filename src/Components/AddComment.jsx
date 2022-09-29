import { useState } from "react";
import { postCommentsForArticle } from "../utils/api";

export default function AddComment({ setComments, article_id }) {
  const [newComment, setNewComment] = useState({ username: "", body: "" });
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    postCommentsForArticle(article_id, newComment)
      .then(({ comment }) => {
        setComments((currentComments) => {
          return [comment, ...currentComments];
        });
        setNewComment({ username: "", body: "" });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsError(err.response.data.msg);
        setTimeout(() => {
          setIsError("");
          setNewComment({ username: "", body: "" });
        }, 1000);
      });
  };

  if (isLoading) {
    return <p>Loading</p>;
  }

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
