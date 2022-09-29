import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleVotes from "../Components/ArticleVotes";
import CommentCard from "../Components/CommentCard";
import { getArticleById, getCommentsForArticle } from "../utils/api";
import "./ArticleById.css";

export default function ArticleById() {
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");

  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then(({ articles }) => {
        setArticle(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(err.response.data.msg);
        setIsLoading(false);
      });
  }, [article_id]);

  useEffect(() => {
    setIsLoading(true);
    getCommentsForArticle(article_id)
      .then(({ comments }) => {
        setComments(comments);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(err.response.data.msg);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return <p>Loading</p>;
  }

  return isError ? (
    <h1>{isError}</h1>
  ) : (
    <main className="main">
      <div className="single__article">
        <section className="article__header">
          <h2>{article.title}</h2>
          <p>
            {article.created_at.slice(0, 10).split("-").reverse().join("-")}
          </p>
          <h3>
            by {article.author} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp;Topic:&nbsp;{article.topic}
          </h3>
        </section>
        <section className="article__body">
          <article>{article.body}</article>
          <br />
          {<ArticleVotes article={article} />}
        </section>
        <hr />
        <ul className="all__comments">
          {comments.map((comment) => {
            return <CommentCard comment={comment} key={comment.comment_id} />;
          })}
        </ul>
      </div>
    </main>
  );
}
