import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils/api";
import "./ArticleById.css";

export default function ArticleById() {
  const [article, setArticle] = useState({});
  const [isloading, setIsLoading] = useState(true);

  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id).then(({ articles }) => {
      setArticle(articles);
      setIsLoading(false);
    });
  }, [article_id]);

  if (isloading) {
    return <p>Loading</p>;
  }

  const dateStamp = () => {
    const date = article.created_at.slice(0, 10);
    return date.split("-").reverse().join("-");
  };

  return (
    <main className="main">
      <div className="single__article">
        <section className="article__header">
          <h2>{article.title}</h2>
          <p>{dateStamp()}</p>
          <h3>
            by {article.author} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp;Topic:&nbsp;{article.topic}
          </h3>
        </section>
        <section className="article__body">
          <article>{article.body}</article>
          <br />
          <button>
            <p>❤&nbsp;{article.votes}&nbsp;❤</p>
          </button>
        </section>
      </div>
    </main>
  );
}
