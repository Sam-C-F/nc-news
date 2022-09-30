import { useState } from "react";
import { patchCommentVotes } from "../utils/api";

export default function CommentVotes({ comment }) {
  const [votes, setVotes] = useState(0);
  const [isErr, setIsErr] = useState(false);

  const voteOnComment = (num) => {
    let reqBody = { inc_votes: num };
    setVotes((currentVotes) => (currentVotes += num));
    patchCommentVotes(comment.comment_id, reqBody)
      .then(({ article }) => {})
      .catch((err) => {
        setIsErr(true);
        setVotes((currentVotes) => (currentVotes -= num));
      });
  };

  return isErr ? (
    <p>Oops there was an error!</p>
  ) : (
    <section className="likes">
      <p>❤&nbsp;{comment.votes + votes}&nbsp;❤</p>
      <div className="voting__buttons">
        <button className="like__button" onClick={() => voteOnComment(1)}>
          👍
        </button>
        <button className="like__button" onClick={() => voteOnComment(-1)}>
          👎
        </button>
      </div>
    </section>
  );
}
