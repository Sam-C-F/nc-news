import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { postCommentsForArticle } from "../utils/api";

export default function AddComment({ setComments, article_id }) {
  const { loggedInUser } = useContext(UserContext);
  const [newComment, setNewComment] = useState({
    username: loggedInUser.username,
    body: "",
  });
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!loggedInUser.username) {
    return <p>You must be logged in to leave a comment</p>;
  }
  console.log(newComment);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    postCommentsForArticle(article_id, newComment)
      .then(({ comment }) => {
        setComments((currentComments) => {
          return [comment, ...currentComments];
        });
        setNewComment({ username: loggedInUser.username, body: "" });
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
      <label htmlFor="body"></label>
      <textarea
        id="body"
        cols="40"
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
