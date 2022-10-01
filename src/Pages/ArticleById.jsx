import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddComment from "../Components/AddComment";
import ArticleVotes from "../Components/ArticleVotes";
import CommentCard from "../Components/CommentCard";
import DeleteArticle from "../Components/DeleteArticle";

import { getArticleById, getCommentsForArticle } from "../utils/api";
import "./ArticleById.css";

export default function ArticleById() {
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");
  const [limit, setLimit] = useState(10);
  const [p, setP] = useState(1);

  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then(({ articles }) => {
        const articleToRender = {
          ...articles,
          created_at: articles.created_at
            .slice(0, 10)
            .split("-")
            .reverse()
            .join("-"),
        };
        setArticle(articleToRender);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(err.response.data.msg);
        setIsLoading(false);
      });
  }, [article_id]);

  useEffect(() => {
    setIsLoading(true);
    getCommentsForArticle(article_id, limit, p)
      .then(({ comments }) => {
        const commentsToRender = [...comments].map((comment) => {
          return {
            ...comment,
            created_at: comment.created_at
              .slice(0, 10)
              .split("-")
              .reverse()
              .join("-"),
          };
        });
        setComments(commentsToRender);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(err.response.data.msg);
        setIsLoading(false);
      });
  }, [article_id, limit, p]);

  const handleLimitOnChange = (e) => {
    setLimit(e.target.value);
  };

  const handlePageOnChange = (e) => {
    setP(e.target.value);
  };

  const commentArray = [];
  const numberOfComments = Math.ceil(article.comment_count / limit);
  for (let i = 0; i < numberOfComments; i++) {
    commentArray.push(i);
  }

  if (isLoading) {
    return <p>Loading</p>;
  }

  return isError ? (
    <h1>{isError}</h1>
  ) : (
    <main className="main">
      <div className="article__by__id">
        <section className="article__header">
          <h2>{article.title}</h2>
          <p>{article.created_at}</p>
          <h3>
            by {article.author} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp;Topic:&nbsp;{article.topic}
          </h3>
        </section>
        <section className="article__body">
          <article>{article.body}</article>
          <br />
          {<ArticleVotes article={article} />}
          <br />
        </section>
        <DeleteArticle article={article} />
        <br />
        <AddComment setComments={setComments} article_id={article_id} />
        <br />
        <hr />
        <ul className="all__comments">
          {comments.map((comment) => {
            return <CommentCard comment={comment} key={comment.comment_id} />;
          })}
        </ul>
      </div>
      <hr />
      <p>
        Total Comments: {article.comment_count}
        &nbsp; &nbsp; &nbsp;
        <label htmlFor="limit">Limit: </label>
        <select
          name="limit"
          id="limit"
          value={limit}
          onChange={(e) => {
            handleLimitOnChange(e);
          }}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        &nbsp;
        <label htmlFor="p">Page: </label>
        <select
          name="p"
          id="p"
          value={p}
          onChange={(e) => {
            handlePageOnChange(e);
          }}
        >
          {commentArray.map((p) => {
            return (
              <option key={p + 1} value={p + 1}>
                {p + 1}
              </option>
            );
          })}
        </select>
      </p>
    </main>
  );
}
