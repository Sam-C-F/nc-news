import { Link } from "react-router-dom";
import "./ArticleCard.css";

export default function ArticleCard({ article }) {
  const articleDate = article.created_at
    .slice(0, 10)
    .split("-")
    .reverse()
    .join("-");
  return (
    <Link to={`/articles/${article.article_id}`} className="single__article">
      <li>
        <h2>{article.title}</h2>
        <br />
        <p>
          {article.author} -- {article.topic} -- {article.votes} votes --{" "}
          {article.comment_count} comments -- {articleDate}
        </p>
      </li>
    </Link>
  );
}
