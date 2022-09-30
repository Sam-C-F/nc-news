import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { deleteComment } from "../utils/api";
import "./CommentCard.css";

export default function CommentCard({ comment }) {
  const { loggedInUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isErr, setIsErr] = useState("");

  const handleOnClick = () => {
    setIsLoading(true);
    deleteComment(comment.comment_id)
      .then((data) => {
        setIsLoading(false);
        setIsDeleted(true);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsDeleted(false);
        setIsErr(<p>Something went wrong!</p>);
      });
  };

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isDeleted) {
    return <p>Deleted</p>;
  }

  return isErr ? (
    isErr
  ) : comment.author === loggedInUser.username ? (
    <li className="single__comment">
      <p>{comment.body}</p>
      <p>
        ❤{comment.votes}❤&nbsp; &nbsp; {comment.created_at} &nbsp; &nbsp;
        {comment.author}&nbsp; &nbsp;
        <button
          onClick={() => {
            handleOnClick();
          }}
        >
          Delete
        </button>
      </p>
      <hr />
    </li>
  ) : (
    <li className="single__comment">
      <p>{comment.body}</p>
      <p>
        ❤{comment.votes}❤&nbsp; &nbsp; {comment.created_at} &nbsp; &nbsp;
        {comment.author}&nbsp; &nbsp;
      </p>
      <hr />
    </li>
  );
}
