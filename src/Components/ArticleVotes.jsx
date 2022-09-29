import "./ArticleVotes.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { patchArticleVotes } from "../utils/api";

export default function ArticleVotes({ article }) {
  const [votes, setVotes] = useState(0);
  const [isErr, setIsErr] = useState(false);
  const { article_id } = useParams();

  const voteOnArticle = (num) => {
    let reqBody = { inc_votes: num };
    setVotes((currentVotes) => (currentVotes += num));
    patchArticleVotes(article_id, reqBody)
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
      <p>❤&nbsp;{article.votes + votes}&nbsp;❤</p>
      <div className="voting__buttons">
        <button className="like__button" onClick={() => voteOnArticle(1)}>
          👍
        </button>
        <button className="like__button" onClick={() => voteOnArticle(-1)}>
          👎
        </button>
      </div>
    </section>
  );
}
