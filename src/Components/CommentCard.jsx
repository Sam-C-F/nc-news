import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { deleteComment } from "../utils/api";
import "./CommentCard.css";
import CommentVotes from "./CommentVotes";

export default function CommentCard({ comment }) {
  const { loggedInUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

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
      });
  };

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isDeleted) {
    return <p>Deleted</p>;
  }

  return comment.author === loggedInUser.username ? (
    <li className="single__comment">
      <p>{comment.body}</p>
      <section>
        {comment.created_at} &nbsp; &nbsp;
        {comment.author}&nbsp; &nbsp;
        <br />
        {<CommentVotes comment={comment} />}
        <button
          onClick={() => {
            handleOnClick();
          }}
        >
          Delete
        </button>
      </section>
      <hr />
    </li>
  ) : (
    <li className="single__comment">
      <p>{comment.body}</p>
      <section>
        {comment.created_at} &nbsp; &nbsp;
        {comment.author}&nbsp; &nbsp;
        <br />
        {<CommentVotes comment={comment} />}
      </section>
      <hr />
    </li>
  );
}
